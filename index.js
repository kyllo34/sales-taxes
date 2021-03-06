// Dependencies
const fs = require("fs");
// import taxBracket lookup from config.js
const { taxBracket, importTax } = require("./config");

// Retrieve raw data from items.json file
let raw = fs.readFileSync("input.json");
// Parses raw data to JSON data in JavaScript object
let data = JSON.parse(raw);

// Execute salesTax function with input from input.json
salesTax(data.input);

// Function that accepts an array of inputs and writes receipt to output.json
function salesTax(baskets) {
  // baskets.map will return a new output object to be written to output.json
  const output = baskets.map((basket) => {
    // Return a new object containing the basket id and the spread of the return objects from receipt handler which are the modified items array and the summary object
    return { id: basket.id, ...createReceipt(basket.items) };
  });
  // Write output object(receipt) to output.json
  fs.writeFileSync("output.json", JSON.stringify(output));
}

// Function that accepts items and will return modified items and summary objects
function createReceipt(items) {
  // Define summary object to contain sales tax and total properties
  const summary = { salesTax: 0, total: 0 };
  // Iterate through items array
  const receipt = items.map((item) => {
    // I Define itemSalesTax to be the return of calculateSalesTax
    let itemSalesTax = calculateSalesTax(item);
    // Add itemSalesTax to salesTax
    summary.salesTax += itemSalesTax * item.quantity;
    // Define newCost to get cost of item including tax
    let newCost = item.cost + itemSalesTax;
    // Add item tax and cost multiplied by its quantity to Total
    summary.total += newCost * item.quantity;
    // Remove decimals past the 100th place, returns a string
    newCost = newCost.toFixed(2);
    // Return new modified object
    return { ...item, cost: newCost };
  });
  // Defines newSummary to be the return of round2Dec that rounds summary values to the nearest 100th place and returns the object
  let basketSummary = round2Dec(summary);
  // Return receipt and summary objects
  return { items: receipt, basketSummary };
}

// Declare function that accepts an item to determine the sales tax to be applied
function calculateSalesTax(item) {
  // First I define the base itemTax to be whatever tax percentage is applicable based on its category
  let itemTaxPercent = taxBracket[item.category];
  // Second I check if the item is imported, if it is, add the import tax
  if (item.imported) itemTaxPercent += importTax;
  // I calculate the itemTax to be the rounded product of the tax percentage, item cost, and 20 divided by 100 and then 20
  // as per rounding rules for sales tax; n%, a shelf price of p contains (np/100 rounded up to the nearest 0.05) amount of sales tax.
  let itemTax = Math.ceil((itemTaxPercent * item.cost * 20) / 100) / 20;
  return itemTax;
}

// Declare function that returns the summary object but with its values rounded to the 100s
// This function was created to account for rounding errors for numbers whose value cannot be represented exactly in binary
//  i.e. 14.99 + 1.5 = 16.490000000000002 => 16.49
function round2Dec(summary) {
  // Defined roundedSummary to be copy of summary as to avoid mutation
  let roundedSummary = Object.keys(summary).reduce(
    // Iterate through both keys in the summary object and round their respective values to the nearest 100th place and returns a string
    // Use reduce method on object.keys iterator to iterate through keys and modify them and returning a new modified object
    // Initialize the spread of the summary object as the accumulator
    function(accumulator, property) {
      accumulator[property] = (
        Math.round(accumulator[property] * 100) / 100
      ).toFixed(2);
      return accumulator;
    },
    { ...summary }
  );

  return roundedSummary;
}
