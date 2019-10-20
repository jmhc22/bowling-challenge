function BowlingGame() {
  this.frame = 0
  this.roll = 0
  this.rollLog = framesTemplate()
  this.bonusLog = framesTemplate()
  this.total = 0
  this.multiplier = multiplierTemplate()
  this.cumulativeTotal = function(){
    "hello"
  }
}

BowlingGame.prototype.enterBowl = function(n) {
  this.rollLog[this.frame][this.roll] = n
  this.total += n
  if(n === 10 || this.roll === 1) {
    this.frame += 1
    this.roll = 0
  } else {
    this.roll += 1
  }
}

BowlingGame.prototype.totalScore = function(n) {
  return this.total
}
