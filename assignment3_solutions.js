/*******************************************************************************
 * ASSIGNMENT 3 - JAVASCRIPT SOLUTIONS
 * 
 * Instructions:
 * All solutions are consolidated into this single JavaScript file.
 * Each question is wrapped in its own section/function with comments explaining
 * the logic, hoisting behavior, strict mode semantics, and debugging insights.
 * You can run this file directly using Node.js or paste it into your browser console.
 *******************************************************************************/

"use strict";

console.log("=================================================================");
console.log("             ASSIGNMENT 3 - JAVASCRIPT SOLUTIONS                ");
console.log("=================================================================\n");

// =============================================================================
// Q1 - Dynamic Data Parser
// =============================================================================
console.log("--- Q1 - Dynamic Data Parser ---");

function runDynamicDataParser() {
    const apiData = ["25", "true", "false", "NaN", "", "100px", "3.14", null, undefined];
    
    const validNumericData = [];
    const invalidNumericData = [];
    
    console.log("Type Conversions and Validation Breakdown:");
    
    for (let i = 0; i < apiData.length; i++) {
        const item = apiData[i];
        
        // Convert to Boolean and String forms
        const boolForm = Boolean(item);
        const stringForm = String(item);
        
        // Convert to Number form
        let numForm = Number(item);
        
        // Strict criteria for valid numeric data:
        // 1. Must not be NaN (e.g., "100px", "NaN", undefined)
        // 2. Must not be empty string or whitespace (Number("") is 0, which is invalid numeric string)
        // 3. Must not be null or boolean primitives (Number(null) is 0, Number(true) is 1, but they are non-numeric primitives)
        let isValidNumeric = true;
        
        if (typeof item === 'string') {
            if (item.trim() === "" || isNaN(numForm)) {
                isValidNumeric = false;
            }
        } else {
            isValidNumeric = false; // null, undefined, booleans are not valid standalone numeric data entries
        }
        
        const summaryObj = {
            Original: item === null ? "null" : item === undefined ? "undefined" : `"${item}"`,
            Type: typeof item,
            NumberForm: numForm,
            BooleanForm: boolForm,
            StringForm: `"${stringForm}"`,
            IsValidNumeric: isValidNumeric
        };
        
        if (isValidNumeric) {
            validNumericData.push({ original: item, numericValue: numForm });
        } else {
            invalidNumericData.push({ original: item, reason: isNaN(numForm) ? "NaN value" : "Non-numeric input type/format" });
        }
    }
    
    console.log("\n--- Valid Numeric Data ---");
    console.table(validNumericData);
    
    console.log("\n--- Invalid / Non-Numeric Data ---");
    console.table(invalidNumericData);
}

runDynamicDataParser();
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q2 - Employee Bonus Calculator
// =============================================================================
console.log("--- Q2 - Employee Bonus Calculator ---");

function calculateEmployeeBonuses() {
    const employees = [
        { name: "Amit", salary: "45000", years: "5" },
        { name: "Sara", salary: "38000", years: "2" },
        { name: "Kiran", salary: "52000", years: "7" },
        { name: "CorruptedRecord", salary: "invalid", years: "3" } // Test record for try...catch
    ];

    console.log("Processing Employee Bonuses:");

    employees.forEach((emp, index) => {
        try {
            // Check for missing properties
            if (!emp.name || emp.salary === undefined || emp.years === undefined) {
                throw new Error(`Missing required property in employee record at index ${index}`);
            }

            // Numeric conversion
            const salaryNum = Number(emp.salary);
            const yearsNum = Number(emp.years);

            if (isNaN(salaryNum) || isNaN(yearsNum)) {
                throw new Error(`Invalid numeric conversion for salary ('${emp.salary}') or years ('${emp.years}')`);
            }

            // Bonus Calculation Logic: 10% if years > 3, else 5%
            const bonusRate = yearsNum > 3 ? 0.10 : 0.05;
            const bonusAmount = salaryNum * bonusRate;
            const totalCompensation = salaryNum + bonusAmount;

            console.log(
                `Employee: ${emp.name.padEnd(8)} | Salary: ₹${salaryNum.toString().padStart(6)} | Years: ${yearsNum} | Bonus Rate: ${(bonusRate * 100)}% | Bonus: ₹${bonusAmount.toFixed(2)} | Total: ₹${totalCompensation.toFixed(2)}`
            );

        } catch (error) {
            console.error(`[Error Processing ${emp.name || 'Index ' + index}]: ${error.message}`);
        }
    });
}

calculateEmployeeBonuses();
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q3 - Transaction Validator
// =============================================================================
console.log("--- Q3 - Transaction Validator ---");

