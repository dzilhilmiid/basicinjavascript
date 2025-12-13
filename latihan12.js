const fs = require("fs");
const readline = require("readline");

const fileName = process.argv[2];

if (!fileName) {
  console.log("Tolong sertakan nama file sebagai inputan soalnya");
  console.log("Misalnya 'latihan12.js datalatihan11.json'");
  process.exit(1);
}

let data;
try {
  const fileContent = fs.readFileSync(fileName, "utf8");
  data = JSON.parse(fileContent);
} catch (err) {
  console.log("File tidak ditemukan atau format JSON salah");
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`Selamat datang di permainan Tebak-tebakan, kami akan memberikan pertanyaan dari file '${fileName}'`);
console.log("Untuk menjawab, jawablah dengan benar.");
console.log("Gunakan 'skip' untuk menghindari pertanyaan, dan akan ditanyakan kembali di akhir.\n");

let index = 0;                       
let skipQuestions = [];              
let wrongCount = 0;                  

function askQuestion() {
  if (index >= data.length) {
    if (skipQuestions.length > 0) {
      data = skipQuestions;
      skipQuestions = [];
      index = 0;
      wrongCount = 0;
      console.log("\nPertanyaan skip akan diulang kembali!\n");
    } else {
      console.log("Anda Berhasil!");
      rl.close();
      return;
    }
  }

  const current = data[index];

  console.log(`Pertanyaan: ${current.question}`);

  rl.question("Jawaban: ", (answer) => {
    if (answer.toLowerCase() === "skip") {
      skipQuestions.push(current);
      index++;
      wrongCount = 0;
      askQuestion();
      return;
    }

    if (answer.toLowerCase() === current.answer.toLowerCase()) {
      console.log("Anda Beruntung!\n");
      index++;
      wrongCount = 0;
      askQuestion();
    } else {
      wrongCount++;
      console.log(`Anda Kurang Beruntung! anda telah salah ${wrongCount} kali, silahkan coba lagi.`);
      askQuestion();
    }
  });
}

askQuestion();
