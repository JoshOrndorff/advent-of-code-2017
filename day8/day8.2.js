"use strict";

function solvePart2(){
  // Take input from tab-separated text field
  var lines = parseMultilineInput()

  // Parse to Instructions
  var instrs = lines.map(parseInstr)

  // Keep track of the registers and maximum
  var regs = {}
  var largestVal = -9999 // hacky lower limit

  // Loop through each instruction processing it
  for (var i = 0; i < instrs.length; i++){
    var instr = instrs[i]

    // Initialize any new registers
    if(!(instr.regToMod in regs)){
      regs[instr.regToMod] = 0
    }
    if(!(instr.compReg in regs)){
      regs[instr.compReg] = 0
    }

    // Do the action
    if (evalCond(instr)){
      regs[instr.regToMod] += instr.delta
    }

    if (regs[instr.regToMod] > largestVal){
      largestVal = regs[instr.regToMod]
    }
  }

  // Display the answer
  document.getElementById("answer2").innerHTML = largestVal


  function evalCond(instr){
    switch (instr.compOper){
      case "<":
        return regs[instr.compReg] < instr.compVal

      case "<=":
        return regs[instr.compReg] <= instr.compVal

      case "==":
        return regs[instr.compReg] == instr.compVal

      case "!=":
        return regs[instr.compReg] != instr.compVal

      case ">":
        return regs[instr.compReg] > instr.compVal

      case ">=":
        return regs[instr.compReg] >= instr.compVal
    }
  }


}

function parseMultilineInput(){
  var lines = document.getElementById("inp").value.split("\n")

  return lines
}

function parseInstr(line){
  var text = line.split(" ")

  var instr = {
    regToMod: text[0],
    // skip text[1] because decrementing will be handled soon
    delta: parseInt(text[2]),
    // skip text[3] because it is always "if"
    compReg: text[4],
    compOper: text[5],
    compVal: parseInt(text[6])
  }

  // Handle decrements
  if (text[1] == "dec"){
    instr.delta *= -1
  }

  return instr
}
