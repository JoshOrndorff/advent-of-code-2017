"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // Attach event listeners for each button.
  document.getElementById("button1").addEventListener("click", solvePart1)

  // Global my problem parameters
  var prog
  var regs
  var mulCounter

  /**
   * Solves the first part of the problem and displays answer in the DOM
   */
  function solvePart1(){
    // Initialize the problem
    prog = parseMultilineInput()
    regs = getFreshRegs()
    mulCounter = 0

    // Execute instructions until halt
    while (regs.pc >= 0 && regs.pc < prog.length){
      execute(prog[regs.pc])
    }

    // Display the answer
    document.getElementById("answer1").innerHTML = mulCounter
  }


  /**
   * Executes the given instructino on the global regs.
   * @param instr The instruction to be executed
   */
  function execute(instr){
    instr = instr.split(" ")
    regs["pc"]++

    switch (instr[0]){
      case "set":
        regs[instr[1]] = valueOf(instr[2])
        break

      case "sub":
        regs[instr[1]] -= valueOf(instr[2])
        break

      case "mul":
        regs[instr[1]] *= valueOf(instr[2])
        // The problem is to count how many time we multiply
        mulCounter++
        break

      case "jnz":
        if (valueOf(instr[1]) != 0)
          regs["pc"] += valueOf(instr[2]) - 1
          // Minus 1 because it was just incremented
        break
    }
  }


  /**
   * Returns the true value of the given expression which is a string
   * representing either a register's name, or an integer.
   * Created new registers as necessary.
   * @param expr The expression to be evaluated
   * @return The value
   */
  function valueOf(expr){
    // If it's a number, just return it.
    let x = parseInt(expr)
    if (!isNaN(x)){
      return x
    }

    // If the register exists, return its value
    if (expr in regs){
      return regs[expr]
    }

    // Reg must not exist yet, so create and initialize it.
    regs[expr] = 0
    return 0
  }


  /**
   * Reads the input from the textarea in the DOM. Cuts of trailing blank line
   * when it is present
   * @return List of lines from the textarea
   */
  function parseMultilineInput(){
    var lines = document.getElementById("inp").value.split("\n")

    // Cut off empty string caused by eg trailing newline
    if (lines[lines.length - 1] == ""){
      lines = lines.slice(0, -1) // chop off empty one at end
    }

    return lines
  }


  /**
   * Generates a new set of registers
   * @return The new registers
   */
  function getFreshRegs(){
    return {
      pc : 0
    }
  }

})
