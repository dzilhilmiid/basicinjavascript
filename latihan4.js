function indexPrime(param1) {
  let count = 0;       
  let number = 1;     

  while (count < param1) {
    number++;
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      count++;
    }
  }

  return number;
}

console.log(indexPrime(4));
console.log(indexPrime(500));
console.log(indexPrime(37786));