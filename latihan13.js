const fs = require('fs');

const command = process.argv[2];
const param = process.argv.slice(3).join(' ');

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

function saveData() {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

function showHelp() {
  console.log(`
$ node todo.js help
$ node todo.js list
$ node todo.js task <task_id>
$ node todo.js add <task_content>
$ node todo.js delete <task_id>
$ node todo.js complete <task_id>
$ node todo.js uncomplete <task_id>
$ node todo.js list:outstanding asc|desc
$ node todo.js list:completed asc|desc
$ node todo.js filter:<keyword>
`);
}

function listTask(tasks = data) {
  console.log("Daftar Pekerjaan:");
  tasks.forEach((item, index) => {
    const status = item.completed ? '[x]' : '[ ]';
    console.log(`${index + 1}. ${status} ${item.task}`);
  });
}

function addTask(task) {
  data.push({
    task: task,
    completed: false
  });
  saveData();
  console.log(`"${task}" telah ditambahkan ke daftar`);
}

function deleteTask(id) {
  const removed = data.splice(id - 1, 1);
  saveData();
  console.log(`"${removed[0].task}" telah dihapus`);
}

function completeTask(id) {
  data[id - 1].completed = true;
  saveData();
  console.log(`"${data[id - 1].task}" telah selesai`);
}

function uncompleteTask(id) {
  data[id - 1].completed = false;
  saveData();
  console.log(`Status "${data[id - 1].task}" dibatalkan`);
}

function filterTask(keyword) {
  const filtered = data.filter(item =>
    item.task.toLowerCase().includes(keyword.toLowerCase())
  );
  listTask(filtered);
}

function listByStatus(status, order) {
  let filtered = data.filter(item => item.completed === status);
  if (order === 'desc') filtered.reverse();
  listTask(filtered);
}

if (!command || command === 'help') {
  showHelp();
}

else if (command === 'list') {
  listTask();
}

else if (command === 'add') {
  addTask(param);
}

else if (command === 'delete') {
  deleteTask(Number(param));
}

else if (command === 'complete') {
  completeTask(Number(param));
}

else if (command === 'uncomplete') {
  uncompleteTask(Number(param));
}

else if (command.startsWith('filter:')) {
  filterTask(command.split(':')[1]);
}

else if (command.startsWith('list:outstanding')) {
  listByStatus(false, param);
}

else if (command.startsWith('list:completed')) {
  listByStatus(true, param);
}

else {
  console.log("Perintah tidak dikenali. Gunakan 'help'");
}
