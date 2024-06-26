## LLM Code Assistant

This is a simple script that uses a large language model (LLM) to help you make code changes to your project.
The script takes a code diff as input and uses the LLM to help you apply the diff, suggest improvements, or generate commit messages.

## To use:
1. Install the Script Globally:  
```sudo ./install.sh```

2. Run the Script from Any Directory:  
```llm```

***Voila! The prompt with all the code from the repo is copied to your clipboard.***

3. To Use Images
    - Create a folder named `.llm/images` in your project's root directory.
    - Place any images you want to include in your prompt inside this folder.
    - When the LLM asks for additional information or context, you can reference these images by their filenames. 
    - For example, you could say: "See the diagram in `architecture.png` for a visual representation of the component structure."

The script will automatically include the paths to these images in the prompt that it sends to the LLM.
 

## The script uses these configuration files:
> **<span style="color:orange">ignore.llm:</span>** (autogenerated from .gitignore file)  
This file contains a list of patterns that you want to ignore, it works just like a .gitignore file. The content of this file will be used to filter out the code from the repo.