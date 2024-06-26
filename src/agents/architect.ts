// import editor from '@inquirer/editor';
import autocomplete from 'inquirer-autocomplete-standalone';
// import { developer } from './developer.js';
import inquirer from 'inquirer';
import { KeyDescriptor } from 'inquirer-press-to-continue';
import {
    BOT,
    POST_PROMPTS_FILE,
    POST_PROMPT_FILE
} from '../constants.js';
import type { Agent, LLMResponseType } from '../types.js';
import {
    getPreviousRecords,
    openFile,
    readFileContent,
    saveNewRecord
} from '../utils.js';

import { getDirectoryContent } from '../llm.js';
import { getChatSoFar, runAgent } from '../remote.js';
import { parseCode } from '../utils/code-parsing.js';

interface Step {
    step_type: "decision" | "implementation" | "documentation";
    description: string;
    steps?: string[];
    command?: string;
    code?: string;
}

interface ProjectPlan {
    steps: Step[];
}

export const architect = (folderPath: string): Agent => {
    return {
        name: BOT.architect,
        buildPrompt: async (context) => {
            const responseType: LLMResponseType = 'application/json';
            let prompt = ``;
            if (context.data?.badReponse) {
                prompt += `Hey ${BOT.architect}, the last reponse didn't have correct structure, please give the response again and this time with correct json structure.`
                return { responseType, prompt, };
            }
            else if (context.data?.stepToExpand) {
                prompt += `I call upon the ${BOT.architect} to expand on the step below (remember to maintain the same JSON structure in your response) -`
                prompt += `\n\n\n`;
                prompt += context.data?.stepToExpand;
                prompt += `\n\n\n`;
                return { responseType, prompt, };
            } else {
                const answers = await context.ask([
                    {
                        type: 'list',
                        name: 'action',
                        message: 'Would you like to continue the last chat or start fresh?',
                        choices: [
                            {
                                name: 'Continue last chat...',
                                value: 'last-chat',
                            },
                            {
                                name: 'Start fresh!',
                                value: 'new-chat',
                            },
                        ],
                        default: 'new-chat',
                    },
                ]);
                if (answers.action === 'new-chat') {
                    prompt += getDirectoryContent(folderPath);
                    prompt += `\n\n\n`;
                    const postPrompt: string = await autocomplete({
                        message: 'What do you need me to plan?',
                        source: async (input) => {
                            const prompts = getPreviousRecords(POST_PROMPTS_FILE);
                            const filteredPrompts = prompts.filter((prompt) => prompt.includes(input || ''));
                            return [
                                ...(filteredPrompts.map((prompt) => ({
                                    value: prompt,
                                    description: prompt
                                })) || []),
                                ...(input ? [{ value: input, description: input }] : [])
                            ];
                        }
                    });
                    saveNewRecord(POST_PROMPTS_FILE, postPrompt as string);
                    prompt += `\n\n\n`;
                    prompt += `User:\n`;
                    prompt += `I call upon the ${BOT.architect} to handle what user asks below (remember to maintain the same JSON structure in your response) -`
                    prompt += `\n\n\n`;
                    prompt += postPrompt.trim();
                    return { responseType, prompt, };
                } else {
                    prompt += await getChatSoFar();
                    prompt += `\n\n\n`;
                    // const { nextInPlan } = await context.ask([{
                    //     type: 'input',
                    //     name: 'nextInPlan',
                    //     message: 'What would you like to do next?'
                    // }]);
                    console.log('Please put in your prompt in the following file: ', POST_PROMPT_FILE);
                    openFile(POST_PROMPT_FILE);
                    const { key: _ } = await inquirer.prompt<{ key: KeyDescriptor }>({
                        name: 'key',
                        type: 'press-to-continue',
                        anyKey: true,
                        pressToContinueMessage: 'Press a key to continue...',
                    });

                    prompt += `I call upon the ${BOT.architect} to handle what user asks below (remember to maintain the same JSON structure in your response) -`
                    prompt += `\n\n\n`;
                    prompt += readFileContent(POST_PROMPT_FILE).trim();
                    return { responseType, prompt, };
                }
            }
        },
        handleResponse: async (context) => {
            let plan: ProjectPlan = JSON.parse(parseCode(context.lastResponse, 'json'));
            console.log(plan);

            const answers = await context.ask([
                {
                    type: 'list',
                    name: 'action',
                    message: 'What would you like to do next?',
                    choices: [
                        {
                            name: 'Expand a step',
                            value: 'expand-step',
                        },
                        {
                            name: 'Request code for a step',
                            value: 'request-code',
                        },
                        {
                            name: 'Nothing, I am done',
                            value: 'done',
                        },
                    ],
                    default: 'expand-step',
                },
            ]);

            if (answers.action === 'expand-step') {
                try {
                    const answers = await context.ask([
                        {
                            type: 'list',
                            name: 'action',
                            message: 'What would you like to expand?',
                            choices: plan.steps.map((step) => ({ name: step.description, value: step.description })),
                            default: plan.steps[0],
                        },
                    ]);
                    context.data = {
                        plan,
                        stepToExpand: answers.action
                    };
                    console.log(`Expanding this step...\n${context.data?.stepToExpand}`);
                    await runAgent(architect(folderPath), context);
                } catch (e) {
                    context.data = {
                        badReponse: true,
                    };
                    await runAgent(architect(folderPath), context);
                }
            } else if (answers.action === 'request-code') {
                // const { stepIdToRequest } = await context.ask([{
                //     type: 'input',
                //     name: 'stepIdToRequest',
                //     message: 'Enter the step id to request code for: ',
                // }]);
                // stepId = stepIdToRequest;
                // await context.runAgent(developer(context.rootDir), { plan, stepId });
            }

            // if (stepId !== null) {
            //     await context.runPrompt(developer(context.rootDir), { plan, stepId });
            // }
        }
    };
};