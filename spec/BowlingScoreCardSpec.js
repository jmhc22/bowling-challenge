describe('Player', function() {
  let scoreCard

  beforeEach(function() {
    scoreCard = new BowlingScoreCard();
  })

  describe('#enterBowl', function() {
    it('a bowl of 5 puts the total score to 5', function() {
      let n = 5
      scoreCard.enterBowl(n)
      expect(scoreCard.totalScore()).toEqual(n)
    })

    it('running two bowls of 3 will be calculated to give total 6', function() {
      scoreCard.enterBowl(3)
      scoreCard.enterBowl(3)
      expect(scoreCard.totalScore()).toEqual(6)
    })

    it('getting a strike will double the following two scores', function() {
      scoreCard.enterBowl(10)
      scoreCard.enterBowl(4)
      scoreCard.enterBowl(3)
      expect(scoreCard.totalScore()).toEqual(24)
    })

    it('getting three strikes will mean a 20 point bonus on the third', function() {
      scoreCard.enterBowl(10)
      scoreCard.enterBowl(10)
      scoreCard.enterBowl(10)
      expect(scoreCard.bonusLog[2][0]).toEqual(20)
    })

    it('getting a spare will mean a double point bonus on the next roll only', function() {
      scoreCard.enterBowl(5)
      scoreCard.enterBowl(5)
      scoreCard.enterBowl(5)
      scoreCard.enterBowl(0)
      expect(scoreCard.totalScore()).toEqual(20)
    })

    it('twelve strikes will give perfect game with score of 300', function() {
      var i
      for (i = 0; i < 12; i++) {
        scoreCard.enterBowl(10)
      }
      expect(scoreCard.totalScore()).toEqual(300)
      expect(scoreCard.enterBowl()).toEqual("game is complete")
    })

    it('twenty gutters will give gutter game with score of 0', function() {
      var i
      for (i = 0; i < 20; i++) {
        scoreCard.enterBowl(0)
      }
      expect(scoreCard.totalScore()).toEqual(0)
      expect(scoreCard.enterBowl()).toEqual("game is complete")
    })

    it('a spare on the final turn will allow one bonus roll', function() {
      var i
      for (i = 0; i < 16; i++) {
        scoreCard.enterBowl(0)
      }
      scoreCard.enterBowl(10)
      scoreCard.enterBowl(5)
      scoreCard.enterBowl(5)
      scoreCard.enterBowl(1)
      expect(scoreCard.totalScore()).toEqual(31)
      expect(scoreCard.enterBowl()).toEqual("game is complete")
    })
  })

  describe('.rollLog', function() {
    it('bowls will update the corresponding positions in the log', function() {
      scoreCard.enterBowl(1)
      scoreCard.enterBowl(2)
      scoreCard.enterBowl(3)
      scoreCard.enterBowl(4)
      scoreCard.enterBowl(5)
      expect(scoreCard.rollLog[0][0]).toEqual(1)
      expect(scoreCard.rollLog[0][1]).toEqual(2)
      expect(scoreCard.rollLog[1][0]).toEqual(3)
      expect(scoreCard.rollLog[1][1]).toEqual(4)
      expect(scoreCard.rollLog[2][0]).toEqual(5)
    })

    it('a strike will cause the second bowl to be skipped on the log', function() {
      scoreCard.enterBowl(10)
      scoreCard.enterBowl(10)
      scoreCard.enterBowl(2)
      expect(scoreCard.rollLog[0][0]).toEqual(10)
      expect(scoreCard.rollLog[0][1]).toEqual(null)
      expect(scoreCard.rollLog[2][0]).toEqual(2)
    })
  })

  describe('#cumulativeTotal', function() {
    it('can look back and view cummulative total at each frame', function() {
      scoreCard.enterBowl(5)
      scoreCard.enterBowl(5)
      scoreCard.enterBowl(2)
      scoreCard.enterBowl(1)
      scoreCard.enterBowl(8)
      expect(scoreCard.cumulativeTotal(1)).toEqual(10)
      expect(scoreCard.cumulativeTotal(2)).toEqual(15)
    })

    it('can look back at scores when scoring perfect strikes', function() {
      var i
      for (i = 0; i < 12; i++) {
        scoreCard.enterBowl(10)
      }
      expect(scoreCard.cumulativeTotal(1)).toEqual(10)
      expect(scoreCard.cumulativeTotal(10)).toEqual(270)

    })
  })

})
