import { ApplicationCommandDataResolvable } from "discord.js";
import { CommandType } from "../typings/Command";

export interface RegisterCommandOptions {
    commands: CommandType[];
}