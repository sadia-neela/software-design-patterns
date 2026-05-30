// Complex subsystem classes
class CPU {
  start() {
    console.log('CPU: Starting up');
  }
  
  execute() {
    console.log('CPU: Executing instructions');
  }
  
  shutdown() {
    console.log('CPU: Shutting down');
  }
}

class Memory {
  load(address, data) {
    console.log(`Memory: Loading "${data}" to address ${address}`);
  }
  
  free() {
    console.log('Memory: Freeing up space');
  }
}

class HardDrive {
  read(sector, size) {
    console.log(`HardDrive: Reading ${size} bytes from sector ${sector}`);
    return 'data from hard drive';
  }
  
  write(sector, data) {
    console.log(`HardDrive: Writing "${data}" to sector ${sector}`);
  }
}

// Facade - Simple interface to complex boot process
class ComputerFacade {
  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }
  
  start() {
    console.log('=== Starting Computer ===');
    this.cpu.start();
    this.memory.load('0x00', this.hardDrive.read('boot', 1024));
    this.cpu.execute();
    console.log('Computer ready to use!\n');
  }
  
  shutdown() {
    console.log('=== Shutting Down Computer ===');
    this.cpu.shutdown();
    this.memory.free();
    console.log('Computer powered off!\n');
  }
}

// Client code - Simple and clean!
const computer = new ComputerFacade();
computer.start();  // One method to boot the entire computer
computer.shutdown(); // One method to shut down