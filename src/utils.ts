import * as child_process from 'child_process'; // Import child_process module
import * as fs from 'fs';
import * as path from 'path';
import {
    BINARY_EXTENSTIONS
} from './constants.js';

// Function to read the content of a file
export const readFileContent = (filePath: string): string => {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error(`Error reading file: ${err}`);
        return '';
    }
};

// Function to check if the path is a directory
export const isDirectory = (dirPath: string): boolean => {
    return fs.lstatSync(dirPath).isDirectory();
};

// Function to check if a file is binary
export const isBinaryFile = (filePath: string): boolean => {
    const extensions = new Set(BINARY_EXTENSTIONS);
    return extensions.has(path.extname(filePath).slice(1).toLowerCase());
};

// Function to write the relative path of a file to the output file
export const getRelativePath = (filePath: string) => {
    return path.relative(process.cwd(), filePath);
};

// Function to write the content of a file to the output file
export const getCodeWithLineNbr = (filePath: string) => {
    // console.log(`Writing file content to output file...`);                                                                                                                                                                     
    const fileContent = fs.readFileSync(filePath).toString();
    const lines = fileContent.split('\n');
    const numberedLines = lines.map((line, index) => `${index + 1}. ${line}`);
    return numberedLines.join('\n');
};


// Function to copy the content of the output file to the clipboard
export const copyOutputToClipboard = (outputFile: string): void => {
    let command: string;
    if (process.platform === 'win32') {
        command = `type ${outputFile} | clip`;
    } else {
        command = `pbcopy < ${outputFile}`;
    }
    console.log(`Copying output file content to clipboard...`);
    child_process.execSync(command);
    console.log('Output file content copied to clipboard!');
};

export const getGitDiff = () => {
    const output = child_process.execSync(`git diff --cached`);
    return output.toString();
};

export const resetUnstagedFiles = () => {
    const output = child_process.execSync(`git restore .`);
    return output.toString();
};

// export const logBottom = () => {
//     const ui = new inquirer.ui.BottomBar();

//     // pipe a Stream to the log zone
//     // outputStream.pipe(ui.log);

//     // Or simply write output
//     ui.log.write('something just happened.');
//     ui.log.write('Almost over, standby!');

//     // During processing, update the bottom bar content to display a loader
//     // or output a progress bar, etc
//     ui.updateBottomBar('new bottom bar content');
// }

export const getPreviousRecords = (filePath: string) => {
    try {
        return JSON.parse((fs.readFileSync(filePath).toString() || `[]`))
    } catch (_) {
        return [];
    }
};

export const saveNewRecord = async (filePath: string, record: any) => {
    // ensure directory tree exists
    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify([...new Set([
        record,
        ...getPreviousRecords(filePath),
    ])], null, 2));
};

export const openFile = (filePath: string, editor: 'code' = 'code') => {
    try {
        if (editor === 'code') {
            child_process.execSync(`code ${filePath}`);
            return;
        }
        child_process.execSync(`open ${filePath}`);
    } catch (error) {
        console.error("Error opening file:", error);
    }
};
