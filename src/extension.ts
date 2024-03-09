import * as vscode from 'vscode';

import { StartScreen } from './util/startScreen';

function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('vsvim-get-good.start', () => {
        // Check if an editor is already open
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            // Editor is open, start the game immediately
            StartScreen.getInstance().start(editor);
        } else {
            // No editor open, open a new document and then start the game
            vscode.workspace.openTextDocument().then(doc => {
                vscode.window.showTextDocument(doc, vscode.ViewColumn.One).then(() => {
                    // Start game with newly open editor
                    editor = vscode.window.activeTextEditor;
                    if (editor) {
                        StartScreen.getInstance().start(editor);
                    }
                });
            });
        }
    });
    context.subscriptions.push(disposable);
};

export { activate };
