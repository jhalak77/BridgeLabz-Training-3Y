/*******************************************************************************
 * ASSIGNMENT 1 - CORE JAVASCRIPT SOLUTIONS
 * 
 * Instructions:
 * You can execute this script using Node.js (`node assignment1_solutions.js`) 
 * or by opening a web browser console and running the script.
 ******************************************************************************/

// =============================================================================
// Q1. Personalized Login Greeting
// =============================================================================
console.log("=== Q1: Personalized Login Greeting ===");

function q1_personalizedGreeting(userName) {
    // Get the current hour (0-23)
    const currentHour = new Date().getHours();
    let greeting = "";

    // Determine greeting based on time of day
    if (currentHour < 12) {
        greeting = `Good Morning ${userName}!`;
    } else if (currentHour >= 12 && currentHour <= 17) {
        greeting = `Good Afternoon ${userName}!`;
    } else {
        greeting = `Good Evening ${userName}!`;
    }

    console.log(greeting);
}

// Test Q1
q1_personalizedGreeting("Alex");


// =============================================================================
// Q2. Multi-Type Data Summary
// =============================================================================
console.log("\n=== Q2: Multi-Type Data Summary ===");

function q2_dataSummary() {
    // Declare variables of various data types
    const strVar = "Hello World";
    const numVar = 42;
    const boolVar = true;
    const arrayVar = [10, 20, 30];
    const objectVar = { name: "Alice", age: 25 };
    const nullVar = null;
    let undefinedVar;

    // Helper function to accurately detect type (especially for Arrays & Null)
    function getType(val) {
        if (Array.isArray(val)) return "array";
        if (val === null) return "null";
        return typeof val;
    }

    // Prepare report data
    const reportData = [
        { Label: "strVar", Value: String(strVar), Type: getType(strVar) },
        { Label: "numVar", Value: numVar, Type: getType(numVar) },
        { Label: "boolVar", Value: boolVar, Type: getType(boolVar) },
        { Label: "arrayVar", Value: JSON.stringify(arrayVar), Type: getType(arrayVar) },
        { Label: "objectVar", Value: JSON.stringify(objectVar), Type: getType(objectVar) },
        { Label: "nullVar", Value: String(nullVar), Type: getType(nullVar) },
        { Label: "undefinedVar", Value: String(undefinedVar), Type: getType(undefinedVar) }
    ];

    // Display formatted report using console.table
    console.table(reportData);
}

// Test Q2
q2_dataSummary();


// =============================================================================
// Q3. Monthly Expense Tracker
// =============================================================================
console.log("\n=== Q3: Monthly Expense Tracker ===");

function q3_expenseTracker() {
    // Expense array for 5 categories: [food, travel, rent, bills, leisure]
    const expenses = [250, 80, 1200, 150, 100];

    // Calculate total expenses using arithmetic operations
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i];
    }

    // Calculate average expense per category
    const average = total / expenses.length;

    // Add 10% tax using assignment operator
    let finalAmountAfterTax = total;
    finalAmountAfterTax *= 1.10; // Equivalent to total + (total * 0.10)

    // Format output to 2 decimal places
    console.log(`Total Expense: $${total.toFixed(2)}`);
    console.log(`Average Expense: $${average.toFixed(2)}`);
    console.log(`Final Amount After 10% Tax: $${finalAmountAfterTax.toFixed(2)}`);
}

// Test Q3
q3_expenseTracker();


// =============================================================================
// Q4. Academic Performance Evaluator
// =============================================================================
console.log("\n=== Q4: Academic Performance Evaluator ===");

function q4_evaluatePerformance(marks) {
    // Array of 5 subject marks
    const totalMarksPossible = marks.length * 100;
    
    let sum = 0;
    let hasFailedSubject = false;

    // Calculate sum and check individual subject pass criterion (< 35)
    for (let mark of marks) {
        sum += mark;
        if (mark < 35) {
            hasFailedSubject = true;
        }
    }

    const average = sum / marks.length;
    const percentage = (sum / totalMarksPossible) * 100;

    console.log(`Marks: [${marks.join(", ")}] | Average: ${average.toFixed(2)} | Overall: ${percentage.toFixed(2)}%`);

    // Determine status using logical operators and validation
    if (hasFailedSubject || percentage < 50) {
        console.log("Result: Detained");
    } else if (percentage >= 85) {
        console.log("Result: Promoted with Distinction");
    } else if (percentage >= 50 && percentage <= 84) {
        console.log("Result: Promoted");
    }
}

// Test Q4
q4_evaluatePerformance([88, 92, 80, 85, 90]); // Distinction
q4_evaluatePerformance([60, 55, 70, 65, 58]); // Promoted
q4_evaluatePerformance([90, 85, 30, 95, 90]); // Detained due to single subject < 35


// =============================================================================
// Q5. Weather Activity Planner
// =============================================================================
console.log("\n=== Q5: Weather Activity Planner ===");

function q5_planActivity(temperature, isRaining, windSpeed) {
    console.log(`Conditions -> Temp: ${temperature}°C, Raining: ${isRaining}, Wind: ${windSpeed} km/h`);

    // Evaluate conditions using combined && and || operators
    if (isRaining) {
        console.log("Advice: Stay indoors with hot coffee.");
    } else if (temperature > 35) {
        console.log("Advice: Go swimming.");
    } else if (temperature < 15 && windSpeed > 20) {
        console.log("Advice: Too cold and windy - stay home.");
    } else {
        console.log("Advice: Perfect day for a walk.");
    }
}

