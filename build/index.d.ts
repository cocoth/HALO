import * as ai from 'ai';
import { ToolSet, GenerateTextResult, StreamTextResult, GenerateObjectResult, CoreMessage } from 'ai';
export { CoreMessage, ToolSet, tool } from 'ai';
import { z, Schema } from 'zod';
import { FSWatcherKnownEventMap } from 'chokidar';

/**
 * Represents a user in the system.
 *   @property name - The name of the user.
 *   @property username - The username of the user.
 *   @property email - The email address of the user.
 *   @property phone - The phone number of the user.
 */
interface UserBase {
    /**
     * The name of the user.
     * This property is optional and can be used to store the user's full name.
     */
    name?: string;
    /**
     * The username of the user.
     * This property is optional and can be used to store the user's unique identifier.
     */
    username?: string;
    /**
     * The email address of the user.
     * This property is optional and can be used to store the user's email address.
     */
    email?: string;
    /**
     * The phone number of the user.
     * This property is optional and can be used to store the user's phone number.
     */
    phone?: string;
}
type GoogleGenerativeAIModelId = 'gemini-1.5-flash' | 'gemini-1.5-flash-latest' | 'gemini-1.5-flash-001' | 'gemini-1.5-flash-002' | 'gemini-1.5-flash-8b' | 'gemini-1.5-flash-8b-latest' | 'gemini-1.5-flash-8b-001' | 'gemini-1.5-pro' | 'gemini-1.5-pro-latest' | 'gemini-1.5-pro-001' | 'gemini-1.5-pro-002' | 'gemini-2.0-flash' | 'gemini-2.0-flash-001' | 'gemini-2.0-flash-live-001' | 'gemini-2.0-flash-lite' | 'gemini-2.0-pro-exp-02-05' | 'gemini-2.0-flash-thinking-exp-01-21' | 'gemini-2.0-flash-exp' | 'gemini-2.5-pro-exp-03-25' | 'gemini-2.5-pro-preview-05-06' | 'gemini-2.5-flash-preview-04-17' | 'gemini-exp-1206' | 'gemma-3-27b-it' | 'learnlm-1.5-pro-experimental' | (string & {});
type OpenAIResponsesModelId = 'o1' | 'o1-2024-12-17' | 'o1-mini' | 'o1-mini-2024-09-12' | 'o1-preview' | 'o1-preview-2024-09-12' | 'o3-mini' | 'o3-mini-2025-01-31' | 'o3' | 'o3-2025-04-16' | 'o4-mini' | 'o4-mini-2025-04-16' | 'gpt-4.1' | 'gpt-4.1-2025-04-14' | 'gpt-4.1-mini' | 'gpt-4.1-mini-2025-04-14' | 'gpt-4.1-nano' | 'gpt-4.1-nano-2025-04-14' | 'gpt-4o' | 'gpt-4o-2024-05-13' | 'gpt-4o-2024-08-06' | 'gpt-4o-2024-11-20' | 'gpt-4o-audio-preview' | 'gpt-4o-audio-preview-2024-10-01' | 'gpt-4o-audio-preview-2024-12-17' | 'gpt-4o-search-preview' | 'gpt-4o-search-preview-2025-03-11' | 'gpt-4o-mini-search-preview' | 'gpt-4o-mini-search-preview-2025-03-11' | 'gpt-4o-mini' | 'gpt-4o-mini-2024-07-18' | 'gpt-4-turbo' | 'gpt-4-turbo-2024-04-09' | 'gpt-4-turbo-preview' | 'gpt-4-0125-preview' | 'gpt-4-1106-preview' | 'gpt-4' | 'gpt-4-0613' | 'gpt-4.5-preview' | 'gpt-4.5-preview-2025-02-27' | 'gpt-3.5-turbo-0125' | 'gpt-3.5-turbo' | 'gpt-3.5-turbo-1106' | 'chatgpt-4o-latest' | (string & {});
/**
 * ModelID is a union type that represents the model identifiers for different AI services.
 * It includes Google Gemini model IDs and OpenAI model IDs.
 * This allows for flexibility in specifying which model to use for the AI agent.
 */
