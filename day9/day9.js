"use strict";

var part1 = {
  solve : function(){
    // Parse the input
    var raw = parseOnelineInput()

    // Remove cancelled characters
    var cancelled = cancelChars(raw)

    // Remove junk
    var clear = removeJunk(cancelled)

    // Traverse the stream keeping track of closing levels
    var stackSize = 0
    var score = 0
    for (var i = 0; i < clear.length; i++){
      if (clear.charAt(i) === '{'){
        stackSize++
      }
      else if (clear.charAt(i) === '}'){
        score += stackSize
        stackSize--
      }
    }

    // Display the answer
    document.getElementById("answer1").innerHTML = score
  }
}

var part2 = {
  solve: function(){
    // Parse the input
    var raw = parseOnelineInput()

    // Remove cancelled characters
    var cancelled = cancelChars(raw)

    // Display the answer
    document.getElementById("answer2").innerHTML = countJunk(cancelled)
  }
}

function parseOnelineInput(){
  return document.getElementById("inp").value
}

function cancelChars(raw){
  var cancelled = ""
  for (var i = 0; i < raw.length; i++){
    if (raw.charAt(i) === '!'){
      i++
    }
    else {
      cancelled +=raw.charAt(i)
    }
  }
  return cancelled
}

function removeJunk(cancelled){
  var clear = ""
  var inJunk = false
  for (var i = 0; i < cancelled.length; i++){
    if (inJunk && cancelled.charAt(i) === '>'){
      inJunk = false
    }
    else if (!inJunk && cancelled.charAt(i) === '<'){
      inJunk = true
    }
    else if (!inJunk){
      clear += cancelled.charAt(i)
    }
  }
  return clear
}

function countJunk(cancelled){
  var count = 0
  var inJunk = false
  for (var i = 0; i < cancelled.length; i++){
    if (inJunk && cancelled.charAt(i) === '>'){
      inJunk = false
    }
    else if (!inJunk && cancelled.charAt(i) === '<'){
      inJunk = true
    }
    else if (inJunk){
      count++
    }
  }
  return count
}
