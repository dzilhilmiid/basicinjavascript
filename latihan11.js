const fs = require('fs');  
const readline = require('readline');

const data = JSON.parse(fs.readFileSync('datalatihan11.json', 'utf8'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar!\n");

let index = 0;

function askQuestion() {
  if (index >= data.length) {
    console.log("Hore Anda Menang!");
    rl.close();
    return;
  }

  console.log(`Pertanyaan: ${data[index].question}`);
  rl.question("Tebakan: ", (answer) => {

    if (answer.toLowerCase() === data[index].answer.toLowerCase()) {
      console.log("Selamat Anda Benar!\n");
      index++;            
      askQuestion();       
    } else {
      console.log("Wkwkwkw, Anda Kurang Beruntung!\n");
      askQuestion();       
    }

  });
}

askQuestion();