function validateTransactions() {
    const transactions = [
        { id: 1, amount: 2000 },
        { id: 2, amount: -500 },
        { id: 3 },
        null
    ];

    const validTransactions = [];
    const invalidTransactions = [];

    transactions.forEach((tx, index) => {
        try {
            // Step-by-step custom error checks
            // Debugger tip: Place breakpoint here to inspect `tx` and `index`
            
            if (tx === null || tx === undefined) {
                throw new Error("Null or undefined transaction object encountered.");
            }
            if (tx.id === undefined) {
                throw new Error("Missing required property: 'id'");
            }
            if (tx.amount === undefined) {
                throw new Error(`Transaction #${tx.id}: Missing required property 'amount'`);
            }
            if (typeof tx.amount !== "number" || isNaN(tx.amount)) {
                throw new Error(`Transaction #${tx.id}: Invalid non-numeric amount`);
            }
            if (tx.amount < 0) {
                throw new Error(`Transaction #${tx.id}: Negative transaction amount (₹${tx.amount}) is not allowed`);
            }

            validTransactions.push(tx);

        } catch (err) {
            invalidTransactions.push({
                index: index,
                record: JSON.stringify(tx),
                errorMessage: err.message
            });
        }
    });

    console.log(`Validation Summary: Total = ${transactions.length} | Passed = ${validTransactions.length} | Failed = ${invalidTransactions.length}`);
    
    console.log("\nSuccessful Transactions:");
    console.table(validTransactions);

    console.log("\nFailed Transactions Report:");
    console.table(invalidTransactions);
}

validateTransactions();
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q4 - Debugging Mystery
// =============================================================================
console.log("--- Q4 - Debugging Mystery ---");

/*
 * Explanation of Original Error:
 * Under "use strict", assigning a value to an undeclared variable (`greeting = "Welcome"`) 
 * throws a ReferenceError: greeting is not defined.
 * In non-strict mode, JavaScript would implicitly create `greeting` as a property on the global object.
 *
 * Fix & Scope Explanation:
 * Declaring `let greeting = "Welcome"` or `const greeting = "Welcome"` grounds the variable 
 * inside the function/block scope, preventing pollution of global scope and preventing runtime errors.
 */

function fixedShowMessage() {
    let greeting = "Welcome"; // Properly declared with block scope keyword 'let'
    console.log(`[Fixed showMessage]: ${greeting}`);
}

fixedShowMessage();
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q5 - Hoisting Lab: The Sequence Trap
// =============================================================================
console.log("--- Q5 - Hoisting Lab: The Sequence Trap ---");

/*
 * Analysis of Hoisting in original snippet:
 * 1. `{ console.log("Game started"); }` - Simple block statement, executes immediately.
 * 2. `console.log(score);` - `var score` is hoisted to the top of its scope and initialized with `undefined`. Prints `undefined`.
 * 3. `announce();` - Function declarations are hoisted with their complete implementation. Calls `announce()`.
 * 4. Inside `announce()`:
 *    - `let status = "ready";` is declared inside `announce`.
 *    - `startGame();` is called.
 *    - Inside `startGame()`: `console.log(status)` tries to access `status`. However, `status` is in `announce()`'s local lexical scope, NOT `startGame()`'s parent scope.
 *      `startGame` was defined in global scope, so it cannot access `status` inside `announce` (ReferenceError)!
 *
 * Below is the corrected, refactored version using Arrow Functions:
 */

// Refactored Correct Code:
const runHoistingLabFixed = () => {
    let score = 50; // Declared before usage

    const startGame = (currentStatus) => {
        console.log(`Game Status: ${currentStatus}`);
    };

    const announce = () => {
        let status = "ready";
        startGame(status); // Pass status explicitly as argument
    };

    console.log("Game started");
    console.log(`Initial Score: ${score}`);
    announce();
};

runHoistingLabFixed();
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q6 - Pyramid Pattern Generator
// =============================================================================
console.log("--- Q6 - Pyramid Pattern Generator ---");

function generatePyramid(rows = 5) {
    console.log(`Generating Pyramid Pattern with ${rows} rows:`);
    
    // Using 'let' ensures row-level block scoping for loop counters
    for (let i = 1; i <= rows; i++) {
        let line = "";
        for (let j = 1; j <= i; j++) {
            line += "*";
        }
        console.log(line);
    }
}

generatePyramid(4);
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q7 - Smart Calculator
// =============================================================================
console.log("--- Q7 - Smart Calculator ---");

// Custom Error Class
class InvalidOperationError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidOperationError";
    }
}

