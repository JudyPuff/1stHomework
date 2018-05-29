

let years_in_ks = []


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

// function HSPayability(years_in_ks){
// // switch (years_in_ks) {
// //   case 0:
// //   case 1:
// //   case 2:
// //     return false;
// //   case 3:
// //   case 4:
// //     let HS_grant = years_in_ks * 1000
// //     return HS_grant
// //   default:
// //     let HS_grant = 5000
// //     return HS_grant
// // }

// if (years_in_ks < 3) {
//   return false
// } else if (years_in_ks >= 5) {
//     let HS_grant = 5000
//     return HS_grant
//  } else {
//     let HS_grant = years_in_ks * 1000
//     return HS_grant
//   }
// }

let savings = []
let gross_ks = []
const init_govt_contrib = 1000
let net_ks = gross_ks - init_govt_contrib
let purc_price = []
let LVR_deposit_req = purc_price * 0.2
let HS_desposit_req = purc_price * 0.1

function depositEligibility(purc_price, savings){
  let total_savings = savings + HS_grant + net_ks
  if (total_savings >= HS_desposit_req){
    return true
  } else if (total_savings >= LVR_deposit_req) {
    return true
  } else {
    return false
  }
    

}
