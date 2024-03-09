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

    private startHJKLGame(editor: vscode.TextEditor) {
        new HjklRound('easy', editor).start();
    }

    public start(editor: vscode.TextEditor) {
        vscode.window.showInformationMessage('Starting game');

        this.startHJKLGame(editor);
    }
}
