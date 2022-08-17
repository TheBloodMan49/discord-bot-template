import { ApplicationCommandDataResolvable, Client, ClientEvents, ClientOptions, Collection } from "discord.js";
import { CommandType } from "../typings/Command";
import glob from'glob';
import { promisify } from 'util';
import { RegisterCommandOptions } from "../typings/Client";
import { Event } from "../structures/Event";
import { Logger } from "../utils/logger";
import { QuickDB } from "quick.db";

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
    public commands: Collection<string, CommandType> = new Collection<string, CommandType>();
    public devMode: boolean = process.env.environment != 'prod' ? true : false;

    public db = new QuickDB({ filePath: `${__dirname}/../../db.sqlite` });
    
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

    async registerCommands({ commands }: RegisterCommandOptions) {
        for (const command of commands) {

            if(command.guildId) {
                for (const id of command.guildId) {
                    this.guilds.cache.get(id)?.commands.create(command).then(() => {
                        Logger.log('DEBUG', `Registered command ${command.name} for guild ${id}`);
                    });
                    
                }
            } else {
                this.application?.commands.create(command).then(() => {
                    Logger.log('DEBUG', `Registered command ${command.name} globally`);
                });
            }
        }
    }

    async registerModules() {
        // Commands
        const slashCommands: CommandType[] = [];
        const commandFiles = await globPromise(`${__dirname}/../commands/*/*{.ts,.js}`);

        commandFiles.forEach(async filePath => {
            const command: CommandType = await this.importFile(filePath);
            if(!command.name) return;

            this.commands.set(command.name, command);
            slashCommands.push(command);

        });

        this.on("ready", () => {
            this.registerCommands({
                commands: slashCommands,
            });
        });

        // Events
        const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
        eventFiles.forEach(async filePath => {
            const event: Event<keyof ClientEvents> = await this.importFile(filePath);
            this.on(event.event, event.run);
        });

    }

}