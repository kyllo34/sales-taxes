# sales-taxes

## Instructions:
- `input.json` contains an array of basket objects that can be modified and added to.
- The input property represents an array of basket objects, each with a unique id and an array of items
- Each item requires a description, category which determines its tax bracket, quantity, cost, and an imported property which determines if the item will have a tariff applied to it.
- Run `node index.js` in the command line to run app.
- The output will be written to `output.json`

## Approach
- Based on the open nature of the prompt I decided to construct the input as a JSON object stored in an input.json file which is read using Node's fs library
- I created a config.js file to contain the tax bracket object and import tax constant so that the application can adapt to any changes in import, standard, or exempt taxing.
- For the input I chose to create a category and imported property to make the tax calculation easier.

## Problem Domain:
SALES TAXES
Basic sales tax is applicable at a rate of 10% on all goods, except books, food, and medical products that are exempt. Import duty is an additional sales tax applicable on all imported goods at a rate of 5%, with no exemptions.
 
The rounding rules for sales tax are that for a tax rate of n%, a shelf price of p contains
(np/100 rounded up to the nearest 0.05) amount of sales tax.
When I purchase items I receive a receipt which lists the name of all the items and their price (including tax), finishing with the total cost of the items, and the total amounts of sales taxes paid.  
 
Write an application that accepts inputs like below and print out put the receipt details for these shopping baskets.  The input & output can be in any format you want: JSON, CSV, etc but do not hard code the input or output.  
 
INPUT:
Input 1:
1 book at 12.49
1 music CD at 14.99
1 chocolate bar at 0.85
 
Input 2:
1 imported box of chocolates at 10.00
1 imported bottle of perfume at 47.50
 
Input 3:
1 imported bottle of perfume at 27.99
1 bottle of perfume at 18.99
1 packet of headache pills at 9.75
1 imported box of chocolates at 11.25
 
EXPECTED OUTPUT:
Output 1:
1 book : 12.49
1 music CD: 16.49
1 chocolate bar: 0.85
Sales Taxes: 1.50
Total: 29.83
 
Output 2:
1 imported box of chocolates: 10.50
1 imported bottle of perfume: 54.65
Sales Taxes: 7.65
Total: 65.15
 
Output 3:
1 imported bottle of perfume: 32.19
1 bottle of perfume: 20.89
1 packet of headache pills: 9.75
1 imported box of chocolates: 11.85
Sales Taxes: 6.70
Total: 74.68
