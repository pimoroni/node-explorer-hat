var rpio = require('rpio');

function motor(pin1, pin2){
  this.pin1 = pin1;
  this.pin2 = pin2;
  this.reverse = false;

  rpio.open(pin1, rpio.OUTPUT, rpio.LOW);
  rpio.open(pin2, rpio.OUTPUT, rpio.LOW);
}

motor.prototype.forward = function(){
  rpio.write(this.pin1, !this.reverse ? rpio.HIGH : rpio.LOW);
  rpio.write(this.pin2, this.reverse ? rpio.HIGH : rpio.LOW);
}

motor.prototype.backward = function(){
  rpio.write(this.pin1, this.reverse ? rpio.HIGH : rpio.LOW);
  rpio.write(this.pin2, !this.reverse ? rpio.HIGH : rpio.LOW);
}

motor.prototype.stop = function(){
  rpio.write(this.pin1, rpio.LOW);
  rpio.write(this.pin2, rpio.LOW);
}

module.exports = {
  'one': new motor(35,38),
  'two': new motor(40,37)
}
