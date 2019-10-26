$(document).ready(function() {
  var bowl = new BowlingScoreCard();
  var finalFrame = 0

  $('#bowl-submit').on('click', function() {
    updateFrames()
    bowl.enterBowl(Number($("#bowl-value").val()))
    $('#p1-total').text(bowl.totalScore())
  })

  function updateTemperature() {
    $('#temperature').text(thermostat.current())
    $('#power-usage').text(thermostat.usage())
    $('#temperature').attr('class', thermostat.usage())
    $('#style').attr('class', thermostat.usage())
  }

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

    // $('#p1-frame0-frametotal').text(bowl.cumulativeTotal(9));
})
