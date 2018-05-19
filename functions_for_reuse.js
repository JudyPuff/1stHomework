function eligible_has_owned_home (has_owned_home) {
  return !has_owned_home;
}

let has_owned_home = true;
let result = eligible_has_owned_home(has_owned_home) ? "Eligible" : "Not eligible";
console.log("Has owned home: -> "+result);

has_owned_home = false;
result = eligible_has_owned_home(has_owned_home) ? "Eligible" : "Not eligible";
console.log("Hasn't owned home: -> "+result);

