import { client } from "../index";
import { CommandType } from "../typings/Command";
import { Logger } from "./logger";


export class Deployer {
    static async deployGuild(id: string) {
        try {
            let toDeploy: CommandType[] = [];
            client.commands.forEach(command => {
                if(command.guildId?.includes(id)) toDeploy.push(command);
            });
            await client.guilds.cache.get(id)?.commands.set(toDeploy);
        } catch (err) {
            Logger.log('ERROR', `Something went wrong when trying to deploy for guild ${id}`);
        }
    }

    static async deployGlobal() {
        try {
            let toDeploy: CommandType[] = [];
            client.commands.forEach(command => {
                if(!command.guildId) toDeploy.push(command);
            });
            await client.application?.commands.set(toDeploy);
        } catch (err) {
            Logger.log('ERROR', "Something went wrong when trying to deploy global commands");
        }
    }
}