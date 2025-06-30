"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var index_exports = {};
__export(index_exports, {
  AgentSession: () => AgentSession,
  AiAgent: () => AiAgent,
  CoreMessage: () => import_ai3.CoreMessage,
  GenerateRandomString: () => GenerateRandomString,
  GenerateUUID: () => GenerateUUID,
  HashWithSHA256: () => HashWithSHA256,
  IOF: () => IOF,
  Logger: () => Logger,
  TaskHandler: () => TaskHandler,
  Terminal: () => terminal_exports,
  Time: () => Time,
  Tools: () => Tools,
  mimeType: () => mimeType,
  terminalColors: () => terminalColors
});
module.exports = __toCommonJS(index_exports);

// src/utils/colors.ts
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
  static formateDateToSaveString(dateParts) {
    return `${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}-${dateParts.minute}-${dateParts.second}Z`;
  }
  static logFormat(dateParts) {
    return `${dateParts.day}/${dateParts.month}/${dateParts.year}:${dateParts.hour}:${dateParts.minute}:${dateParts.second}`;
  }
  static formatDateToHumanReadable(date, timeZone) {
    const dateParts = _Time.formatDateToParts(date, timeZone);
    return `${dateParts.day}/${dateParts.month}/${dateParts.year} ${dateParts.hour}:${dateParts.minute}:${dateParts.second}`;
  }
  /**
   * Returns the current time formatted as a string suitable for saving.
   * This format is `YYYY-MM-DDTHH-MM-SSZ`, which is useful for file naming or database storage.
   */
  static getCurrentTimeToSaveString() {
    const now = /* @__PURE__ */ new Date();
    const dateParts = _Time.formatDateToParts(now, "Asia/Jakarta");
    return _Time.formateDateToSaveString(dateParts);
  }
  /**
   * Returns the current time as a Date object.
   * This method formats the current time to a string and then converts it back to a Date object.
   */
  static getCurrentTime() {
    const now = /* @__PURE__ */ new Date();
    const dateParts = _Time.formatDateToParts(now, "Asia/Jakarta");
    const formattedDateString = _Time.formatDateString(dateParts);
    return new Date(formattedDateString);
  }
  /**
   * Returns the current time formatted as a string.
   * This format is `YYYY-MM-DDTHH:MM:SSZ`, which is useful for logging or displaying the current time.
   */
  static getCurrentTimeToString() {
    const now = /* @__PURE__ */ new Date();
    const dateParts = _Time.formatDateToParts(now, "Asia/Jakarta");
    return _Time.formatDateString(dateParts);
  }
  /**
   * Returns the current time in a human-readable format.
   * This format is `DD/MM/YYYY HH:MM:SS`, which is suitable for display to users.
   */
  static getCurrentTimeToHumanReadable() {
    const now = /* @__PURE__ */ new Date();
    return _Time.formatDateToHumanReadable(now, "Asia/Jakarta");
  }
  /**
   * Returns the current time formatted for logging.
   * This format is `DD/MM/YYYY:HH:MM:SS`, which is useful for log entries.
   */
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
var import_openai = require("@ai-sdk/openai");
var import_ai2 = require("ai");

// src/lib/iof.ts
var crypto = __toESM(require("crypto"));
var path = __toESM(require("path"));
var fs = __toESM(require("fs"));
var import_chokidar = __toESM(require("chokidar"));

