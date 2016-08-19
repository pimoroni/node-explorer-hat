rpio = require('rpio');

function light(pin){
  rpio.open(pin, rpio.OUTPUT, rpio.LOW);
  this.pin = pin;
}

light.prototype.on = function(){
  rpio.write(this.pin, rpio.HIGH);
}

light.prototype.off = function(){
  rpio.write(this.pin, rpio.LOW);
}

module.exports = {
  'one':   new light(7),
  'two':   new light(11),
  'three': new light(13),
  'four':  new light(29),
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
