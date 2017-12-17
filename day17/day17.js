"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // Attach event listeners for each button.
  document.getElementById("button1").addEventListener("click", solvePart1)
  document.getElementById("button2").addEventListener("click", solvePart2)


  /**
   * Solves the first part of the problem and displays answer in the DOM
   */
  function solvePart1(){
    // Parse the input
    var steps = parseInt(document.getElementById("inp").value)
    var buffer = [0]
    var cur = 0

    // Loop through all 2017 times growing the buffer
    for (var i = 1; i <= 2017; i++){
      cur = (cur + steps + 1) % buffer.length // +1 to insert after
      buffer.splice(cur, 0, i)
    }

    // Figure out what is after the current position
    var answer = buffer[cur + 1]

    // Display the answer
    document.getElementById("answer1").innerHTML = answer
  }


  /**
   * Solves the second part of the problem and displays answer in the DOM
   */
  function solvePart2(){
    // Parse the input and get setup
    var steps = parseInt(document.getElementById("inp").value)
    var cur = 0
    var length = 1
    var zeroSpot = 0
    var next

    // Loop through all fifty million times growing the buffer
    for (var i = 1; i <= 50000000; i++){
      // Figure out where the next insertion belongs
      cur = (cur + steps) % length

      // If inserting right after zero, note the new neighbor
      if (cur === zeroSpot){
        next = i
      }

      // If inserting before zero, zero gets shifted right
      else if (cur < zeroSpot){
        zeroSpot++
      }

      // Length and cur always increase from the insert
      length++
      cur++
    }
    // Display the answer
    document.getElementById("answer2").innerHTML = next
  }


})
