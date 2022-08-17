#!/usr/bin/env node

import { Partials } from "discord.js";
import { ExtendedClient } from "./structures/Client";
import config from "./config";

if(config.useDotEnv) require('dotenv').config();

export const client = new ExtendedClient({ 
    intents: 32767 , 
    partials: [Partials.Message], 
    presence: {
        activities: [{
        name: "the vastness of space",
        type: 3
        }],
        status: 'online'
    }
});

client.start(process.env.botToken);
