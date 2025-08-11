var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/utils/colors.ts
var TerminalColors = {
  /**
   * reset - Resets all styles and colors to default.
   * This code is used to reset the terminal text formatting to its default state.
   */
  _reset: "\x1B[0m",
  /**
   * bright - Makes the text bright.
   * This code is used to make the terminal text bright or bold.
   */
  _bright: "\x1B[1m",
  /**
   * dim - Makes the text dim.
   * This code is used to make the terminal text dim or less bright.
   */
  _dim: "\x1B[2m",
  /**
   * italic - Makes the text italic.
   * This code is used to make the terminal text italicized.
   */
  _italic: "\x1B[3m",
  /**
   * underline - Underlines the text.
   * This code is used to underline the terminal text.
   */
  _underline: "\x1B[4m",
  /**
   * blink - Makes the text blink.
   * This code is used to make the terminal text blink.
   */
  _blink: "\x1B[5m",
  /**
   * reverse - Reverses the foreground and background colors.
   * This code is used to swap the foreground and background colors of the terminal text.
   */
  _reverse: "\x1B[7m",
  /**
   * hidden - Hides the text.
   * This code is used to hide the terminal text, making it invisible.
   */
  _hidden: "\x1B[8m",
  /**
   * strikethrough - Strikes through the text.
   * This code is used to add a strikethrough effect to the terminal text.
   */
  _strikethrough: "\x1B[9m",
  // Foreground colors
  /**
   * BLACK - Sets the text color to black.
   * This code is used to change the terminal text color to black.
   */
  BLACK: "\x1B[30m",
  /**
   * RED - Sets the text color to red.
   * This code is used to change the terminal text color to red.
   */
  RED: "\x1B[31m",
  /**
   * GREEN - Sets the text color to green.
   * This code is used to change the terminal text color to green.
   */
  GREEN: "\x1B[32m",
  /**
   * YELLOW - Sets the text color to yellow.
   * This code is used to change the terminal text color to yellow.
   */
  YELLOW: "\x1B[33m",
  /**
   * BLUE - Sets the text color to blue.
   * This code is used to change the terminal text color to blue.
   */
  BLUE: "\x1B[34m",
  /**
   * MAGENTA - Sets the text color to magenta.
   * This code is used to change the terminal text color to magenta.
   */
  MAGENTA: "\x1B[35m",
  /**
   * CYAN - Sets the text color to cyan.
   * This code is used to change the terminal text color to cyan.
   */
  CYAN: "\x1B[36m",
  /**
   * WHITE - Sets the text color to white.
   * This code is used to change the terminal text color to white.
   */
  WHITE: "\x1B[37m",
  // Bright foreground colors
  /**
   * BBLACK - Sets the text color to bright black (gray).
   * This code is used to change the terminal text color to bright black.
   */
  BBLACK: "\x1B[40m",
  /**
   * BRED - Sets the background color to bright red.
   * This code is used to change the terminal background color to bright red.
   */
  BRED: "\x1B[41m",
  /**
   * BGREEN - Sets the background color to bright green.
   * This code is used to change the terminal background color to bright green.
   */
  BGREEN: "\x1B[42m",
  /**
   * BYELLOW - Sets the background color to bright yellow.
   * This code is used to change the terminal background color to bright yellow.
   */
  BYELLOW: "\x1B[43m",
  /**
   * BBLUE - Sets the background color to bright blue.
   * This code is used to change the terminal background color to bright blue.
   */
  BBLUE: "\x1B[44m",
  /**
   * BMAGENTA - Sets the background color to bright magenta.
   * This code is used to change the terminal background color to bright magenta.
   */
  BMAGENTA: "\x1B[45m",
  /**
   * BCYAN - Sets the background color to bright cyan.
   * This code is used to change the terminal background color to bright cyan.
   */
  BCYAN: "\x1B[46m",
  /**
   * BWHITE - Sets the background color to bright white.
   * This code is used to change the terminal background color to bright white.
   */
  BWHITE: "\x1B[47m"
};

