var explorerhat = require('./index.js')

for(var key in explorerhat){
  global[key] = explorerhat[key]
}

function test_analog(){
  console.log("Testing analog...")

  for(x = 1; x < 5; x++){
    analog.read(x, function(error, channel, result){
      console.log(channel, result)
    })
  }
}

function test_input(){
  console.log("Testing inputs...", input.read())
}

function test_motor(){
  console.log("Testing motor...")

  motor.one.forward()
  motor.two.backward()

  setTimeout(function(){
    motor.one.backward()
    motor.two.forward()
  },1000)

  setTimeout(function(){
    motor.one.stop()
    motor.two.stop()
  },2000)
}

function test_light(){
  console.log("Testing lights...")

  light.one.on()
  light.two.on()
  light.three.on()
  light.four.on()

  setTimeout(function(){
    light.off()
  },1000)
}

function test_output(){
  console.log("Testing outputs...")

  output.one.on()
  output.two.on()
  output.three.on()
  output.four.on()

  setTimeout(function(){
    output.off()
  },1000)
}

var t = 0

var tests = [
  test_input,
  test_output,
  test_motor,
  test_analog,
  test_light
]

console.log("Scheduling tests...");

for(var i in tests){
  var fn = tests[i]
  if( typeof(fn) === 'function' ){
    setTimeout(fn, t)
    t += 2000
  }
}

