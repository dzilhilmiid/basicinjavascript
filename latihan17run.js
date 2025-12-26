import Calculator,  {PI} from "./latihan17.js"

const calc = new Calculator()

calc.add(10).reduce(5).result()

calc.add(3).multiply(4).divide(6).result()

calc.x = 7

calc.multiply(2).multiply(PI).result()

calc.x = 7

calc.square().multiply(PI).result()

calc.x = 4
calc.exponent(3).result()

calc.squareRoot().result()
