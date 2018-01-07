"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // Attach event listeners for each button.
  document.getElementById("button1").addEventListener("click", solvePart1)

  // Global my problem parameters
  var rules
  /* Example of rules format using my own puzzle input
  {"A": [{"write":1, "move":1,  "nextState":"B"},
         {"write":1, "move":-1, "nextState":"E"}],

   "B": [{"write":1, "move":1,  "nextState":"C"},
         {"write":1, "move":1,  "nextState":"F"}],

   "C": [{"write":1, "move":-1, "nextState":"D"},
         {"write":0, "move":1,  "nextState":"B"}],

   "D": [{"write":1, "move":1,  "nextState":"E"},
         {"write":0, "move":-1, "nextState":"C"}],

   "E": [{"write":1, "move":-1, "nextState":"A"},
         {"write":0, "move":1,  "nextState":"D"}],

   "F": [{"write":1, "move":1,  "nextState":"A"},
         {"write":1, "move":1,  "nextState":"C"}],
  }*/

  var state
  var steps
  var tape
  var location


  /**
   * Solves the first part of the problem and displays answer in the DOM
   */
  function solvePart1(){
    // Initialize the problem
    parseInput()
    tape = {}
    location = 0

    // Repeatedly take steps
    while (steps > 0){
      // Read the tape at the current location (default to zero)
      var reading = (location in tape) ? tape[location] : 0

      // Lookup the current rule
      var rule = rules[state][reading]

      // Update the machine's state variables and write to the tape
      tape[location] = rule.write
      location += rule.move
      state = rule.nextState

      steps--
    }

    // Figure out how many ones are left
    var ones = 0
    for (var location in tape){
      if (tape[location] === 1){
        ones++
      }
    }

    // Display the answer
    document.getElementById("answer1").innerHTML = ones
  }


  /**
   * Reads the rules from the textarea in the DOM. Ititializes the starting
   * state, number of steps, and rules (via helper).
   */
  function parseInput(){
    var inp = document.getElementById("inp").value

    // Cut off empty line at end if it exists
    if (inp.charAt(inp.length - 1) == "\n"){
      inp = inp.slice(0, -1)
    }

    var rulesEtc = inp.split("\n\n")
    var header = rulesEtc[0]
    var paras = rulesEtc.slice(1)

    // Initialize the starting state
    state = header.slice(15, 16)

    // Initialize the number of steps
    steps = parseInt(header.slice(54, header.lastIndexOf(" ")))

    // Pass the rules to the helper for further parsing
    initRules(paras)
  }

  /**
   * Initializes rules given pre-processed input from parseInput
   */
  function initRules(paragraphs){
    rules = {}

    for (var para of paragraphs){
      var lines = para.split("\n")
      var state = lines[0].slice(-2, -1)

      var zeroRule = {
                      "write": parseInt(lines[2].slice(-2, -1)),
                      "move":  lines[3].indexOf("right") === -1 ? -1 : 1,
                      "nextState": lines[4].slice(-2, -1)
                     }

      var oneRule = {
                     "write": parseInt(lines[6].slice(-2, -1)),
                     "move":  lines[7].indexOf("right") === -1 ? -1 : 1,
                     "nextState": lines[8].slice(-2, -1)
                    }

      // Finally, add the rule to the global dictionary
      rules[state] = [zeroRule, oneRule]
    }
  }

})
