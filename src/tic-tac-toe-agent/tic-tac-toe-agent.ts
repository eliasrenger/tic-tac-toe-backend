import * as fs from 'fs';
import * as path from 'path';
import { promises as fsPromises } from 'fs';

export class TicTacToeAgent {
    squares: number[];
    qData: Object;

    async loadQData() {
        const qDataPath = path.join(__dirname, 'qlearning-files', 'qData.json');

        try {
            if (!fs.existsSync(qDataPath)) {
                await fsPromises.mkdir(qDataPath);
            }
        } catch (e) {
            if (e instanceof Error) console.error(e.message);
        }
    }
}
