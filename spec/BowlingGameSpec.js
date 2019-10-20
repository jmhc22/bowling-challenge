describe("Player", function() {
  let bowlingGame

  beforeEach(function() {
    bowlingGame = new BowlingGame();
  })

  describe("#enterBowl", function() {
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
  })

})
