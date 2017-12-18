"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // Attach event listeners for each button.
  document.getElementById("button1").addEventListener("click", solvePart1)

  // Global my problem parameters
  var prog
  var regs

  /**
   * Solves the first part of the problem and displays answer in the DOM
   */
  function solvePart1(){
    // Parse the input
    prog = parseMultilineInput()
    regs = getFreshRegs()

    // Execute instructions until a frequency is recovered
    let answer = undefined
    while (answer === undefined){
      answer = execute(prog[regs["pc"]])
    }

    // Display the answer
    document.getElementById("answer1").innerHTML = answer
  }


  /**
   * Executes the given instructino on the global regs. Returns
   * undefined for all operations except 'rcv' in which case it
   * returns the recovered value is revocery was successful.
   * @param instr The instruction to be executed
   * @return Successfully recovered value or undefined
   */
  function execute(instr){
    instr = instr.split(" ")
    regs["pc"]++

    switch (instr[0]){
      case "snd":
        regs.lastSnd = valueOf(instr[1])
        break

      case "set":
        regs[instr[1]] = valueOf(instr[2])
        break

      case "add":
        regs[instr[1]] += valueOf(instr[2])
        break

      case "mul":
        regs[instr[1]] *= valueOf(instr[2])
        break

      case "mod":
        regs[instr[1]]  = ((regs[instr[1]] % valueOf(instr[2])) + valueOf(instr[2])) % valueOf(instr[2])
        break

      case "rcv":
        if (valueOf(instr[1]) > 0)
          return regs["lastSnd"]
        break

      case "jgz":
        if (valueOf(instr[1]) > 0)
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
      pc : 0,
      lastSnd : undefined
    }
  }


})
