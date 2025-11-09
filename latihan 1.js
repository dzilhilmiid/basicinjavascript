function sum(...numbers) {
  let total = 0;
  for (let sum of numbers) {
    total += sum;
  }
  console.log(total);
}

sum(1, 2, 7);      // 10
sum(1, 4);         // 5
sum(11);           // 11
sum(10, 3, 6, 7, 9); // 35