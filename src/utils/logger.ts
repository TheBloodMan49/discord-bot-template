import chalk from 'chalk';
import moment from 'moment-timezone';
import fs from 'fs';
import path from 'path';

import config from '../config';

type LogType = 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO' | 'DEBUG';

export class Logger {
    /**
     * Logs your message with date to console.
     * @param type Type of log
     * @param message Log message
     * @param format Custom format of date (Default: "DD/MM/YYYY HH:mm:ss")
     */
    static log(type: LogType, message: string, format: string = 'DD/MM/YYYY HH:mm:ss'): void {

        // Don't log debug messages when not debugging
        if (process.env.environment !== 'debug' && type === 'DEBUG') return;

        var color: 'green' | 'yellow' | 'red' | 'blue' | 'gray';

        switch (type) {
            case 'SUCCESS':
                color = 'green';
                break;
            case 'WARNING':
                color = 'yellow';
                break;
            case 'ERROR':
                color = 'red';
                break;
            case 'INFO':
                color = 'blue';
                break;
            case 'DEBUG':
                color = 'gray';
                break;
        }

        let log = `${moment().format(format)} ${message}\n`;
        let logPretty = `${chalk.magenta(`${moment().format(format)}`)} ${chalk[color].bold(`${type}`)} ${message}`;

        if(config.logToFile) {
            fs.appendFile(path.join(__dirname, '..', '..', 'out.log'), log, 'utf-8', (err) => {console.log(err);});
            return;
        }
        
        // Log to stdout instead
        console.log(logPretty);
    }
}

