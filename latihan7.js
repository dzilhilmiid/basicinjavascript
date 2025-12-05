function weirdMultiply(num) {
  if (num < 10) {
    return num;
  }

  let digits = num.toString().split("");

  let result = 1;
  for (let d of digits) {
    result *= Number(d);
  }

  return weirdMultiply(result);
}

console.log(weirdMultiply(39));  // -> 3 * 9 = 27 -> 2 * 7 = 14 -> 1 * 4 = 4
console.log(weirdMultiply(999)); // -> 9 * 9 * 9 = 729 -> 7 * 2 * 9 = 126 -> 1 * 2 * 6 = 12 -> 1 * 2 = 2
console.log(weirdMultiply(3));   // -> 3 because 1 digit
