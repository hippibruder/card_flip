
export default class UndoStack {
    constructor() {
        this.stack = [];
    }

    reset() {
        this.stack = [];
    }

    addAction(undo) {
        this.stack.push(undo);
    }

    undoAction() {
        let item = this.stack.pop();
        if (item) {
            item();
        }
    }
}
