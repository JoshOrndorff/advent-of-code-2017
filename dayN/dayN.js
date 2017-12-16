"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // Attach event listeners for each button.
  document.getElementById("button1").addEventListener("click", solvePart1)
  document.getElementById("button2").addEventListener("click", solvePart2)

  // Global common problem parameters


  // Global my problem parameters
  var inp


  /**
   * Solves the first part of the problem and displays answer in the DOM
   */
  function solvePart1(){
    // Parse the input
    inp = parseMultilineInput()
    inp = document.getElementById("inp").value.split("\t")

    //




    // Display the answer
    document.getElementById("answer1").innerHTML = "fill me in"
  }


  /**
   * Solves the second part of the problem and displays answer in the DOM
   */
  function solvePart2(){

    // Display the answer
    document.getElementById("answer2").innerHTML = "fill me in"
  }


  /**
   * Reads the input from the textarea in the DOM. Cuts of trailing blank line
   * when it is present
   * @return List of lines from the textarea
   */
  function parseMultilineInput(){
    var lines = document.getElementById("inp").value.split("\n")

    // Cut off empty string caused by eg trailing newline
    if (lines[lines.length - 1] == ""){
      lines = lines.slice(0, -1) // chop off empty one at end
    }

    return lines
  }


})
