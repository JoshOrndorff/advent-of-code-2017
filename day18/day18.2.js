"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // Attach event listeners for each button.
  document.getElementById("button2").addEventListener("click", solvePart2)

  // Global my problem parameters
  var prog
  var regs0
  var regs1
  var q0to1
  var q1to0

  /**
   * Solves the first part of the problem and displays answer in the DOM
   */
  function solvePart2(){
    // Initialize
    prog = parseMultilineInput()
    q0to1 = []
    q1to0 = []

    regs0 = getFreshRegs(0)
    regs0.out = q0to1
    regs0.in  = q1to0

    regs1 = getFreshRegs(1)
    regs1.out = q1to0
    regs1.in  = q0to1

    // Execute instructions until a frequency is recovered
    while (!deadlock(regs0, regs1)){
      execute(regs0)
      execute(regs1)
    }

    // Display the answer
    document.getElementById("answer2").innerHTML = regs1.sentCounter
  }


  /**
   * Executes the given instructino on the given regs.
   * @param regs The registers to operate on
   */
  function execute(regs){
    // If we already terminated, just move on
    if (regs.pc < 0 || regs.pc >= prog.length)
      return

    var instr = prog[regs["pc"]].split(" ")
    regs["pc"]++

    switch (instr[0]){
      case "snd":
        regs.out.push(valueOf(instr[1], regs)) // push instead of enqueue
        regs.sentCounter++
        break

      case "set":
        regs[instr[1]] = valueOf(instr[2], regs)
        break

      case "add":
        regs[instr[1]] += valueOf(instr[2], regs)
        break

      case "mul":
        regs[instr[1]] *= valueOf(instr[2], regs)
        break

      case "mod":
        regs[instr[1]]  = ((regs[instr[1]] % valueOf(instr[2], regs)) + valueOf(instr[2], regs)) % valueOf(instr[2], regs)
        break

      case "rcv":
        if (regs.in.length > 0){ // Message available to receive
          regs[instr[1]] = regs.in.shift() // shift instead of dequeue
          regs.delayed = false
        }
        else{
          regs.pc--
          regs.delayed = true
        }
        break

      case "jgz":
        if (valueOf(instr[1], regs) > 0)
          regs["pc"] += valueOf(instr[2], regs) - 1
          // Minus 1 because it was just incremented
        break
    }
  }


  /**
   * Returns the true value of the given expression which is a string
   * representing either a register's name, or an integer.
   * Created new registers as necessary.
   * @param expr The expression to be evaluated
   * @param regs The registers from which the value should be retreived.
   * @return The value
   */
  function valueOf(expr, regs){
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
  function getFreshRegs(id){
    return {
      pc : 0,
      p : id,
      sentCounter : 0,
      delayed: false
    }
  }

  /**
   * Determines whether the two programs are in a deadlock state.
   * They are deadlocked iff both programs are delayed or terminated.
   * @return Whether they are deadlocked.
   */
  function deadlock(regs0, regs1){

    var terminated0 = regs0.pc < 0 || regs0 >= prog.length
    var terminated1 = regs1.pc < 0 || regs1 >= prog.length

    return (regs0.delayed || terminated0) && (regs1.delayed || terminated1)

  }



})
