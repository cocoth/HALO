import { openai } from '@ai-sdk/openai';
import * as ai from 'ai';
import { ToolSet, CoreMessage } from 'ai';
export { CoreMessage } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

/**
 * Represents a user in the system.
 *   @property name - The name of the user.
 *   @property username - The username of the user.
 *   @property email - The email address of the user.
 *   @property phone - The phone number of the user.
 */
interface UserBase {
    name?: string;
    username?: string;
    email?: string;
    phone?: string;
}
/**
 * AtLeastOne is a utility type that ensures at least one of the specified keys in T is required.
 * It allows for flexibility in defining types where at least one property must be present.
 *
 * @template T - The type to apply the AtLeastOne constraint to.
 * @template Keys - The keys of T that are required at least once.
 */
type AtLeastOne<T, Keys extends keyof T = keyof T> = Keys extends keyof T ? Required<Pick<T, Keys>> & Partial<Omit<T, Keys>> : never;
/** * Represents a message to be saved in the database.
 *   @property role - The role of the message sender (e.g., "user", "assistant").
 *   @property text - The content of the message.
 *   @property timestamp - The timestamp of when the message was sent.
 */
interface ConversationDB {
    role: "user" | "assistant";
    text: string;
    timestamp: Date;
}
/**
 * LooseToStrict is a utility type that converts a type T to a stricter version.
 * It ensures that if T is a string, it will not be converted to never.
 */
type LooseToStrict<T> = T extends any ? string extends T ? never : T : never;
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
 * Represents the result of starting a chat, which can be either a text result or a textStream result.
 * This type is a union of StartChatTextResult and StartChatStreamResult.
 * It allows for flexibility in handling different types of chat responses.
 * if you use `streamMethod` as "text", it will return `StartChatTextResult`.
 * If you use `streamMethod` as "stream", it will return `StartChatStreamResult`.
 * @see StartChatTextResult
 * @see StartChatStreamResult
 */
type StartChatResult = StartChatTextResult | StartChatStreamResult;
/**
 * Represents a file with its data, name, and path.
 *   @property filedata - The binary data of the file.
 *   @property filename - The name of the file.
 *   @property filepath - The path where the file is stored.
 */
interface FileInterface {
    filedata: Buffer;
    filename: string;
    filepath: string;
}
/**
 * Represents the metadata of a file stored in the system.
 *  @property filename - The name of the file.
 *  @property fileuri - The URI where the file is stored.
 *  @property filehash - The SHA-256 hash of the file.
 *  @property filesize - The size of the file in bytes.
 *  @property filetype - The MIME type of the file.
 */
interface FileStorageInterface {
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
interface FileDownloadInterface {
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
     * The model ID to use for the AI agent.
     * It can be a Google Gemini model (e.g., "gemini-1.5-flash") or an OpenAI model (e.g., "gpt-4o").
     * If not provided, defaults to "gpt-4o".
     */
    model: LooseToStrict<ModelID>;
    /**
     * fallbackModel is an model ID that can be used as a fallback
     * if the primary model fails or is not available.
     */
    fallbackModel: LooseToStrict<ModelID>;
    /**
     * The method to use for streaming responses.
     * Can be "stream" for streaming responses or "text" for text responses.
     * Default is "text".
     */
    streamMethod?: "text" | "stream";
    /**
    * The file path to the system prompt.
    * If not provided, the system prompt will be empty.
    */
    systemPromptFile?: string;
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
    private aiAgentUrl;
    private apiKey;
    private model;
    private fallbackModel?;
    private systemPromptFile?;
    private streamMethod;
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
        user?: UserBase | null;
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
        media?: InlineData | null;
    }): Promise<StartChatResult>;
}

