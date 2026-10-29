/*******************************************************************************
 * ASSIGNMENT 2 - JAVASCRIPT SOLUTIONS
 * 
 * Instructions:
 * All solutions are consolidated into this single JavaScript file.
 * Each question is wrapped in its own section/function with comments explaining the logic.
 * You can run this file directly using Node.js or paste it into your browser console.
 *******************************************************************************/

console.log("=================================================================");
console.log("             ASSIGNMENT 2 - JAVASCRIPT SOLUTIONS                ");
console.log("=================================================================\n");

// =============================================================================
// Q1. Scope Conflict Resolver
// =============================================================================
console.log("--- Q1. Scope Conflict Resolver ---");

// Global variable definition
let bonus = 5000;

/**
 * Calculates total salary based on employment status and global bonus.
 * Demonstrates local scoping and interaction with global variables.
 * @param {boolean} isPermanent - Indicates whether the employee is permanent.
 * @returns {number} The calculated total salary.
 */
function calculateSalary(isPermanent) {
    // Local variable scoped to calculateSalary function
    let salary = 40000;
    
    // Check if the employee is permanent to add global bonus
    if (isPermanent) {
        salary += bonus; // Adding global bonus to local salary
    }
    
    console.log(`Employment Status: ${isPermanent ? "Permanent" : "Temporary"}`);
    console.log(`Calculated Total Salary: ₹${salary}`);
    return salary;
}

// Test cases demonstrating how scope and parameters work
console.log("Test Case 1 (Permanent Employee):");
calculateSalary(true);

console.log("\nTest Case 2 (Temporary Employee):");
calculateSalary(false);

// Demonstrating global scope behavior
console.log(`\nGlobal variable 'bonus' remains unchanged at: ₹${bonus}`);
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q2. String Manipulation Report
// =============================================================================
console.log("--- Q2. String Manipulation Report ---");

function formatProductTitle(rawTitle) {
    console.log(`Original Title: "${rawTitle}"`);
    
    // Step 1: Trim extra leading and trailing whitespace
    let cleaned = rawTitle.trim();
    
    // Step 2: Convert to lower case and split into words
    let words = cleaned.toLowerCase().split(' ');
    
    // Step 3: Filter out any empty strings resulting from multiple spaces and capitalize first letter of each word
    let capitalizedWords = words
        .filter(word => word.length > 0)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1));
    
    // Step 4: Join words back into a single string
    let titleFormatted = capitalizedWords.join(' ');
    
    // Step 5: Replace "Pro" with "Pro Edition" (case-sensitive after title capitalization)
    let finalTitle = titleFormatted.replace(/Pro\b/g, "Pro Edition");
    
    console.log(`Cleaned & Formatted Title: "${finalTitle}"`);
    console.log(`Length of Formatted Title: ${finalTitle.length} characters`);
}

// Test string with extra spaces and lowercase "pro"
let inputProduct = "   wireless headphones PRO   ";
formatProductTitle(inputProduct);
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q3. Math Utility Dashboard
// =============================================================================
console.log("--- Q3. Math Utility Dashboard ---");

function runMathDashboard(x) {
    // Perform Math calculations
    let roundedValue = Math.round(x);
    let squareRoot = Math.sqrt(x);
    let cubedPower = Math.pow(x, 3);
    
    // Generate a random integer between 10 and 50 inclusive
    // Formula: Math.floor(Math.random() * (max - min + 1)) + min
    let randomNum = Math.floor(Math.random() * 41) + 10;
    
    // Formatted report using template literals
    let summary = `
========================================
       MATH UTILITY DASHBOARD           
========================================
Input Value (x)      : ${x}
Rounded Value        : ${roundedValue}
Square Root          : ${squareRoot.toFixed(4)}
Power (x^3)          : ${cubedPower.toFixed(2)}
Random Number (10-50): ${randomNum}
========================================`;
    
    console.log(summary);
}

runMathDashboard(16.75);
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q4. Array Performance Analyzer
// =============================================================================
console.log("--- Q4. Array Performance Analyzer ---");

