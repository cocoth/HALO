# HALO

**HALO** is a library for comunicate with many AI providers. This project develop with full typescript for better typesafe

## Features

- Generate Object ouput
- Generate Stream output
- Generate text
- Saving context to file session / memory session

## Installation

Create dir
```bash
mkdir my-project
cd my-project
```
Initialize nodeJs & typescript project

```bash
npm init -y
npm i -D typescript @types/node
npm i -g tsx
npx tsc --init
```
install zod for schema (optional, but in this case if you follow quick example you will need zod)
```bash
npm i  zod
```
Install this library

```bash
npm i  github:cocoth/HALO
```

## How to use this library?

### Quick Example:
```ts
import { 
    AiAgent, 
    Logger, 
    Terminal, 
    AiAgentConfig, 
    Time 
} form "halo";
import { z } from "zod";

// Here we use ParseEnvKeys instead of calling dotenv config,
// because by default ParseEnvKeys already handle it 
const aiTokens = Terminal.ParseEnvKeys("AI_TOKEN_");
const aiURLs = Terminal.ParseEnvKeys("AI_URL_");

// Here you can extend your model

const myModel = "test-model";

// This code bellow is basic setup for AiAgentConfig
const agentConfig: AiAgentConfig<typeof myModel> = {
  agentUrl: aiURLs.values[1] || "",
  apiKey: aiTokens.values[1] || "",
  model: "gemini-2.0-flash", 
  fallbackModel: "gemini-1.5-flash",
  systemPrompt: {
    text: "your name is JIXEY, You are a helpful assistant. Answer the questions as best you can.",
    // you can either use text or file but not both.
    // file: "./dir/path/system-prompt.txt"
  }
}

// We initialize AiAgent with agentConfig that we setup earlier
const agent = new AiAgent(agentConfig);

// we initialize AgentSession
// ⚠️ Important note. Use AgentSession only for development cause there's too big bandwith for File I/O or memory usage
const chatSession = new AgentSession({
  platform: "test",
});

async function main() {
  Logger.info("Welcome to HALO Test Chat");
// I Already make Question for input in terminal, it's kinda like input() in python
  const phone = await Terminal.Question("Your phone");

  let username: string = "";

// here we check if user already exsist on database (in this case is JSON Database)
  const userexist = await chatSession.getUserData({
    username: "",
    phone: phone,
  })
  if (!userexist || !userexist.username) {
    username = await Terminal.Question("Yourname");
    while (!username) {
      Logger.warn("Username tidak boleh kosong. Silakan isi lagi.");
      username = await Terminal.Question("Yourname");
    }
  } else {
    username = userexist.username;
  }

  while (true) {

// Then we can use useJSONFileSession or useMemoryFileSession to store our data / session.
// ⚠️ Important note: This is necessary to provide context to the AI Agent

    const { user, session, saveHistory } = await chatSession.useJSONFileSession({
      folderName: "sessions",
      sessionFileNameSuffix: username,
      user: {
        username: username,
        phone: phone,
      },
    })

    const q = await Terminal.Question("[You]");

// Here we use saveHistory function to save our context to JSON database
    await saveHistory<string>({
      role: "user",
      text: q,
      timestamp: Time.getCurrentTime(),
    })

// we use agent.query with exsisting session (context)
// and we passing our question
    const r = await agent.query({
      session: session,
      prompt: q,
    });

// Here we use zod schema to generate object
    const schema = z.object({
      title: z.string().min(1, "Title is required"),
      answer: z.string().min(1, "Answer is required"),
      tags: z.array(z.string()).min(1, "At least one tag is required"),
      date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Date must be a valid date string",
      })
    });

// Then we do object generation with above schema 
    const { object } = await r.generateObject(schema);

// Then we save our AI Agent response to database
    await saveHistory({
      role: "assistant",
      content: object,
      timestamp: Time.getCurrentTime(),
    });

    console.log("[AI]:");
    console.dir(object, { depth: null, colors: true });

  }

}

main().catch((error) => {
  Logger.error(`${error}`);
  process.exit(1);
});

```

#### ***for more info please visit this [docs](https://cocoth.github.io/HALO/)**


## Contribute

Contributions are highly welcome! Please open an issue or submit a pull request for improvements or new features.


**Author:** [cocoth](https://github.com/cocoth)  
