"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // Attach event listeners for each button.
  document.getElementById("button1").addEventListener("click", solvePart1)
  document.getElementById("button2").addEventListener("click", solvePart2)

  // Global problem parameters
  var map
  var board


  /**
   * Solves the first part of the problem and displays answer in the DOM
   */
  function solvePart1(){

    // Display the answer
    document.getElementById("answer1").innerHTML = artAndCount(5)
  }


  /**
   * Solves the second part of the problem and displays answer in the DOM
   */
  function solvePart2(){

    // Display the answer
    document.getElementById("answer2").innerHTML = artAndCount(18)
  }


  /**
   * Makes the fractal art and counts how many pixels are on.
   * @param iterations Number of iterations to perform before stopping to count.
   * @return The number of pixels that are left on.
   */
  function artAndCount(iterations){
    // Initialize the starting board
    board = [[".", "#", "."],
             [".", ".", "#"],
             ["#", "#", "#"]]

    // Parse the input into the global map
    buildMap()

    // Run the process the required number of times
    for (var times = iterations; times > 0; times--){
      iterate()
    }

    // Loop through the final board countring how many bits are on (#)
    var onBits = 0
    for (var row of board){
      for (var bit of row){
        if (bit === "#"){
          onBits++
        }
      }
    }

    return onBits
  }


  /**
   * Mutatues the global board array to generate the next iteration in the
   * art process.
   */
  function iterate(){
    var base = board.length % 2 === 0 ? 2 : 3

    // Make a new board to populate
    var newBoard = []

    // Fill the new board with grown content
    var times = Math.floor(board.length / base)
    for (var i = 0; i < times; i++){
      // Init the next few (base + 1) rows
      for (var r = 0; r < base + 1; r ++){
        newBoard.push([])
      }
      for (var j = 0; j < times; j++){
        var oldChunk = getChunk(i, j, base)
        var oldStr = arrToStr(oldChunk)
        var newStr = map[oldStr]
        var newChunk = strToArr(newStr)
        for (var x = 0; x < base + 1; x++){
          // Javascript syntax for the following courtesy of:
          // https://stackoverflow.com/a/1374131/4184410
          //newBoard[(i * (base + 1)) + x].extend(newChunk[x])
          Array.prototype.push.apply(newBoard[(i * (base + 1)) + x], newChunk[x])
        }
      }
    }

    // Finally, make the hot swap
    board = newBoard
  }

  /**
   * Returns the ith, jth subgroup or size base
   * @param i the row index of the group to grab (indexed by chunk)
   * @param j the column index of the group to grab (indexed by chunk)
   * @param base The size of the chunks. (precondition: must divide baord size)
   * @return The chunk as a 2D subgroup
   */
  function getChunk(i, j, base){
    var chunk = []
    for (var x = 0; x < base; x++){
      chunk.push(board[(base * i) + x].slice(base * j, base * (j + 1)))
    }
    return chunk
  }


  /**
   * Reads the input from the textarea in the DOM. Cuts off trailing blank line
   * when it is present. Parses each line into one or more transforamtions and
   * adds all transformations to global map object.
   */
  function buildMap(){
    var lines = document.getElementById("inp").value.split("\n")

    // Cut off empty string caused by trailing newline
    if (lines[lines.length - 1] == ""){
      lines = lines.slice(0, -1) // chop off empty one at end
    }

    // Convert each line into several symmetric transformations
    map = {}
    for (var line of lines){
      var argStr = line.slice(0, line.indexOf(" "))
      var imageStr = line.slice(line.indexOf(" ") + 4)

      // Build actual array to compute symmetries
      var currentArr = strToArr(argStr)

      // Compute symmetries using helpers
      var symmetries = getSymmetries(currentArr)

      // Put symmetr transforamtions, pointing back to the same image
      for (var symmetryArr of symmetries){
        var symStr = arrToStr(symmetryArr)
        map[symStr] = imageStr
      }
    }
  }

  /**
   * Given a 2D array object, computes all symmetries, and returns them as
   * an array including the original.
   * @param inArr The input array
   * @return An array of all symmetries
   */
  function getSymmetries(inArr){
    // Make the anser array and prime it with the original
    var symmetries = [inArr]

    // Three rotations
    var rotated = rotCopy(inArr)
    symmetries.push(rotated)
    rotated = rotCopy(rotated)
    symmetries.push(rotated)
    rotated = rotCopy(rotated)
    symmetries.push(rotated)

    // Vertical flip to switch chirality
    var mirrored = revCopy(inArr)
    symmetries.push(mirrored)

    // Three more rotations
    rotated = rotCopy(mirrored)
    symmetries.push(rotated)
    rotated = rotCopy(rotated)
    symmetries.push(rotated)
    rotated = rotCopy(rotated)
    symmetries.push(rotated)

    // Give back the answer
    return symmetries
  }


  /**
   * Convert a string of the ../.. format to an actual 2D array.
   * @param instr The input string
   * @return The 2D array of appropriate size
   */
  function strToArr(instr){
    var size = Math.floor(Math.sqrt(instr.length))
    var arr = []
    var index = 0

    for (var i = 0; i < size; i++){
      arr[i] = []
      for (var j = 0; j < size; j++){
        arr[i][j] = instr.charAt(index)
        index++
      }
      index++ // account for the slash
    }

    return arr
  }

  /**
   * Convert a 2D array into a string of the ../.. format.
   * @param arr The array to be converted
   * @return the generated string
   */
  function arrToStr(arr){
    var size = arr.length
    var answer = ""
    for (var i = 0; i < size; i++){
      for (var j = 0; j < size; j++){
        answer += arr[i][j]
      }
    answer += "/"
    }

    // chop off the final extra slash
    return answer.slice(0, answer.length - 1)
  }

  /**
   * Creates a copy of the given array in reverse order
   * @param inArr The input array
   * @return The reversed copy
   */
  function revCopy(inArr){
    var copy = []
    for (var i = inArr.length - 1; i >= 0; i--){
      copy.push(inArr[i])
    }
    return copy
  }

  /**
   * Creates a rotated (clockwise) copy of the given array
   * @param inArr The input array
   * @return The rotated copy
   */
  function rotCopy(inArr){
    // Make a blank 2D to copy into
    var copy = []
    for (var i = 0; i < inArr.length; i++){
      copy.push([])
    }

    // Do the copying
    for (var i = 0; i < inArr.length; i++){
      for (var j = 0; j < inArr.length; j++){
        copy[j][inArr.length - i - 1] = inArr[i][j]
      }
    }

    return copy
  }

  /**
   * Helper to visualize the board. Not actually used in the production code.
   */
  function logBoard(){
    for (var i = 0; i < board.length; i++){
      console.log(board[i])
    }
  }


})