// src/utils/mimeType.ts
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
   * Removes a directory or file at the specified path.
   * If the path is a directory, it will be removed recursively.
   * @param dirPath - The path of the directory to remove.
   */
  static rm(dirPath) {
    try {
      if (fs.existsSync(dirPath)) {
        Logger.info(`Removing: ${dirPath}`);
        fs.rmSync(dirPath, { recursive: true, force: true });
      }
    } catch (error) {
      throw new Error(`Failed to remove at ${dirPath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  /**
   * Watches a directory for file system events and executes a callback with the event details.
   * @param dirPath - The path of the directory to watch.
   * @param event - The type of event to listen for (e.g., "add", "change", "unlink").
   * @param params - Optional callback function to execute with the file path and event type.
   */
  static watcher({
    dirPath,
    event,
    params
  }) {
    const fullPath = path.resolve(process.cwd(), dirPath);
    const watcher = import_chokidar.default.watch(fullPath, { persistent: true });
    watcher.on(event, async (filePath) => {
      if (params) {
        await params({
          filePath: path.resolve(process.cwd(), filePath),
          event
        });
      }
    });
    watcher.on("error", async (error) => {
      throw new Error(`Watcher error: ${error instanceof Error ? error.message : String(error)}`);
    });
  }
  /**
   * Checks if a file exists at the specified path.
   * @param filePath - The path to the file.
   * @returns A boolean indicating whether the file exists.
   * @throws An error if the existence check fails.
   */
  static existsFileSync(filePath) {
    try {
      return fs.existsSync(filePath);
    } catch (error) {
      throw new Error(`Failed to check existence of ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  /**
   * Asynchronously checks if a file exists at the specified path.
   * @param filePath - The path to the file.
   * @returns A promise that resolves to a boolean indicating whether the file exists.
   * @throws An error if the existence check fails.
   */
  static async existsFile(filePath) {
    try {
      return await fs.promises.access(filePath, fs.constants.F_OK).then(() => true).catch(() => false);
    } catch (error) {
      throw new Error(`Failed to check existence of ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  /**
   * Writes an object to a JSON file, appending it to an existing array if the file already exists.
   * @param filePath - The path to the JSON file.
   * @param data - The object to write to the file.
   * @throws An error if the file cannot be written or if the content is not an array.
   */
  static async writeJSONFile({ filePath, data }) {
    try {
      if (!_IOF.existsFileSync(path.dirname(filePath))) {
        _IOF.mkdir(path.dirname(filePath));
      }
      let arrayData = [];
      if (fs.existsSync(filePath)) {
        const jsonData = await fs.promises.readFile(filePath, "utf-8");
        arrayData = JSON.parse(jsonData);
        if (!Array.isArray(arrayData)) arrayData = [];
      }
      arrayData.push(data);
      const newJsonData = JSON.stringify(arrayData, null, 2);
      fs.writeFileSync(filePath, newJsonData);
    } catch (error) {
      throw new Error(`Failed to write JSON to ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  /**
   * Overwrites a JSON file with a new array of objects.
   * @param filePath - The path to the JSON file.
   * @param data - The array of objects to write to the file.
   * @throws An error if the file cannot be written or if the content is not an array.
   */
  static async writeJSONFileOverwrite({ filePath, data }) {
    try {
      if (!fs.existsSync(path.dirname(filePath))) {
        _IOF.mkdir(path.dirname(filePath));
      }
      const newJsonData = JSON.stringify(data, null, 2);
      await fs.promises.writeFile(filePath, newJsonData);
    } catch (error) {
      throw new Error(`Failed to overwrite JSON to ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  /**
   * Reads a JSON file and returns its content as an array.
   * @param filePath - The path to the JSON file.
   * @returns An array of objects parsed from the JSON file.
   * @throws An error if the file does not exist or if the content is not an array.
   */
  static async readJSONFile(filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      const jsonData = await fs.promises.readFile(filePath, "utf-8");
      const arr = JSON.parse(jsonData);
      if (!Array.isArray(arr)) {
        throw new Error(`File content is not an array: ${filePath}`);
      }
      return arr;
    } catch (error) {
      throw new Error(`Failed to read JSON from ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
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
   * Saves a file buffer to the specified file path on disk.
   *
   * Calculates the file's hash, size, and MIME type, creates the necessary directories,
   * and writes the file data to disk. Returns an object containing metadata about the saved file.
   *
   * @param data - An object implementing the FileInterface, containing the file data, filename, and target filepath.
   * @returns A promise that resolves to a FileStorageInterface object with file metadata, or null if saving fails.
   * @throws {Error} If the file cannot be saved to the specified location.
   */
  async saveBufferToFile(data) {
    const hash = _IOF.calculateHashByBuffer(Buffer.from(data.filedata));
    const size = _IOF.calculateSizeByBuffer(Buffer.from(data.filedata));
    const type = mimeType(data.filename);
    try {
      const fullPath = path.resolve(process.cwd(), data.filepath, data.filename);
      const dir = path.dirname(fullPath);
      _IOF.mkdir(dir);
      await fs.promises.writeFile(fullPath, data.filedata);
      return {
        filename: data.filename,
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
var import_google = require("@ai-sdk/google");

// src/core/tools.ts
var import_ai = require("ai");
var import_zod = require("zod");
var TaskHandler = {
  /**
   * Get the current date and time in real-time.
   * This tool does not require any parameters. It returns the current time in a standard format.
   */
  getCurrentTime: (0, import_ai.tool)({
    description: "Get the current date and time in real-time. This tool does not require any parameters. It returns the current time in a standard format. Use this tool when user ask you for current time or date or anything that related to time.",
    parameters: import_zod.z.object({}),
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
      const googleModel = (0, import_google.createGoogleGenerativeAI)({
        apiKey: this.apiKey,
        baseURL: this.aiAgentUrl
      });
      return googleModel(model, {
        useSearchGrounding: true
      });
    } else if (model?.startsWith("gpt-")) {
      const openAIModel2 = (0, import_openai.createOpenAI)({
        baseURL: this.aiAgentUrl,
        apiKey: this.apiKey,
        compatibility: "strict"
      });
      return openAIModel2(model);
    }
    const openAIModel = (0, import_openai.createOpenAI)({
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
      return await (0, import_ai2.generateText)({
        model: this.model,
        system: await this.systemPrompt(),
        tools: Object.keys(this.toolSet).length > 0 ? this.toolSet : void 0,
        maxSteps: Object.keys(this.toolSet).length > 0 ? Number.MAX_SAFE_INTEGER : void 0,
        prompt
        // toolChoice: Object.keys(this.toolSet).length > 0 ? "required" : "auto"
      });
    }
    return await (0, import_ai2.generateText)({
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
  async generateStream({ messages, prompt }) {
    if (prompt && typeof prompt !== "string") {
      throw new Error("Prompt must be a string.");
    }
    if (messages && !Array.isArray(messages)) {
      throw new Error("Messages must be an array of CoreMessage.");
    }
    if (prompt) {
      return (0, import_ai2.streamText)({
        model: this.model,
        system: await this.systemPrompt(),
        tools: Object.keys(this.toolSet).length > 0 ? this.toolSet : void 0,
        maxSteps: Object.keys(this.toolSet).length > 0 ? Number.MAX_SAFE_INTEGER : void 0,
        prompt
      });
    }
    return (0, import_ai2.streamText)({
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
        let messages2 = [];
        if (!media || media.inlineData === "") {
          messages2 = [
            ...session,
            {
              role: "user",
              content: prompt
            }
          ];
        } else {
          messages2 = [
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
          const textStream = await this.generateStream({ messages: messages2 });
          return { textStream: textStream.textStream, response: textStream.response };
        }
        const { text: text2, response: response2 } = await this.generateText({ messages: messages2 });
        return { text: text2, response: response2 };
      }
      let messages = [];
      if (media && media.inlineData !== "") {
        messages = [
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
      } else {
        messages = [
          {
            role: "user",
            content: [{
              type: "text",
              text: prompt
            }]
          }
        ];
      }
      if (this.streamMethod === "stream") {
        const textStream = await this.generateStream({ messages });
        return { textStream: textStream.textStream, response: textStream.response };
      }
      const { text, response } = await this.generateText({ messages });
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
var import_crypto = __toESM(require("crypto"));
function HashWithSHA256(data) {
  return import_crypto.default.createHash("sha256").update(data).digest("hex");
}
function GenerateUUID() {
  return (0, import_crypto.randomUUID)();
}
function GenerateRandomString(length) {
  return import_crypto.default.randomBytes(length).toString("hex").slice(0, length);
}

// src/utils/terminal.ts
var terminal_exports = {};
__export(terminal_exports, {
  ClearTerminal: () => ClearTerminal,
  CloseTerminal: () => CloseTerminal,
  Help: () => Help,
  ParseEnvKeys: () => ParseEnvKeys,
  Question: () => Question,
  Sleep: () => Sleep
});
var rl = __toESM(require("readline/promises"));
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
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
async function Sleep(duration) {
  return new Promise((resolve2) => setTimeout(resolve2, duration * 1e3));
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

// src/lib/session.ts
var AgentSession = class {
  platform;
  folderName = "sessions";
  sessionFilePrefix = "session-";
  userBase = null;
  userSessionFileName = null;
  sessionFileName = null;
  /**
   * Creates a new session with the specified configuration.
   * @param config - The configuration for the session, including the platform.
   */
  constructor(config) {
    this.platform = config.platform;
    this.folderName = config.folderName || this.folderName;
    this.initPlatform().catch((error) => {
      throw new Error(error);
    });
  }
  /**
   * Initializes the platform for the session.
   * This method can be overridden to implement platform-specific initialization logic.
   */
  async initPlatform() {
    try {
      const platform = this.platform;
      if (!platform) {
        throw new Error("Platform is required to initialize the session.");
      }
      if (!await IOF.existsFile(`./${this.folderName}/platform.json`)) {
        IOF.writeJSONFileOverwrite({
          filePath: `./${this.folderName}/platform.json`,
          data: [{ platform, createdAt: Time.getCurrentTime() }]
        });
      }
    } catch (error) {
      throw new Error(`Failed to initialize platform: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  /**
   * Starts a new session for the user.
   * If the session file does not exist, it creates a new one.
   * If it exists, it resumes the session from the file.
   * @param user - The user for whom the session is being started.
   * @param folderName - The name of the folder where session files are stored.
   * @returns An object containing the user and the session history.
   */
  async useJSONFileSession({
    user,
    sessionFileName
  }) {
    if (!user) {
      throw new Error("User is required to start a session.");
    }
    if (!sessionFileName) {
      sessionFileName = `${this.sessionFilePrefix}${user.username || user.email || user.phone || user.name}.json`;
    }
    this.sessionFileName = `${this.folderName}/${this.sessionFilePrefix}${sessionFileName}.json`;
    this.userBase = user;
    IOF.mkdir(`./${this.folderName}`);
    const session = await this.resumeJSONFileSession({ user, fileName: sessionFileName });
    if (session && session.session.length > 0) {
      return session;
    }
    return await this.createNewJSONFileSession({ user, fileName: sessionFileName });
  }
  /**
   * Saves the conversation history to a JSON file.
   * @param data - The conversation data to be saved.
   * @throws An error if the file cannot be written or if the content is not an array.
   */
  async saveHistory(data) {
    if (!this.userBase) {
      throw new Error("User must be set before saving history.");
    }
    const filePath = `./${this.folderName}/${this.sessionFilePrefix}${this.userBase?.username || this.userBase?.email || this.userBase?.phone || this.userBase?.name}.json`;
    await IOF.writeJSONFile({
      filePath: this.sessionFileName || filePath,
      data
    });
  }
  /**
   * Retrieves user data from a JSON file.
   * If the user exists, it returns the user data; otherwise, it returns null.
   * @param user - The user object containing the phone number to search for.
   * @returns The user data if found, or null if not found.
   */
  async getUserData(user) {
    const usersFilePath = this.userSessionFileName || `./${this.folderName}/users.json`;
    if (await IOF.existsFile(usersFilePath)) {
      const history = await IOF.readJSONFile(usersFilePath);
      const existingUser = history.find((u) => u.phone === user.phone);
      if (existingUser) {
        return existingUser;
      }
    }
    return null;
  }
  /**
  * Retrieves the conversation history from a JSON file.
  * The history is sorted by message timestamp and response timestamp.
  * @param filePath - The path to the JSON file containing the conversation history.
  * @returns An array of CoreMessage objects representing the conversation history.
  */
  async getHistory(filePath) {
    const history = await IOF.readJSONFile(filePath);
    if (!history || history.length === 0) {
      return [];
    }
    history?.sort((a, b) => {
      const messageTimestampComparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      if (messageTimestampComparison !== 0) {
        return messageTimestampComparison;
      }
      const responseTimestampComparison = new Date(a.timestamp || 0).getTime() - new Date(b.timestamp || 0).getTime();
      return responseTimestampComparison;
    });
    const message = [];
    history.forEach((item) => {
      if (item.role === "user" && item.text) {
        message.push({
          role: "user",
          content: [
            {
              type: "text",
              text: item.text
            }
          ]
        });
      }
      if (item.role === "assistant" && item.text) {
        message.push({
          role: "assistant",
          content: [
            {
              type: "text",
              text: item.text
            }
          ]
        });
      }
    });
    return message;
  }
  /**
   * Starts a new session for the user.
   * If the session file does not exist, it creates a new one.
   * If it exists, it resumes the session from the file.
   * @param user - The user for whom the session is being started.
   * @returns An object containing the user and the session history.
   */
  async createUserJSONFileSession(user) {
    if (!user) {
      throw new Error("User is required to create a session.");
    }
    const usersFilePath = `./${this.folderName}/users.json`;
    this.userSessionFileName = usersFilePath;
    IOF.mkdir(`./${this.folderName}`);
    let users = [];
    if (IOF.existsFileSync(usersFilePath)) {
      users = await IOF.readJSONFile(usersFilePath);
      const existingUser = users.find((u) => u.username === user.username || u.email === user.email || u.phone === user.phone || u.name === user.name);
      if (existingUser) {
        return existingUser;
      }
      users.push(user);
      await IOF.writeJSONFileOverwrite({
        filePath: usersFilePath,
        data: users
      });
      return user;
    } else {
      await IOF.writeJSONFileOverwrite({
        filePath: usersFilePath,
        data: [user]
      });
      return user;
    }
  }
  /**
   * Starts a new session for the user.
   * If the session file does not exist, it creates a new one.
   * If it exists, it resumes the session from the file.
   * @param user - The user for whom the session is being started.
   * @returns An object containing the user and the session history.
   */
  async createNewJSONFileSession({ user, fileName }) {
    try {
      if (!user) {
        throw new Error("User is required to create a session.");
      }
      const userSession = await this.createUserJSONFileSession(user);
      const filePath = `./${this.folderName}/${this.sessionFilePrefix}${fileName ? fileName : user.username || user.email || user.phone || user.name}.json`;
      await IOF.writeJSONFileOverwrite({ filePath: fileName || filePath, data: [] });
      return {
        user: userSession,
        session: []
      };
    } catch (error) {
      throw new Error(`Failed to create new session for user ${user.username || user.email || user.phone || user.name}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  /**
   * Resumes the session from a JSON file.
   * If the file does not exist or is empty, it returns an empty array.
   * @param user - The user for whom the session is being resumed.
   * @returns An array of CoreMessages from the JSON file.
   */
  async resumeJSONFileSession({ user, fileName }) {
    try {
      const history = await this.getHistory(`./${this.folderName}/${fileName ? fileName : this.sessionFilePrefix}${user.username || user.email || user.phone || user.name}.json`);
      return {
        user,
        session: history
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes("File not found")) {
        return {
          user,
          session: []
        };
      }
      throw new Error(`Failed to resume session for user ${user.username || user.email || user.phone || user.name}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
};

// index.ts
var import_ai3 = require("ai");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AgentSession,
  AiAgent,
  CoreMessage,
  GenerateRandomString,
  GenerateUUID,
  HashWithSHA256,
  IOF,
  Logger,
  TaskHandler,
  Terminal,
  Time,
  Tools,
  mimeType,
  terminalColors
});
//# sourceMappingURL=index.js.map