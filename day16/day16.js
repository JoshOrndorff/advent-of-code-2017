"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // Attach event listeners for each button.
  document.getElementById("button1").addEventListener("click", solvePart1)
  document.getElementById("button2").addEventListener("click", solvePart2)
  document.getElementById("buttonFreq").addEventListener("click", countMoveFrequency)

  // Global problem parameters
  var originalProgs = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"]
  var part2Iterations = 1000000000
  var movesText // my puzzle input
  var movesCallable // my puzzle input transformed to callable operations


  /**
   * Solves the first part of the problem and displays answer in the DOM
   */
  function solvePart1(){
    // Parse the input
    movesText = document.getElementById("inp").value.replace(/(\r\n|\n|\r)/gm,"").split(",")
    var progs = originalProgs.slice(0)
    convertMoves()

    // Perform the dance
    dance(progs)

    // Convert the list to a string and display it
    var answer = ""
    for (var i = 0; i < progs.length; i++){
      answer += progs[i]
    }
    document.getElementById("answer1").innerHTML = answer
  }


  /**
   * Solves the second part of the problem and displays answer in the DOM
   */
  function solvePart2(){
    // Parse the input
    movesText = document.getElementById("inp").value.replace(/(\r\n|\n|\r)/gm,"").split(",")
    var progs = originalProgs.slice(0)
    convertMoves()

    /*
    Running the dance routine all billion times takes too long.
    I considered whether there were cycles in the output states. The maximum possible
    cycle length is 16! which is worse than a billion. I thought maybe there were shorter
    cycles through luck and set out to measure cycle length. That also proved intractible.

    My best guess right now is to optimize the dance moves or whole routine. The worst
    moves are O(n) and n is 16. A factor of 16 speedup isn't enough. Is there a way to
    optimize the whole routine? Maybe only parst the moves once.

    Actually, let's step through the cycle checking. That may be buggy.
    */


    // Perform the dance repeatedly until we reach a previously seen state.
    var states = new Set()
    var p = String(progs)
    while (!states.has(p)){
      states.add(p)
      dance(progs)
      p = String(progs)
    }
    var cycleLength = states.size

    // Dance all the rest of the cycles, and dance the few remaining times
    for (var i = part2Iterations % cycleLength; i > 0; i--){
      dance(progs)
    }

    // Convert the list to a string and display it
    var answer = ""
    for (var i = 0; i < progs.length; i++){
      answer += progs[i]
    }
    document.getElementById("answer2").innerHTML = answer

  }


  /**
   * Counts how frequently each move occurs in my dance
   * routine to help determine where to optimize
   */
  function countMoveFrequency(){
    // Parse the input
    var moves = document.getElementById("inp").value.replace(/(\r\n|\n|\r)/gm,"").split(",")

    var spins = 0
    var exchanges = 0
    var partners = 0

    for (var move of moves){
      switch (move.charAt(0)){
        case "s":
          spins++
          break

        case "x":
          exchanges++
          break

        case "p":
          partners++
          break
      }
    }

    var answer = "spins: " + spins + ", exchanges: " + exchanges + ", partners: " + partners
    document.getElementById("freqs").innerHTML = answer

  }


  /**
   * Converts a string-based list of dance moves into
   * a list of callable functions representation those
   * moves' mutations. Operates on globals: movesText and
   * movesCallable.
   * Javascript closures are trippy af, and all the anonymous
   * functions are explained https://stackoverflow.com/a/8214857/4184410
   */
  function convertMoves(){
    movesCallable = []
    for (var move of movesText){
      var nextCallable
      switch (move.charAt(0)){
        case "s":
          var x = parseInt(move.slice(1))
          nextCallable = (function(contextX){
            return function(progs){
              spin(progs, contextX)
            }
          })(x)
          break

        case "x":
          var a = parseInt(move.slice(1, move.indexOf("/")))
          var b = parseInt(move.slice(move.indexOf("/") + 1))
          nextCallable = (function(contextA, contextB){
            return function(progs){
              exchange(progs, contextA, contextB)
            }
          })(a, b)
          break

        case "p":
          var a = move.slice(1, move.indexOf("/"))
          var b = move.slice(move.indexOf("/") + 1)
          nextCallable = (function(contextA, contextB){
            return function(progs){
              partner(progs, contextA, contextB)
            }
          })(a, b)
          break
      }
      movesCallable.push(nextCallable)
    }
  }

  /**
   * Mutate the given list of programs according to the global dance moves
   * @param progs The list of programs doing the dancing
   */
  function dance(progs){
    // Loop through the moves processing each one
    for (var move of movesCallable){
      move(progs)
    }
  }

  /**
   * Mutates the global progs acording to a spin operation
   * Implementation O(n)
   */
  function spin(progs, n){
    var copy = progs.slice(0)
    var start = - n
    for (var i = 0; i < progs.length; i++){
      // hack for engative mods: https://stackoverflow.com/a/17323608/4184410
      var source = ((start + i) % progs.length + progs.length) % progs.length
      progs[i] = copy[source]
    }
  }


  /**
   * Mutates the global progs acording to an exchange operation
   * Implementation O(1)
   */
  function exchange(progs, a, b){
    var temp = progs[a]
    progs[a] = progs[b]
    progs[b] = temp
  }


  /**
   * Mutates the global progs acording to a partner operation
   * Implementation O(n)
   */
  function partner(progs, a, b){
    for ( var i = 0; i < progs.length; i++){
      if (progs[i] === a){
        progs[i] = b
      }
      else if (progs[i] === b){
        progs[i] = a
      }
    }
  }

})
