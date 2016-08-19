rpio = require('rpio');

function input(pin){
  rpio.open(pin, rpio.INPUT, rpio.LOW);
  this.pin = pin;
}

input.prototype.read = function(){
  return rpio.read(this.pin, rpio.HIGH);
}

module.exports = {
  'one':   new input(16),
  'two':   new input(15),
  'three': new input(18),
  'four':  new input(22),
  'read':    function(){
    var result = [];
    for(var x in module.exports){
      x = module.exports[x];
      if(x.read && typeof(x.read) === 'function') result.push(x.read());
    }
    return result;
  }
}
