import { openai } from '@ai-sdk/openai';
import * as ai from 'ai';
import { ToolSet, CoreMessage } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

declare namespace UserTypes {
    /**
     * Represents a user in the system.
     *   @property name - The name of the user.
     *   @property username - The username of the user.
     *   @property email - The email address of the user.
     *   @property phone - The phone number of the user.
     */
    interface userBase {
        name?: string;
        username?: string;
        email?: string;
        phone?: string;
    }
}
declare namespace AgentTypes {
    /**
     * LooseToStrict is a utility type that converts a type T to a stricter version.
     * It ensures that if T is a string, it will not be converted to never.
     */
    export type LooseToStrict<T> = T extends any ? string extends T ? never : T : never;
    /**
     * Represents the result of initiating a chat with a text input.
     *
     * @property text - The input text used to start the chat.
     * @property response - The response received after starting the chat. The type is generic and can vary.
     */
    type StartChatTextResult = {
        text: string;
        response: any;
    };
    /**
     * Represents the result of starting a chat with text response.
     *   @property textStream - The generated text response as a stream.
     *   @property response - Additional response data.
     */
    type StartChatStreamResult = {
        textStream: AsyncIterable<string>;
        response: any;
    };
    /**
     * Represents the result of starting a chat, which can be either a text result or a stream result.
     *
     * @see StartChatTextResult
     * @see StartChatStreamResult
     */
    export type StartChatResult = StartChatTextResult | StartChatStreamResult;
    export {  };
}
declare namespace FileTypes {
    /**
     * Represents a file with its buffer, name, and path.
     *  @property file - The file's content as a Buffer.
     *  @property name - The name of the file.
     *  @property path - The path where the file is stored.
     */
    interface fileInterface {
        file: Buffer;
        name: string;
        path: string;
    }
    /**
     * Represents the metadata of a file stored in the system.
     *  @property filename - The name of the file.
     *  @property fileuri - The URI where the file is stored.
     *  @property filehash - The SHA-256 hash of the file.
     *  @property filesize - The size of the file in bytes.
     *  @property filetype - The MIME type of the file.
     */
    interface fileStorageInterface {
        filename: string;
        fileuri: string;
        filehash: string;
        filesize: number;
        filetype: string;
    }
    /**
     * Represents the data required to download a file from a URL.
     *   @property fileuri - The URL of the file to download.
     *   @property saveTo - The local path where the file should be saved.
     */
    interface fileDownloadInterface {
        fileuri: string;
        saveTo: string;
    }
    /**
     * Represents the data required to upload a file inline.
     *   @property inlineData - The base64 encoded string of the file content.
     *   @property mimeType - The MIME type of the file.
     */
    interface InlineData {
        inlineData: string;
        mimeType: string;
    }
}

type ModelID = Parameters<typeof google | typeof openai>[0];
interface AiAgentConfig {
    /**
     * The URL of the AI agent service.
     * This is required to connect to the AI service.
     */
    agentUrl: string;
    /**
     * The API key for the AI agent.
     * This is required to authenticate requests to the AI service.
     */
    apiKey: string;
    /**
     * The file path to the system prompt.
     * If not provided, the system prompt will be empty.
     */
    systemPromptFile?: string;
    /**
     * The method to use for streaming responses.
     * Can be "stream" for streaming responses or "text" for text responses.
     * Default is "text".
     */
    streamMethod?: "text" | "stream";
    /**
     * The model ID to use for the AI agent.
     * It can be a Google Gemini model (e.g., "gemini-1.5-flash") or an OpenAI model (e.g., "gpt-4o").
     * If not provided, defaults to "gpt-4o".
     */
    model?: AgentTypes.LooseToStrict<ModelID>;
    /**
     * A set of tools that the AI agent can use to perform specific tasks.
     * These tools can be used to interact with external services or perform actions.
     * The tools are defined using the `tool` function from the `ai` library.
     */
    tools?: ToolSet;
}
/**
 * AiAgent class for interacting with an AI agent via OpenAI API.
 * It initializes the agent with a URL and API key, and allows starting a chat session.
 * The system prompt can be loaded from a specified file.
 */
