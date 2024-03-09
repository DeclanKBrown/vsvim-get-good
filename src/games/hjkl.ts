import * as vscode from 'vscode';

const boardSizeOptions: { [key: string]: number } = {
    noob: 3,
    easy: 5,
    medium: 7,
    hard: 8,
    nightmare: 9,
    tpope: 10
};

const instructions = [
    "Remove the x with using only h,j,k,l, and x. Remember, this is for you to be better.",
    "Using the arrow keys only makes you dumber. Trust me, I am a scientist",
    "",
];

export class HjklRound {
    private window: vscode.TextEditor;
    private difficulty: string;

    constructor(difficulty: string, window: vscode.TextEditor) {
        this.window = window;
        this.difficulty = difficulty;
    }

    getInstructions(): string[] {
        return instructions;
    }

    getRandomNumber(count: number): number {
        return Math.floor(Math.random() * count) + 1;
    }

    checkForWin(): boolean {
        const lines = this.window.document.getText().split('\n');
        const found = lines.some(line => line.includes('x'));
        return !found;
    }

    render() {
        const boardSize = boardSizeOptions[this.difficulty];

        let xLine = 0, xCol = 0, cursorLine = 0, cursorCol = 0;
        do {
            xCol = this.getRandomNumber(boardSize);
            xLine = this.getRandomNumber(boardSize);
            cursorCol = this.getRandomNumber(boardSize);
            cursorLine = this.getRandomNumber(boardSize);
        } while (xLine === cursorLine || xCol === cursorCol);

        const lines = new Array(boardSize).fill('').map(() => new Array(boardSize).fill(' ').join(''));
        lines[xLine - 1] = lines[xLine - 1].slice(0, xCol - 1) + 'x' + lines[xLine - 1].slice(xCol);

        this.window.edit(editBuilder => {
            editBuilder.replace(new vscode.Range(0, 0, lines.length, 0), lines.join('\n'));
        });

        this.window.selection = new vscode.Selection(new vscode.Position(cursorLine - 1, cursorCol - 1), new vscode.Position(cursorLine - 1, cursorCol - 1));
        this.window.revealRange(new vscode.Range(new vscode.Position(cursorLine - 1, cursorCol - 1), new vscode.Position(cursorLine - 1, cursorCol - 1)));
    }

    name(): string {
        return "hjkl";
    }

    start() {
        this.getInstructions();

        this.render();

        const handleWin = () => {
            if (this.checkForWin()) {
                this.render();
            }
        };

      vscode.workspace.onDidChangeTextDocument(event => {
            if (event.document === this.window.document) {
                handleWin();
            }
        });
    }
}
