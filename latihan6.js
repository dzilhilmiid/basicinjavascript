
function sentencesManipulation(sentence) {
    const vocal = ['a', 'i', 'u', 'e', 'o'];
    const words = sentence.split(" ");
    let result = words.map(word => {

    if (vocal.includes(word[0])) {
      return word;
    } else {
      return word.slice(1) + word[0] + "oek";
    }
  });
  return result.join(" ");
}

console.log(sentencesManipulation('ibu pergi ke pasar bersama aku'));