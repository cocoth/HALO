var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/core/agent.ts
var agent_exports = {};
__export(agent_exports, {
  AiAgent: () => AiAgent
});

// src/utils/logger.ts
var logger_exports = {};
__export(logger_exports, {
  Logger: () => Logger
});

// src/utils/colors.ts
var colors_exports = {};
__export(colors_exports, {
  terminalColors: () => terminalColors
});
var terminalColors = {
  reset: "\x1B[0m",
  bright: "\x1B[1m",
  dim: "\x1B[2m",
  underscore: "\x1B[4m",
  blink: "\x1B[5m",
  reverse: "\x1B[7m",
  hidden: "\x1B[8m",
  BLK: "\x1B[30m",
  R: "\x1B[31m",
  G: "\x1B[32m",
  Y: "\x1B[33m",
  B: "\x1B[34m",
  M: "\x1B[35m",
  C: "\x1B[36m",
  W: "\x1B[37m",
  BBLK: "\x1B[40m",
  BR: "\x1B[41m",
  BG: "\x1B[42m",
  BY: "\x1B[43m",
  BB: "\x1B[44m",
  BM: "\x1B[45m",
  BC: "\x1B[46m",
  BW: "\x1B[47m"
};

// src/utils/time.ts
var time_exports = {};
__export(time_exports, {
  Time: () => Time
});
var Time = class _Time {
  static formatDateToParts(date, timeZone) {
    const formatter = new Intl.DateTimeFormat("id-ID", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
    const formattedParts = formatter.formatToParts(date);
    const dateParts = {};
    formattedParts.forEach(({ type, value }) => {
      dateParts[type] = value;
    });
    return dateParts;
  }
  static formatDateString(dateParts) {
    return `${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}:${dateParts.minute}:${dateParts.second}Z`;
  }
  static logFormat(dateParts) {
    return `${dateParts.day}/${dateParts.month}/${dateParts.year}:${dateParts.hour}:${dateParts.minute}:${dateParts.second}`;
  }
  static formatDateToHumanReadable(date, timeZone) {
    const dateParts = _Time.formatDateToParts(date, timeZone);
    return `${dateParts.day}/${dateParts.month}/${dateParts.year} ${dateParts.hour}:${dateParts.minute}:${dateParts.second}`;
  }
  static getCurrentTime() {
    const now = /* @__PURE__ */ new Date();
    const dateParts = _Time.formatDateToParts(now, "Asia/Jakarta");
    const formattedDateString = _Time.formatDateString(dateParts);
    return new Date(formattedDateString);
  }
  static getCurrentTimeToString() {
    const now = /* @__PURE__ */ new Date();
    const dateParts = _Time.formatDateToParts(now, "Asia/Jakarta");
    return _Time.formatDateString(dateParts);
  }
  static getCurrentTimeToHumanReadable() {
    const now = /* @__PURE__ */ new Date();
    return _Time.formatDateToHumanReadable(now, "Asia/Jakarta");
  }
  static getTimeToLogFormat() {
    const now = /* @__PURE__ */ new Date();
    const dateParts = _Time.formatDateToParts(now, "Asia/Jakarta");
    return _Time.logFormat(dateParts);
  }
};

// src/utils/logger.ts
var Logger = class {
  static log(type, message, funcName) {
    const colorMap = {
      DEBUG: terminalColors.M,
      WARN: terminalColors.BY,
      ERROR: terminalColors.R,
      INFO: terminalColors.B,
      SUCCESS: terminalColors.G
    };
    const color = colorMap[type] || terminalColors.reset;
    const currentTime = Time.getTimeToLogFormat();
    const functionName = funcName ? `funcName: ${funcName}` : "";
    const logMethod = type === "ERROR" || type === "WARN" ? console.log : type === "INFO" ? console.info : console.log;
    logMethod(`${terminalColors.dim}[${currentTime}]${terminalColors.reset} ${color}[${type}]${terminalColors.reset} ${functionName}: ${message}`);
  }
  static success(message, funcName) {
    this.log("SUCCESS", message, funcName);
  }
  static error(message, funcName) {
    this.log("ERROR", message, funcName);
  }
  static warn(message, funcName) {
    this.log("WARN", message, funcName);
  }
  static info(message, funcName) {
    this.log("INFO", message, funcName);
  }
  static debug(message, funcName) {
    this.log("DEBUG", message, funcName);
  }
  static custom(type, message, funcName) {
    const functionName = funcName ? `funcName: ${funcName}` : "";
    const currentTime = Time.getTimeToLogFormat();
    console.log(`${terminalColors.dim}[${currentTime}]${terminalColors.reset} ${terminalColors.C}[${type}]${terminalColors.reset} ${functionName}: ${message}`);
  }
};

// src/core/agent.ts
import { createOpenAI } from "@ai-sdk/openai";
import {
  generateText,
  streamText
} from "ai";

// src/lib/iof.ts
var iof_exports = {};
__export(iof_exports, {
  IOF: () => IOF
});
import * as crypto from "crypto";
import * as path from "path";
import * as fs from "fs";

// src/utils/mimeType.ts
var mimeType_exports = {};
__export(mimeType_exports, {
  mimeType: () => mimeType
});
function mimeType(fileName) {
  const ext = fileName.split(".").pop();
  switch (ext) {
    // video
    case "mp4":
    case "m4a":
    case "m4b":
    case "m4p":
    case "m4r":
    case "mpeg":
    case "mpg":
    case "mpe":
    case "mpv":
    case "mp2":
    case "m2v":
    case "m2ts":
    case "mts":
    case "tts":
    case "m2t":
    case "tsv":
    case "tsa":
      return "video/mpeg";
    case "webm":
      return "video/webm";
    case "3gp":
      return "video/3gpp";
    case "mkv":
      return "video/x-matroska";
    case "avi":
      return "video/x-msvideo";
    case "mov":
      return "video/quicktime";
    case "wmv":
      return "video/x-ms-wmv";
    case "flv":
      return "video/x-flv";
    case "m4v":
      return "video/x-m4v";
    //  audio
    case "mp3":
      return "audio/mpeg";
    case "wav":
      return "audio/wav";
    case "ogg":
      return "audio/ogg";
    case "aac":
      return "audio/aac";
    case "flac":
      return "audio/flac";
    case "alac":
      return "audio/alac";
    // image
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "bmp":
      return "image/bmp";
    case "webp":
      return "image/webp";
    case "svg":
      return "image/svg+xml";
    case "ico":
      return "image/x-icon";
    case "tiff":
      return "image/tiff";
    case "psd":
      return "image/vnd.adobe.photoshop";
    case "ai":
      return "application/postscript";
    case "eps":
      return "application/postscript";
    case "indd":
      return "application/x-indesign";
    case "raw":
      return "image/x-raw";
    case "cr2":
      return "image/x-canon-cr2";
    case "nef":
      return "image/x-nikon-nef";
    case "orf":
      return "image/x-olympus-orf";
    case "rw2":
      return "image/x-panasonic-rw2";
    case "pef":
      return "image/x-pentax-pef";
    case "arw":
      return "image/x-sony-arw";
    case "dng":
      return "image/x-adobe-dng";
    case "x3f":
      return "image/x-sigma-x3f";
    case "cr3":
      return "image/x-canon-cr3";
    case "heic":
      return "image/heic";
    case "heif":
      return "image/heif";
    case "avif":
      return "image/avif";
    // application
    case "pdf":
      return "application/pdf";
    case "txt":
      return "text/plain";
    // text
    case "html":
      return "text/html";
    case "css":
      return "text/css";
    case "js":
      return "application/javascript";
    case "json":
      return "application/json";
    case "xml":
      return "application/xml";
    // archive
    case "zip":
      return "application/zip";
    case "rar":
      return "application/x-rar-compressed";
    case "7z":
      return "application/x-7z-compressed";
    default:
      return "application/octet-stream";
  }
}

// src/lib/iof.ts
var IOF = class _IOF {
  /**
   * Creates a directory if it does not exist.
   * @param dirPath - The path of the directory to create.
   */
  static mkdir(dirPath) {
    try {
      if (!fs.existsSync(dirPath)) {
        Logger.info(`Creating directory: ${dirPath}`);
        fs.mkdirSync(dirPath, { recursive: true });
      }
    } catch (error) {
      throw new Error(`Failed to create directory at ${dirPath}:  ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  /**
   * Calculates the SHA-256 hash of a given buffer.
   * @param buffer - The buffer to hash.
   * @returns The SHA-256 hash as a hexadecimal string.
   */
  static calculateHashByBuffer(buffer) {
    if (!Buffer.isBuffer(buffer)) {
      throw new Error("Input must be a Buffer");
    }
    if (buffer.length === 0) {
      throw new Error("Buffer cannot be empty");
    }
    return crypto.createHash("sha256").update(buffer).digest("hex");
  }
  /**
   * Calculates the size of a file based on its buffer.
   * @param buffer - The buffer representing the file.
   * @returns The size of the file in bytes.
   */
  static calculateSizeByBuffer(buffer) {
    if (!Buffer.isBuffer(buffer)) {
      throw new Error("Input must be a Buffer");
    }
    if (buffer.length === 0) {
      throw new Error("Buffer cannot be empty");
    }
    return Buffer.byteLength(buffer);
  }
  /**
   * Sets the file location by saving the file to the specified path and storing its metadata.
   * @param data - The file data including the file buffer, name, and path.
   * @returns The full path of the saved file or null if an error occurs.
   */
  async setFileLocation(data) {
    const hash = _IOF.calculateHashByBuffer(Buffer.from(data.file));
    const size = _IOF.calculateSizeByBuffer(Buffer.from(data.file));
    const type = mimeType(data.name);
    try {
      const fullPath = path.join(process.cwd(), data.path, data.name);
      const dir = path.dirname(fullPath);
      _IOF.mkdir(dir);
      await fs.promises.writeFile(fullPath, data.file);
      return {
        filename: data.name,
        fileuri: fullPath,
        filehash: hash,
        filesize: size,
        filetype: type
      };
    } catch (error) {
      throw new Error(`Failed to set file location: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  /**
   * Downloads a file from a given URL and saves it to the specified download path.
   * @param data - The file download data including the file URL and save path.
   * @returns The metadata of the downloaded file.
   */
  static async downloadFile(data) {
    try {
      const response = await fetch(data.fileuri);
      const buffer = await response.arrayBuffer();
      const fileName = path.basename(data.fileuri);
      const filePath = path.join(data.saveTo, fileName);
      fs.writeFileSync(filePath, Buffer.from(buffer));
      return {
        filename: fileName,
        fileuri: filePath,
        filehash: _IOF.calculateHashByBuffer(Buffer.from(buffer)),
        filesize: _IOF.calculateSizeByBuffer(Buffer.from(buffer)),
        filetype: mimeType(fileName)
      };
    } catch (error) {
      throw new Error(`Failed to download file: ${error}`);
    }
  }
  /**
   * Retrieves the string content of a text file.
   * @param filePath - The path to the text file.
   * @returns A promise that resolves to the content of the file as a string.
   * @throws An error if the file cannot be read.
   */
  static async readTextFile(filePath) {
    try {
      const data = await fs.promises.readFile(filePath, "utf-8");
      return data;
    } catch (error) {
      throw new Error(`Failed to read file at ${filePath}`);
    }
  }
  /**
   * Converts a file to a generative path format.
   * @param fileName - The name of the file to convert.
   * @returns An object containing the inline data with base64 encoded content and MIME type.
   * @throws An error if the file cannot be read or converted.
   */
  async fileToGenerativePath(fileName) {
    try {
      const mime = mimeType(fileName);
      const file = await fs.promises.readFile(fileName);
      return {
        inlineData: {
          data: Buffer.from(file).toString("base64"),
          mimeType: mime
        }
      };
    } catch (error) {
      throw new Error(`Failed to convert file to generative path: ${error}`);
    }
  }
};

// src/core/agent.ts
import { createGoogleGenerativeAI } from "@ai-sdk/google";

// src/core/tools.ts
var tools_exports = {};
__export(tools_exports, {
  TaskHandler: () => TaskHandler,
  Tools: () => Tools
});
import { tool } from "ai";
import { z } from "zod";
var TaskHandler = {
  /**
   * Get the current date and time in real-time.
   * This tool does not require any parameters. It returns the current time in a standard format.
   */
  getCurrentTime: tool({
    description: "Get the current date and time in real-time. This tool does not require any parameters. It returns the current time in a standard format. Use this tool when user ask you for current time or date or anything that related to time.",
    parameters: z.object({}),
    execute: async () => await Tools.getCurrentTime()
  })
};
var Tools = class {
  /**
   * Retrieves the current time in a human-readable format.
   * This tool does not require any parameters.
   */
  static async getCurrentTime() {
    Logger.info("Retrieving current time...");
    return Time.getCurrentTimeToHumanReadable();
  }
};

// src/core/agent.ts
var AiAgent = class {
  /**
   * The schema for validating the AI agent configuration.
   * It ensures that the required fields are present and correctly formatted.
   */
  aiAgentUrl;
  apiKey;
  model;
  fallbackModel;
  systemPromptFile;
  streamMethod = "text";
  toolSet = {
    getCurrentTime: TaskHandler.getCurrentTime
  };
  constructor(config) {
    try {
      this.aiAgentUrl = config.agentUrl;
      this.apiKey = config.apiKey;
      this.streamMethod = config.streamMethod || "text";
      this.systemPromptFile = config.systemPromptFile;
      if (!this.aiAgentUrl || !this.apiKey) {
        throw new Error("Agent URL and API key are required.");
      }
      this.model = this.init({
        model: config.model
      });
      if (config.fallbackModel) {
        this.fallbackModel = config.fallbackModel;
      }
      if (config.tools) {
        this.toolSet = {
          getCurrentTime: TaskHandler.getCurrentTime,
          ...config.tools
        };
      }
    } catch (error) {
      throw new Error(`Invalid configuration: ${error}`);
    }
  }
  init({
    model
  }) {
    if (model?.startsWith("gemini-")) {
      const googleModel = createGoogleGenerativeAI({
        apiKey: this.apiKey,
        baseURL: this.aiAgentUrl
      });
      return googleModel(model);
    } else if (model?.startsWith("gpt-")) {
      const openAIModel2 = createOpenAI({
        baseURL: this.aiAgentUrl,
        apiKey: this.apiKey,
        compatibility: "strict"
      });
      return openAIModel2(model);
    }
    const openAIModel = createOpenAI({
      baseURL: this.aiAgentUrl,
      apiKey: this.apiKey,
      compatibility: "strict"
    });
    return openAIModel("gpt-4o");
  }
  /**
   * Loads the system prompt from a specified file.
   * If the file is not found or empty, it throws an error.
   */
  async systemPrompt() {
    if (!this.systemPromptFile) {
      return "";
    }
    const system = await IOF.readTextFile(this.systemPromptFile);
    if (!system) {
      throw new Error("System prompt file not found or empty.");
    }
    return system;
  }
  /**
   * Retrieves user information based on the provided user base.
   * This method can be extended to fetch user details from a database or an API.
   */
  async getUserInfo(userData) {
    const greetingName = `Hai My Username Is: ${userData.username || userData.name || ""}, `;
    const greetingPhone = `My Phone Number Is: ${userData.phone || ""}. 
`;
    return greetingName + greetingPhone;
  }
  /**
   * Generates a stream of text responses based on the provided messages.
   * It uses the AI agent's model and system prompt to generate the responses.
   * If tools are defined, it will use them in the generation process.
   *
   * @param messages - An optional array of CoreMessage objects representing the conversation history.
   * @param prompt - An optional prompt string to start the conversation.
   * @returns A stream of text responses generated by the AI agent.
   */
  async generateText({ messages, prompt }) {
    if (prompt && typeof prompt !== "string") {
      throw new Error("Prompt must be a string.");
    }
    if (messages && !Array.isArray(messages)) {
      throw new Error("Messages must be an array of CoreMessage.");
    }
    if (prompt) {
      return await generateText({
        model: this.model,
        system: await this.systemPrompt(),
        tools: Object.keys(this.toolSet).length > 0 ? this.toolSet : void 0,
        maxSteps: Object.keys(this.toolSet).length > 0 ? Number.MAX_SAFE_INTEGER : void 0,
        prompt
        // toolChoice: Object.keys(this.toolSet).length > 0 ? "required" : "auto"
      });
    }
    return await generateText({
      model: this.model,
      system: await this.systemPrompt(),
      tools: Object.keys(this.toolSet).length > 0 ? this.toolSet : void 0,
      maxSteps: Object.keys(this.toolSet).length > 0 ? Number.MAX_SAFE_INTEGER : void 0,
      // toolChoice: Object.keys(this.toolSet).length > 0 ? "required" : "required",
      messages
    });
  }
  /**
   * Generates a text stream based on the provided messages.
   * This method is used for streaming responses from the AI agent.
   * It uses the `streamText` function from the `ai` library.
   *
   * @param messages - An array of CoreMessage objects representing the conversation history.
   * @returns A stream of text responses from the AI agent.
   */
  async generateStream(messages) {
    return streamText({
      model: this.model,
      system: await this.systemPrompt(),
      tools: Object.keys(this.toolSet).length > 0 ? this.toolSet : void 0,
      maxSteps: Object.keys(this.toolSet).length > 0 ? Number.MAX_SAFE_INTEGER : void 0,
      messages
    });
  }
  /**
   * Starts a chat session with the AI agent.
   * It saves the user's message and response to the database.
   * If a session is provided, it continues the conversation with the existing messages.
   * If the prompt is invalid or empty, it throws an error.
   *
   * @param user - The user initiating the chat session.
   * @param session - An optional array of previous messages in the chat session.
   * @param prompt - The user's message to start the chat.
   * @param media - Optional media data to include in the chat.
   * @returns An object containing the text stream, text response, and response object.
   */
  async startChat({
    user,
    session,
    prompt,
    media
  }) {
    try {
      if (!prompt || typeof prompt !== "string") {
        throw new Error("Prompt must be a non-empty string.");
      }
      if (session && !Array.isArray(session)) {
        throw new Error("Session must be an array of CoreMessage.");
      }
      if (session && session.length > 0) {
        let messages = [];
        if (!media || media.inlineData === "") {
          messages = [
            ...session,
            {
              role: "user",
              content: prompt
            }
          ];
        } else {
          messages = [
            ...session,
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: prompt
                },
                {
                  type: "file",
                  data: media.inlineData,
                  mimeType: media.mimeType || "application/octet-stream"
                }
              ]
            }
          ];
        }
        if (this.streamMethod === "stream") {
          const textStream = await this.generateStream(messages);
          return { textStream: textStream.textStream, response: textStream.response };
        }
        const { text: text2, response: response2 } = await this.generateText({ messages });
        return { text: text2, response: response2 };
      }
      const greeting = user ? await this.getUserInfo(user) : "";
      const fullPrompt = `${greeting} ${prompt}`;
      if (this.streamMethod === "stream") {
        const textStream = await this.generateStream([
          {
            role: "user",
            content: fullPrompt
          }
        ]);
        return { textStream: textStream.textStream, response: textStream.response };
      }
      const { text, response } = await this.generateText({ prompt: fullPrompt });
      return { text, response };
    } catch (error) {
      if (error instanceof Error && error.message.includes("Rate limit")) {
        Logger.warn("Rate limit exceeded, switching model...");
        this.model = this.init({
          model: this.fallbackModel
        });
        return await this.startChat({ user, session, prompt });
      }
      throw new Error(`AI Agent test chat failed: ${error}`);
    }
  }
};

// src/utils/hash.ts
var hash_exports = {};
__export(hash_exports, {
  GenerateRandomString: () => GenerateRandomString,
  GenerateUUID: () => GenerateUUID,
  HashWithSHA256: () => HashWithSHA256
});
import crypto2, { randomUUID } from "crypto";
function HashWithSHA256(data) {
  return crypto2.createHash("sha256").update(data).digest("hex");
}
function GenerateUUID() {
  return randomUUID();
}
function GenerateRandomString(length) {
  return crypto2.randomBytes(length).toString("hex").slice(0, length);
}

// src/utils/terminal.ts
var terminal_exports = {};
__export(terminal_exports, {
  ClearTerminal: () => ClearTerminal,
  CloseTerminal: () => CloseTerminal,
  Help: () => Help,
  ParseEnvKeys: () => ParseEnvKeys,
  Question: () => Question
});
import * as rl from "readline/promises";
import dotenv from "dotenv";
dotenv.config();
var terminal = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
  completer: (line) => {
    const completions = ["help", "exit", "clear"];
    const hits = completions.filter((c) => c.startsWith(line));
    return [hits.length ? hits : completions, line];
  }
});
async function Question(question) {
  return terminal.question(question ? question + ": " : ": ");
}
async function CloseTerminal() {
  await terminal.close();
  process.exit(0);
}
async function ClearTerminal() {
  process.stdout.write("\x1Bc");
  return terminal.prompt();
}
async function Help() {
  console.log(`
Available commands:
  - help: Show this help message
  - exit: Exit the terminal
  - clear: Clear the terminal screen
  `);
  return terminal.prompt();
}
function ParseEnvKeys(prefix) {
  const envKeys = Object.keys(process.env).filter(
    (key) => key.startsWith(prefix)
  );
  const keys = [];
  const values = [];
  envKeys.forEach((key) => {
    if (process.env[key]) {
      keys.push(key);
      values.push(process.env[key]);
    }
  });
  return { keys, values };
}
export {
  agent_exports as Agent,
  colors_exports as Colors,
  hash_exports as Hash,
  iof_exports as IOF,
  logger_exports as Logger,
  mimeType_exports as MimeType,
  terminal_exports as Terminal,
  time_exports as Time,
  tools_exports as Tools
};
//# sourceMappingURL=index.mjs.map