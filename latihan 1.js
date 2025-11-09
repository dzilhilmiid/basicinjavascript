function sum() {
  let total = 0;
  for (x = 0; x < arguments.length; x++) {
    total = total + arguments[x];
  }
  console.log(total);
}

sum(1, 2, 7);      // 10
sum(1, 4);         // 5
sum(11);           // 11
sum(10, 3, 6, 7, 9); // 35
