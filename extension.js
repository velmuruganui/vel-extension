const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	
	let disposable = vscode.commands.registerCommand('vel-extension.helloWorld', function () {
        let treeDataProvider = new InputFilesTreeDataProvider();
		let treeView = vscode.window.createTreeView('inputFilesView', { treeDataProvider: treeDataProvider });
		context.subscriptions.push(disposable, treeView);
	});
	
	class InputFilesTreeDataProvider {
		getTreeItem(element) {
			return {
				label: element.label,
				collapsibleState: element.collapsibleState,
				command: element.command
			};
		}
	
		getChildren(element) {
			if (!element) {
				// Return the root level items
				return [
					{ label: 'input1.txt', collapsibleState: vscode.TreeItemCollapsibleState.None, command: { command: 'extension.openInputFile', title: 'Open File', arguments: ['input1.txt'] } },
					{ label: 'input2.txt', collapsibleState: vscode.TreeItemCollapsibleState.None, command: { command: 'extension.openInputFile', title: 'Open File', arguments: ['input2.txt'] } }
				];
			} 
			return [];
		}
	}

} // End of activate function
 
function openInputFile(filePath) {
    vscode.workspace.openTextDocument(filePath).then(doc => {
        vscode.window.showTextDocument(doc, { preview: false });
    });
}

let panel = vscode.window.createWebviewPanel(
    'webviewPanel', 
    'Webview Panel', 
    vscode.ViewColumn.One, 
    {} 
);

// Set the HTML content of the webview panel
panel.webview.html = '<html><body> <h1>Hello Worlddddddd!</h1> </body></html>';

// This method is called when your extension is deactivated 
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
