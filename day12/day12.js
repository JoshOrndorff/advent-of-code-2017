"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // Attach event listeners for each button.
  document.getElementById("button1").addEventListener("click", solvePart1)
  document.getElementById("button2").addEventListener("click", solvePart2)

  // Globals
  var village

  function solvePart1(){
    // Parse the input
    var pipes = parseInput()

    // Populate the villages
    populateVillages(pipes)

    // Figure out which neighborhood has node 0
    var zeroHood
    for (var neighborhood of village){
      if (neighborhood.has("0")){
        zeroHood = neighborhood
        break
      }
    }

    // Display the answer
    document.getElementById("answer1").innerHTML = zeroHood.size
  }

  function solvePart2(){
    // Parse the input
    var pipes = parseInput()

    // Populate the villages
    populateVillages(pipes)

    // Display the answer
    document.getElementById("answer2").innerHTML = village.size
  }

  /**
   * Sets up villages, the set of all neighborhoods.
   */
  function populateVillages(pipes){
    village = new Set()

    // Loop through each node we visited, adding it to the village
    for (var node in pipes){
      var neighborhood = getNeighborhood(node)
      var peers = pipes[node]
      // Check out each peer, and remap the neighborhood accordingly
      for (var i = 0; i < peers.length; i++){
        var peer = peers[i]
        if (neighborhood.has(peer)){
          continue // to the next peer
        }

        // Merge our neighborhood with our peer's neighborhood
        var peerHood = getNeighborhood(peer)
        peerHood.forEach(neighborhood.add, neighborhood)
        village.delete(peerHood)
      }
    }
  }

  /**
   * Return's the subset to which the node belongs. If the node is
   * not yet in any neighborhood, a new one is created for it and
   * added to the village.
   */
  function getNeighborhood(node){

    // Look for an existing neighborhood
    for (neighborhood of village){
      if (neighborhood.has(node)){
        return neighborhood
      }
    }

    // Didn't find a neighorhood, so make a new one
    var neighborhood = new Set()
    neighborhood.add(node)
    village.add(neighborhood)
    return neighborhood
  }

  /**
   * Processes the input into map of node to peers
   */
  function parseInput(){
    // Split into array of lines
    var lines = document.getElementById("inp").value.split("\n")

    // Cut off empty string caused by eg trailing newline
    if (lines[lines.length - 1] == ""){
      lines = lines.slice(0, -1) // chop off empty one at end
    }

    // Make the dictionary
    var pipes = {}
    for (var i = 0; i < lines.length; i++){
      var line = lines[i]
      var currentNode = line.slice(0, line.indexOf(' '))
      var peers = line.slice(line.indexOf('>') + 2).split(", ")
      pipes[currentNode] = peers
    }

    return pipes
  }
})
