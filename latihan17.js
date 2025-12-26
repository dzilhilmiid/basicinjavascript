const PI = 22 / 7

class Calculator {
    constructor(initial = 1) {
        this.x = initial
    }

    add(value) {
        this.x += value
        return this
    }

    reduce(value) {
        this.x -= value
        return this
    }

    multiply(value) {
        this.x *= value
        return this
    }

    divide(value) {
        this.x /= value
        return this
    }

    exponent(value) {
        this.x = this.x ** value
        return this
    }

    squareRoot(value) {
        this.x = Math.sqrt(this.x)
        return this
    }

    square(value) {
        this.x = this.x ** 2
        return this
    }

    result() {
        console.log("Hasilnya:", this.x)
        return this
    }
}

export{ PI }
export default Calculator