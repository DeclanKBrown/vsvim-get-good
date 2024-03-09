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

    public start(editor: vscode.TextEditor) {
        vscode.window.showInformationMessage('Starting game');
        // Here, use `editor` to interact with the currently active text editor.
        new HjklRound('easy', editor).start();
    }
}
