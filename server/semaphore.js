

module.exports = class Semaphore {

  constructor(callback, size, context)  {
    this.callback = callback;
    this.context = context || this;
    this.counter = size !== undefined ? size : 0;
  }

  increment(amount) {
    if (amount == undefined) {
      amount = 1;
    }
    this.counter += amount;
  }

  setCounter(amount) {
    this.counter = amount;
  }

  execute() {
    this.counter -= 1;
    if (this.counter <= 0 && this.callback) {
      let ret = this.callback.apply(this.context, arguments);
      delete this.counter;
      delete this.callback;
      delete this.context;
      return ret;
    }
  }
}