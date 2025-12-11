const readline = require("readline");

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

function sentencesManipulation(sentence) {
    const vowels = ['a' , 'i' , 'u' , 'e' , 'o'];
    const words = sentence.split(" ");

    let result = words.map(word => {
        if (vowels.includes(word[0])) {
            return word;
        } else {
            return word.slice(1) + word[0] + "nyo";
        }
    });

    return result.join(" ");
}

function askInput() {
  rl.question("tulis kalimatmu disini > ", function(answer) {

    if (answer.toLowerCase() === "good bye!") {
      console.log("Program selesai!");
      rl.close(); 
      return;
    }

    console.log("hasil konversi:", sentencesManipulation(answer));
    askInput();
  });
}

askInput();