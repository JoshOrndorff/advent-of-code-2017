"use strict";

function solvePart1(){
  // Take input from new-line-separated text area
  var lines = document.getElementById("inp").value.split("\n")
  if (lines[lines.length - 1] == ""){
    lines = lines.slice(0, -1) // chop off empty one at end
  }

  // Get the nodes
  var nodes = nodesFromLines(lines)

  // Display the answer
  document.getElementById("answer1").innerHTML = getRoot(nodes)


}

function getRoot(nodes){
  // Make a copy of nodes that we can destroy
  var nodes2 = clone(nodes)

  // Loop through each node, deleting all descendants
  for (var name in nodes2){
    var node = nodes2[name]
    deleteDescendants(node)
  }

  // The only node remaining should be the root
  for (var name in nodes2){
    return name
  }


  function deleteDescendants(node){
    for (var i = 0; i < node.children.length; i++){
      var childName = node.children[i]
      var child = nodes2[childName]
      // If the child still exists, delete its descendants.
      if (child !== undefined){
        deleteDescendants(child)
      }

      delete nodes2[childName]
    }
  }

}

// Answer isn't "gozhrsf"
function solvePart2(){
  // Take input from new-line-separated text area
  var lines = document.getElementById("inp").value.split("\n")
  if (lines[lines.length - 1] == ""){
    lines = lines.slice(0, -1) // chop off empty one at end
  }

  // Get the nodes and root
  var nodes = nodesFromLines(lines)
  var root = getRoot(nodes)

  // Assign total weights to all the nodes
  assignTotalWeights(nodes[root])

  // Find the culprit's proper weight
  var properWeight = findCulprit(root)

  // Display the answer
  document.getElementById("answer2").innerHTML = properWeight


  function assignTotalWeights(node){
    var totalWeight = node.weight
    for (var i = 0; i < node.children.length; i++){
      var child = nodes[node.children[i]]
      assignTotalWeights(child)
      totalWeight += child.totalWeight

    }
    node.totalWeight = totalWeight
  }


  function findCulprit(name){
    var node = nodes[name]

    // Collect the child weights into one place
    var childWeights = node.children.map(function(childName){
      return nodes[childName].totalWeight
    })

    // If all children weigh the same, we've found the culprit
    if (homogeneous(childWeights)){
      return "found culprit"
      // So find the majority weight
    }

    // Frequency analysis on the child weights
    var freqs = freqAnal(childWeights)

    // Find the oddball child
    /* We have to assume that exactly one child has
       a unique weight. Really, if there are exactly two children
       then they could both have unique weights. But in that case
       the problem isn't well defined becuase either one of them
       could change. I guess that's why "exactly one program is the
       wrong weight" is necessary. */
    for (var i = 0; i < node.children.length; i++){
      var oddBallName = node.children[i]
      var oddBall = nodes[oddBallName]
      if(freqs[oddBall.totalWeight] === 1){
        break
      }
    }

    // Recurse with oddBall
    var result = findCulprit(oddBallName)

    // If we're cruising back up the stack, just keep cruising
    if (result !== "found culprit"){
      return result
    }

    // Oddball child was the culprit, so find the proper weight
    var majorWeight
    var highestFreq = 0
    for (var weight in freqs){
      if (freqs[weight] > highestFreq){
        highestFreq = freqs[weight]
        majorWeight = weight
      }
    }

    // Now sum oddBall's child weights
    var grandchildWeights = oddBall.children.map(function(childName){
      return nodes[childName].totalWeight
    })
    var grandchildSum = 0
    for (var i = 0; i < grandchildWeights.length; i++){
      grandchildSum += grandchildWeights[i]
    }

    return majorWeight - grandchildSum

  }
}


function freqAnal(data){
  var freqs = {}
  for (var i = 0; i < data.length; i++){
    var datum = data[i]
    if (!(datum in freqs)){
      freqs[datum] = 0
    }
    freqs[datum]++
  }
  return freqs
}

function homogeneous(data){
  if (data.length < 2){
    return true
  }
  var same = true

  for (var i = 1; i < data.length; i++){
    if (data[i] !== data[0]){
      return false
    }
  }

  return true
}


function nodesFromLines(lines){
  var nodes = {}

  // Loop through records putting each in map<name:node>
  for (var i = 0; i < lines.length; i++){
    var details = lines[i].split(" ")

    // Make the object
    var node = {
      weight: parseInt(details[1].slice(1, -1)), // chop off the parens
      children: []
    }

    // Add each child to node
    for (var j = 3; j < details.length; j++){
      var noComma = details[j].replace(",", "")
      node.children.push(noComma)
    }

    // Add node to map
    var name = details[0]
    nodes[name] = node
  }

  return nodes
}

// Taken from https://stackoverflow.com/a/10270781/4184410
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
