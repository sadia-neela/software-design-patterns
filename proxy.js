// Target object
const user = {
  name: 'John',
  age: 30,
  email: 'john@example.com'
};

// Simple proxy that logs all property access
const loggingProxy = new Proxy(user, {
  get(target, property) {
    console.log(`Reading property "${property}"`);
    return target[property];
  },
  set(target, property, value) {
    console.log(`Setting property "${property}" to "${value}"`);
    target[property] = value;
    return true; // Indicate success
  }
});

loggingProxy.name; // Logs: Reading property "name"
loggingProxy.age = 31; // Logs: Setting property "age" to "31"