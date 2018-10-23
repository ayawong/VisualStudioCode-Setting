"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
class BookmarkItem {
    constructor(pline, pcolumn, plabel) {
        this.line = pline;
        this.column = pcolumn;
        this.label = plabel;
    }
}
class BookmarkedFileItem {
    constructor(ppath) {
        this.path = ppath;
    }
}
class BookmarkStorage {
    constructor() {
        this.bookmarkedFileList = [];
    }
    /**
     * pushFile
     */
    pushFile(filename) {
        this.bookmarkedFileList.push(new BookmarkedFileItem(filename));
    }
    /**
     * popFile
     */
    popFile(filename) {
        // for index or "filter"
        // for (const bookmarkedFile of this.bookmarkedFileList) {
        //     if (bookmarkedFile.path === filename) {
        //         return this.bookmarkedFileList.splice(index, 1)[0]
        //     }
        // }
    }
}
exports.BookmarkStorage = BookmarkStorage;
//# sourceMappingURL=Storage.js.map