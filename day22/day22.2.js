"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // Attach event listeners for each button.
  document.getElementById("button2").addEventListener("click", solvePart2)


  // Global grid params. Uses coordinates in mathematical x, y format
  var infected
  var weakened
  var flagged
  var curX
  var curY
  var planted
  var facing
  var totalBursts = 10000000


  /**
   * Solves the second part of the problem and displays answer in the DOM
   */
  function solvePart2(){
    // Initialize the globals
    init()

    // Repeatedly step the requested number of times
    for (var burstsLeft = totalBursts; burstsLeft > 0; burstsLeft--){

      var curCoords = coords(curX, curY)

      // Depending on current node's state, turn and update state
      if (infected.has(curCoords)){
        turn("right")
        infected.delete(curCoords)
        flagged.add(curCoords)
      }
      else if (weakened.has(curCoords)){
        // Don't turn
        weakened.delete(curCoords)
        infected.add(curCoords)
        planted++
      }
      else if (flagged.has(curCoords)){
        turn("around")
        flagged.delete(curCoords)
        // Nothing to add; clean is default
      }
      else /* it's clean*/ {
        turn("left")
        // Nothing to delete; clean was default
        weakened.add(curCoords)
      }

      // Step forward
      switch (facing){
        case "up"   : curY++; break;
        case "right": curX++; break;
        case "down" : curY--; break;
        case "left" : curX--; break;
      }

    }

    // Display the answer
    document.getElementById("answer2").innerHTML = "infections planted:" + planted
  }


  /**
   * Reads the input from the textarea in the DOM. Cuts of trailing blank line
   * when it is present, and initializes the gloabls.
   */
  function init(){
    var lines = document.getElementById("inp").value.split("\n")

    // Cut off empty string caused by eg trailing newline
    if (lines[lines.length - 1] == ""){
      lines = lines.slice(0, -1) // chop off empty one at end
    }

    var semiWidth = (lines[0].length - 1) / 2

    // Initialize sets
    infected = new Set()
    weakened = new Set()
    flagged  = new Set()

    // Loop through input noting infected nodes.
    var y = semiWidth
    for (var i = 0; i < lines.length; i++){
      var x = -semiWidth
      for (var j = 0; j < lines[i].length; j++){
        if (lines[i].charAt(j) === "#"){
          infected.add(coords(x, y))
        }
        x++
      }
      y--
    }

    // Initialize the starting location in the center
    curX = 0
    curY = 0
    facing = "up"

    // No infections planted yet
    planted = 0
  }

  /**
   * Transforms the given integers into a string coordinate format
   * @param x The x coordinate (eg 4)
   * @param y The y coordinate (eg 3)
   * @return The string coord (eg "4,3")
   */
  function coords(x, y){
    return "" + x + "," + y
  }

  /**
   * Modifies the global facing variable
   * @param dir Which way to turn ("left", "right", or "around")
   */
  function turn(dir){
    if (dir === "right" && facing === "up")
      facing = "right"
    else if (dir === "right" && facing === "right")
      facing = "down"
    else if (dir === "right" && facing === "down")
      facing = "left"
    else if (dir === "right" && facing === "left")
      facing = "up"

    else if (dir === "left" && facing === "up")
      facing = "left"
    else if (dir === "left" && facing === "left")
      facing = "down"
    else if (dir === "left" && facing === "down")
      facing = "right"
    else if (dir === "left" && facing === "right")
      facing = "up"

    else if (dir === "around" && facing === "up")
      facing = "down"
    else if (dir === "around" && facing === "left")
      facing = "right"
    else if (dir === "around" && facing === "down")
      facing = "up"
    else if (dir === "around" && facing === "right")
      facing = "left"
  }


})
