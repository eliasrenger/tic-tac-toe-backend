import * as fs from 'fs';
import * as path from 'path';
import { promises as fsPromises } from 'fs';
import { LoggerService } from '../logger/logger.service';
import { CreateBoardStateDto } from './dto/create-boardState.dto';
import { create } from 'domain';

interface ActionHistoryEntry {
    boardState: string[];
    xIsPlaying: boolean;
    action: number;
}

export class TicTacToeAgent {

    private readonly loggerService = new LoggerService(TicTacToeAgent.name);

    // algorithm parameters
    alpha: number;
    gamma: number;
    epsilon: number;
    epsilonDecay: number;
    minEpsilon: number;
    numEpisodes: number;
    maxMoves: number;

    // game state
    boardState: string[];
    xIsNext: boolean;
    qTable: {
        [key: string]: {                // board state
            [key: string]: number[]     // player making move (X or O) giving reward for each action
        };
    }

    constructor() {
        this.alpha = 0.1;
        this.gamma = 0.9;
        this.epsilon = 0.1;
        this.epsilonDecay = 0.995;
        this.minEpsilon = 0.01;
        this.numEpisodes = 100000;
        this.maxMoves = 9;

        this.boardState = Array(9).fill('');
        this.xIsNext = true;
        this.qTable = {};
    }

    public loadQTable() {
        const folderPath = path.join(__dirname, 'qlearning-files');
        const filePath = path.join(folderPath, 'qtable.json');

        if (!fs.existsSync(folderPath)) {
            fs.mkdir(folderPath, (err) => {
                if (err) {
                    console.error('Error creating folder:', err);
                } else {
                    console.log('Folder created successfully!');
                }
            });
        }

        if (!fs.existsSync(filePath)) {
            this.trainAgent();
            fs.writeFileSync(filePath, JSON.stringify(this.qTable));
            this.loggerService.log(`Q-table saved to path ${filePath}`, TicTacToeAgent.name);
        } else {
            this.qTable = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
    }

    public makeMove(createBoardStateDto: CreateBoardStateDto): CreateBoardStateDto {
        // load state from request
        this.boardState = createBoardStateDto.squares;
        this.xIsNext = createBoardStateDto.xIsNext;

        // add state to q-table if it doesn't exist
        this.expandQTable(this.boardState.join(','));
        let action = this.takeAction(false);
        this.commitAction(action);
        createBoardStateDto.squares = this.boardState;
        createBoardStateDto.xIsNext = this.xIsNext;
        createBoardStateDto.action = action;
        return createBoardStateDto;
    }

    public trainAgent(): void {
        this.loggerService.log('Commencing training of agent', TicTacToeAgent.name);
        for (let episode = 0; episode < this.numEpisodes; episode++) {
            this.boardState = Array(9).fill('');
            this.xIsNext = true;
            let lastAction = -1;
            let actionHistory: ActionHistoryEntry[] = [];

            let move = 0;
            while (!this.calculateWinner() && move < this.maxMoves) {
                let action: number = this.takeAction(true);
                actionHistory.unshift({
                    boardState: this.boardState,
                    xIsPlaying: this.xIsNext,
                    action: action
                });

                this.commitAction(action);
                move++;
                lastAction = action;
            }
            this.updateQTable(actionHistory)
            this.epsilon = Math.max(this.epsilon * this.epsilonDecay, this.minEpsilon);
        }
        this.loggerService.log('Training of agent complete', TicTacToeAgent.name);
    }

    private updateQTable(actionHistory: ActionHistoryEntry[]): void {
        let boardState: string;
        let nextBoardState: string;
        let xIsPlaying: boolean;
        let action: number;
        let reward: number;
        let opponentMaxQValue: number;
        let oldQValue: number;
        let newQValue: number;

        for (let actionObject of actionHistory) {
            boardState = actionObject.boardState.join(',');
            xIsPlaying = actionObject.xIsPlaying;
            action = actionObject.action;
            this.expandQTable(boardState);

            reward = this.calculateWinner(boardState.split(',')) === (xIsPlaying ? 'X' : 'O') ? 10 : 0;

            if (reward === 10) {
                opponentMaxQValue = 0;
            } else {
                nextBoardState = actionObject.boardState.splice(action, 0, xIsPlaying ? 'X' : 'O').join(',');
                this.expandQTable(nextBoardState);
                opponentMaxQValue = Math.max(...this.qTable[nextBoardState][xIsPlaying ? 'O' : 'X']);
            }

            oldQValue = this.qTable[boardState][xIsPlaying ? 'X' : 'O'][action];
            newQValue = (1 - this.alpha) * oldQValue + this.alpha * (reward - this.gamma * opponentMaxQValue);
            this.qTable[boardState][xIsPlaying ? 'X' : 'O'][action] = newQValue
        }
    }

    private expandQTable(boardState: string): void {
        if (!this.qTable[boardState]) {
            this.qTable[boardState] = {
                "X": Array(9).fill(0),
                "O": Array(9).fill(0)
            };
        }
    }


    // generateSymmetries(): string[][][] {

    // }

    // quotientTransform(actionObject: ActionHistoryEntry): ActionHistoryEntry {
    //     let boardArr: string[] = actionObject.boardState;
    //     let boardArr2D: string[][] = [
    //         boardArr.slice(0, 3),
    //         boardArr.slice(3, 6),
    //         boardArr.slice(6, 9)
    //     ];

    //     function rotate90(boardArr2D: string[][]): string[][] {
    //         return boardArr2D[0].map((value, index) => boardArr2D.map(row => row[index]).reverse());
    //     }

    //     function flipHorizontal(boardArr2D: string[][]): string[][] {
    //         return boardArr2D.map(row => row.reverse());
    //     }
        
    //     let symmetries: string[][][] = [];

    // }

    private calculateWinner(boardState?: string[]): string {
        if (!boardState) {
            boardState = this.boardState;
        }
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let line of lines) {
            let [a, b, c] = line;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }
        return '';
    }

    private takeAction(isTraining: boolean): number {
        let availableActions = this.boardState.map((value, index) => value === '' ? index : -1).filter(index => index !== -1);
        if (isTraining && Math.random() < this.epsilon) {
            return availableActions[Math.floor(Math.random() * availableActions.length)];
        } else {
            this.expandQTable(this.boardState.join(','));
            let qValues = availableActions.map(move => this.qTable[this.boardState.join(',')][this.xIsNext ? 'X' : 'O'][move]);
            let maxQValue = Math.max(...qValues);
            return availableActions[qValues.indexOf(maxQValue)];
        }
    }

    private commitAction(action: number): void {
        this.boardState[action] = this.xIsNext ? 'X' : 'O';
        this.xIsNext = !this.xIsNext;
    }
}
