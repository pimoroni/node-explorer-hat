rpio = require('rpio');

function output(pin){
  rpio.open(pin, rpio.OUTPUT, rpio.LOW);
  this.pin = pin;
}

output.prototype.on = function(){
  rpio.write(this.pin, rpio.HIGH);
}

output.prototype.off = function(){
  rpio.write(this.pin, rpio.LOW);
}

module.exports = {
  'one':   new output(31),
  'two':   new output(32),
  'three': new output(33),
  'four':  new output(36),
  'on':    function(){
    for(var x in module.exports){
      x = module.exports[x];
      if(x.on && typeof(x.on) === 'function') x.on();
    }
  },
  'off':   function(){
    for(var x in module.exports){
      x = module.exports[x];
      if(x.off && typeof(x.off) === 'function') x.off();
    }
  }
}
