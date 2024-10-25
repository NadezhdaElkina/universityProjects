import TaskList from './taskList.js';
import readline from 'readline';

const taskList = new TaskList();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const menu = () => {
    console.log('Task Manager');
    console.log('1. Add Task');
    console.log('2. Remove Task');
    console.log('3. Show Tasks');
    console.log('4. Mark Task as Completed');
    console.log('5. Show Completed Tasks');
    console.log('0. Exit');
};

const chooseOption = () => {
    rl.question('Choose an option: ', (option) => {
        switch (option) {
            case '1':
                rl.question('Enter task description: ', (taskDescription) => {
                    taskList.addTask(taskDescription);
                    chooseOption(); 
                });
                break;
            case '2':
                rl.question('Enter task index to remove: ', (index) => {
                    taskList.removeTask(parseInt(index) - 1);
                    chooseOption(); 
                });
                break;
            case '3':
                taskList.showTasks(); 
                chooseOption(); 
                break;
            case '4':
                rl.question('Enter task index to mark as completed: ', (index) => {
                    taskList.markTaskAsCompleted(parseInt(index) - 1);
                    chooseOption(); 
                });
                break;
            case '5':
                taskList.showCompletedTasks(); 
                chooseOption(); 
                break;
            case '0':
                rl.close(); 
                break;
            default:
                console.log('Invalid option!');
                chooseOption(); 
        }
    });
};


menu();
chooseOption();
