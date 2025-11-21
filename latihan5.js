function stringManipulation (word) {
    const vocal = ['a', 'i', 'u', 'e', 'o']
    const firstLetter = word [0];

    if (vocal.includes(firstLetter)) {
        return word;
    } else {
        let sisa = word.slice(1);
        return sisa + firstLetter + "oek";
    }
}
console.log(stringManipulation("ayam"));
console.log(stringManipulation("bebek"));