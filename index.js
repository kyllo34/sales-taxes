"use strict";
// Dependencies
const fs = require("fs");
// import taxBracket lookup from config.js
const { taxBracket } = require("./config");

// Retrieve raw data from items.json file
let raw = fs.readFileSync("input.json");
// Parses raw data and parses to JSON data in JavaScript object
let data = JSON.parse(raw);

// Execute salesTax function with input from input.json
salesTax(data.input);

// Function that accepts an array of inputs and writes receipt to output.json
function salesTax(baskets) {
  // baskets.map will return a new output object to be written to output.json
  const output = baskets.map((basket) => {
    // Define newBasket to be a new object containing the basket id and the spread of the return objects from receipt handler which are the modified items array and the summary object
    const newBasket = { id: basket.id, ...receiptHandler(basket.items) };
    // Return the new Object to the output array
    return newBasket;
  });
  // Write output object(receipt) to output.json
  fs.writeFileSync("output.json", JSON.stringify(output));
}

// Function that accepts items and will return modified items and summary objects
function receiptHandler(items) {
  // Define summary object to contain sales tax and total properties
  const summary = { "Sales Tax": 0, Total: 0 };
  // Iterate through items array
  const receipt = items.map((item) => {
    // Define itemTax to be applied to item cost
    let itemTax = 0;
    // First we check what tax is applicable by looking at category
    itemTax += taxBracket[item.category] / 100;
    // Second we check if the item is imported
    itemTax += (item.imported ? taxBracket.import : 0) / 100;
    // Add item tax to Sales tax
    summary["Sales Tax"] += itemTax * item.cost * item.quantity;
    // Define newCost to get cost of item including tax
    const newCost = itemTax * item.cost + item.cost * item.quantity;
    // Add item tax and cost to Total
    summary["Total"] += newCost;
    // Return new modified object
    return { ...item, cost: newCost };
  });
  // Return receipt and summary objects
  return { items: receipt, summary };
}
