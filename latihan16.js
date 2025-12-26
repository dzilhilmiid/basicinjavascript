class Tyre {
    constructor(brand, size) {
        this.brand = brand;
        this.size = size;
    }
}

class Car {
    constructor(variant, year, warranty, tyreBrand, tyreSize) {
        this.variant = variant;
        this.sn = this.generateSerialNumber();
        this.door = 5;
        this.seat = "5 seater";
        this.tyre = new Tyre(tyreBrand, tyreSize);
        this.year = year;
        this.warranty = warranty;
    }

    generateSerialNumber() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

class Agya extends Car {
    constructor(year) {
        super("Agya", year, 1, "dunlop", "15 inch");
    }
}

class Rush extends Car {
    constructor(year) {
        super("Rush", year, 3, "Bridgestone", "17 inch");
    }
}

class CarFactory {
    constructor() {
        this.cars = [];
    }

    produce(year) {
        const totalProduction = 6; 
        
        for (let i = 0; i < totalProduction; i++) {
            let variant;
            if (i < 4) {
                variant = new Agya(year);
            } else {
                variant = new Rush(year);
            }
            this.cars.push(variant);
        }
    }

    result() {
        console.log(`total mobil yang ada adalah ${this.cars.length} mobil hasil dari dua kali produksi, dan ketika melakukan simulasi garansi kedua belas mobil dilakukan perhitungan status garansi pada tahun 2025`);
        console.log(`\nhasil produksi :`);
        
        this.cars.forEach((car, index) => {
            console.log(`\nno. ${index + 1}`);
            console.log(`varian    : ${car.variant}`);
            console.log(`sn        : ${car.sn}`);
            console.log(`door      : ${car.door}`);
            console.log(`seat      : ${car.seat}`);
            console.log(`tyre      : ${car.tyre.brand} ${car.tyre.size}`);
            console.log(`year      : ${car.year}`);
            console.log(`warranty  : ${car.warranty} year`);
        });
    }

    guaranteeSimulation(simulationYear) {
        console.log(`\nhasil simulasi garansi semua mobil pada tahun ${simulationYear} :`);
        
        this.cars.forEach((car, index) => {
            const carAge = simulationYear - car.year;
            const status = carAge <= car.warranty ? "active" : "expired";
            
            console.log(`\nno. ${index + 1}`);
            console.log(`varian    : ${car.variant}`);
            console.log(`sn        : ${car.sn}`);
            console.log(`door      : ${car.door}`);
            console.log(`seat      : ${car.seat}`);
            console.log(`tyre      : ${car.tyre.brand} ${car.tyre.size}`);
            console.log(`year      : ${car.year}`);
            console.log(`warranty  : ${car.warranty} year`);
            console.log(`\nstatus on ${simulationYear} this guarantee status is ${status}`);
        });
    }
}

const toyota = new CarFactory();
toyota.produce(2022);
toyota.produce(2023);
toyota.result();
toyota.guaranteeSimulation(2026);