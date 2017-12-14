"use strict";



function part2(){

  var inp = document.getElementById("inp").value

  document.getElementById("answer2").innerHTML = knotHash(inp)
}

function knotHash(data){
  // Parse the input and add the magic lengths
  var lengths = getAsciiCodes(data)
  lengths = lengths.concat([17, 31, 73, 47, 23])

  // Get a new blank state
  var state = getFreshState()

  // 64 rounds of hashing (trying counting down just to practice the pattern)
  for (var i = 64; i > 0; i--){
    singleHashRound(state, lengths)
  }
  var sparse = state.arr

  // Compute the dense hash
  var dense = denseHash(sparse)

  // Make the dense hash into ascii encoded hex string
  var answer = ""
  for (var i = 0; i < dense.length; i++){
    answer += decToHex(dense[i])
  }

  // Return the answer
  return answer


  function denseHash(sparse){
    var dense = []
    for (var i = 0; i < 16; i++){
      var slice = sparse.slice(16 * i, 16 * (i + 1))
      var nextDense = 0
      for (var j = 0; j < slice.length; j++){
        nextDense ^= slice[j]
      }
      dense[i] = nextDense
    }
    return dense
  }

  function decToHex(dec){
    // Since we know we want exactly 2 hexadigits, we can kinda hack-job this
    return single(Math.floor(dec / 16)) + single(dec % 16)

    function single(d){
      if (d < 10){
        return d.toString()
      }

      // Lowercase a is ascii 97
      return String.fromCharCode(d + 87)
    }
  }

  function getFreshState(){
    return {
      arr : function(){
        var a = []
        for (var i = 0; i < 256; i++){
          a[i] = i
        }
        return a
      }(),
      skip : 0,
      current : 0
    }
  }

  function singleHashRound(state, lengths){

    for (var l = 0; l < lengths.length; l++){
      var length = lengths[l]

      // Do the reversing
      if (state.current + length > state.arr.length){
        state.arr = wrapSkip()
      }
      else {
        state.arr = midSkip()
      }

      // Update the state
      state.current = (state.current + length + state.skip) % state.arr.length
      state.skip++
    }

    return state

    function wrapSkip(){
      var first = state.arr.slice(0, state.current + length - state.arr.length)
      var mid   = state.arr.slice(state.current + length - state.arr.length, state.current)
      var last  = state.arr.slice(state.current)

      var outer = last.concat(first)
      outer.reverse()

      var newFirst = outer.slice(outer.length - first.length)
      var newLast  = outer.slice(0, last.length)

      return newFirst.concat(mid.concat(newLast))
    }

    function midSkip(){

      var first = state.arr.slice(0, state.current)
      var mid   = state.arr.slice(state.current, state.current + length)
      var last  = state.arr.slice(state.current + length)

      mid.reverse()

      return first.concat(mid.concat(last))
    }
  }

  function parseOnelineInput(){
    var inp = document.getElementById("inp").value.split(",")

    return inp
  }

  function getAsciiCodes(inp){
    var codes = []

    for (var i = 0; i < inp.length; i++){
      codes[i] = inp.charCodeAt(i)
    }

    return codes
  }

}
