var i2c = require('i2c');

ADC_ADDR = 0x48

function analog(){

  this.i2c = new i2c(ADC_ADDR, { device: '/dev/i2c-1' } );
  this.busy = false;

}

analog.prototype.read = function(channel, callback){
  var self = this;

  var delay = 1000 / 1600 + 1;

  // If the ADC is busy, wait for the previous operation to finish 
  if(self.busy){
    setTimeout(function(){
      self.read(channel, callback);      
    },delay + 10);

    return;
  };

  // Assert the busy state
  self.busy = true;

  var config = 0x0003 | 0x0100 | 0x8000; // Single Shot mode

  config |= (4 - channel + 4) << 12;
  config |= 0x0000; // 6144V Programmable Gain
  config |= 0x0080; // 1600 Samples Per Second

  var data = [(config >> 8) & 0xff, config & 0xff];

  self.i2c.writeBytes(0x01, data, function(error){

    if(error){
      self.busy = false;
      callback("Write Failed", channel, 0);
      return;
    }

    setTimeout(function() {

      self.i2c.readBytes(0x00, 2, function(error, result) {
        if(error){
          self.busy = false;
          callback("Read Failed", channel, 0);
          return;
        }

        var reading = (((result[0] << 8) | result[1]) >> 4) * 6144 / 2048 / 1000;

        self.busy = false;
        callback(null, channel, reading);
      })

    }, delay);

  })

}

module.exports = new analog();
