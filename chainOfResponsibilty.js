/** 
Build a chain of responsibility for checking the User model 

for example, at least it should have fields 

    Age – should be higher than 18
    Phone number – should have max 10 symbols
    Location – shouldn't have any special symbols (#@!) 
**/

/** example 1
// Handler interface (abstract class)

class Handler {
  constructor() {
    this.nextHandler = null;
  }

  setNext(handler) {
    this.nextHandler = handler;
    return handler; // Enables chaining
  }

  handle(request) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

// Concrete handlers
class AuthenticationHandler extends Handler {
  handle(request) {
    if (!request.isAuthenticated) {
      return { error: 'Authentication failed' };
    }
    console.log('Authentication passed');
    return super.handle(request);
  }
}

class AuthorizationHandler extends Handler {
  handle(request) {
    if (!request.hasPermission) {
      return { error: 'Insufficient permissions' };
    }
    console.log('Authorization passed');
    return super.handle(request);
  }
}

class ValidationHandler extends Handler {
  handle(request) {
    if (!request.data || Object.keys(request.data).length === 0) {
      return { error: 'Invalid request data' };
    }
    console.log('Validation passed');
    return super.handle(request);
  }
}

// Usage
const auth = new AuthenticationHandler();
const authz = new AuthorizationHandler();
const validation = new ValidationHandler();

auth.setNext(authz).setNext(validation);

const request = {
  isAuthenticated: true,
  hasPermission: true,
  data: { userId: 123 }
};

const result = auth.handle(request);
console.log(result); // undefined (all passed)

const badRequest = {
  isAuthenticated: false,
  hasPermission: true,
  data: { userId: 123 }
};

const badResult = auth.handle(badRequest);
console.log(badResult); // { error: 'Insufficient permissions' }
**/

class Handler {
  constructor() {
    this.nextHandler = null;
  }

  setNextHandler(handler) {
    this.nextHandler = handler;
    return handler;
  }

  handle(request) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

class processAge extends Handler {
    
    handle(data) {
        if (data.age > 18) {
            console.log('Age granted \u2705');
            return super.handle(data);
        } else {
            console.log('Age denied \u274C');
        }
    }
}

class processPhoneNumber extends Handler {
    
    handle(data) {
        if (data.number.length < 11) {
            console.log('Phone number granted \u2705');
            return super.handle(data);
        } else {
            console.log('Phone number denied \u274C');
        }
    }
}

class processLocation extends Handler {
    
    handle(data) {
        const specialSymbols = /[#@!]/;
        if (!specialSymbols.test(data.location)) {
            console.log('Location granted \u2705');
            return super.handle(data);
        } else {
            console.log('Location denied \u274C');
        }
    }
}
const age = new processAge();
const number = new processPhoneNumber();
const location = new processLocation();

age.setNextHandler(number).setNextHandler(location);

const data = {
    age: 20,
    number: '0176125610',
    location: 'Dhaka'
}
age.handle(data);
const data2 = {
    age: 21,
    number: '0176125610',
    location: 'D!haka'
}
age.handle(data2);