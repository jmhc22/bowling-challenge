function BowlingGame() {
  this.frame = 0
  this.roll = 0
  this.rollLog = framesTemplate()
  this.bonusLog = framesTemplate()
  this.finalFrameBonus = []
  this.frameTotal = 0
  this.multiplier = multiplierTemplate()
  this.cumulativeTotal = function(){
    "tba"
  }
}

BowlingGame.prototype.enterBowl = function(n) {
  if(this.frame === 10 && this.multiplier[0] != 0) {
    return this._finalFrameBonusRoll(n)
  } else if(this.frame === 10 && this.multiplier[0] === 0) {
    return "game is complete"
  }
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
  return this._logTotal(this.bonusLog) + this._logTotal(this.rollLog) +
    this._arraySum(this.finalFrameBonus)
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

BowlingGame.prototype._finalFrameBonusRoll = function(n) {
  this.finalFrameBonus.push(n * this.multiplier.shift())
}

BowlingGame.prototype._arraySum = function(array) {
  let total = 0
  array.forEach(element => {
    total += element
  })
  return total
}