declare class AiAgent {
    /**
     * The schema for validating the AI agent configuration.
     * It ensures that the required fields are present and correctly formatted.
     */
    private aiAgentSchema;
    private aiAgentUrl;
    private apiKey;
    private systemPromptFile?;
    private streamMethod;
    private model;
    private toolSet;
    constructor(config: AiAgentConfig);
    private init;
    /**
     * Loads the system prompt from a specified file.
     * If the file is not found or empty, it throws an error.
     */
    private systemPrompt;
    /**
     * Retrieves user information based on the provided user base.
     * This method can be extended to fetch user details from a database or an API.
     */
    private getUserInfo;
    /**
     * Generates a stream of text responses based on the provided messages.
     * It uses the AI agent's model and system prompt to generate the responses.
     * If tools are defined, it will use them in the generation process.
     *
     * @param messages - An optional array of CoreMessage objects representing the conversation history.
     * @param prompt - An optional prompt string to start the conversation.
     * @returns A stream of text responses generated by the AI agent.
     */
    private generateText;
    /**
     * Generates a text stream based on the provided messages.
     * This method is used for streaming responses from the AI agent.
     * It uses the `streamText` function from the `ai` library.
     *
     * @param messages - An array of CoreMessage objects representing the conversation history.
     * @returns A stream of text responses from the AI agent.
     */
    private generateStream;
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
    startChat({ user, session, prompt, media, }: {
        /**
         * The user initiating the chat session.
         * This can be a user base object containing user details like name and phone number.
         * If not provided, the chat will not include user-specific information.
         */
        user?: UserTypes.userBase | null;
        /**
         * An optional array of previous messages in the chat session.
         * This allows the AI agent to continue the conversation with the existing context.
         * If not provided, a new chat session will be started.
         */
        session?: CoreMessage[] | null;
        /**
         * The user's message to start the chat.
         * This should be a non-empty string representing the user's input.
         * If the prompt is invalid or empty, an error will be thrown.
         */
        prompt: string;
        /**
         * Optional media data to include in the chat.
         * This can be an inline data object containing file data and mime type.
         * If not provided, the chat will not include any media.
         */
        media?: FileTypes.InlineData | null;
    }): Promise<AgentTypes.StartChatResult>;
}

type agent_AiAgent = AiAgent;
declare const agent_AiAgent: typeof AiAgent;
declare namespace agent {
  export { agent_AiAgent as AiAgent };
}

declare const TaskHandler: {
    /**
     * Get weather information for a specified city.
     * This tool requires the city name to be provided.
     */
    getWeather: ai.Tool<z.ZodObject<{
        city: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        city: string;
    }, {
        city: string;
    }>, {
        city: string;
        temperature: string;
        condition: string;
    }> & {
        execute: (args: {
            city: string;
        }, options: ai.ToolExecutionOptions) => PromiseLike<{
            city: string;
            temperature: string;
            condition: string;
        }>;
    };
    /**
     * Get the current date and time in real-time.
     * This tool does not require any parameters. It returns the current time in a standard format.
     */
    getCurrentTime: ai.Tool<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>, string> & {
        execute: (args: {}, options: ai.ToolExecutionOptions) => PromiseLike<string>;
    };
};
declare class Tools {
    /**
     * Retrieves the current time in a human-readable format.
     * This tool does not require any parameters.
     */
    static getCurrentTime(): Promise<string>;
    /**
     * Retrieves weather information for a specified city.
     * This tool requires the city name to be provided.
     */
    static getWeather({ city }: {
        city: string;
    }): Promise<{
        city: string;
        temperature: string;
        condition: string;
    }>;
}

declare const tools_TaskHandler: typeof TaskHandler;
type tools_Tools = Tools;
declare const tools_Tools: typeof Tools;
declare namespace tools {
  export { tools_TaskHandler as TaskHandler, tools_Tools as Tools };
}

/** IOF (Input/Output File) class for handling file operations
 * - Calculates a SHA-256 hash of a given buffer.
 * - Provides a method to get the file path based on the hash.
 * - Allows setting a file location by saving the file and storing its metadata.
 * - Downloads a file from a URL and saves it to a specified path.
 * - Calculates the size of a file based on its buffer.
 * - Retrieves file paths based on hashes or buffers.
 * - Handles file storage operations using a repository pattern.
 * - Uses the FileStorageRepo for database interactions related to file storage.
 * - Uses the UserRepo for user-related database interactions.
 **/
declare class IOF {
    /**
     * Creates a directory if it does not exist.
     * @param dirPath - The path of the directory to create.
     */
    static mkdir(dirPath: string): void;
    /**
     * Calculates the SHA-256 hash of a given buffer.
     * @param buffer - The buffer to hash.
     * @returns The SHA-256 hash as a hexadecimal string.
     */
    static calculateHashByBuffer(buffer: Buffer): string;
    /**
     * Calculates the size of a file based on its buffer.
     * @param buffer - The buffer representing the file.
     * @returns The size of the file in bytes.
     */
    static calculateSizeByBuffer(buffer: Buffer): number;
    /**
     * Sets the file location by saving the file to the specified path and storing its metadata.
     * @param data - The file data including the file buffer, name, and path.
     * @returns The full path of the saved file or null if an error occurs.
     */
    setFileLocation(data: FileTypes.fileInterface): Promise<FileTypes.fileStorageInterface | null>;
    /**
     * Downloads a file from a given URL and saves it to the specified download path.
     * @param data - The file download data including the file URL and save path.
     * @returns The metadata of the downloaded file.
     */
    static downloadFile(data: FileTypes.fileDownloadInterface): Promise<FileTypes.fileStorageInterface>;
    /**
     * Retrieves the string content of a text file.
     * @param filePath - The path to the text file.
     * @returns A promise that resolves to the content of the file as a string.
     * @throws An error if the file cannot be read.
     */
    static readTextFile(filePath: string): Promise<string>;
    /**
     * Converts a file to a generative path format.
     * @param fileName - The name of the file to convert.
     * @returns An object containing the inline data with base64 encoded content and MIME type.
     * @throws An error if the file cannot be read or converted.
     */
    fileToGenerativePath(fileName: string): Promise<{
        inlineData: {
            data: string;
            mimeType: string;
        };
    }>;
}

