"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // Attach event listeners for each button.
  document.getElementById("button1").addEventListener("click", solvePart1)
  document.getElementById("button2").addEventListener("click", solvePart2)

  // Global common problem parameters


  // Global my problem parameters
  var particles


  /**
   * Solves the first part of the problem and displays answer in the DOM
   */
  function solvePart1(){
    // Parse the input into an array of particle objects
    particles = parseInput()

    // Find the ones with the smallest accelerations, then break ties by v and p
    var smallestParticle = particles[0]
    for (let particle of particles){

      if (particle.lessThan(smallestParticle)){
        smallestParticle = particle
      }
    }
    // Display it to the DOM
    document.getElementById("answer1").innerHTML = smallestParticle.id
  }


  /**
   * Solves the second part of the problem and displays answer in the DOM
   */
  function solvePart2(){
    // Parse  input into BOTH array AND set of particle objects
    particles = parseInput()
    pSet = new Set()

    // Display the answer
    document.getElementById("answer2").innerHTML = "fill me in"
  }




  /**
   * Reads the input from the textarea in the DOM. Cuts of trailing blank line
   * when it is present.
   * @return List of associative arrays of quantities with 3-Lists
   */
  function parseInput(){
    var lines = document.getElementById("inp").value.split("\n")

    // Cut off empty string caused by eg trailing newline
    if (lines[lines.length - 1] == ""){
      lines = lines.slice(0, -1) // chop off empty one at end
    }

    // Parse a particle from each line
    var particles = []
    for (let i = 0; i < lines.length; i++){
      particles.push(new Particle(lines[i], i))
    }

    return particles
  }


  /**
   * Constructor function.
   * Parse an individual line of input into a particle object
   * @param text The line of text to be parsed
   * @param id The particles id number (which line of input it is from)
   */
  function Particle(text, id){

    this.id = id

    text = text.slice(text.indexOf("<") + 1)
    var pCoordStr = text.slice(0, text.indexOf(">"))
    this.p = pCoordStr.split(",").map(Number)

    text = text.slice(text.indexOf("<") + 1)
    var vCoordStr = text.slice(0, text.indexOf(">"))
    this.v = vCoordStr.split(",").map(Number)

    text = text.slice(text.indexOf("<") + 1)
    var aCoordStr = text.slice(0, text.indexOf(">"))
    this.a = aCoordStr.split(",").map(Number)

    this.lessThan = function(other){
      if (taxicab(this.a) < taxicab(other.a)){
        return true
      }
      if (taxicab(this.a) > taxicab(other.a)){
        return false
      }

      // Accelerations are equal. Fall back to velocities
      if (taxicab(this.v) < taxicab(other.v)){
        return true
      }
      if (taxicab(this.v) > taxicab(other.v)){
        return false
      }

      // Velocities are equal. Fall back to positions
      if (taxicab(this.p) < taxicab(other.p)){
        return true
      }
      if (taxicab(this.p) > taxicab(other.p)){
        return false
      }

      // Everything equal. Equal is not less than.
      return false

    }

  }


  /**
   * Calculates the n-dimensional taxicab radius of the given point.
   * @param coords An array of the coordinates to be calculated.
   * @ return the taxicab distance from the origin.
   */
  function taxicab(coords){
    var d = 0
    for (var i = 0; i < coords.length; i++){
      d += Math.abs(coords[i])
    }
    return d
  }

})
