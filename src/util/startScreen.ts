import * as vscode from 'vscode';
import { HjklRound } from '../games/hjkl';

export class StartScreen {
    private static instance: StartScreen;
    private constructor() {}

    public static getInstance(): StartScreen {
        if (!StartScreen.instance) {
            StartScreen.instance = new StartScreen();
        }
        return StartScreen.instance;
    }

    private async startHJKLGame(editor: vscode.TextEditor) {
        const difficulty = await vscode.window.showQuickPick(['Noob', 'Easy', 'Medium', 'Hard', 'Nightmare'], {
            placeHolder: 'Select a Difficulty',
        });
        if (difficulty) {
            new HjklRound(difficulty, editor).start();
        }
    }

    public async start(editor: vscode.TextEditor) {
        const game = await vscode.window.showQuickPick(['HJKL Motions Game'], {
            placeHolder: 'Select a Game',
        });
        switch (game) {
            case 'HJKL Motions Game':
                this.startHJKLGame(editor);
                break;
            default:
                vscode.window.showInformationMessage('No game selected');
                break;
        }
    }
}
