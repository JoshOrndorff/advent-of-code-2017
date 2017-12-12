"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // Attach event listeners for each button.
  document.getElementById("button1").addEventListener("click", solvePart1)
  document.getElementById("button2").addEventListener("click", solvePart2)

  function solvePart1(){
    // Parse the input
    var inp = parseMultilineInput()
    var inp = parseOnelineInput()

    // Cast to numbers
    inp = inp.map(Number)

    //




    // Display the answer
    document.getElementById("answer1").innerHTML = "fill me in"
  }

  function solvePart2(){

    // Display the answer
    document.getElementById("answer2").innerHTML = "fill me in"
  }

  function parseMultilineInput(){
    var lines = document.getElementById("inp").value.split("\n")

    // Cut off empty string caused by eg trailing newline
    if (lines[lines.length - 1] == ""){
      lines = lines.slice(0, -1) // chop off empty one at end
    }

    return lines
  }

  function parseOnelineInput(){
    var inp = document.getElementById("inp").value.split("\t")

    return inp
  }

})
