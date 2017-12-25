"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // Attach event listeners for each button.
  document.getElementById("button1").addEventListener("click", solveBoth)

  // Global problem parameters
  var diagram
  var x
  var y
  var w
  var h
  var direction


  /**
   * Solves the both parts of the problem and displays answers in the DOM
   */
  function solveBoth(){
    // Parse input and initialize the globals
    init()

    // Keep track of answers
    var letters = ""
    var steps = 0

    // Walk through the diagram one step at a time
    while(walkable(symbol())) {

      // Move in the correct direction
      steps++
      switch (direction){
        case "down" : y++; break;
        case "right": x++; break;
        case "up"   : y--; break;
        case "left" : x--; break;
      }

      // See what to do next
      if (symbol() === "+"){
        if (direction === "left" || direction === "right"){
          if (walkable(symbol(x, y+1))){
            direction = "down"
          }
          else {
            direction = "up"
          }
        }
        else if (direction === "up" || direction === "down"){
          if (walkable(symbol(x+1, y))){
            direction = "right"
          }
          else {
            direction = "left"
          }
        }
        else{
          console.log("Standing on + at " + x + ", " + y + "but no walkable neighbors found.")
        }
      }

      else if(symbol().match(/[A-Z]/i)){
        letters+=symbol()
      }
    }

    // Display the answers
    document.getElementById("answer1").innerHTML = letters
    document.getElementById("answer2").innerHTML = steps
  }

  /**
   * Syntax-saver to give the symbol on the current square of the diagram
   * @param myX A specific x value to check
   * @param myY A specific y value to check
   * @return A one-character string from the diagram, or "out of bounds"
   */
  function symbol(myX, myY){
    if (myX === undefined)
      myX = x
    if (myY === undefined)
      myY = y
    return diagram[myY].charAt(myX)
  }


  /**
   * Reads the input from the textarea in the DOM
   * Initializes globals diagram, x, y, w, h
   */
  function init(){
    // Get the input
    diagram = document.getElementById("inp").value.split("\n")

    // Add a blank row so the copy-pasted example input works.
    diagram.push("\n")

    // Initialize width and height
    h = diagram.length
    w = diagram[0].length

    // Find the starting location
    direction = "down"
    y = 0
    x = 0
    while (symbol() !== "|"){
      x++
    }
  }


  /**
   * Tells whether the given character represents a walkable part of a diagram.
   * @param c The character to check
   * @return Whether the square is walkable
   */
  function walkable(c){
    return c === "|" || c === "-" || c === "+" || c.match(/[a-z]/i)
  }

})
