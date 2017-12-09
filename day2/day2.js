"use strict";

function solvePart1(){
  var lines = document.getElementById("sheet1").value.split("\n");
  var checksum = 0

  // Loop through the lines finding the difference in each
  for (var i = 0; i < lines.length; i++){

    if (lines[i].length === 0){
      continue
    }

    // Split the line into individual numbers (still strings)
    // Split on any whitespace to support copy-pasting example and real input
    var nums = lines[i].split(/\s/)

    checksum += getDiff(nums)
  }

  // Display the result
  document.getElementById("answer1").innerHTML = checksum
}


function getDiff(nums){

  //Loop through the numbers finding max and min (assuming hacky bounds)
  var max = 0
  var min = 99999
  for (var i = 0; i < nums.length; i++){
    var num = parseInt(nums[i])
    if (num > max){
      max = num
    }
    if (num < min){
      min = num
    }
    //console.log("num: " + num + ", max: " + max + ", min: " + min)
  }

  // When we're done looping, compute the diff
  return max - min
}




function solvePart2(){
  var lines = document.getElementById("sheet2").value.split("\n");
  var checksum = 0

  // Loop through the lines finding the quotient in each
  for (var i = 0; i < lines.length; i++){

    if (lines[i].length === 0){
      continue
    }

    // Split the line into individual numbers (still strings)
    // Split on any whitespace to support copy-pasting example and real input
    var nums = lines[i].split(/\s/)

    checksum += getQuot(nums)
  }

  // Display the result
  document.getElementById("answer2").innerHTML = checksum
}




function getQuot(strs){
  var checksum = 0

  // Loop through the numbers casting to int
  var nums = []
  for (var i = 0; i < strs.length; i++){
    nums[i] = parseInt(strs[i])
  }

  // Compare all pairs checking for divisibility
  for (var i = 0; i < nums.length; i++){
    for (var j = i + 1; j < nums.length; j++){
      if (nums[i] % nums[j] === 0){
        return nums[i] / nums[j]
      }
      if (nums[j] % nums[i] === 0){
        return nums[j] / nums[i]
      }
    }
  }


}
