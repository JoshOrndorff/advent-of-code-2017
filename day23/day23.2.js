"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // Attach event listeners for each button.
  document.getElementById("button2").addEventListener("click", solvePart2)

  /**
   * Solves the first part of the problem and displays answer in the DOM
   */
  function solvePart2(){
    // Grab initial value of register b (assume puzzles are otherwise identical)
    var firstLine = document.getElementById("inp").value.split("\n")[0]
    var b = parseInt(firstLine.split(" ")[2])
    b = b * 100 + 100000

    // Count how many of the numbers are composite (final value of h)
    var composites = 0
    for (var times = 1001; times > 0; times--){
      if (isComposite(b)){
        composites++
      }
      b += 17
    }

    // Display the answer
    document.getElementById("answer2").innerHTML = composites
  }

  /**
    * Less silly (although far-from-perfect) composite test.
    * Optimization 1: Only test each potential factor once (not pairwise)
    * Optimization 2: Short circuit return on first factor
    * @param n The number to test
    * @return Whether it is composite
    */
  function isComposite(n){
    for(var i = 2; i < n; i++){
      if (n % i === 0){
        return true
      }
    }
    return false
  }
})
