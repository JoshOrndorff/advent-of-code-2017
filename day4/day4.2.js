"use strict";

function solvePart2(){
  // Split the input into a list of phrases
  var phrases = document.getElementById("phrases").value.split("\n")

  // Loop through each phrase counting the valid ones
  var valid = 0
  for (var i = 0; i < phrases.length; i++){
    if (isValid2(phrases[i])){
      valid++
    }
  }

  // Display the answer
  document.getElementById("answer2").innerHTML = valid

}

function isValid2(phrase){
  // Split phrase into words
  var words = phrase.split(" ")

  // Make sure the phrase has at least one word
  if (words.length <= 1){
    return false
  }

  // Check for dupes pairwise
  for (var i = 0; i < words.length; i++){
    for (var j = i + 1; j < words.length; j++){
      if (isAnagram(words[j], words[i])){
        return false
      }
    }
  }
  return true
}

function isAnagram(a, b){
  // Terminating case: Different Lengths
  if (a.length != b.length){
    return false
  }

  // Terminating case: Strings are equal
  if (a === b){
    return true
  }

  // Loop through b looking for the first character in a
  var a0 = a.charAt(0)
  for (var i = 0; i < b.length; i++){
    if (a0 === b.charAt(i)){
      // Character exists in both strings, so recurse without that character
      var newA = a.substr(1)
      var newB = b.substr(0, i) + b.substr(i + 1)
      return isAnagram(newA, newB)
    }
  }

  // Made it through b without finding character
  return false
}
