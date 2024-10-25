// taskList.js
import Task from './task.js';

class TaskList {
    constructor() {
        this.tasks = [];
    }

    addTask(title) {
        const task = new Task(title);
        this.tasks.push(task);
        console.log('Task added!');
    }

    removeTask(index) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
            console.log('Task removed!');
        } else {
            console.log('Invalid task index!');
        }
    }

    showTasks() {
        if (this.tasks.length === 0) {
            console.log('No tasks available.');
            return;
        }

        console.log('Tasks:');
        this.tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.title} ${task.completed ? '(Completed)' : ''}`);
        });
    }

    markTaskAsCompleted(index) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks[index].markAsCompleted();
            console.log('Task marked as completed!');
        } else {
            console.log('Invalid task index!');
        }
    }

    showCompletedTasks() {
        const completedTasks = this.tasks.filter(task => task.completed);
        if (completedTasks.length === 0) {
            console.log('No completed tasks available.');
            return;
        }

        console.log('Completed Tasks:');
        completedTasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.title}`);
        });
    }
}

export default TaskList;