type iof_IOF = IOF;
declare const iof_IOF: typeof IOF;
declare namespace iof {
  export { iof_IOF as IOF };
}

declare const terminalColors: {
    reset: string;
    bright: string;
    dim: string;
    underscore: string;
    blink: string;
    reverse: string;
    hidden: string;
    BLK: string;
    R: string;
    G: string;
    Y: string;
    B: string;
    M: string;
    C: string;
    W: string;
    BBLK: string;
    BR: string;
    BG: string;
    BY: string;
    BB: string;
    BM: string;
    BC: string;
    BW: string;
};

declare const colors_terminalColors: typeof terminalColors;
declare namespace colors {
  export { colors_terminalColors as terminalColors };
}

declare function HashWithSHA256(data: string): string;
declare function GenerateUUID(): string;
declare function GenerateRandomString(length: number): string;

declare const hash_GenerateRandomString: typeof GenerateRandomString;
declare const hash_GenerateUUID: typeof GenerateUUID;
declare const hash_HashWithSHA256: typeof HashWithSHA256;
declare namespace hash {
  export { hash_GenerateRandomString as GenerateRandomString, hash_GenerateUUID as GenerateUUID, hash_HashWithSHA256 as HashWithSHA256 };
}

declare class Logger {
    private static log;
    static success(message: string, funcName?: string): void;
    static error(message: string, funcName?: string): void;
    static warn(message: string, funcName?: string): void;
    static info(message: string, funcName?: string): void;
    static debug(message: string, funcName?: string): void;
    static custom(type: string, message: string, funcName?: string): void;
}

type logger_Logger = Logger;
declare const logger_Logger: typeof Logger;
declare namespace logger {
  export { logger_Logger as Logger };
}

declare function mimeType(fileName: string): "video/mpeg" | "video/webm" | "video/3gpp" | "video/x-matroska" | "video/x-msvideo" | "video/quicktime" | "video/x-ms-wmv" | "video/x-flv" | "video/x-m4v" | "audio/mpeg" | "audio/wav" | "audio/ogg" | "audio/aac" | "audio/flac" | "audio/alac" | "image/jpeg" | "image/png" | "image/gif" | "image/bmp" | "image/webp" | "image/svg+xml" | "image/x-icon" | "image/tiff" | "image/vnd.adobe.photoshop" | "application/postscript" | "application/x-indesign" | "image/x-raw" | "image/x-canon-cr2" | "image/x-nikon-nef" | "image/x-olympus-orf" | "image/x-panasonic-rw2" | "image/x-pentax-pef" | "image/x-sony-arw" | "image/x-adobe-dng" | "image/x-sigma-x3f" | "image/x-canon-cr3" | "image/heic" | "image/heif" | "image/avif" | "application/pdf" | "text/plain" | "text/html" | "text/css" | "application/javascript" | "application/json" | "application/xml" | "application/zip" | "application/x-rar-compressed" | "application/x-7z-compressed" | "application/octet-stream";

declare const mimeType$1_mimeType: typeof mimeType;
declare namespace mimeType$1 {
  export { mimeType$1_mimeType as mimeType };
}

declare function Question(question?: string): Promise<string>;
declare function CloseTerminal(): Promise<void>;
declare function ClearTerminal(): Promise<void>;
declare function Help(): Promise<void>;
/**
 * Parses environment variables that start with a given prefix.
 * @param prefix The prefix to filter environment variables.
 * @returns An object containing arrays of keys and values.
 */
declare function ParseEnvKeys(prefix: string): {
    keys: string[];
    values: string[];
};

declare const terminal_ClearTerminal: typeof ClearTerminal;
declare const terminal_CloseTerminal: typeof CloseTerminal;
declare const terminal_Help: typeof Help;
declare const terminal_ParseEnvKeys: typeof ParseEnvKeys;
declare const terminal_Question: typeof Question;
declare namespace terminal {
  export { terminal_ClearTerminal as ClearTerminal, terminal_CloseTerminal as CloseTerminal, terminal_Help as Help, terminal_ParseEnvKeys as ParseEnvKeys, terminal_Question as Question };
}

declare class Time {
    private static formatDateToParts;
    private static formatDateString;
    private static logFormat;
    static formatDateToHumanReadable(date: Date, timeZone: string): string;
    static getCurrentTime(): Date;
    static getCurrentTimeToString(): string;
    static getCurrentTimeToHumanReadable(): string;
    static getTimeToLogFormat(): string;
}

type time_Time = Time;
declare const time_Time: typeof Time;
declare namespace time {
  export { time_Time as Time };
}

export { agent as Agent, AgentTypes, colors as Colors, FileTypes, hash as Hash, iof as IOF, logger as Logger, mimeType$1 as MimeType, terminal as Terminal, time as Time, tools as Tools, UserTypes };
