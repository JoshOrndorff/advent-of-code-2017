"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // Attach event listeners for each button.
  document.getElementById("button1").addEventListener("click", solvePart1)
  document.getElementById("button2").addEventListener("click", solvePart2)

  // Globals
  var firewall
  var numLayers

  function solvePart1(){
    // Parse the input
    parseInput()

    // Display the answer
    document.getElementById("answer1").innerHTML = tripSeverity(0)
  }

  function solvePart2(){
    // 79 is wrong -- Forgot to distinguish between what turn it was and what layer I was on
    //                In part 1 those were the same thing.
    //
    // 47400 is wrong -- Severity === 0 is NOT synonymous with didn't get caught. If you get
    //                   caught on the 0th layer the severity is zero, but you were still caught.
    parseInput()

    var wait = 0
    while (gotCaught(wait) > 0){
      wait++
    }
    // Display the answer
    document.getElementById("answer2").innerHTML = wait
  }

  /**
   * Determine whether we got caught
   */
  function gotCaught(delay){
    // Go through each turn and see whether we got caught
    var layer = 0
    while (layer <= numLayers){
      var roundTripTime = firewall[layer] * 2 - 2

      // See if we got caught
      if ((layer + delay) % roundTripTime === 0){
        return true
      }

      layer++
    }
    return false

  }

  /**
   * Calculates the severity of a pass through the firewall
   * Severity of zero is NOT synonymous with did-not-get-caught
   */
  function tripSeverity(delay){
    // Go through each turn counting the severity
    var layer = 0
    var severity = 0
    while (layer <= numLayers){
      var roundTripTime = firewall[layer] * 2 - 2

      // See if we got caught
      if ((layer + delay) % roundTripTime === 0){
        severity += layer * firewall[layer]
      }

      layer++
    }
    return severity
  }

  /**
   * Reads input into map
   */
  function parseInput(){
    var lines = document.getElementById("inp").value.split("\n")

    // Cut off empty string caused by eg trailing newline
    if (lines[lines.length - 1] == ""){
      lines = lines.slice(0, -1) // chop off empty one at end
    }

    // Initialize the firewall and count the layers
    firewall = {}
    numLayers = 0

    for (var line of lines){
      var layer = line.slice(0, line.indexOf(":"))
      var range = parseInt(line.slice(line.indexOf(":") + 2))

      firewall[layer] = range
      if (layer > numLayers){
        numLayers = layer
      }
    }
  }

})
