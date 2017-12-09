"use strict";

function solvePart1(){
  // Split the input into memory banks and make them integers
  var banks = document.getElementById("banks").value.split("\t")
  banks = banks.map(Number) // weird parseInt behavior https://stackoverflow.com/q/14528397/4184410

  // Keep track of what states we've seen, and when we saw them
  var states = new Set()
  var steps = 0

  // Redistribute until a previously seen location.
  while (!states.has(banks.toString())){
    states.add(banks.toString())
    redist()
    steps++
  }


  // Display the answer
  document.getElementById("answer1").innerHTML = steps









  // Using inner function so banks is in scope
  function redist(){
    // Find which bin is largest
    var largestVal = 0
    var largestIndex = 0
    for (var i = 0; i < banks.length; i++){
      if (banks[i] > largestVal){
        largestVal = banks[i]
        largestIndex = i
      }
    }

    // Take the blocks out
    var extras = banks[largestIndex]
    banks[largestIndex] = 0

    // Redistribute them
    for (var i = largestIndex + 1; extras > 0; i++){
      banks[i % banks.length]++
      extras--
    }
  }
}
