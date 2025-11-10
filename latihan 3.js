function romawi (n) {
    const nilai = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const simbol = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let hasil = " ";
    let i = 0;

    while (n > 0) {

        if (n >= nilai[i]) {
            hasil += simbol[i];
            n -= nilai[i];
        } else {
            i++;
        }
    }
    return hasil
}
console.log("Script Testing untuk Konversi Romawi / n");
console.log("nilai  | ekspetasi| hasil ");
console.log("-------|----------|-------")
console.log("4      |  IV      |", romawi(4));  
console.log("9      |  IV      |", romawi(9));     
console.log("13     |  IV      |", romawi(13));    
console.log("1453   |  IV      |",  romawi(1453)); 
console.log("1646   |  IV      |",romawi(1646)); 