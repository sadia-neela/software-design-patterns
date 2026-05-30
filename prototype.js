// Method 1: Using Object.create()
const carPrototype = {
  brand: 'Generic',
  start() {
    console.log(`${this.brand} car started`);
  },
  clone() {
    return Object.create(this);
  }
};

const tesla = carPrototype.clone();
tesla.brand = 'Tesla';
tesla.start(); // Tesla car started

// Method 2: Using Object.assign() for deep cloning
class PrototypeCar {
  constructor(brand, model, specs) {
    this.brand = brand;
    this.model = model;
    this.specs = specs;
  }
  
  clone() {
    // Shallow clone
    return Object.assign({}, this);
  }
  
  deepClone() {
    // Deep clone (handles nested objects)
    return JSON.parse(JSON.stringify(this));
  }
  
  // Modern approach with spread operator
  modernClone() {
    return { ...this };
  }
}