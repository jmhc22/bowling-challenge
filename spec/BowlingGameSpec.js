describe('Player', function() {
  let bowlingGame

  beforeEach(function() {
    bowlingGame = new BowlingGame();
  })

  describe('#enterBowl', function() {
    it('a bowl of 5 puts the total score to 5', function() {
      let n = 5
      bowlingGame.enterBowl(n)
      expect(bowlingGame.totalScore()).toEqual(n)
    })

    it('running two bowls of 3 will be calculated to give total 6', function() {
      bowlingGame.enterBowl(3)
      bowlingGame.enterBowl(3)
      expect(bowlingGame.totalScore()).toEqual(6)
    })

    it('getting a strike will double the following two scores', function() {
      bowlingGame.enterBowl(10)
      bowlingGame.enterBowl(4)
      bowlingGame.enterBowl(3)
      expect(bowlingGame.totalScore()).toEqual(24)
    })

    it('getting three strikes will mean a 20 point bonus on the third', function() {
      bowlingGame.enterBowl(10)
      bowlingGame.enterBowl(10)
      bowlingGame.enterBowl(10)
      expect(bowlingGame.bonusLog[2][0]).toEqual(20)
    })

    it('getting a spare will mean a double point bonus on the next roll only', function() {
      bowlingGame.enterBowl(5)
      bowlingGame.enterBowl(5)
      bowlingGame.enterBowl(5)
      bowlingGame.enterBowl(0)
      expect(bowlingGame.totalScore()).toEqual(20)
    })

    it('twelve strikes will give perfect game with score of 300', function() {
      var i
      for (i = 0; i < 12; i++) {
        bowlingGame.enterBowl(10)
      }
      expect(bowlingGame.totalScore()).toEqual(300)
      expect(bowlingGame.enterBowl()).toEqual("game is complete")
    })

    it('twenty gutters will give gutter game with score of 0', function() {
      var i
      for (i = 0; i < 20; i++) {
        bowlingGame.enterBowl(0)
      }
      expect(bowlingGame.totalScore()).toEqual(0)
      expect(bowlingGame.enterBowl()).toEqual("game is complete")
    })

    it('a spare on the final turn will allow one bonus roll', function() {
      var i
      for (i = 0; i < 16; i++) {
        bowlingGame.enterBowl(0)
      }
      bowlingGame.enterBowl(10)
      bowlingGame.enterBowl(5)
      bowlingGame.enterBowl(5)
      bowlingGame.enterBowl(1)
      expect(bowlingGame.totalScore()).toEqual(31)
      expect(bowlingGame.enterBowl()).toEqual("game is complete")
    })
  })

  describe('.rollLog', function() {
    it('bowls will update the corresponding positions in the log', function() {
      bowlingGame.enterBowl(1)
      bowlingGame.enterBowl(2)
      bowlingGame.enterBowl(3)
      bowlingGame.enterBowl(4)
      bowlingGame.enterBowl(5)
      expect(bowlingGame.rollLog[0][0]).toEqual(1)
      expect(bowlingGame.rollLog[0][1]).toEqual(2)
      expect(bowlingGame.rollLog[1][0]).toEqual(3)
      expect(bowlingGame.rollLog[1][1]).toEqual(4)
      expect(bowlingGame.rollLog[2][0]).toEqual(5)
    })

    it('a strike will cause the second bowl to be skipped on the log', function() {
      bowlingGame.enterBowl(10)
      bowlingGame.enterBowl(10)
      bowlingGame.enterBowl(2)
      expect(bowlingGame.rollLog[0][0]).toEqual(10)
      expect(bowlingGame.rollLog[0][1]).toEqual(null)
      expect(bowlingGame.rollLog[2][0]).toEqual(2)
    })
  })

})