declare const TaskHandler: {
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
     * Checks if a file exists at the specified path.
     * @param filePath - The path to the file.
     * @returns A boolean indicating whether the file exists.
     * @throws An error if the existence check fails.
     */
    static existsFileSync(filePath: string): boolean;
    /**
     * Asynchronously checks if a file exists at the specified path.
     * @param filePath - The path to the file.
     * @returns A promise that resolves to a boolean indicating whether the file exists.
     * @throws An error if the existence check fails.
     */
    static existsFile(filePath: string): Promise<boolean>;
    /**
     * Writes an object to a JSON file, appending it to an existing array if the file already exists.
     * @param filePath - The path to the JSON file.
     * @param data - The object to write to the file.
     * @throws An error if the file cannot be written or if the content is not an array.
     */
    static writeJSONFile<T>({ filePath, data }: {
        filePath: string;
        data: T;
    }): Promise<void>;
    /**
     * Overwrites a JSON file with a new array of objects.
     * @param filePath - The path to the JSON file.
     * @param data - The array of objects to write to the file.
     * @throws An error if the file cannot be written or if the content is not an array.
     */
    static writeJSONFileOverwrite<T>({ filePath, data }: {
        filePath: string;
        data: T[];
    }): Promise<void>;
    /**
     * Reads a JSON file and returns its content as an array.
     * @param filePath - The path to the JSON file.
     * @returns An array of objects parsed from the JSON file.
     * @throws An error if the file does not exist or if the content is not an array.
     */
    static readJSONFile<T>(filePath: string): Promise<T[]>;
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
     * Saves a file buffer to the specified file path on disk.
     *
     * Calculates the file's hash, size, and MIME type, creates the necessary directories,
     * and writes the file data to disk. Returns an object containing metadata about the saved file.
     *
     * @param data - An object implementing the FileInterface, containing the file data, filename, and target filepath.
     * @returns A promise that resolves to a FileStorageInterface object with file metadata, or null if saving fails.
     * @throws {Error} If the file cannot be saved to the specified location.
     */
    saveBufferToFile(data: FileInterface): Promise<FileStorageInterface | null>;
    /**
     * Downloads a file from a given URL and saves it to the specified download path.
     * @param data - The file download data including the file URL and save path.
     * @returns The metadata of the downloaded file.
     */
    static downloadFile(data: FileDownloadInterface): Promise<FileStorageInterface>;
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

declare function HashWithSHA256(data: string): string;
declare function GenerateUUID(): string;
declare function GenerateRandomString(length: number): string;

declare class Logger {
    private static log;
    static success(message: string, funcName?: string): void;
    static error(message: string, funcName?: string): void;
    static warn(message: string, funcName?: string): void;
    static info(message: string, funcName?: string): void;
    static debug(message: string, funcName?: string): void;
    static custom(type: string, message: string, funcName?: string): void;
}

declare function mimeType(fileName: string): "video/mpeg" | "video/webm" | "video/3gpp" | "video/x-matroska" | "video/x-msvideo" | "video/quicktime" | "video/x-ms-wmv" | "video/x-flv" | "video/x-m4v" | "audio/mpeg" | "audio/wav" | "audio/ogg" | "audio/aac" | "audio/flac" | "audio/alac" | "image/jpeg" | "image/png" | "image/gif" | "image/bmp" | "image/webp" | "image/svg+xml" | "image/x-icon" | "image/tiff" | "image/vnd.adobe.photoshop" | "application/postscript" | "application/x-indesign" | "image/x-raw" | "image/x-canon-cr2" | "image/x-nikon-nef" | "image/x-olympus-orf" | "image/x-panasonic-rw2" | "image/x-pentax-pef" | "image/x-sony-arw" | "image/x-adobe-dng" | "image/x-sigma-x3f" | "image/x-canon-cr3" | "image/heic" | "image/heif" | "image/avif" | "application/pdf" | "text/plain" | "text/html" | "text/css" | "application/javascript" | "application/json" | "application/xml" | "application/zip" | "application/x-rar-compressed" | "application/x-7z-compressed" | "application/octet-stream";

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

interface SessionConfig {
    /**
     * The platform for the session, e.g., "web", "mobile", etc.
     */
    platform: string;
    /**
     * The folder name where session files are stored.
     * Default is "sessions".
     */
    folderName?: string;
}
/**
 * Represents a session for an AI agent.
 * This class is used to manage the session configuration and operations.
 * It can be extended to implement specific session functionalities.
 */
declare class AgentSession {
    private platform;
    private folderName;
    private sessionFilePrefix;
    private userBase;
    private userSessionFileName;
    /**
     * Creates a new session with the specified configuration.
     * @param config - The configuration for the session, including the platform.
     */
    constructor(config: SessionConfig);
    /**
     * Initializes the platform for the session.
     * This method can be overridden to implement platform-specific initialization logic.
     */
    private initPlatform;
    /**
     * Starts a new session for the user.
     * If the session file does not exist, it creates a new one.
     * If it exists, it resumes the session from the file.
     * @param user - The user for whom the session is being started.
     * @param folderName - The name of the folder where session files are stored.
     * @returns An object containing the user and the session history.
     */
    useJSONFileSession(user: UserBase): Promise<{
        user: UserBase;
        session: CoreMessage[];
    }>;
    /**
     * Saves the conversation history to a JSON file.
     * @param data - The conversation data to be saved.
     * @throws An error if the file cannot be written or if the content is not an array.
     */
    saveHistory(data: ConversationDB): Promise<void>;
    /**
     * Retrieves user data from a JSON file.
     * If the user exists, it returns the user data; otherwise, it returns null.
     * @param user - The user object containing the phone number to search for.
     * @returns The user data if found, or null if not found.
     */
    getUserData(user: UserBase): Promise<UserBase | null>;
    /**
    * Retrieves the conversation history from a JSON file.
    * The history is sorted by message timestamp and response timestamp.
    * @param filePath - The path to the JSON file containing the conversation history.
    * @returns An array of CoreMessage objects representing the conversation history.
    */
    getHistory(filePath: string): Promise<CoreMessage[]>;
    /**
     * Starts a new session for the user.
     * If the session file does not exist, it creates a new one.
     * If it exists, it resumes the session from the file.
     * @param user - The user for whom the session is being started.
     * @returns An object containing the user and the session history.
     */
    private createUserJSONFileSession;
    /**
     * Starts a new session for the user.
     * If the session file does not exist, it creates a new one.
     * If it exists, it resumes the session from the file.
     * @param user - The user for whom the session is being started.
     * @returns An object containing the user and the session history.
     */
    private createNewJSONFileSession;
    /**
     * Resumes the session from a JSON file.
     * If the file does not exist or is empty, it returns an empty array.
     * @param user - The user for whom the session is being resumed.
     * @returns An array of CoreMessages from the JSON file.
     */
    private resumeJSONFileSession;
}

export { AgentSession, AiAgent, type AtLeastOne, type ConversationDB, type FileDownloadInterface, type FileInterface, type FileStorageInterface, GenerateRandomString, GenerateUUID, HashWithSHA256, IOF, type InlineData, Logger, type LooseToStrict, type StartChatResult, TaskHandler, terminal as Terminal, Time, Tools, type UserBase, mimeType, terminalColors };
