"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const BookmarkFile_1 = require("./BookmarkFile");
class BookmarksController {
    constructor() {
        this.bookmarks = [];
    }
    loadFrom(jsonObject, relativePath) {
        if (jsonObject === "") {
            return;
        }
        let jsonBookmarks = jsonObject.bookmarks;
        for (let idx = 0; idx < jsonBookmarks.length; idx++) {
            let jsonBookmark = jsonBookmarks[idx];
            // each bookmark (line)
            this.add(jsonBookmark.fsPath);
            for (let index = 0; index < jsonBookmark.bookmarks.length; index++) {
                this.bookmarks[idx].bookmarks[index] = jsonBookmark.bookmarks[index];
            }
        }
        if (relativePath) {
            for (let element of this.bookmarks) {
                element.fsPath = element.fsPath.replace("$ROOTPATH$", vscode.workspace.workspaceFolders[0].uri.fsPath);
            }
        }
    }
    fromUri(uri) {
        for (let element of this.bookmarks) {
            if (element.fsPath === uri) {
                return element;
            }
        }
    }
    indexFromUri(uri) {
        for (let index = 0; index < this.bookmarks.length; index++) {
            let element = this.bookmarks[index];
            if (element.fsPath === uri) {
                return index;
            }
        }
    }
    add(uri) {
        let existing = this.fromUri(uri);
        if (typeof existing === "undefined") {
            let bookmark = new BookmarkFile_1.BookmarkFile(uri);
            this.bookmarks.push(bookmark);
        }
    }
    zip(relativePath) {
        function isNotEmpty(book) {
            let hasAny = false;
            for (let element of book.bookmarks) {
                hasAny = element !== BookmarkFile_1.NO_BOOKMARK_DEFINED;
                if (hasAny) {
                    break;
                }
            }
            return hasAny;
        }
        let newBookmarks = new BookmarksController();
        newBookmarks.bookmarks = JSON.parse(JSON.stringify(this.bookmarks)).filter(isNotEmpty);
        if (!relativePath) {
            return newBookmarks;
        }
        for (let element of newBookmarks.bookmarks) {
            element.fsPath = element.fsPath.replace(vscode.workspace.getWorkspaceFolder(vscode.Uri.file(element.fsPath)).uri.fsPath, "$ROOTPATH$");
        }
        return newBookmarks;
    }
}
exports.BookmarksController = BookmarksController;
//# sourceMappingURL=BookmarksController.js.map