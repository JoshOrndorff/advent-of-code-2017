"use strict";

function solvePart1(){
  // Split the input into a program and make them integers
  var strs = document.getElementById("prog").value.split("\n")
  var prog = []

  for (var i = 0; i < strs.length; i++){
    // Watch out for blank lines (eg at the end of a copy-paste job)
    if (strs[i] === ""){
      continue
    }

    prog.push(parseInt(strs[i]))
  }


  var pc = 0
  var steps = 0

  // Loop until we go out of bounds
  while (pc >= 0 && pc < prog.length){
    var move = prog[pc]
    prog[pc]++
    pc += move
    steps ++
  }

  // Display the answer
  document.getElementById("answer1").innerHTML = steps
}

function solvePart2(){
  // Split the input into a program and make them integers
  var strs = document.getElementById("prog").value.split("\n")
  var prog = []

  for (var i = 0; i < strs.length; i++){
    // Watch out for blank lines (eg at the end of a copy-paste job)
    if (strs[i] === ""){
      continue
    }

    prog.push(parseInt(strs[i]))
  }


  var pc = 0
  var steps = 0

  // Loop until we go out of bounds
  while (pc >= 0 && pc < prog.length){
    var move = prog[pc]
    if (move >= 3){
      prog[pc]--
    }
    else{
      prog[pc]++
    }
    pc += move
    steps ++
  }

  // Display the answer
  document.getElementById("answer2").innerHTML = steps
}
