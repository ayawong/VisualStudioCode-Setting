"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
exports.MAX_BOOKMARKS = 10;
exports.NO_BOOKMARK_DEFINED = -1;
class Bookmark {
    constructor(fsPath) {
        this.fsPath = fsPath;
        this.bookmarks = [];
        this.bookmarks.length = exports.MAX_BOOKMARKS;
        this.clear();
    }
    listBookmarks() {
        return new Promise((resolve, reject) => {
            if (this.bookmarks.length === 0) {
                resolve({});
                return;
            }
            if (!fs.existsSync(this.fsPath)) {
                resolve({});
                return;
            }
            let uriDocBookmark = vscode.Uri.file(this.fsPath);
            vscode.workspace.openTextDocument(uriDocBookmark).then(doc => {
                let items = [];
                let invalids = [];
                for (let element of this.bookmarks) {
                    // fix for modified files
                    if (element !== exports.NO_BOOKMARK_DEFINED) {
                        if (element <= doc.lineCount) {
                            let lineText = doc.lineAt(element).text;
                            let normalizedPath = doc.uri.fsPath;
                            element++;
                            items.push({
                                label: element.toString(),
                                description: lineText,
                                detail: normalizedPath
                            });
                        }
                        else {
                            invalids.push(element);
                        }
                    }
                }
                if (invalids.length > 0) {
                    // tslint:disable-next-line:prefer-for-of
                    for (let indexI = 0; indexI < invalids.length; indexI++) {
                        this.bookmarks[invalids[indexI]] = exports.NO_BOOKMARK_DEFINED;
                    }
                }
                resolve(items);
                return;
            });
        });
    }
    clear() {
        for (let index = 0; index < exports.MAX_BOOKMARKS; index++) {
            this.bookmarks[index] = exports.NO_BOOKMARK_DEFINED;
        }
    }
}
exports.Bookmark = Bookmark;
//# sourceMappingURL=Bookmark.js.map