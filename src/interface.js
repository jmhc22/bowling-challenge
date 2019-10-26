$(document).ready(function() {
  var bowl = new BowlingScoreCard();
  var finalFrame = 0

  $('#bowl-submit').on('click', function() {
    updateFrames()
    bowl.enterBowl(Number($("#bowl-value").val()))
    $('#p1-total').text(bowl.totalScore())
    updateFrameTotals()
    if (bowl.roll === 1) {
      calcRemainingPins()
    } else {
      refreshPins()
    }
  })

  function updateFrames() {
    $(`#p1-frame${bowl.frame}-roll${bowl.roll}`).text($("#bowl-value").val())
    if(bowl.frame === 10) { updateFinalFrames() }
  }

  function updateFinalFrames() {
    if(bowl.rollLog[9][0] === 10 && finalFrame === 0) {
      $('#p1-frame9-roll1').text($("#bowl-value").val())
      finalFrame++
    } else if(finalFrame < 2 && bowl.rollLog[9][0] + bowl.rollLog[9][1] === 10) {
      $('#p1-frame9-roll2').text($("#bowl-value").val())
      finalFrame++
    }
  }

  function updateFrameTotals() {
    var i
    for (i = 0; i < bowl.frame; i++) {
      if (bowl.multiplier[0][0] === i || bowl.multiplier[0][2] === i) {
        continue
      }
      $(`#p1-frame${i}-frametotal`).text(bowl.cumulativeTotal(i));
    }
  }

  function calcRemainingPins() {
    var pins = 10 - bowl.frameTotal
    var i
    for (i = 10; i > pins; i--) {
      $(`.pick${i}`).hide()
    }
  }

  function refreshPins() {
    var i
    for (i = 0; i <= 10; i++) {
      $(`.pick${i}`).show()
    }
  }
})
