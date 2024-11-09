import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerService extends ConsoleLogger {
  async logToFile(entry: string) {
    const formattedEntry: string = `${new Date().toISOString().split('.')[0]}Z\t${entry}\n`;

    const logFolder = path.join(__dirname, '..', '..', 'logs');
    try {
      if (!fs.existsSync(logFolder)) {
        await fsPromises.mkdir(logFolder);
      }
      await fsPromises.appendFile(
        path.join(logFolder, 'logFile.log'),
        formattedEntry,
      );
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  }

  log(message: string, context?: string) {
    const entry = context ? `[${context}]\t${message}` : message;
    this.logToFile(entry);

    super.log(message, context);
  }

  warn(message: string, context?: string) {
    const entry = context ? `[${context}]\t${message}` : message;
    this.logToFile(entry);

    super.warn(message, context);
  }

  error(message: string, stackOrContext: string) {
    const entry = stackOrContext ? `[${stackOrContext}]\t${message}` : message;
    this.logToFile(entry);

    super.error(message, stackOrContext);
  }
}
