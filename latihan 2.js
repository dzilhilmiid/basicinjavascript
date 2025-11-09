function deretKaskus(n) {
  let hasil = []; 
  
  for (let i = 1; i <= n; i++) {
    let angka = i * 3; 

    if (angka % 5 === 0 && angka % 6 === 0) {
      hasil.push("KASKUS");
    } else if (angka % 5 === 0) {
      hasil.push("KAS");
    } else if (angka % 6 === 0) {
      hasil.push("KUS");
    } else {
      hasil.push(angka);
    }
  }

  return hasil; 
}

console.log(deretKaskus(10));