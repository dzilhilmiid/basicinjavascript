function pola(str) {
  const parts = str.split(" ");
  const left = parts[0];      
  const operator = parts[1]; 
  const right = Number(parts[2]);   
  const result = parts[4];   

  for (let dLeft = 0; dLeft <= 9; dLeft++) {
    let leftNum = Number(left.replace("#", dLeft));

    for (let dRes = 0; dRes <= 9; dRes++) {
      let resultNum = Number(result.replace("#", dRes));

      let calc = 0;
      if (operator === "*") calc = leftNum * right;
      if (operator === "+") calc = leftNum + right;
      if (operator === "-") calc = leftNum - right;
      if (operator === "/") calc = leftNum / right;

      if (calc === resultNum) {
        return [dLeft, dRes];
      }
    }
  }
}

console.log(pola("42#3 * 188 = 80#204"));
console.log(pola("8#61 * 895 = 78410#5"));