type ModelID = GoogleGenerativeAIModelId | OpenAIResponsesModelId;
/**
 * Represents the configuration for an AI agent.
 * This configuration is used to connect to an AI service and define the model and tools available for the agent.
 * It includes the agent URL, API key, model ID, fallback model, system prompt file, and a set of tools.
 *
 * The type parameter `<MODELID>` represents the model identifier type for the AI agent.
 * It is used to specify which model the agent should use, such as a Google Gemini model (e.g., "gemini-1.5-flash")
 * or an OpenAI model (e.g., "gpt-4o"). This allows the `AiAgentConfig` interface to be generic and flexible,
 * supporting different model ID types depending on the AI service being integrated.
 *
 * @template ExtraModelID - A string type that extends the model ID.
 * This allows for additional model IDs to be specified beyond the default set.
 * @example
 * type ExtraModelID = "gpt-4o" | "gpt-3.5-turbo";
 * const agentConfig: AiAgentConfig<typeof ExtraModelID> = {
 *   agentUrl: "https://api.example.com/ai",
 *   apiKey: "your-api-key",
 *   model: "gpt-4o",
 *   fallbackModel: "gpt-3.5-turbo",
 *   systemPromptFile: "/path/to/system/prompt.txt",
 *   tools: {
 *     getCurrentTime: TaskHandler.getCurrentTime
 *   }
 * }
 *
 * @property `agentUrl` - The URL of the AI agent service.
 * @property `apiKey` - The API key for the AI agent.
 * @property `model` - The model ID to use for the AI agent, which can be a Google Gemini model or an OpenAI model.
 * @property `fallbackModel` - The model ID that can be used as a fallback if the primary
 * model fails or is not available.
 * @property `systemPromptFile` - The file path to the system prompt. If not provided, the system prompt will be empty.
 * @property `tools` - A set of tools that the AI agent can use to perform specific tasks.
 * These tools can be used to interact with external services or perform actions.
 */
interface AiAgentConfig<ExtraModelID extends string = ModelID> {
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
    model: ExtraModelID | ModelID;
    /**
     * fallbackModel is an model ID that can be used as a fallback
     * if the primary model fails or is not available.
     */
    fallbackModel: ExtraModelID | ModelID;
    /**
    * The file path to the system prompt.
    * If not provided, the system prompt will be empty.
    */
    systemPromptFile?: string;
    /**
     * A set of tools that the AI agent can use to perform specific tasks.
     * These tools can be used to interact with external services or perform actions.
     * The tools are defined using the `tool` function from the `ai` library.
     * For example, you can define tools like `getCurrentTime` or `fetchData`.
     * @example
     * const tools: ToolSet = {
     *   getCurrentTime: tool({
     *     description: "Get the current time",
     *     parameters: [],
     *     handler: async () => {
     *       return new Date().toISOString();
     *     }
     *   }),
     *   fetchData: tool({
     *     description: "Fetch data from an API",
     *     parameters: ["url"],
     *     handler: async (url: string) => {
     *       const response = await fetch(url);
     *       return response.json();
     *     }
     *   })
     * }
     */
    tools?: ToolSet;
}
/**
 * Represents the result of a session with an AI agent.
 * This interface defines the structure of the session result, including the user, session messages, and a method to save conversation history.
 *
 * @property `user` - The user associated with the session. This property is required to identify the user interacting with the AI agent.
 * @property `session` - The AI agent configuration used for the session. This property is required to specify the AI agent's settings, including the model and tools.
 * @property `saveHistory` - A method to save the conversation history between the user and the AI agent.
 * It takes a generic type parameter `T` for flexibility in storing different types of conversation data.
 */
