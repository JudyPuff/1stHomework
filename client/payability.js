export function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatNumberOnMoney(num) {
  num = zeroNegativeNum(num)
  return "$" + numberWithCommas(Math.floor(num))
}

function zeroNegativeNum(num) {
  if (num < 0) {
    return 0
  }
  return num
}

export function calcHomeStartGrant(numYearsContributed, isNewHouse) {
  if (numYearsContributed < 3) {
    return 0
  }

  let baseGrantPerYear = 1000
  let possibleGrant = numYearsContributed * baseGrantPerYear

  if (possibleGrant > 5000) {
    possibleGrant = 5000
  }

  if (isNewHouse) {
    possibleGrant *= 2
  }

  return possibleGrant

}

export function calcTotalSaving(saving, kiwiSaver, HomeStart) {
  return saving + kiwiSaver + HomeStart
}

export function eligibleHomeStart(purchasePrice, totalSaving) {
  let min = Math.floor(purchasePrice * 0.1)

  return (totalSaving >= min)
}

export function eligibleBankLoan(purchasePrice, totalSaving) {
  let min = Math.floor(purchasePrice * 0.2)

  return (totalSaving >= min)
}