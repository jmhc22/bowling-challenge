function BowlingGame() {
  this.frame = 0;
  this.roll = 0;
  this.rollLog = framesTemplate()
  this.bonusLog = framesTemplate()
  this.total = 0
  this.cumulativeTotal = function(){
    "hello"
  }
}

BowlingGame.prototype.enterBowl = function(n) {
  this.total += n
}

BowlingGame.prototype.totalScore = function(n) {
  return this.total
}
