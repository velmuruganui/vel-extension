const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	
	let disposable = vscode.commands.registerCommand('vel-extension.helloWorld', function () {
		const treeDataProvider = new MyTreeDataProvider();
	    vscode.window.createTreeView('myExtension', { treeDataProvider });
	});
	context.subscriptions.push(disposable);

}


class MyTreeDataProvider {
	getTreeItem(element) { 
	  return element;
	}
  
	getChildren(element) {
	  const items = [
		new MyTreeItem('Item 1'),
		new MyTreeItem('Item 2'),
		new MyTreeItem('Item 3'),
	  ];
  
	  return Promise.resolve(items);
	}
}

class MyTreeItem extends vscode.TreeItem {
	constructor(label) {
	  super(label, vscode.TreeItemCollapsibleState.None);
	}
}



let panel = vscode.window.createWebviewPanel(
    'webviewPanel', // Identifies the type of the webview. Used internally
    'Webview Panel', // Title of the panel displayed to the user
    vscode.ViewColumn.One, // Editor column to show the new webview panel in.
    {} // Webview options. More on these later.
);

// Set the HTML content of the webview panel
panel.webview.html = '<html><body><h1>Hello, world!</h1></body></html>';

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
