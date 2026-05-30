// Weather Station (Subject)
class WeatherStation {
  constructor() {
    this.observers = [];
    this.temperature = 0;
    this.humidity = 0;
    this.pressure = 0;
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify() {
    this.observers.forEach(observer => {
      observer.update(this.temperature, this.humidity, this.pressure);
    });
  }

  // When weather data changes, notify all observers
  setMeasurements(temp, humidity, pressure) {
    this.temperature = temp;
    this.humidity = humidity;
    this.pressure = pressure;
    this.notify();
  }
}

// Display Devices (Observers)
class PhoneDisplay {
  constructor(deviceName) {
    this.deviceName = deviceName;
  }

  update(temp, humidity, pressure) {
    console.log(`📱 ${this.deviceName} - Temperature: ${temp}°C, Humidity: ${humidity}%`);
  }
}

class TVDisplay {
  constructor(deviceName) {
    this.deviceName = deviceName;
  }

  update(temp, humidity, pressure) {
    console.log(`📺 ${this.deviceName} - Weather Alert! Temp: ${temp}°C, Pressure: ${pressure}hPa`);
  }
}

class AlertSystem {
  constructor(threshold) {
    this.threshold = threshold;
  }

  update(temp, humidity, pressure) {
    if (temp > this.threshold) {
      console.log(`🚨 ALERT! Temperature exceeds ${this.threshold}°C! Current: ${temp}°C`);
    }
  }
}

// Usage
const weatherStation = new WeatherStation();

const iphone = new PhoneDisplay('iPhone');
const samsung = new PhoneDisplay('Samsung');
const livingRoomTV = new TVDisplay('Living Room TV');
const heatAlert = new AlertSystem(35);

weatherStation.subscribe(iphone);
weatherStation.subscribe(samsung);
weatherStation.subscribe(livingRoomTV);
weatherStation.subscribe(heatAlert);

console.log('=== Normal Weather ===');
weatherStation.setMeasurements(25, 65, 1013);

console.log('\n=== Hot Weather ===');
weatherStation.setMeasurements(38, 45, 1008);

console.log('\n=== Removing Samsung Phone ===');
weatherStation.unsubscribe(samsung);
weatherStation.setMeasurements(28, 55, 1015);
