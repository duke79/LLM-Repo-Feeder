export const SETTINGS_FOLDER = '.llm';
export const POST_PROMPT_FILE = SETTINGS_FOLDER + '/' + 'prompt.llm';
export const LAST_PROMPT_FILE = SETTINGS_FOLDER + '/' + 'last-prompt.llm';
export const LAST_RESPONSE_FILE = SETTINGS_FOLDER + '/' + 'last-response.llm';
export const CHAT_SO_FAR_FILE = SETTINGS_FOLDER + '/' + 'chat-so-far.llm';
export const LAST_PATCH_FILE = SETTINGS_FOLDER + '/' + 'last-patch.patch';
export const POST_PROMPTS_FILE = SETTINGS_FOLDER + '/' + 'custom-prompts.llm';
export const COMPLETE_DIFF_REQUEST = `The diff you provided is correct but it is not complete. Please provide the rest of the changes. Are you sure you have covered all the required files? Functions? etc.`;
export const IMAGE_FOLDER = SETTINGS_FOLDER + '/images';
export const BETTERS_DIFF_REQUEST = `The diff seems to be corrupted, please provide the correct diff again.`;
export const DEFAULT_PRE_PROMPT = `I'd like to make some changes to my codebase, and I'd appreciate your help.

Instead of providing one long text with all the files, can we break it down by specific changes?

Here's what I propose:**

Describe the change: Briefly explain what you want to achieve with the code modification.
Desired outcome: Describe the expected behavior after the change.

Once you understand my goals, you can provide the modified code in the git diff format.

Make sure that the git diff you provide contains all the files that are affected by the changes.

You'll first briefly list down the files/functions/other-code-parts you'll change,
 and then provide the diff.

Example:
## main.c

* Added includes for <stdlib.h> and "util.h":
  This allows the main program to use the standard library and the utility functions declared in util.h.
* Modified the main function: Instead of directly printing "Hello, World!", the main function now calls the print_message function defined in util.c, and then prints "Hello, World!".

## util.c
* Updated the print_message function: The message printed by this function was changed from "This is a utility message." to "This is an updated utility message.".
* Added a new function another_utility_function: This new function prints "Another utility function." when called. It was added to expand the utility functions available in the program.

## util.h
* Declared the new function another_utility_function: A new function declaration was added to the header file to make the another_utility_function available for use in other files that include this header.


\`\`\`diff
--- a/main.c
+++ b/main.c
@@ -1,5 +1,6 @@
 #include <stdio.h>
+#include <stdlib.h>
+#include "util.h"
 
 int main() {
-    printf("Hello, World!\n");
+    print_message();
+    printf("Hello, World!\n");
     return 0;
 }

--- a/util.c
+++ b/util.c
@@ -1,5 +1,9 @@
 #include "util.h"
 
 void print_message() {
-    printf("This is a utility message.\n");
+    printf("This is an updated utility message.\n");
+}
+
+void another_utility_function() {
+    printf("Another utility function.\n");
 }

--- a/util.h
+++ b/util.h
@@ -2,5 +2,6 @@
 #define UTIL_H
 
 void print_message();
+void another_utility_function();
 
 #endif // UTIL_H
 \`\`\`
`;
export const TECH_SPEC_PROMPT = `I'm planning to make changes to my codebase, but before I modify any code, I'd like to update my documentation to reflect these changes.

Also, remember - although it's a tech spec, it still will be saved in the repo in markdown file. So, be sure to return git diff for that file.
Git diff will help updating the markdown file with the changes you propose.

For each proposed change, please help me create detailed documentation specs to be included in the project's README file.  Please structure your response in the following way for each change:

Change Description: Provide a clear and concise summary of the intended modification to the code.
Reason for Change: Explain the motivation behind this change. What problem does it solve? What improvement does it offer?
Technical Details:
Affected Components: List the specific files, modules, or functions that will be impacted by this change.
Implementation Approach: Briefly describe the technical approach or strategy that will be used to implement the change.
Impact Assessment: Discuss any potential side effects, risks, or dependencies that this change may introduce.
Testing Instructions: Outline how this change should be tested to ensure it works as expected and doesn't introduce regressions.
Example:

Change Description: Add a new function to calculate the average of a list of numbers.

Reason for Change: The current codebase lacks a convenient way to calculate averages, which is a common requirement in data analysis tasks.

Technical Details:

Affected Components: utils.py (new function will be added here)
Implementation Approach: The new function will take a list of numbers as input, calculate their sum, and divide by the number of elements to obtain the average.
Impact Assessment:  No significant risks or dependencies expected. However, consider adding error handling for empty input lists.

Testing Instructions:

Create a list of numbers.
Call the new average function with the list.
Verify that the returned value matches the expected average.
Test with an empty list to ensure proper error handling.
Let me know if you have any questions.

Key Improvements:

Focus on Documentation: This prompt explicitly targets the creation of documentation specs before coding.
Structured Response: The response format helps you create well-organized and comprehensive documentation entries.
Technical Depth: The "Technical Details" section encourages a deeper look into the implementation and its implications.
Testing Focus: Emphasizes the importance of testing to validate the changes.
Let me know if you'd like any further adjustments to this prompt!`;
export const DEFAULT_POST_PROMPT = `Give the outline of the project.`;
// I would like to refactor index.ts, I guess things can be moved to remote.ts
export const REQUEST_SPEC_DOC = `
Instead of making the changes, create a spec document in docs folder.
Name it index-refactor-<date-time>.md, and explain the changes you'll make.
Try avoiding writing actual code in this file, but ensure to write which files/functions need 
to be changed. Also, what exactly to be modified in those function, epxlain in natural language.
`;
export const IGNORE_LINE_NUMBERS = `Remember, line numbers are to be excluded from the diff. Treat the code as if there were no line numbers.`;
export const BINARY_EXTENSTIONS = [
    "3dm",
    "3ds",
    "3g2",
    "3gp",
    "7z",
    "a",
    "aac",
    "adp",
    "afdesign",
    "afphoto",
    "afpub",
    "ai",
    "aif",
    "aiff",
    "alz",
    "ape",
    "apk",
    "appimage",
    "ar",
    "arj",
    "asf",
    "au",
    "avi",
    "bak",
    "baml",
    "bh",
    "bin",
    "bk",
    "bmp",
    "btif",
    "bz2",
    "bzip2",
    "cab",
    "caf",
    "cgm",
    "class",
    "cmx",
    "cpio",
    "cr2",
    "cur",
    "dat",
    "dcm",
    "deb",
    "dex",
    "djvu",
    "dll",
    "dmg",
    "dng",
    "doc",
    "docm",
    "docx",
    "dot",
    "dotm",
    "dra",
    "DS_Store",
    "dsk",
    "dts",
    "dtshd",
    "dvb",
    "dwg",
    "dxf",
    "ecelp4800",
    "ecelp7470",
    "ecelp9600",
    "egg",
    "eol",
    "eot",
    "epub",
    "exe",
    "f4v",
    "fbs",
    "fh",
    "fla",
    "flac",
    "flatpak",
    "fli",
    "flv",
    "fpx",
    "fst",
    "fvt",
    "g3",
    "gh",
    "gif",
    "graffle",
    "gz",
    "gzip",
    "h261",
    "h263",
    "h264",
    "icns",
    "ico",
    "ief",
    "img",
    "ipa",
    "iso",
    "jar",
    "jpeg",
    "jpg",
    "jpgv",
    "jpm",
    "jxr",
    "key",
    "ktx",
    "lha",
    "lib",
    "lvp",
    "lz",
    "lzh",
    "lzma",
    "lzo",
    "m3u",
    "m4a",
    "m4v",
    "mar",
    "mdi",
    "mht",
    "mid",
    "midi",
    "mj2",
    "mka",
    "mkv",
    "mmr",
    "mng",
    "mobi",
    "mov",
    "movie",
    "mp3",
    "mp4",
    "mp4a",
    "mpeg",
    "mpg",
    "mpga",
    "mxu",
    "nef",
    "npx",
    "numbers",
    "nupkg",
    "o",
    "odp",
    "ods",
    "odt",
    "oga",
    "ogg",
    "ogv",
    "otf",
    "ott",
    "pages",
    "pbm",
    "pcx",
    "pdb",
    "pdf",
    "pea",
    "pgm",
    "pic",
    "png",
    "pnm",
    "pot",
    "potm",
    "potx",
    "ppa",
    "ppam",
    "ppm",
    "pps",
    "ppsm",
    "ppsx",
    "ppt",
    "pptm",
    "pptx",
    "psd",
    "pya",
    "pyc",
    "pyo",
    "pyv",
    "qt",
    "rar",
    "ras",
    "raw",
    "resources",
    "rgb",
    "rip",
    "rlc",
    "rmf",
    "rmvb",
    "rpm",
    "rtf",
    "rz",
    "s3m",
    "s7z",
    "scpt",
    "sgi",
    "shar",
    "snap",
    "sil",
    "sketch",
    "slk",
    "smv",
    "snk",
    "so",
    "stl",
    "suo",
    "sub",
    "swf",
    "tar",
    "tbz",
    "tbz2",
    "tga",
    "tgz",
    "thmx",
    "tif",
    "tiff",
    "tlz",
    "ttc",
    "ttf",
    "txz",
    "udf",
    "uvh",
    "uvi",
    "uvm",
    "uvp",
    "uvs",
    "uvu",
    "viv",
    "vob",
    "war",
    "wav",
    "wax",
    "wbmp",
    "wdp",
    "weba",
    "webm",
    "webp",
    "whl",
    "wim",
    "wm",
    "wma",
    "wmv",
    "wmx",
    "woff",
    "woff2",
    "wrm",
    "wvx",
    "xbm",
    "xif",
    "xla",
    "xlam",
    "xls",
    "xlsb",
    "xlsm",
    "xlsx",
    "xlt",
    "xltm",
    "xltx",
    "xm",
    "xmind",
    "xpi",
    "xpm",
    "xwd",
    "xz",
    "z",
    "zip",
    "zipx"
];
export const GENERATE_COMMIT_MSG = `Generate a few good commit messages for the change log below. Ensure to return array of objects with two keys - commit & description`;
export const SUGGEST_THINGS = `Analyse the code above and suggest me the changes that I could do. Give a list of thigns that can be done in the format string[]`;
export const BOT = {
  curiosity: 'Curiosity Bot',
  architect: 'Code Architect Bot',
  developer: 'Developer Bot',
  idea: 'Idea Bot'
};
