function BowlingScoreCard() {
  this.frame = 0
  this.roll = 0
  this.rollLog = framesTemplate()
  this.bonusLog = framesTemplate()
  this.finalFrameBonus = []
  this.frameTotal = 0
  this.multiplier = multiplierTemplate()
}

BowlingScoreCard.prototype.enterBowl = function(n) {
  if(this.frame === 10 && this.multiplier[0] != 0) {
    return this._finalFrameBonusRoll(n)
  } else if(this.frame === 10 && this.multiplier[0] === 0) {
    return "game is complete"
  }
  this._addScoring(n)
  if(this.frameTotal === 10) { this._strikeSpareCheck() }
  if(n === 10 || this.roll === 1) {
    this._nextFrame()
  } else {
    this.roll += 1
  }
}

BowlingScoreCard.prototype.totalScore = function(n) {
  return this._logTotal(this.bonusLog) + this._logTotal(this.rollLog) +
    this._arraySum(this.finalFrameBonus)
}

BowlingScoreCard.prototype._strikeSpareCheck = function() {
  this.multiplier[0]++
  if(this.roll === 0) { this.multiplier[1]++ }
}

BowlingScoreCard.prototype._logTotal = function(arrayLog) {
  let total = 0
  arrayLog.forEach(element => {
    total += (element[0] + element[1])
  })
  return total
}

BowlingScoreCard.prototype._finalFrameBonusRoll = function(n) {
  this.finalFrameBonus.push(n * this.multiplier.shift())
}

BowlingScoreCard.prototype._arraySum = function(array) {
  let total = 0
  array.forEach(element => {
    total += element
  })
  return total
}

BowlingScoreCard.prototype._nextFrame = function() {
  this.frame += 1
  this.roll = 0
  this.frameTotal = 0
}

BowlingScoreCard.prototype._addScoring = function(n) {
  this.rollLog[this.frame][this.roll] = n
  this.bonusLog[this.frame][this.roll] = n * this.multiplier.shift()
  this.frameTotal += n
}

BowlingScoreCard.prototype.cumulativeTotal = function(frame) {
  return this._cumLogTotal(this.bonusLog, frame) + this._cumLogTotal(this.rollLog, frame)
}

BowlingScoreCard.prototype._cumLogTotal = function(arrayLog, frame) {
  let total = 0
  var i
  for (i = 0; i < frame; i++) {
    total += (arrayLog[i][0] + arrayLog[i][1])
  }
  return total
}
