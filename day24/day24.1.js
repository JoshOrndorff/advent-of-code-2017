"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // Attach event listeners for each button.
  document.getElementById("button1").addEventListener("click", solvePart1)


  /**
   * Solves the first part of the problem and displays answer in the DOM
   */
  function solvePart1(){
    // Add a helpful copy method to Sets
    Set.prototype.copyWithout = function(comp){
      var newSet = new Set()
      for (var item of this){
        if (item !== comp)
          newSet.add(item)
      }
      return newSet
    }

    // Initialize the problem
    var components = parseInput()

    // Compute and display the answer
    document.getElementById("answer1").innerHTML = solve(0, components)
  }

  /**
   * The recursive function that builds the bridges
   * @param pins How many pins are needed on the next component
   * @param components The set of components to choose from
   * @return The maximum strength of the bridge found
   */
  function solve(pins, components){
    var strongest = 0

    // Try to attach all of the available components
    for (var comp of components){
      // If it doesn't have the right number of pins, move on.
      if (comp.portA !== pins && comp.portB !== pins)
        continue

      // If it does have the right number of pins, recurse
      var leftover = components.copyWithout(comp)
      var newPins = pins === comp.portA ? comp.portB : comp.portA
      var strength = comp.portA + comp.portB + solve(newPins, leftover)

      // See if we found the strongest one
      if (strength > strongest)
        strongest = strength
    }

    return strongest
  }


  /**
   * Reads the input from the textarea in the DOM. Cuts of trailing blank line
   * when it is present. Initializes the starting set of Components.
   * @return The spaghetti for the starting state
   */
  function parseInput(){
    var lines = document.getElementById("inp").value.split("\n")

    // Cut off empty string caused by eg trailing newline
    if (lines[lines.length - 1] == ""){
      lines = lines.slice(0, -1) // chop off empty one at end
    }

    // Create a new component for each line in the input and add it to the spaghetti.
    var spaghetti = new Set()
    for (var line of lines){
      var slashIndex = line.indexOf("/")
      var portA = parseInt(line.slice(0, slashIndex))
      var portB = parseInt(line.slice(slashIndex + 1))
      spaghetti.add(new Component(portA, portB, portA + portB))

    }
    return spaghetti
  }

  /**
   * Constructor function for a component.
   * @param portA How many pins on the first port
   * @param portB How many pins on the second port
   * @param strength How strong the new component will be
   */
  function Component(portA, portB, strength){
    this.portA = portA
    this.portB = portB
    this.strength = strength

    this.toString = function(){
      return this.portA + "/" + this.portB + ":" + this.strength
    }
  }

})
