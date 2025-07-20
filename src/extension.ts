// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
	function getRandomQuote(): { text: string; author: string } | null {
		try {
			const quotesPath = path.join(context.extensionPath, 'quotes.json');
			const data = fs.readFileSync(quotesPath, 'utf8');
			const quotes = JSON.parse(data);
			if (Array.isArray(quotes) && quotes.length > 0) {
				const idx = Math.floor(Math.random() * quotes.length);
				return quotes[idx];
			}
		} catch (err) {
			console.error('Error reading quotes.json:', err);
		}
		return null;
	}

	// Show a random quote on startup
	const quoteOnStartup = getRandomQuote();
	if (quoteOnStartup) {
		vscode.window.showInformationMessage(`${quoteOnStartup.text} — ${quoteOnStartup.author}`);
	}

	// Register the command to show a random quote
	const disposable = vscode.commands.registerCommand('stoic-quotes.showQuote', () => {
		const quote = getRandomQuote();
		if (quote) {
			vscode.window.showInformationMessage(`${quote.text} — ${quote.author}`);
		} else {
			vscode.window.showErrorMessage('No quotes available.');
		}
	});
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