function analyzeStudentPerformance() {
    // Generate an array of 8 random scores between 30 and 100
    let scores = Array.from({ length: 8 }, () => Math.floor(Math.random() * 71) + 30);
    
    // 1. Highest and Lowest scores using spread operator
    let maxScore = Math.max(...scores);
    let minScore = Math.min(...scores);
    
    // 2. Average score using reduce()
    let totalScore = scores.reduce((sum, score) => sum + score, 0);
    let avgScore = totalScore / scores.length;
    
    // 3. Count passing students (score >= 50) using filter()
    let passingScores = scores.filter(score => score >= 50);
    let passedCount = passingScores.length;
    
    // Display summary
    console.log(`Scores Array           : [${scores.join(', ')}]`);
    console.log(`Highest Score          : ${maxScore}`);
    console.log(`Lowest Score           : ${minScore}`);
    console.log(`Average Score          : ${avgScore.toFixed(2)}`);
    console.log(`Passed Students (>=50) : ${passedCount} out of ${scores.length}`);
}

analyzeStudentPerformance();
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q5. Boolean Logic Access System
// =============================================================================
console.log("--- Q5. Boolean Logic Access System ---");

function evaluateSecuritySystem(isDoorLocked, isWindowClosed, isAlarmOn, isOwnerInside) {
    // Condition: Access is granted ONLY if Alarm is ON AND Door & Window are closed AND Owner is inside
    let isSecure = isAlarmOn && isDoorLocked && isWindowClosed && isOwnerInside;
    
    let status = isSecure ? "Secure" : "Unsafe";
    
    console.log(`State -> Door Locked: ${isDoorLocked}, Window Closed: ${isWindowClosed}, Alarm On: ${isAlarmOn}, Owner Inside: ${isOwnerInside}`);
    console.log(`Security Evaluation Result: [ ${status} ]\n`);
    return status;
}

console.log("Testing Multiple Outcomes:");
console.log("Scenario 1 (All Conditions Satisfied):");
evaluateSecuritySystem(true, true, true, true);

console.log("Scenario 2 (Door Unlocked):");
evaluateSecuritySystem(false, true, true, true);

console.log("Scenario 3 (Alarm Off):");
evaluateSecuritySystem(true, true, false, true);
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q6. Event-Based Counter Simulation
// =============================================================================
console.log("--- Q6. Event-Based Counter Simulation ---");

// Outer closure scope for count
let count = 0;

function createCounter() {
    /**
     * Nested function demonstrating inner lexical scope
     */
    function logCount(action) {
        console.log(`Action: ${action.padEnd(10)} | Current Count: ${count}`);
    }

    return {
        increment: function() {
            count++;
            logCount("increment");
        },
        decrement: function() {
            count--;
            logCount("decrement");
        }
    };
}

const counter = createCounter();

// Simulating click events manually
console.log("Simulating user clicks:");
counter.increment(); // count = 1
counter.increment(); // count = 2
counter.increment(); // count = 3
counter.decrement(); // count = 2
counter.decrement(); // count = 1
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q7. Customer Feedback Processor
// =============================================================================
console.log("--- Q7. Customer Feedback Processor ---");

function processFeedback(feedback) {
    console.log(`Feedback Text: "${feedback}"`);
    
    // Count words using split()
    let wordsArray = feedback.trim().split(/\s+/);
    let wordCount = wordsArray.length;
    
    // Convert text to lowercase for case-insensitive checking
    let lowerFeedback = feedback.toLowerCase();
    
    // Check for negative sentiment words using includes()
    let containsBad = lowerFeedback.includes("bad");
    let containsPoor = lowerFeedback.includes("poor");
    
    let classification = "";
    if (!containsBad && !containsPoor) {
        classification = "Positive Feedback";
    } else {
        classification = "Needs Improvement";
    }
    
    console.log(`Word Count              : ${wordCount}`);
    console.log(`Contains Negative Words : ${containsBad || containsPoor}`);
    console.log(`Feedback Classification : ${classification}`);
}

// Test sample feedback
let feedbackSample1 = "Great product! Fast delivery and amazing sound quality!";
processFeedback(feedbackSample1);

