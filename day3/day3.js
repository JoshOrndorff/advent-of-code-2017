"use strict";

function solvePart1(){
  // First convert the starting square to zero-based indexing
  var square = parseInt(document.getElementById("square").value) - 1

  // Determine which layer the square is in
  var layer = 0;
  while (square >= Math.pow(2 * layer + 1, 2)){
    layer++
  }

  /* Determine lateral distance we have to move within the layer
     by looping through the four edge locations and seeing
     which is closest. The zero-based cell number of the four
     edge locations in each layer are given by:
     4n2 - 3n, 4n2 - n, 4n2 + n, 4n2 + 3n */
  var firstEdge = (4 * layer - 3) * layer
  var shortestSoFar
  for (var i = 0; i < 4; i++){
    var currentEdge = firstEdge + 2 * i * layer
    var latDistance = Math.abs(square - currentEdge)
    if (( typeof shortestSoFar == 'undefined') || latDistance < shortestSoFar){
      shortestSoFar = latDistance
    }
  }

  // The final distance is the sum of the layer and the lateral distance
  var distance = layer + shortestSoFar

  // Display
  document.getElementById("answer1").innerHTML = distance

}

function solvePart2(){
  // First get the puzzle input
  // Doing this one 1-based
  var target = parseInt(document.getElementById("square").value)

  // Setup a dictionary to store cell values, and some other variables
  var grid = {}
  grid[makeKey(0, 0)] = 1
  var latest = 1
  var x = 0
  var y = 0

  var directions = ["right", "up", "left", "down"]
  var direction = -1
  var stepsUntilTurn = 0
  var length = 0
  var increaseLength = true

  // Fill in squares until we have one higher than the target
  while (latest < target){

    // Figure out whether it's time to turn
    if (stepsUntilTurn === 0){
      direction++
      if (increaseLength){
        length++
      }
      increaseLength = !increaseLength
      stepsUntilTurn = length
    }
    stepsUntilTurn--

    // Make the appropriate move
    switch (directions[direction % 4]){
      case "right":
        x++
        break

      case "up":
        y++
        break

      case "left":
        x--
        break

      case "down":
        y--
        break
    }

    //console.log(directions[direction % 4])
    latest = getVal(x, y, grid)
    grid[makeKey(x, y)] = latest
  }

  // Display
  document.getElementById("answer2").innerHTML = latest
}

function makeKey(x, y){
  return (x + "," + y)
}


function getVal(x, y, grid){
  var summ = 0

  if (makeKey(x-1, y-1) in grid){
    summ += grid[makeKey(x-1, y-1)]
  }
  if (makeKey(x-1, y) in grid){
    summ += grid[makeKey(x-1, y)]
  }
  if (makeKey(x-1, y+1) in grid){
    summ += grid[makeKey(x-1, y+1)]
  }
  if (makeKey(x, y-1) in grid){
    summ += grid[makeKey(x, y-1)]
  }
  if (makeKey(x, y+1) in grid){
    summ += grid[makeKey(x, y+1)]
  }
  if (makeKey(x+1, y-1) in grid){
    summ += grid[makeKey(x+1, y-1)]
  }
  if (makeKey(x+1, y) in grid){
    summ += grid[makeKey(x+1, y)]
  }
  if (makeKey(x+1, y+1) in grid){
    summ += grid[makeKey(x+1, y+1)]
  }

  return summ
}
