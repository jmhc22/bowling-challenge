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

    // it('getting a strike will double the following two scores', function() {
    //   bowlingGame.enterBowl(10)
    //   bowlingGame.enterBowl(4)
    //   bowlingGame.enterBowl(3)
    //   expect(bowlingGame.totalScore()).toEqual(24)
    // })
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