interface SessionResult {
    /**
     * The user associated with the session.
     * This property is required to identify the user interacting with the AI agent.
     */
    user: UserBase;
    /**
     * The AI agent configuration used for the session.
     * This property is required to specify the AI agent's settings, including the model and tools.
     */
    session: CoreMessage[];
    /**
     * The messages exchanged during the session.
     * This property is required to store the conversation history between the user and the AI agent.
     */
    saveHistory: <T>(data: ConversationDB<T>) => Promise<CoreMessage[]>;
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
type ConversationDB<T = string> = {
    role: "user" | "assistant";
    timestamp: Date;
} & (T extends string ? {
    text: string;
    content?: never;
} : {
    content: T;
    text?: never;
});
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
type ChatTextResult = {
    text: string;
    response: any;
};
/**
 * Represents the result of starting a chat with text response.
 *   @property textStream - The generated text response as a stream.
 *   @property response - Additional response data.
 */
type ChatStreamResult = {
    textStream: AsyncIterable<string>;
    response: any;
};
/**
 * Represents a chat builder interface that defines methods for generating text and streaming responses.
 *   @property generateText - A method to generate a text response from the chat.
 *   @property generateStream - A method to generate a stream of text responses from the chat.
 */
interface ChatBuilder {
    generateText(): Promise<GenerateTextResult<ToolSet, never>>;
    generateStream(): Promise<StreamTextResult<ToolSet, never>>;
    generateObject<OBJECT>(schema: z.Schema<OBJECT, z.ZodTypeDef, any> | Schema<OBJECT>): Promise<GenerateObjectResult<OBJECT>>;
}
/**
 * Represents the result of starting a chat, which can be either a text result or a textStream result.
 * This type is a union of ChatTextResult and ChatStreamResult.
 * It allows for flexibility in handling different types of chat responses.
 * if you use `streamMethod` as "text", it will return `ChatTextResult`.
 * If you use `streamMethod` as "stream", it will return `ChatStreamResult`.
 * @see ChatTextResult
 * @see ChatStreamResult
 */
type StartChatResult = ChatTextResult | ChatStreamResult;
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
    mimeType: string;
    inlineData?: string;
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

/**
 * AiAgent class for interacting with an AI agent via OpenAI API.
 * It initializes the agent with a URL and API key, and allows starting a chat session.
 * The system prompt can be loaded from a specified file.
 * @params {AiAgentConfig<ModelID>} config - Configuration for the AI agent.
 * @property {string} agentUrl - The URL of the AI agent service.
 * @property {string} apiKey - The API key for the AI agent.
 * @property {ModelID} model - The language model used for generating responses.
 * @property {ModelID} fallbackModel - Optional fallback model to use if the primary model fails.
 * @property {string} systemPromptFile - Optional file path for the system prompt.
 * @property {ToolSet} toolSet - Set of tools available for the AI agent to use.
 * @description This class provides methods to start a chat session, generate text responses, and handle various tasks.
 * @example
 * const agent = new AiAgent({
 *   agentUrl: "https://api.example.com/ai",
 *   apiKey: "your-api-key",
 *   model: "gpt-4o",
 *   fallbackModel: "gpt-3.5-turbo",
 *   systemPromptFile: "/path/to/system/prompt.txt",
 *   tools: {
 *     getCurrentTime: TaskHandler.getCurrentTime
 *   }
 * });
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
     * Generates an object based on either a prompt string or an array of messages, validated against a provided schema.
     *
     * @param messages - Optional array of `CoreMessage` objects to use as context for generation.
     * @param prompt - Optional prompt string to use for generation. Must be a string if provided.
     * @param schema - The schema (Zod or custom Schema) to validate the generated object against.
     * @returns A promise that resolves to the generated object, validated by the provided schema.
     * @throws Will throw an error if `prompt` is not a string or if `messages` is not an array of `CoreMessage`.
     */
    private generateObject;
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
     * Queries the AI agent with a prompt and optional session messages.
     * It returns a ChatBuilder object that can be used to generate text or stream responses.
     *
     * @param session - An optional array of previous messages in the chat session.
     * @param prompt - The user's message to start the chat.
     * @param media - Optional media data to include in the chat.
     * @returns A ChatBuilder object with methods to generate text or stream responses.
     */
    query({ session, prompt, media, }: {
        /**
         * An optional array of previous messages in the chat session.
         * This allows the AI agent to continue the conversation with the existing context.
         */
        session?: CoreMessage[] | null;
        /**
         * The user's message to start the chat.
         * This should be a non-empty string representing the user's input.
         */
        prompt: string;
        /**
         * Optional media data to include in the chat.
         * This can be an inline data object containing file data and mime type.
         */
        media?: InlineData | null;
    }): Promise<ChatBuilder>;
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
    startChat({ streamMethod, session, prompt, media, }: {
        /**
       * The method to use for streaming responses.
       * Can be "stream" for streaming responses or "text" for text responses.
       * Default is "text".
       */
        streamMethod?: "text" | "stream";
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
    private createMessages;
    /**
     * Gets the AI's response based on the provided messages.
     * It either generates a text response or a stream of text responses.
     *
     * @param messages - An array of CoreMessage objects representing the conversation history.
     * @returns A promise that resolves to the AI's response, which can be either a text response or a stream of text responses.
     */
    private getResponse;
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

/**
 * IOF (Input/Output File) class provides methods for file and directory operations,
 * including creating directories, removing files, watching directories for changes,
 * reading and writing JSON files, calculating file hashes and sizes, and saving files.
 */
declare class IOF {
    /**
     * Creates a directory if it does not exist.
     * @param dirPath - The path of the directory to create.
     */
    static mkdir(dirPath: string): void;
    /**
     * Removes a directory or file at the specified path.
     * If the path is a directory, it will be removed recursively.
     * @param dirPath - The path of the directory to remove.
     */
    static rm(dirPath: string): void;
    /**
     * Watches a directory for file system events and executes a callback with the event details.
     * @param dirPath - The path of the directory to watch.
     * @param event - The type of event to listen for (e.g., "add", "change", "unlink").
     * @param params - Optional callback function to execute with the file path and event type.
     */
    static watcher({ dirPath, event, params, }: {
        /**
         * The path of the directory to watch.
         */
        dirPath: string;
        /**
         * The type of event to listen for.
         */
        event: keyof FSWatcherKnownEventMap | "add" | "change" | "addDir" | "unlink" | "unlinkDir";
        /**
         * Optional callback function to execute with the file path and event type.
         */
        params?: ({ filePath, event }: {
            /**
             * The full path of the file that triggered the event.
             */
            filePath: string;
            /**
             * The type of event that occurred.
             */
            event: keyof FSWatcherKnownEventMap | "add" | "change" | "addDir" | "unlink" | "unlinkDir";
        }) => Promise<void>;
    }): void;
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

/**
 * Utility functions for terminal colors.
 * These functions provide ANSI escape codes for styling terminal output.
 * @module terminalColors
 * @description
 * This module exports an object containing ANSI escape codes for various text styles and colors.
 * You can use these codes to format terminal output in Node.js applications.
 * @example
 * import { terminalColors as TC } from 'halo';
 * console.log(`${TC.R}This text is red${TC.reset}`);
 * @see {@link https://en.wikipedia.org/wiki/ANSI_escape_code} for more information
 */
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

declare function mimeType(fileName: string): "video/mp4" | "video/mpeg" | "video/webm" | "video/3gpp" | "video/x-matroska" | "video/x-msvideo" | "video/quicktime" | "video/x-ms-wmv" | "video/x-flv" | "video/x-m4v" | "audio/mpeg" | "audio/mp4" | "audio/wav" | "audio/ogg" | "audio/aac" | "audio/flac" | "audio/alac" | "image/jpeg" | "image/png" | "image/gif" | "image/bmp" | "image/webp" | "image/svg+xml" | "image/x-icon" | "image/tiff" | "image/vnd.adobe.photoshop" | "application/postscript" | "application/x-indesign" | "image/x-raw" | "image/x-canon-cr2" | "image/x-nikon-nef" | "image/x-olympus-orf" | "image/x-panasonic-rw2" | "image/x-pentax-pef" | "image/x-sony-arw" | "image/x-adobe-dng" | "image/x-sigma-x3f" | "image/x-canon-cr3" | "image/heic" | "image/heif" | "image/avif" | "application/pdf" | "text/plain" | "text/html" | "text/css" | "application/javascript" | "application/json" | "application/xml" | "application/zip" | "application/x-rar-compressed" | "application/x-7z-compressed" | "application/octet-stream";

/**
 * Prompts the user for input and returns the response.
 * @param question The question to ask the user.
 * @returns A promise that resolves to the user's input.
 */
declare function Question(question?: string): Promise<string>;
/**
 * Closes the terminal interface and exits the process.
 * This function is useful for gracefully shutting down the terminal.
 */
declare function CloseTerminal(): Promise<void>;
/**
 * Clears the terminal screen.
 * @returns A promise that resolves to the user's input.
 */
declare function ClearTerminal(): Promise<void>;
/**
 * Pauses execution for a specified duration (in seconds), similar to Python's sleep.
 * @param duration The number of seconds to sleep.
 * @returns A promise that resolves after the specified duration.
 */
declare function Sleep(duration: number): Promise<void>;
/**
 * Parses environment variables that start with a given prefix.
 * @param prefix The prefix to filter environment variables.
 * @returns An object containing arrays of keys and values.
 * @example
 * const envVars = ParseEnvKeys("AI_TOKEN_");
 * console.log(envVars.keys); // ['AI_TOKEN_KEY']
 * console.log(envVars.values); // ['your_token_value']
 * @description This function filters environment variables that start with the specified prefix,
 */
declare function ParseEnvKeys(prefix: string): {
    keys: string[];
    values: string[];
};

declare const terminal_ClearTerminal: typeof ClearTerminal;
declare const terminal_CloseTerminal: typeof CloseTerminal;
declare const terminal_ParseEnvKeys: typeof ParseEnvKeys;
declare const terminal_Question: typeof Question;
declare const terminal_Sleep: typeof Sleep;
declare namespace terminal {
  export { terminal_ClearTerminal as ClearTerminal, terminal_CloseTerminal as CloseTerminal, terminal_ParseEnvKeys as ParseEnvKeys, terminal_Question as Question, terminal_Sleep as Sleep };
}

declare class Time {
    private static formatDateToParts;
    private static formatDateString;
    private static formateDateToSaveString;
    private static logFormat;
    /**
     * Formats a date to a human-readable string.
     * @param date The date to format.
     * @param timeZone The time zone to use for formatting.
     * @returns The formatted date string.
     */
    static formatDateToHumanReadable(date: Date, timeZone: string): string;
    /**
     * Returns the current time formatted as a string suitable for saving.
     * This format is `YYYY-MM-DDTHH-MM-SSZ`, which is useful for file naming or database storage.
     */
    static getCurrentTimeToSaveString(): string;
    /**
     * Returns the current time as a Date object.
     * This method formats the current time to a string and then converts it back to a Date object.
     */
    static getCurrentTime(): Date;
    /**
     * Returns the current time formatted as a string.
     * This format is `YYYY-MM-DDTHH:MM:SSZ`, which is useful for logging or displaying the current time.
     */
    static getCurrentTimeToString(): string;
    /**
     * Returns the current time in a human-readable format.
     * This format is `DD/MM/YYYY HH:MM:SS`, which is suitable for display to users.
     */
    static getCurrentTimeToHumanReadable(): string;
    /**
     * Returns the current time formatted for logging.
     * This format is `DD/MM/YYYY:HH:MM:SS`, which is useful for log entries.
     */
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
    private sessionFileName;
    private memorySession;
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
     * Starts a new session for the user using in-memory storage.
     * This method is useful for quick sessions that do not require persistent storage.
     * @param user - The user for whom the session is being started.
     * @returns An object containing the user and the session history.
     */
    useMemorySession({ user, }: {
        /**
         * The user for whom the session is being started.
         * This is required to create or resume a session.
         */
        user: UserBase;
    }): Promise<SessionResult>;
    /**
     * Starts a new session for the user.
     * If the session file does not exist, it creates a new one.
     * If it exists, it resumes the session from the file.
     * @param user - The user for whom the session is being started.
     * @param folderName - The name of the folder where session files are stored.
     * @returns An object containing the user and the session history.
     */
    useJSONFileSession({ user, sessionFileName }: {
        /**
         * The user for whom the session is being started.
         * This is required to create or resume a session.
         */
        user: UserBase;
        /**
         * The name of the session file. If not provided, it defaults to a combination of the sessionFilePrefix and the user's username, email, phone, or name.
         */
        sessionFileName?: string;
    }): Promise<SessionResult>;
    /**
     * Saves the conversation history to a JSON file.
     * @param data - The conversation data to be saved.
     * @throws An error if the file cannot be written or if the content is not an array.
     */
    private saveHistory;
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

export { AgentSession, AiAgent, type AiAgentConfig, type AtLeastOne, type ChatBuilder, type ConversationDB, type FileDownloadInterface, type FileInterface, type FileStorageInterface, GenerateRandomString, GenerateUUID, HashWithSHA256, IOF, type InlineData, Logger, type LooseToStrict, type ModelID, type SessionResult, type StartChatResult, TaskHandler, terminal as Terminal, Time, Tools, type UserBase, mimeType, terminalColors };
