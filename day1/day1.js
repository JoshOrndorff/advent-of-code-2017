"use strict";

function solvePart1(){
  var captcha = document.getElementById('captcha1').value;

  // Recursively sum all the non-wrapping pairs
  var sum = sumInnerPairs(captcha)

  // Manually check for the wrap around pair
  if (captcha.substr(0, 1) == captcha.substr(-1,1)){
    sum += parseInt(captcha.substr(0, 1))
  }

  // Display the result
  document.getElementById('answer1').innerHTML = sum
}




function sumInnerPairs(text){

  // Terminate recursion when no more pairs exist
  if (text.length < 2){
   return 0
  }

  // Calculate the current pair
  var current = 0
  if (text.substr(0, 1) == text.substr(1,1)){
    current = parseInt(text.substr(0, 1))
  }

  // Recurse
  return current + sumInnerPairs(text.substr(1))
}



function solvePart2(){
  var captcha = document.getElementById('captcha2').value;

  // Split the string into two halves (guaranteed to be even-length)
  var halfLength = captcha.length / 2
  var firstHalf  = captcha.substr(0, halfLength)
  var secondHalf = captcha.substr(halfLength)

  console.log(firstHalf)
  console.log(secondHalf)

  // Loop through the strings looking for matches
  var sum = 0

  for (var i = 0; i < halfLength; i++){

    var firstL = firstHalf.substr(i, 1)
    var secondL = secondHalf.substr(i, 1)
    console.log("checking " + firstL + " and " + secondL)

    if (firstL == secondL){
      console.log("match")
      sum += 2 * parseInt(firstL)
    }
  }

  // Display the result
  document.getElementById('answer2').innerHTML = sum
}
