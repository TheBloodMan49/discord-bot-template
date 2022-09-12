import { ApplicationCommandType, Client, ClientEvents, ClientOptions, Collection } from "discord.js";
import { CommandType } from "../typings/Command";
import glob from "glob";
import { promisify } from "util";
import { Event } from "../structures/Event";
import { Logger } from "../utils/logger";
import config from "../config";

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
    public commands: Collection<string, CommandType> = new Collection<string, CommandType>();

    public devMode: boolean = process.env.environment != 'prod';
    
    constructor(options: ClientOptions) {
        super(options);
    }

    start(token: string | undefined) {
        if (!token) return Logger.log('ERROR', "Token missing, can't start client");


        
        this.registerModules();
        this.login(token);
    }

    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerModules() {
        // Commands
        const commands: CommandType[] = [];

        const commandFiles = await globPromise(`${__dirname}/../commands/*/*{.ts,.js}`);
        commandFiles.forEach(async filePath => {
            let command: CommandType = await this.importFile(filePath);
            if(!command.name) return;

            command.type = ApplicationCommandType.ChatInput;

            this.commands.set(command.name, command);
            commands.push(command);
        });

        const contextMenuFiles = await globPromise(`${__dirname}/../context-menu/*{.ts,.js}`);
        contextMenuFiles.forEach(async filePath => {
            let command: CommandType = await this.importFile(filePath);
            if(!command.name) return;

            this.commands.set(command.name, command);
            commands.push(command);
        });

        // Events
        const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
        eventFiles.forEach(async filePath => {
            const event: Event<keyof ClientEvents> = await this.importFile(filePath);
            this.on(event.event, event.run);
        });

    }

    isOwner = (id:string) => {
        return config.owners.includes(id);
    }

}