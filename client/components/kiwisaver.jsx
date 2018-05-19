import React from 'react'

/**
 * Determines if a user is eligible for the HomeStart grant.
 * @param {*} isCitizenOrPR Whether the user is a citizen or permanent resident.
 * @param {*} ownedHomeBefore Whether the user has owned a home before.
 * @param {*} hasKiwiSaver Whether the user has a kiwisaver account.
 * @param {*} kiwiSaverDuration The number of days the user has had a kiwisaver account.
 * @param {*} kiwiSaverContributionDuration The number of days the user has contributed to their kiwisaver account.
 * @param {*} location The location of the home/property (string, case sensitive).
 * @param {*} propertyValue The value of the home/property.
 * @param {*} buyingSolo Whether the user is buying the house by themselves.
 * @param {*} totalHouseholdIncome The total income of the household (just income of the user if buying solo).
 * @param {*} amountInAccount The amount in the user's account.
 * @param {*} amountInKiwisaver The amount in the user's kiwisaver account.
 */ 
export function isEligible(isCitizenOrPR, ownedHomeBefore, hasKiwiSaver, kiwiSaverDuration, kiwiSaverContributionDuration, location, propertyValue, buyingSolo, totalHouseholdIncome, amountInAccount, amountInKiwisaver) {

  //If the user has owned a home before, they are not eligible.
  if (ownedHomeBefore) {
    return false;
  }

  //If the user is not a citizen or permanent resident they are not eligible.
  if (citizenEligibility(isCitizenOrPR)) {
    return false;
  }

  //If the user does not meet the kiwisaver requirements they are not eligible.
  if (!kiwiSaverEligibility(hasKiwiSaver, kiwiSaverDuration, kiwiSaverContributionDuration)) {
    return false;
  }

  //If the user does not meet the property value requirments based on location they are not eligible.
  if (!propertyValueEligibility(location, propertyValue)) {
    return false;
  }

  //If the user does not meet the income requirements they are not eligible.
  if (!incomeEligibility(buyingSolo, totalHouseholdIncome)) {
    return false;
  }

  //If the user does not meet the savings requirements they are not eligible.
  if (!savingsEligibility(amountInAccount, amountInKiwisaver, propertyValue)) {
    return false;
  }

  //If above conditons passed, the user is eligible for the HomeStart grant.
  return true;
}

/**
 * Determines whether the user is eligible based on the location and property value.
 * @param {*} location The location of the home/property (string, case sensitive).
 * @param {*} propertyValue The value of the home/property.
 */
export function propertyValueEligibility(location, propertyValue) {
  //Get the property value threshold based on whether the location of the home/property.
  let propertyValueThreshold = calculatePropertyValueThreshold(location);

  //If the property/home value is less than the threshold, the user is not eligible.
  if (propertyValue < propertyValueThreshold) {
    return false;
  }
  return true;
}

/**
 * Determines whether a user is eligible based on their residency status.
 * @param {*} isCitizenOrPR Whether the user is a citizen or permanent resident.
 */
export function citizenEligibility(isCitizenOrPR) {
  return isCitizenOrPR;
}

/**
 * Determines whether the user is eligible based on their kiwisaver account.
 * @param {*} hasKiwiSaver Whether the user has a kiwisaver account.
 * @param {*} kiwiSaverDuration The number of days the user has had a kiwisaver account.
 * @param {*} kiwiSaverContributionDuration The total income of the household (just income of the user if buying solo).
 */
export function kiwiSaverEligibility(hasKiwiSaver, kiwiSaverDuration, kiwiSaverContributionDuration) {
  //If the user does not have kiwisaver they are not eligible.
  if (!hasKiwiSaver) {
    return false;
  }

  //If the user has had their kiwisaver for less than 3 years they are not eligible.
  if (kiwiSaverDuration < (3 * 365)) {
    return false;
  }

  //If the user has contributed to kiwisaver for less than 3 years in total, they are not eligible.
  if (kiwiSaverContributionDuration < (3 * 365)) {
    return false; //NOTE: Not eligible for HomeStart but still eligible for KS withdrawl.
  }

  return true;
}

/**
 * Determines if the user is eligible based on income.
 * @param {*} buyingSolo Whether the user is buying the house by themselves.
 * @param {*} totalHouseholdIncome The total income of the household (just income of the user if buying solo).
 */
export function incomeEligibility(buyingSolo, totalHouseholdIncome) {
  //If the user is buying solo, the income threshold is $85,000, otherwise the threshold is $130,000.
  var incomeThreshold = buyingSolo ? 85000 : 130000;

  //If the household income is less than the threshold, the user is not eligible.
  if (totalHouseholdIncome < incomeThreshold) {
    return false;
  }
  return true;
}

/**
 * Determines if the user is eligible based on their savings.
 * @param {*} amountInAccount The amount in the user's normal bank account.
 * @param {*} amountInKiwisaver The amount in the user's kiwisaver account.
 * @param {*} propertyValue The value of the home/property.
 */
export function savingsEligibility(amountInAccount, amountInKiwisaver, propertyValue) {
  //Add the total savings the user has from both accounts.
  let totalSavings = amountInAccount + amountInKiwisaver;
  //Return whether the user's total savings is at least 10% of the property value.
  return (totalSavings >= (0.1 * propertyValue));
}

/**
 * Determines the property value threshold based on whether the home/property is in Auckland.
 * @param {*} location The location of the home/property (string, case sensitive).
 */
export function propertyValueThreshold(location) {

  //Locations with the threshold of $600,000.
  let tier600000 = [
    'Auckland'
  ]

  //Locations with the threshold of $500,000.
  let tier500000 = [
    'Hamilton',
    'Tauranga',
    'Western Bay of Plenty',
    'Kapiti Coast',
    'Porirua',
    'Upper Hutt',
    'Hutt City',
    'Wellington',
    'Tasman',
    'Nelson',
    'Waimakariri',
    'Christchurch',
    'Selwyn',
    'Queenstown'
  ]

  //If the location is in the first group, return the threshold as $600,000.
  if (tier600000.indexOf(location) > -1) {
    return 600000;
  }

  //If the location is in the second group, return the threshold as $500,000.
  else if (tier500000.indexOf(location) > -1) {
    return 500000;
  }

  //If the location is neither group, return the threshold as $400,000.
  return 400000;
}