console.log("\nTesting negative feedback:");
let feedbackSample2 = "The product quality was poor and delivery was delayed.";
processFeedback(feedbackSample2);
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q8. Dynamic Discount Evaluator
// =============================================================================
console.log("--- Q8. Dynamic Discount Evaluator ---");

function calculateFinalCartTotal(cart) {
    console.log("Cart Items:");
    
    // Calculate category discounts for each item and total raw cost
    let itemizedDetails = cart.map(item => {
        let categoryDiscountRate = 0;
        
        if (item.category === "electronics") {
            categoryDiscountRate = 0.10; // 10% discount
        } else if (item.category === "fashion") {
            categoryDiscountRate = 0.05; // 5% discount
        }
        
        let discountedPrice = item.price * (1 - categoryDiscountRate);
        console.log(` - ${item.item} (${item.category}): Original = ₹${item.price}, Category Discount = ${categoryDiscountRate * 100}%, After Item Discount = ₹${discountedPrice}`);
        
        return {
            ...item,
            discountedPrice
        };
    });
    
    // Sum item prices after individual category discounts using reduce()
    let subtotalAfterCategoryDiscounts = itemizedDetails.reduce((sum, item) => sum + item.discountedPrice, 0);
    let totalRawPrice = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Check for overall cart threshold discount (> 50000)
    let overallDiscountRate = 0;
    if (totalRawPrice > 50000) {
        overallDiscountRate = 0.05; // Extra 5% overall discount
    }
    
    let finalTotal = subtotalAfterCategoryDiscounts * (1 - overallDiscountRate);
    
    console.log(`\nRaw Cart Total            : ₹${totalRawPrice}`);
    console.log(`After Category Discounts  : ₹${subtotalAfterCategoryDiscounts}`);
    console.log(`Overall Discount (>50,000): ${overallDiscountRate * 100}%`);
    console.log(`Final Payable Total       : ₹${finalTotal.toFixed(2)}`);
}

const sampleCart = [
    { item: "Laptop", category: "electronics", price: 45000 },
    { item: "Shoes", category: "fashion", price: 2500 },
    { item: "Book", category: "education", price: 600 }
];

calculateFinalCartTotal(sampleCart);
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q9. Odd-Even Number Analyzer
// =============================================================================
console.log("--- Q9. Odd-Even Number Analyzer ---");

function analyzeNumberRange() {
    // Generate array of numbers 1 to 30
    let numbers = [];
    for (let i = 1; i <= 30; i++) {
        numbers.push(i);
    }
    
    let classifiedResults = [];
    
    // Classify each number using loop and conditionals
    for (let num of numbers) {
        let label = "";
        
        if (num % 3 === 0 && num % 5 === 0) {
            label = "FizzBuzz";
        } else if (num % 2 === 0) {
            label = "Even";
        } else {
            label = "Odd";
        }
        
        classifiedResults.push({ Number: num, Result: label });
    }
    
    console.log("Number Range Classification (1 - 30):");
    console.table(classifiedResults.slice(0, 15)); // Display first 15 for concise console view
    console.log("... (and remaining up to 30 analyzed successfully)");
}

analyzeNumberRange();
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q10. Departmental Employee Evaluator
// =============================================================================
console.log("--- Q10. Departmental Employee Evaluator ---");

function evaluateDepartments(departments) {
    console.log("Department Performance Summary:");
    
    let evaluationTable = [];
    
    for (let i = 0; i < departments.length; i++) {
        let deptName = departments[i][0];
        let score = departments[i][1];
        let evaluation = "";
        
        // Nested evaluation criteria using comparison operators
        if (score >= 90) {
            evaluation = "Excellent";
        } else if (score >= 75) {
            evaluation = "Good";
        } else if (score >= 60) {
            evaluation = "Average";
        } else {
            evaluation = "Needs Improvement";
        }
        
        evaluationTable.push({
            Department: deptName,
            Score: score,
            Evaluation: evaluation
        });
    }
    
    console.table(evaluationTable);
}

const departmentsData = [
    ["HR", 72],
    ["Finance", 88],
    ["Tech", 95],
    ["Support", 63]
];

evaluateDepartments(departmentsData);
console.log("=================================================================");
