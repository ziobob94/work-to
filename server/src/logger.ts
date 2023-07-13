import { getCurrentStack } from './utils';
import { LoggerOption } from './types';
import winston from 'winston';
import * as path from 'path';
import { format as dateFormat } from 'date-fns';

/* const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY'})
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'app.log' })
        ]
    }); */


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(), // add colors to log messages
      winston.format.timestamp({
        format: () => dateFormat(new Date(), 'yyyy/MM/dd HH:mm:ss') // specify the timestamp format
      }), // add timestamps to log messages

      winston.format.printf(({ level = 'info', message = '', timestamp, file = '', scope = '', className = null, error = null, stack = '', data = null}) => {
        let fileName = '';
        let clickableLink = '';
        if(file){
            fileName = path.basename(file);
            clickableLink =`\u001b]8;;file://${file}\u001b\\${fileName}\u001b]8;;\u001b\\`;
        }
        const scpStr = (scope) ? ' - ' + scope + ' -' : '';
        const clsStr  = (className) ? ' - ' + className + ' -' : '';
        return `${(clickableLink) ? clickableLink+' ' : '' }[${timestamp} ${scpStr}${clsStr} ${level || ''}] ${message || ''} ${(error) ? '\nERROR: '+JSON.stringify(error) : ''}${(data) ? '\nDATA: ' + JSON.stringify(data) : ''} `;
      })
    ),
    transports: [
      new winston.transports.Console()
    ]
  });

export default logger;

export const LoggerOpt = (file: string) : LoggerOption => {
        const opt : LoggerOption = {
            file,
            message: ''
        }
        return opt;
    }
