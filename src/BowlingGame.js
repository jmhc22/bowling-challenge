function BowlingGame() {
  this.frame = 0
  this.roll = 0
  this.rollLog = framesTemplate()
  this.bonusLog = framesTemplate()
  this.frameTotal = 0
  this.multiplier = multiplierTemplate()
  this.cumulativeTotal = function(){
    "hello"
  }
}

BowlingGame.prototype.enterBowl = function(n) {
  this.rollLog[this.frame][this.roll] = n
  this.bonusLog[this.frame][this.roll] = n * this.multiplier.shift()
  this.frameTotal += n
  if(this.frameTotal === 10) { this._strikeSpareCheck() }
  if(n === 10 || this.roll === 1) {
    this.frame += 1
    this.roll = 0
    this.frameTotal = 0
  } else {
    this.roll += 1
  }
}

BowlingGame.prototype.totalScore = function(n) {
  return this._logTotal(this.bonusLog) + this._logTotal(this.rollLog)
}

BowlingGame.prototype._strikeSpareCheck = function() {
  this.multiplier[0]++
  if(this.roll === 0) { this.multiplier[1]++ }
}

BowlingGame.prototype._logTotal = function(arrayLog) {
  let total = 0
  arrayLog.forEach(element => {
    total += (element[0] + element[1])
  })
  return total
}