function smartCalculate(operation, num1, num2) {
    try {
        let result;
        switch (operation) {
            case "add":
                result = num1 + num2;
                break;
            case "subtract":
                result = num1 - num2;
                break;
            case "multiply":
                result = num1 * num2;
                break;
            case "divide":
                if (num2 === 0) {
                    throw new Error("DivisionByZeroError: Cannot divide by zero.");
                }
                result = num1 / num2;
                break;
            case "power":
                result = Math.pow(num1, num2);
                break;
            case "root":
                if (num1 < 0) {
                    throw new Error("NegativeRootError: Cannot calculate square root of a negative number.");
                }
                result = Math.sqrt(num1);
                break;
            default:
                throw new InvalidOperationError(`Invalid operation '${operation}'. Supported operations: add, subtract, multiply, divide, power, root.`);
        }

        console.log(`Operation: '${operation}' | Parameters: (${num1}, ${num2}) => Result: ${result}`);
        return result;

    } catch (err) {
        console.error(`[Calculator Error] Op: '${operation}' (${num1}, ${num2}) -> ${err.name}: ${err.message}`);
    }
}

// Testing calculator operations
smartCalculate("add", 25, 5);
smartCalculate("divide", 25, 0); // Triggers divide by 0 error
smartCalculate("root", -16, 0);  // Triggers root of negative error
smartCalculate("unknownOp", 10, 2); // Triggers InvalidOperationError
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q8 - Strict Mode Showdown
// =============================================================================
console.log("--- Q8 - Strict Mode Showdown ---");

/*
 * Observations & Differences with "use strict":
 * 1. Duplicate Parameter Names (`function demo(a, a)`):
 *    - Without "use strict": Allowed in non-arrow functions. The second parameter overwrites the first.
 *    - With "use strict": Throws SyntaxError: Duplicate parameter name not allowed in this context.
 * 2. Undeclared Variables (`total = 10`):
 *    - Without "use strict": Creates global property `window.total` or `global.total`.
 *    - With "use strict": Throws ReferenceError: total is not defined.
 * 3. Deleting Unqualified Identifiers (`delete total`):
 *    - Without "use strict": Evaluates to false or deletes property if configurable.
 *    - With "use strict": Throws SyntaxError: Delete of an unqualified identifier in strict mode.
 */

// ES6 Compliant Corrected Version:
const demoES6 = (a, b) => {
    let total = a + b; // Proper declaration
    console.log(`[ES6 Demo] Params: (${a}, ${b}) | Sum Total: ${total}`);
};

demoES6(5, 10);
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q9 - JSON Audit
// =============================================================================
console.log("--- Q9 - JSON Audit ---");

function runJsonAudit() {
    const rawData = [
        '{"user":"Alex", "age":25}',
        '{"id":2}',
        '{invalid}',
        '{"user":"Mina", "age": "22"}',
        '{"user":"Sam", "age": 15}' // Added for under-18 testing
    ];

    const cleanData = [];

    rawData.forEach((jsonStr, index) => {
        const lineNo = index + 1;
        try {
            // Parse JSON safely
            const parsed = JSON.parse(jsonStr);

            // Validate required keys
            if (!("user" in parsed) || !("age" in parsed)) {
                throw new Error(`Missing mandatory keys ('user' or 'age')`);
            }

            // Convert age to Number
            const numericAge = Number(parsed.age);
            if (isNaN(numericAge)) {
                throw new Error(`Invalid non-numeric age value '${parsed.age}'`);
            }

            parsed.age = numericAge;

            // Filter under-18 users
            if (parsed.age < 18) {
                console.log(`Line ${lineNo}: Filtered out under-age user '${parsed.user}' (Age: ${parsed.age})`);
                return;
            }

            cleanData.push(parsed);

        } catch (err) {
            console.error(`Line ${lineNo}: JSON Audit Failed - ${err.message} | Raw: "${jsonStr}"`);
        }
    });

    console.log("\nClean Audited User Records (Age >= 18):");
    console.table(cleanData);
}

runJsonAudit();
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q10 - Nested Hoisting and Closures
// =============================================================================
console.log("--- Q10 - Nested Hoisting and Closures ---");

/*
 * Explanation of Original Code:
 * function outer() {
 *     console.log(count); // Output 1: undefined (var count in outer is hoisted to top of outer)
 *     var count = 5;
 *     function inner() {
 *         console.log(count); // Output 2: undefined (var count in inner is hoisted to top of inner scope!)
 *         var count = 10;
 *     }
 *     inner();
 * }
 * outer();
 *
 * Why both log `undefined`:
 * Each function creates a separate execution context. Inside `inner()`, `var count = 10` hoists `var count` 
 * to the top of `inner`'s context, shadowing outer's `count` and initializing as `undefined` before assignment.
 */

// Demonstration with block scoping and Arrow Functions:
function demonstrateLexicalClosures() {
    let outerCount = 5;

    const innerArrow = () => {
        // Accesses outerCount via lexical closure scope since inner arrow doesn't re-declare 'outerCount'
        console.log(`[Inner Arrow Function] Accessing lexical outerCount: ${outerCount}`);
    };

    console.log(`[Outer Scope] outerCount: ${outerCount}`);
    innerArrow();
}

demonstrateLexicalClosures();
console.log("=================================================================");
