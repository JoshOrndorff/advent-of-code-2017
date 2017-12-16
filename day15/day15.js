"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // Attach event listeners for each button.
  document.getElementById("button1").addEventListener("click", solvePart1)
  document.getElementById("button2").addEventListener("click", solvePart2)

  // Global common problem parameters
  var factorA = 16807
  var factorB = 48271
  var mod = 2147483647

  // Global personal problem parameters
  var startA
  var startB


  function solvePart1(){
    init()

    // Make the generators
    var genA = new Generator(startA, factorA, 1)
    var genB = new Generator(startB, factorB, 1)

    // Calculate and display the answer
    document.getElementById("answer1").innerHTML = countMatches(genA, genB, 40000000)
  }

  function solvePart2(){
    init()

    // Make the generators
    var genA = new Generator(startA, factorA, 4)
    var genB = new Generator(startB, factorB, 8)

    // Calculate and display the answer
    document.getElementById("answer2").innerHTML = countMatches(genA, genB, 5000000)
  }

  /**
   * Parses puzzle input and initializes globals.
   */
  function init(){
    // Parse the input
    startA = parseInt(document.getElementById("startA").value)
    startB = parseInt(document.getElementById("startB").value)
  }


  function countMatches(genA, genB, iterations){
    var matches = 0
    for (var i = iterations; i > 0; i--){
      var a = genA.next() % 65536 //2^16 = 65536
      var b = genB.next() % 65536
      if (a === b){
        matches++
      }
    }
    return matches
  }


  /**
   * Constructor function for a generator
   */
  function Generator(start, factor, mult){
    this.prev = start
    this.factor = factor
    this.mult = mult

    this.next = function(){
      do{
        this.prev = (this.prev * this.factor) % mod
      } while (this.prev % this.mult !== 0)

      return this.prev
    }
  }


  /**
   * Debugging utility to make sure generators are working.
   * No calls present in final code.
   */
   function testGenerators(){
     document.getElementById("test").innerHTML = "Generator A<br / >-----------<br />"
     for (var i = 0; i < 10; i++){
       document.getElementById("test").innerHTML += genA.next() +" <br />"
     }


     document.getElementById("test").innerHTML += "<br />Generator B<br / >-----------<br />"
     for (var i = 0; i < 10; i++){
       document.getElementById("test").innerHTML += genB.next()+" <br />"
     }
   }
})
