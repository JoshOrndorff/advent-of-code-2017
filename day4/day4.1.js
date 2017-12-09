"use strict";

function solvePart1(){
  // Split the input into a list of phrases
  var phrases = document.getElementById("phrases").value.split("\n")

  // Loop through each phrase counting the valid ones
  var valid = 0
  for (var i = 0; i < phrases.length; i++){
    if (isValid1(phrases[i])){
      valid++
    }
  }

  // Display the answer
  document.getElementById("answer1").innerHTML = valid

}

function isValid1(phrase){
  // Split phrase into words
  var words = phrase.split(" ")

  // Make sure the phrase has at least one word
  if (words.length <= 1){
    return false
  }

  // Check for dupes pairwise
  for (var i = 0; i < words.length; i++){
    for (var j = i + 1; j < words.length; j++){
      if (words[j] === words[i]){
        return false
      }
    }
  }
  return true
}
