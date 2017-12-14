"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // Attach event listeners for each button.
  document.getElementById("button1").addEventListener("click", solvePart1)
  document.getElementById("button2").addEventListener("click", solvePart2)
  document.getElementById("buttonShow").addEventListener("click", showGrid)

  /**
   * Global grid is a list of rows, each row is a string of 1s and 0s
   */
  var grid

  /**
   * Global regions is a set of all regions which are themselves sets
   */
  var regions


  function solvePart1(){
    // Parse the input
    initGrid()

    // Loop through the rows computing hashes and counting used cells
    var totalUsed = 0
    for (var row of grid){
      for (var i = 0; i < row.length; i++){
        if(row.charAt(i) === "1"){
          totalUsed++
        }
      }
    }

    // Display the answer
    document.getElementById("answer1").innerHTML = totalUsed
  }


  function solvePart2(){
    // Parse the input
    initGrid()

    //
    regions = new Set()

    // Loop through each cell putting it in the right region
    for (var i = 0; i < grid.length; i++){
      for (var j = 0; j < grid[i].length; j++){
        var cell = grid[i].charAt(j)
        if (cell === "1"){
          updateRegions(i, j)
        }
      }
    }

    // Display the answer
    document.getElementById("answer2").innerHTML = regions.size
  }


  function showGrid(){
    // Initialize the globals
    initGrid()

    // Clear the old result from the area
    document.getElementById("grid").innerHTML = ""

    // Display the new grid
    for (var line of grid){
      document.getElementById("grid").innerHTML += line + "<br />"
    }
  }


  /**
   * Adds the cell at coordinates i, j to the regions combining existing
   * regions as necessary.
   */
  function updateRegions(i, j){
    // Setup coordinates
    var me   = i       + "," + j
    var up   = (i - 1) + "," + j
    var left = i       + "," + (j - 1)

    // Find or make regions
    var myRegion = new Set()
    myRegion.add(me)
    var topRegion = getRegion(up)
    var leftRegion = getRegion(left)

    // Combine regions
    if (topRegion !== undefined){
      topRegion.forEach(myRegion.add, myRegion)
      regions.delete(topRegion)
    }
    if (leftRegion !== undefined){
      leftRegion.forEach(myRegion.add, myRegion)
      regions.delete(leftRegion)
    }

    // Add the newly built region
    regions.add(myRegion)
  }


  /**
   * Finds and returns the region containing the given coordinates
   * @param coords The coordinates of the cell whose regions is sought
   * @return The regiond containing the cell at coords, or undefined if the cell is not known
   */
  function getRegion(coords){
    for (var region of regions){
      if (region.has(coords)){
        return region
      }
    }

    // No existing regions had the cell
    return undefined
  }


  /**
   * Initializes the grid by grabbing the puzzle input and hashing away
   */
  function initGrid(){
    var key = document.getElementById("inp").value
    grid = []

    // Loop through the rows computing hashes
    for (var i = 0; i < 128; i++){
      var hash = knotHash(key + "-" + i)
      grid[i] = tostr2(hash)
    }
  }


  /**
   * TODO This method does not work, and I don't know why. See tostr2 for a working version.
   * Returns a string of # and . to represent binary like in the problem
   * @param hexStr A hexadecimal string to be converted
   * @return The string representation of the binary
   */
  function tostr(hexStr){
    var num = parseInt(hexStr, 16)
    var answer = ""

    while(answer.length < 128){
      if (num % 2 === 1){
        answer = "1" + answer
      }
      else {
        answer = "0" + answer
      }
      num = Math.floor(num / 2) // Freaking lack of integer division. I hope this compiles optimally.
    }

    return answer
  }


  /**
   * Returns a string of # and . to represent binary like in the problem
   * @param hexStr A hexadecimal string to be converted
   * @return The string representation of the binary
   */
  function tostr2(hexStr){
    var answer = ""
    for (var i = 0; i < hexStr.length; i++){
      var cur = hexStr.charAt(i)
      switch (cur){
        case "f": answer += "1111"; break;
        case "e": answer += "1110"; break;
        case "d": answer += "1101"; break;
        case "c": answer += "1100"; break;
        case "b": answer += "1011"; break;
        case "a": answer += "1010"; break;
        case "9": answer += "1001"; break;
        case "8": answer += "1000"; break;
        case "7": answer += "0111"; break;
        case "6": answer += "0110"; break;
        case "5": answer += "0101"; break;
        case "4": answer += "0100"; break;
        case "3": answer += "0011"; break;
        case "2": answer += "0010"; break;
        case "1": answer += "0001"; break;
        case "0": answer += "0000"; break;
      }
    }
    return answer
  }


})
