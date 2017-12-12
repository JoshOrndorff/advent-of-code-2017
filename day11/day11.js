"use strict";

var day11 = (function(){
  // Globals here
  var glob = {}

  glob.solvePart1 = function(){
    // Parse the input
    var path = parseOnelineInput()

    // Coordinates to keep track of the kids movement
    var n = 0
    var w = 0

    for (var i = 0; i < path.length; i++){
      switch (path[i]){
        case  "n": n += 2;   break;
        case "ne": n++; w--; break;
        case "nw": n++; w++; break;
        case  "s": n -= 2;   break;
        case "se": n--; w--; break;
        case "sw": n--; w++; break;
      }
    }

    // Figure out the shortest path back
    var totalSteps = shortest(n, w)

    // Display the answer
    document.getElementById("answer1").innerHTML = totalSteps
  }

  glob.solvePart2 = function(){
    // Parse the input
    var path = parseOnelineInput()

    // Coordinates to keep track of the kids movement
    var n = 0
    var w = 0
    var maxDist = 0

    for (var i = 0; i < path.length; i++){
      switch (path[i]){
        case  "n": n += 2;   break;
        case "ne": n++; w--; break;
        case "nw": n++; w++; break;
        case  "s": n -= 2;   break;
        case "se": n--; w--; break;
        case "sw": n--; w++; break;
      }

      var curDist = shortest(n, w)
      if (curDist > maxDist){
        maxDist = curDist
      }
    }

    // Display the answer
    document.getElementById("answer2").innerHTML = maxDist
  }


  function parseOnelineInput(){
    var inp = document.getElementById("inp").value.split("\n")[0].split(",")

    return inp
  }

  return glob

  function shortest(n, w){
    w = Math.abs(w)
    n = Math.abs(n)

    var totalSteps = w
    if (n > w){
      totalSteps += (n - w) / 2
    }

    return totalSteps
  }
})()
