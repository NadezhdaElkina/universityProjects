class Task {
    constructor(title) {
        this.title = title;
        this.completed = false;
    }

    markAsCompleted() {
        this.completed = true;
    }
}

export default Task;