// src/utils/time.ts
var Time = class _Time {
  static formatDateToParts(date, locale, timeZone) {
    const systemLocale = locale || _Time.getSystemLocale();
    const systemTimeZone = timeZone || _Time.getSystemTimezone();
    const formatter = new Intl.DateTimeFormat(systemLocale, {
      timeZone: systemTimeZone,
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
  /**
   * Gets the system's default timezone
   */
  static getSystemTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  /**
   * Gets the system's default locale
   */
  static getSystemLocale() {
    return Intl.DateTimeFormat().resolvedOptions().locale;
  }
  /**
   * Gets both system locale and timezone
   */
  static getSystemLocaleAndTimezone() {
    const resolved = Intl.DateTimeFormat().resolvedOptions();
    return {
      locale: resolved.locale,
      timeZone: resolved.timeZone
    };
  }
  /**
   * Formats a date to a human-readable string.
   * @param date The date to format.
   * @param timeZone The time zone to use for formatting.
   * @returns The formatted date string.
   */
  static formatDateToHumanReadable(data) {
    const { date, locale, timeZone } = data;
    const now = /* @__PURE__ */ new Date();
    const dateParts = _Time.formatDateToParts(date || now, locale, timeZone);
    return `${dateParts.day}/${dateParts.month}/${dateParts.year} ${dateParts.hour}:${dateParts.minute}:${dateParts.second}`;
  }
  /**
   * Returns the current time formatted as a string suitable for saving.
   * This format is `YYYY-MM-DDTHH-MM-SSZ`, which is useful for file naming or database storage.
   */
  static getCurrentTimeToSaveString(locale, timeZone) {
    const now = /* @__PURE__ */ new Date();
    const dateParts = _Time.formatDateToParts(now, locale, timeZone);
    return _Time.formateDateToSaveString(dateParts);
  }
  /**
   * Returns the current time as a Date object.
   * This method formats the current time to a string and then converts it back to a Date object.
   */
  static getCurrentTime(locale, timeZone) {
    const now = /* @__PURE__ */ new Date();
    const dateParts = _Time.formatDateToParts(now, locale, timeZone);
    const formattedDateString = _Time.formatDateString(dateParts);
    return new Date(formattedDateString);
  }
  /**
   * Returns the current time formatted as a string.
   * This format is `YYYY-MM-DDTHH:MM:SSZ`, which is useful for logging or displaying the current time.
   */
  static getCurrentTimeToString(locale, timeZone) {
    const now = /* @__PURE__ */ new Date();
    const dateParts = _Time.formatDateToParts(now, locale, timeZone);
    return _Time.formatDateString(dateParts);
  }
  /**
   * Returns the current time in a human-readable format.
   * This format is `DD/MM/YYYY HH:MM:SS`, which is suitable for display to users.
   */
  static getCurrentTimeToHumanReadable(locale, timeZone) {
    const now = /* @__PURE__ */ new Date();
    return _Time.formatDateToHumanReadable({ date: now, locale, timeZone });
  }
  /**
   * Returns the current time formatted for logging.
   * This format is `DD/MM/YYYY:HH:MM:SS`, which is useful for log entries.
   */
  static getTimeToLogFormat(locale, timeZone) {
    const now = /* @__PURE__ */ new Date();
    const dateParts = _Time.formatDateToParts(now, locale, timeZone);
    return _Time.logFormat(dateParts);
  }
};

// src/utils/logger.ts
var Logger = class {
  static log(type, message, funcName) {
    const colorMap = {
      DEBUG: TerminalColors.MAGENTA,
      WARN: TerminalColors.BYELLOW,
      ERROR: TerminalColors.RED,
      INFO: TerminalColors.BLUE,
      SUCCESS: TerminalColors.GREEN
    };
    const color = colorMap[type] || TerminalColors._reset;
    const currentTime = Time.getTimeToLogFormat();
    const functionName = funcName ? `funcName: ${funcName}` : "";
    const logMethod = type === "ERROR" || type === "WARN" ? console.log : type === "INFO" ? console.info : console.log;
    logMethod(`${TerminalColors._dim}[${currentTime}]${TerminalColors._reset} ${color}[${type}]${TerminalColors._reset} ${functionName}: ${message}`);
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
  /**
   * Custom logging function that allows specifying the type, message, color, and function name.
   * @param type The type of log (e.g., "DEBUG", "WARN", "ERROR", "INFO", "SUCCESS").
   * @param message The message to log.
   * @param color Optional color for the log.
   * @param funcName Optional function name for context.
   */
  static custom(type, message, color, funcName) {
    const logColor = color || "CYAN";
    const functionName = funcName ? `funcName: ${funcName}` : "";
    const currentTime = Time.getTimeToLogFormat();
    console.log(`${TerminalColors._dim}[${currentTime}]${TerminalColors._reset} ${TerminalColors[logColor]}[${type}]${TerminalColors._reset} ${functionName}: ${message}`);
  }
};

// src/core/agent.ts
import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {
  generateObject,
  generateText,
  streamText
} from "ai";

// src/lib/iof.ts
import * as crypto from "crypto";
import * as path from "path";
import * as fs from "fs";
import chokidar from "chokidar";

// src/utils/mimeType.ts
function mimeType(fileName) {
  const ext = fileName.split(".").pop();
  switch (ext) {
    // video
    case "mp4":
      return "video/mp4";
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
    case "m4a":
      return "audio/mp4";
    case "m4b":
    case "m4p":
    case "m4r":
      return "audio/mp4";
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
        fs.rmSync(dirPath, { recursive: true, force: true });
      }
    } catch (error) {
      throw new Error(`Failed to remove at ${dirPath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  /**
   * Watches a directory for file system events and executes a callback with the event details.
   * @param options - The options for the watcher.
   * @param options.dirPath - The path of the directory to watch.
   * @param options.event - The type of event to listen for (e.g., "add", "change", "unlink").
   * @param options.onEvent - Optional callback function to handle file system events.
   * 
   */
  static watcher(options) {
    const { dirPath, event, onEvent } = options;
    const fullPath = path.resolve(process.cwd(), dirPath);
    const watcher = chokidar.watch(fullPath, { persistent: true });
    watcher.on(event, async (filePath) => {
      if (onEvent) {
        await onEvent({
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
  static async writeJSONFile(params) {
    const { filePath, data } = params;
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
  static async writeJSONFileOverwrite(params) {
    const { filePath, data } = params;
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
        mimeType: type,
        inlineData: Buffer.from(data.filedata).toString("base64")
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
        mimeType: mimeType(fileName),
        inlineData: Buffer.from(buffer).toString("base64")
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

// src/core/tools.ts
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
  systemPromptText;
  streamMethod = "text";
  toolSet = {
    getCurrentTime: TaskHandler.getCurrentTime
  };
  systemPromptCache;
  /**
   * Loads the system prompt from a specified file.
   * If the file is not found or empty, it throws an error.
   */
  async systemPrompt() {
    if (this.systemPromptCache !== void 0) {
      return this.systemPromptCache;
    }
    if (this.systemPromptText) {
      this.systemPromptCache = this.systemPromptText;
      return this.systemPromptCache;
    }
    if (this.systemPromptFile) {
      try {
        const system = await IOF.readTextFile(this.systemPromptFile);
        if (!system) {
          throw new Error("System prompt file not found or empty.");
        }
        this.systemPromptCache = system;
        return this.systemPromptCache;
      } catch (error) {
        throw new Error(`Failed to load system prompt: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    this.systemPromptCache = "";
    return this.systemPromptCache;
  }
  constructor(config) {
    try {
      this.validateConfig(config);
      this.aiAgentUrl = config.agentUrl;
      this.apiKey = config.apiKey;
      this.initializeProperties(config);
      this.setupTools(config.tools);
      this.model = this.initModel({
        model: config.model
      });
      this.fallbackModel = config.fallbackModel;
    } catch (error) {
      throw new Error(`Invalid configuration: ${error}`);
    }
  }
  /**
   * Validates the configuration for the AI agent.
   * @param config - The configuration to validate.
   * @throws Will throw an error if the configuration is invalid.
   */
  validateConfig(config) {
    const errors = [];
    if (!config.agentUrl) errors.push("Agent URL is required");
    if (!config.apiKey) errors.push("API key is required");
    if (!config.model) errors.push("Model is required");
    if (config.systemPrompt?.text && config.systemPrompt?.file) {
      errors.push("Cannot use both systemPrompt.text and systemPrompt.file");
    }
    if (errors.length > 0) {
      throw new Error(`Configuration errors: ${errors.join(", ")}`);
    }
  }
  /**
   * Validates the query parameters for the AI agent.
   * @param session - Optional array of previous messages in the chat session.
   * @param prompt - The user's message to start the chat.
   * @throws Will throw an error if the prompt is not a string or if the session is not an array of CoreMessage.
   */
  validateQueryParams({ session, prompt }) {
    if (prompt && typeof prompt !== "string") {
      throw new Error("Prompt must be a non-empty string.");
    }
    if (session && !Array.isArray(session)) {
      throw new Error("Session must be an array of CoreMessage.");
    }
  }
  /**
   * Initializes the AI agent with the provided configuration.
   * It sets up the agent URL, API key, model, and system prompt.
   * @param config - The configuration for the AI agent.
   */
  initializeProperties(config) {
    this.systemPromptFile = config.systemPrompt?.file;
    this.systemPromptText = config.systemPrompt?.text;
  }
  /**
   * Sets up the tools for the AI agent.
   * If tools are provided, they are merged with the default tool set.
   * @param tools - Optional set of tools to be used by the AI agent.
   */
  setupTools(tools) {
    if (tools) {
      this.toolSet = {
        getCurrentTime: TaskHandler.getCurrentTime,
        ...tools
      };
    }
  }
  initModel({
    model
  }) {
    if (model?.startsWith("gemini-")) {
      const googleModel = createGoogleGenerativeAI({
        apiKey: this.apiKey,
        baseURL: this.aiAgentUrl
      });
      return googleModel(model, {
        useSearchGrounding: true
      });
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
   * Generates an object based on either a prompt string or an array of messages, validated against a provided schema.
   *
   * @param messages - Optional array of `CoreMessage` objects to use as context for generation.
   * @param prompt - Optional prompt string to use for generation. Must be a string if provided.
   * @param schema - The schema (Zod or custom Schema) to validate the generated object against.
   * @returns A promise that resolves to the generated object, validated by the provided schema.
   * @throws Will throw an error if `prompt` is not a string or if `messages` is not an array of `CoreMessage`.
   */
  async generateObject({
    messages,
    schema
  }) {
    return await generateObject({
      model: this.model,
      system: await this.systemPrompt(),
      schema,
      messages
    });
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
  async generateText({
    messages
  }) {
    return await generateText({
      model: this.model,
      system: await this.systemPrompt(),
      tools: Object.keys(this.toolSet).length > 0 ? this.toolSet : void 0,
      maxSteps: Object.keys(this.toolSet).length > 0 ? Number.MAX_SAFE_INTEGER : void 0,
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
  async generateStream({
    messages
  }) {
    return streamText({
      model: this.model,
      system: await this.systemPrompt(),
      tools: Object.keys(this.toolSet).length > 0 ? this.toolSet : void 0,
      maxSteps: Object.keys(this.toolSet).length > 0 ? Number.MAX_SAFE_INTEGER : void 0,
      messages
    });
  }
  /**
   * Queries the AI agent with a prompt and optional session messages.
   * It returns a ChatBuilder object that can be used to generate text or stream responses.
   *
   * @param session - An optional array of previous messages in the chat session.
   * @param prompt - The user's message to start the chat.
   * @param media - Optional media data to include in the chat.
   * @example
   * const { user, session, saveHistory } = await chatSession.useJSONFileSession({
   *   folderName: "sessions",
   *   sessionFileNameSuffix: username,
   *   user: {
   *     username: username,
   *     phone: phone,
   *   },
   * })
   * const chatBuilder = await agent.query({
   *   session: session,
   *   prompt: "Hi there!",
   *   media: null
   * });
   * const textResponse = await chatBuilder.generateText();
   * const streamResponse = await chatBuilder.generateStream();
   * const objectResponse = await chatBuilder.generateObject(
   *   z.object({
   *     answer: z.string()
   *   })
   * );
   * console.log(textResponse.text);
   * console.log(streamResponse.textStream);
   * console.log(objectResponse.object);
   * @returns A ChatBuilder object with methods to generate text or stream responses.
   * @throws Will throw an error if the prompt is not a string or if the session is not an array of CoreMessage.
   */
  async query(params) {
    const { session, prompt, media } = params;
    try {
      if (!prompt || typeof prompt !== "string") {
        throw new Error("Prompt must be a non-empty string.");
      }
      if (session && !Array.isArray(session)) {
        throw new Error("Session must be an array of CoreMessage.");
      }
      const messages = this.createMessages({ session, prompt, media });
      return {
        generateText: async () => {
          return await this.generateText({ messages });
        },
        generateStream: async () => {
          return await this.generateStream({ messages });
        },
        generateObject: async (schema) => {
          return await this.generateObject({ messages, schema });
        }
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes("Rate limit")) {
        Logger.warn("Rate limit exceeded, switching model...");
        this.model = this.initModel({
          model: this.fallbackModel
        });
        return await this.query({ session, prompt });
      }
      throw new Error(`AI Agent error: ${error}`);
    }
  }
  /**
   * Starts a chat session with the AI agent.
   * It initializes the conversation and returns the AI's response.
   *
   * @param streamMethod - The method to use for streaming responses.
   * Can be "stream" for streaming responses or "text" for text responses.
   * Default is "text".
   * @param session - An optional array of previous messages in the chat session.
   * This allows the AI agent to continue the conversation with the existing context.
   * @param prompt - The user's message to start the chat.
   * This should be a non-empty string representing the user's input.
   * If the prompt is invalid or empty, an error will be thrown.
   * @param media - Optional media data to include in the chat.
   * This can be an inline data object containing file data and mime type.
   * If not provided, the chat will not include any media.
   * @returns A promise that resolves to the AI's response, which can be either a text response or a stream of text responses.
   * @throws Will throw an error if the prompt is not a string or if the session is invalid.
   */
  async startChat(params) {
    const { streamMethod = "text", session, prompt, media } = params;
    try {
      if (!prompt || typeof prompt !== "string") {
        throw new Error("Prompt must be a non-empty string.");
      }
      if (session && !Array.isArray(session)) {
        throw new Error("Session must be an array of CoreMessage.");
      }
      this.streamMethod = streamMethod;
      const messages = this.createMessages({ session, prompt, media });
      return await this.getResponse(messages);
    } catch (error) {
      if (error instanceof Error && error.message.includes("Rate limit")) {
        Logger.warn("Rate limit exceeded, switching model...");
        this.model = this.initModel({
          model: this.fallbackModel
        });
        return await this.startChat({ session, prompt });
      }
      throw new Error(`AI Agent error: ${error}`);
    }
  }
  /**
   * Creates an array of messages for the chat session.
   * It includes the previous session messages and the user's prompt.
   * If media is provided, it will be included in the user's message.
   *
   * @param session - An optional array of previous messages in the chat session.
   * @param prompt - The user's message to start the chat.
   * @param media - Optional media data to include in the chat.
   * @returns An array of CoreMessage objects representing the chat session.
   */
  createMessages({
    session,
    prompt,
    media
  }) {
    this.validateQueryParams({ session, prompt });
    const baseMessages = session && session.length > 0 ? [...session] : [];
    const userMessage = !media || media.inlineData === "" ? {
      role: "user",
      content: prompt
    } : {
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
    };
    return [...baseMessages, userMessage];
  }
  /**
   * Gets the AI's response based on the provided messages.
   * It either generates a text response or a stream of text responses.
   *
   * @param messages - An array of CoreMessage objects representing the conversation history.
   * @returns A promise that resolves to the AI's response, which can be either a text response or a stream of text responses.
   */
  async getResponse(messages) {
    if (this.streamMethod === "stream") {
      const textStream = await this.generateStream({ messages });
      return { textStream: textStream.textStream, response: textStream.response };
    }
    const { text, response } = await this.generateText({ messages });
    return { text, response };
  }
  /**
   * Generates text with a retry mechanism using a fallback model if the primary model fails.
   * This method will attempt to generate text and, if it encounters an error related to rate limits or quota,
   * it will switch to the fallback model and retry the generation.
   *
   * @param messages - An array of CoreMessage objects representing the conversation history.
   * @param retryCount - The current retry count, defaults to 0.
   * @returns A promise that resolves to the generated text or throws an error if all retries fail.
   */
  async generateTextWithRetry({ messages }, retryCount = 0) {
    try {
      return await this.generateText({ messages });
    } catch (error) {
      if (this.shouldRetryWithFallback(error, retryCount)) {
        Logger.warn("Switching to fallback model...");
        this.model = this.initModel({ model: this.fallbackModel });
        return await this.generateTextWithRetry({ messages }, retryCount + 1);
      }
      throw error;
    }
  }
  /**
   * Determines whether to retry with a fallback model based on the error and retry count.
   * If the error is related to rate limits or quota issues, it will retry with the fallback model.
   *
   * @param error - The error encountered during the request.
   * @param retryCount - The current retry count.
   * @returns A boolean indicating whether to retry with the fallback model.
   */
  shouldRetryWithFallback(error, retryCount) {
    const MAX_RETRY = 1;
    return retryCount < MAX_RETRY && !!this.fallbackModel && error instanceof Error && (error.message.includes("Rate limit") || error.message.includes("quota"));
  }
};

// src/utils/hash.ts
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
  ParseEnvKeys: () => ParseEnvKeys,
  Question: () => Question,
  Sleep: () => Sleep
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
async function Sleep(duration) {
  return new Promise((resolve2) => setTimeout(resolve2, duration * 1e3));
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
  memorySession = {};
  /**
   * Creates a new session with the specified configuration.
   * @param config - The configuration for the session, including the platform.
   */
  constructor(config) {
    this.platform = config.platform;
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
   * Starts a new session for the user using in-memory storage.
   * This method is useful for quick sessions that do not require persistent storage.
   * @param user - The user for whom the session is being started.
   * @example
   * const agentSession = new AgentSession({
   *   platform: "test",
   * });
   * const { user, session, saveHistory } = await agentSession.useMemorySession({
   *   user: {
   *     username: "testuser",
   *     email: "testuser@example.com"
   *   }
   * });
   * const userMessage = await Question("[You]");
   * await saveHistory<string>({
   *   role: "user",
   *   text: userMessage,
   *   timestamp: Time.getCurrentTime(),
   * });
   * @returns An object containing the user and the session history.
   */
  async useMemorySession({
    user
  }) {
    const sessionKey = user.phone || user.email || user.username || user.name || "unknown";
    this.userBase = user;
    if (!this.memorySession[sessionKey]) {
      this.memorySession[sessionKey] = [];
    }
    return {
      user: this.userBase,
      session: this.memorySession[sessionKey],
      saveHistory: async (data) => {
        let coreMsg;
        if ("text" in data && typeof data.text === "string") {
          coreMsg = {
            role: data.role,
            content: [
              {
                type: "text",
                text: data.text
              }
            ]
          };
        } else if ("content" in data) {
          coreMsg = {
            role: data.role,
            content: [
              {
                type: "text",
                text: typeof data.content === "string" ? data.content : JSON.stringify(data.content, null, 2)
              }
            ]
          };
        } else {
          throw new Error("Invalid data format for saveHistory.");
        }
        this.memorySession[sessionKey].push(coreMsg);
        return this.memorySession[sessionKey];
      }
    };
  }
  /**
   * Starts a new session for the user.
   * If the session file does not exist, it creates a new one.
   * If it exists, it resumes the session from the file.
   * @param user - The user for whom the session is being started.
   * @param folderName - The name of the folder where session files are stored.
   * @param sessionFileNameSuffix - The name of the session file. If not provided, it defaults to a combination of the sessionFilePrefix and the user's username, email, phone, or name.
   * @returns An object containing the user and the session history.
   * @throws An error if the user is not provided or if the session file cannot be created or resumed.
   * @example
   * const agentSession = new AgentSession({
   *   platform: "test",
   * });
   * const { user, session, saveHistory } = await agentSession.useJSONFileSession({
   *   folderName: "sessions",
   *   sessionFileNameSuffix: "testuser",
   *   user: {
   *     username: "testuser",
   *     email: "testuser@example.com"
   *   }
   * });
   *
   * const userMessage = await Question("[You]");
   * await saveHistory<string>({
   *   role: "user",
   *   text: userMessage,
   *   timestamp: Time.getCurrentTime(),
   * });
   */
  async useJSONFileSession(params) {
    const { folderName, user, sessionFileNameSuffix } = params;
    if (!user) {
      throw new Error("User is required to start a session.");
    }
    if (!sessionFileNameSuffix) {
      this.sessionFileName = `./${this.folderName}/${this.sessionFilePrefix}${user.username || user.email || user.phone || user.name}.json`;
    } else if (sessionFileNameSuffix.includes("/")) {
      this.sessionFileName = sessionFileNameSuffix;
    } else {
      this.sessionFileName = `./${this.folderName}/${this.sessionFilePrefix}${sessionFileNameSuffix}.json`;
    }
    this.folderName = folderName || this.folderName;
    this.userBase = user;
    IOF.mkdir(`./${this.folderName}`);
    const session = await this.resumeJSONFileSession({
      user,
      fileName: this.sessionFileName
    });
    if (session && session.session.length > 0) {
      return {
        user: session.user,
        session: session.session,
        saveHistory: async (data) => {
          return this.saveHistory(data);
        }
      };
    }
    const createdNewSession = await this.createNewJSONFileSession({ user, fileName: this.sessionFileName });
    return {
      user: createdNewSession.user,
      session: createdNewSession.session,
      saveHistory: async (data) => {
        return this.saveHistory(data);
      }
    };
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
    const filePath = this.sessionFileName || `./${this.folderName}/${this.sessionFilePrefix}${this.userBase?.username || this.userBase?.email || this.userBase?.phone || this.userBase?.name}.json`;
    await IOF.writeJSONFile({
      filePath,
      data
    });
    return await this.getHistory(filePath);
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
      if ("text" in item && item.role === "user" && typeof item.text === "string") {
        message.push({
          role: item.role,
          content: [
            {
              type: "text",
              text: item.text
            }
          ]
        });
      } else if ("text" in item && item.role === "assistant" && typeof item.text === "string") {
        message.push({
          role: item.role,
          content: [
            {
              type: "text",
              text: item.text
            }
          ]
        });
      } else if ("content" in item && item.role === "assistant") {
        let processedContent;
        if (Array.isArray(item.content)) {
          processedContent = item.content.map((contentItem) => {
            if (typeof contentItem === "string") {
              return {
                type: "text",
                text: contentItem
              };
            }
            return contentItem;
          });
        } else if (typeof item.content === "object" && item.content !== null) {
          processedContent = [{
            type: "text",
            text: JSON.stringify(item.content, null, 2)
          }];
        } else {
          processedContent = [{
            type: "text",
            text: String(item.content)
          }];
        }
        message.push({
          role: item.role,
          content: processedContent
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
      const targetFilePath = this.sessionFileName || `./${this.folderName}/${this.sessionFilePrefix}${user.username || user.email || user.phone || user.name}.json`;
      await IOF.writeJSONFileOverwrite({ filePath: targetFilePath, data: [] });
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
      const history = await this.getHistory(fileName || `./${this.folderName}/${this.sessionFilePrefix}${user.username || user.email || user.phone || user.name}.json`);
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
import { tool as tool2 } from "ai";
export {
  AgentSession,
  AiAgent,
  GenerateRandomString,
  GenerateUUID,
  HashWithSHA256,
  IOF,
  Logger,
  TaskHandler,
  terminal_exports as Terminal,
  TerminalColors,
  Time,
  Tools,
  mimeType,
  tool2 as tool
};
//# sourceMappingURL=index.mjs.map