// Test Q5
q5_planActivity(25, true, 10);
q5_planActivity(38, false, 5);
q5_planActivity(10, false, 25);
q5_planActivity(22, false, 12);


// =============================================================================
// Q6. Progressive Discount System
// =============================================================================
console.log("\n=== Q6: Progressive Discount System ===");

function q6_calculateDiscount(totalPurchase) {
    let discountPercent = 0;

    // Determine discount tier
    if (totalPurchase >= 10000) {
        discountPercent = 25;
    } else if (totalPurchase >= 5000) {
        discountPercent = 15;
    } else if (totalPurchase >= 2000) {
        discountPercent = 5;
    } else {
        discountPercent = 0;
    }

    // Calculate final price and apply rounding
    const discountAmount = (totalPurchase * discountPercent) / 100;
    const finalPrice = Math.round(totalPurchase - discountAmount);

    console.log(`Original Total: $${Math.round(totalPurchase)}`);
    console.log(`Discount Percentage: ${discountPercent}%`);
    console.log(`Final Price After Discount: $${finalPrice}`);
}

// Test Q6
q6_calculateDiscount(7500);


// =============================================================================
// Q7. Smart Guessing Game (Number Range)
// =============================================================================
console.log("\n=== Q7: Smart Guessing Game ===");

function q7_guessingGame(userGuess) {
    // Generate a secret random number between 1 and 50
    const secretNumber = Math.floor(Math.random() * 50) + 1;

    console.log(`Secret Number: ${secretNumber} | User Guess: ${userGuess}`);

    // Evaluate user guess using nested conditions and logical operators
    if (userGuess === secretNumber) {
        console.log("Feedback: Correct guess!");
    } else {
        // Calculate difference for closeness check
        const difference = Math.abs(userGuess - secretNumber);

        if (difference <= 3) {
            console.log("Feedback: Very close!");
        } else if (userGuess > secretNumber) {
            console.log("Feedback: Too high");
        } else {
            console.log("Feedback: Too low");
        }
    }
}

// Test Q7
q7_guessingGame(25);


// =============================================================================
// Q8. Employee Salary Projection
// =============================================================================
console.log("\n=== Q8: Employee Salary Projection ===");

function q8_projectSalary(currentSalary, annualIncrementPercent) {
    const projectionReport = [];
    let salary = currentSalary;

    // Calculate projected salary for 5 years
    for (let year = 1; year <= 5; year++) {
        // Apply annual increment using assignment operator
        salary *= (1 + annualIncrementPercent / 100);

        projectionReport.push({
            "Year": `Year ${year}`,
            "Salary ($)": Math.round(salary) // Applied Math.round() for formatting
        });
    }

    console.log(`Initial Salary: $${currentSalary} | Annual Increment Rate: ${annualIncrementPercent}%`);
    console.table(projectionReport);
}

// Test Q8
q8_projectSalary(50000, 8);


// =============================================================================
// Q9. Random Math Quiz Generator
// =============================================================================
console.log("\n=== Q9: Random Math Quiz Generator ===");

function q9_generateMathQuiz() {
    // Generate two random numbers between 1 and 20
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;

    // Pick a random operator
    const operators = ['+', '-', '*', '/'];
    const randomOperator = operators[Math.floor(Math.random() * operators.length)];

    let correctAnswer;

    // Compute answer using switch statement
    switch (randomOperator) {
        case '+':
            correctAnswer = num1 + num2;
            break;
        case '-':
            correctAnswer = num1 - num2;
            break;
        case '*':
            correctAnswer = num1 * num2;
            break;
        case '/':
            // Format division to 2 decimal places
            correctAnswer = (num1 / num2).toFixed(2);
            break;
    }

    console.log(`Question: What is ${num1} ${randomOperator} ${num2}?`);
    console.log(`Correct Answer: ${correctAnswer}`);
}

// Test Q9
q9_generateMathQuiz();


// =============================================================================
// Q10. Citizen Eligibility Validator
// =============================================================================
console.log("\n=== Q10: Citizen Eligibility Validator ===");

function q10_validateEligibility(age, isCitizen) {
    console.log(`Applicant Age: ${age}, Is Citizen: ${isCitizen}`);

    // Evaluate eligibility using nested if-else and logical operators
    if (isCitizen) {
        if (age >= 18) {
            // Note: If citizen and age >= 18, check special voting condition interval if required by instructions
            if (age >= 18 && age <= 20) {
                console.log("Eligible to vote only.");
            } else {
                console.log("Eligible for all services.");
            }
        } else {
            console.log("Not eligible yet.");
        }
    } else {
        if (age >= 18) {
            console.log("Only age criteria met.");
        } else {
            console.log("Not eligible yet.");
        }
    }
}

// Test Q10
q10_validateEligibility(22, true);  // Eligible for all services
q10_validateEligibility(19, true);  // Eligible to vote only
q10_validateEligibility(25, false); // Only age criteria met
q10_validateEligibility(16, true);  // Not eligible yet