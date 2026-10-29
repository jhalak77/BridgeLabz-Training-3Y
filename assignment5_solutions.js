/*******************************************************************************
 * ASSIGNMENT 5 - JAVASCRIPT SOLUTIONS
 * 
 * Instructions:
 * All solutions are consolidated into this single JavaScript file.
 * Each question is wrapped in its own section/function with detailed comments 
 * explaining callbacks, prototypes, prototypal inheritance, closures, `this` scoping, 
 * array polyfills, and ES6 class syntax.
 * You can run this file directly using Node.js or paste it into your browser console.
 *******************************************************************************/

console.log("=================================================================");
console.log("             ASSIGNMENT 5 - JAVASCRIPT SOLUTIONS                ");
console.log("=================================================================\n");

// =============================================================================
// Q1. Callback Function Flow Demonstration
// =============================================================================
console.log("--- Q1. Callback Function Flow ---");

/**
 * Callback function that prints the concluding message.
 */
function showEndMessage() {
    console.log("Welcome to the course!");
}

/**
 * Higher-order function that accepts a user's name and a callback function.
 * @param {string} name - User's name
 * @param {Function} callback - Function executed after greeting
 */
function greetUser(name, callback) {
    console.log(`Hello ${name}`);
    if (typeof callback === "function") {
        callback(); // Executing the callback function
    }
}

// Demonstrating callback flow
greetUser("Rahul", showEndMessage);
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q2. Higher-Order Function with Callbacks (applyOperation)
// =============================================================================
console.log("--- Q2. Higher-Order Array Operation ---");

/**
 * Applies an operation callback to each element of a numbers array.
 * @param {number[]} numbers - Array of numbers
 * @param {Function} operation - Callback function specifying transformation logic
 * @returns {number[]} New array with transformed values
 */
function applyOperation(numbers, operation) {
    const result = [];
    for (let i = 0; i < numbers.length; i++) {
        result.push(operation(numbers[i]));
    }
    return result;
}

const originalNumbers = [1, 2, 3, 4];

// Callback 1: Doubling numbers
const doubled = applyOperation(originalNumbers, num => num * 2);
console.log("Original Array:", originalNumbers);
console.log("Doubled Array :", doubled);

// Callback 2: Squaring numbers
const squared = applyOperation(originalNumbers, num => num ** 2);
console.log("Squared Array :", squared);
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q3. Arrow Function vs Normal Function 'this' Binding
// =============================================================================
console.log("--- Q3. 'this' Binding in Arrow vs Normal Functions ---");

// Broken Version using Arrow Function
const userWithArrow = {
    name: "Alex",
    showName: () => {
        // Arrow functions do NOT have their own 'this' binding.
        // Instead, 'this' is lexically inherited from the surrounding/outer scope (global object or undefined in strict mode).
        console.log(`Arrow Function output: Name is '${this ? this.name : undefined}'`);
    }
};

userWithArrow.showName();

/*
 * Explanation:
 * In an arrow function, `this` does not point to the object (`userWithArrow`) calling the method.
 * It retains the `this` value of the context in which `userWithArrow` was defined (the global scope).
 * Since `name` is not defined on the global object, `this.name` evaluates to `undefined`.
 */

// Fixed Version using Normal Function Method
const userWithNormalFunc = {
    name: "Alex",
    showName: function() {
        // Normal functions dynamically bind 'this' to the object executing the function.
        console.log(`Fixed Normal Function output: Name is '${this.name}'`);
    }
};

userWithNormalFunc.showName();
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q4. Constructor Function & Prototype Method Sharing
// =============================================================================
console.log("--- Q4. Constructor Function & Prototype Method Sharing ---");

/**
 * Constructor function for Car object.
 */
function Car(brand, model) {
    this.brand = brand;
    this.model = model;
}

// Adding method to prototype so all instances share a single memory reference
Car.prototype.getDetails = function() {
    return `Car: ${this.brand} ${this.model}`;
};

const car1 = new Car("Toyota", "Camry");
const car2 = new Car("Tesla", "Model 3");

console.log(car1.getDetails());
console.log(car2.getDetails());

// Verification of prototype method sharing in memory
console.log("Do both cars share the exact same method instance?", car1.getDetails === car2.getDetails);
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q5. Prototypal Inheritance (Person -> Student)
// =============================================================================
console.log("--- Q5. Prototypal Inheritance (Person -> Student) ---");

// Base Constructor: Person
function Person(name) {
    this.name = name;
}

Person.prototype.printName = function() {
    console.log(`Person Name: ${this.name}`);
};

// Derived Constructor: Student
function Student(name, branch) {
    // Call parent constructor with current 'this' context
    Person.call(this, name);
    this.branch = branch;
}

// Set up prototype chain link
Student.prototype = Object.create(Person.prototype);
// Reset constructor reference
Student.prototype.constructor = Student;

// Add Student specific prototype method
Student.prototype.printBranch = function() {
    console.log(`Student Branch: ${this.branch}`);
};

const studentInstance = new Student("Priya", "Computer Science");

// Demonstrating access through the prototype chain
studentInstance.printName();   // Inherited from Person.prototype
studentInstance.printBranch(); // Defined on Student.prototype

console.log("Is studentInstance an instance of Student?", studentInstance instanceof Student);
console.log("Is studentInstance an instance of Person?", studentInstance instanceof Person);
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q6. Multi-Level Prototype Chain (Person -> Faculty -> Professor)
// =============================================================================
console.log("--- Q6. Multi-Level Prototype Chain ---");

// Level 1: Person
function PersonLevel(name) {
    this.name = name;
}
PersonLevel.prototype.getPersonInfo = function() {
    return `[Person] Name: ${this.name}`;
};

// Level 2: Faculty
function Faculty(name, department) {
    PersonLevel.call(this, name);
    this.department = department;
}
Faculty.prototype = Object.create(PersonLevel.prototype);
Faculty.prototype.constructor = Faculty;

Faculty.prototype.getFacultyInfo = function() {
    return `[Faculty] Dept: ${this.department}`;
};

// Level 3: Professor
function Professor(name, department, researchArea) {
    Faculty.call(this, name, department);
    this.researchArea = researchArea;
}
Professor.prototype = Object.create(Faculty.prototype);
Professor.prototype.constructor = Professor;

Professor.prototype.getProfessorInfo = function() {
    return `[Professor] Research: ${this.researchArea}`;
};

// Instance of Professor accessing methods up the chain
const prof = new Professor("Dr. Sharma", "Computer Science", "Artificial Intelligence");

console.log(prof.getPersonInfo());    // Inherited from Level 1 (PersonLevel)
console.log(prof.getFacultyInfo());   // Inherited from Level 2 (Faculty)
console.log(prof.getProfessorInfo()); // Defined on Level 3 (Professor)
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q7. Closure Function (makeMultiplier)
// =============================================================================
console.log("--- Q7. Closure Function (makeMultiplier) ---");

/**
 * Creates a multiplier function.
 * @param {number} multiplier - Factor to multiply by
 * @returns {Function} Inner function that remembers 'multiplier' via closure
 */
function makeMultiplier(multiplier) {
    // The inner function retains access to the outer variable 'multiplier'
    // even after makeMultiplier has finished execution.
    return function(num) {
        return num * multiplier;
    };
}

const triple = makeMultiplier(3);
const quadruple = makeMultiplier(4);

console.log("triple(5)    =>", triple(5));     // 15
console.log("quadruple(5) =>", quadruple(5));  // 20

/*
 * Explanation of Closure:
 * When `makeMultiplier(3)` is called, a scope containing `multiplier = 3` is created.
 * The returned function retains a reference to this scope (its lexical environment).
 * Even after `makeMultiplier` returns, `triple` preserves `multiplier = 3` in memory,
 * allowing `triple(5)` to calculate `5 * 3`.
 */
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q8. Custom Array Prototype Method (myMap Polyfill)
// =============================================================================
console.log("--- Q8. Custom Array Prototype Method (myMap) ---");

/**
 * Polyfill for Array.prototype.map
 * @param {Function} callback - Function that produces an element of the new Array
 * @returns {Array} A new array with transformed elements
 */
Array.prototype.myMap = function(callback) {
    if (typeof callback !== "function") {
        throw new TypeError(`${callback} is not a function`);
    }
    
    const resultArray = [];
    // 'this' refers to the array on which myMap was called
    for (let i = 0; i < this.length; i++) {
        // Pass current element, index, and original array to callback
        resultArray.push(callback(this[i], i, this));
    }
    return resultArray;
};

// Testing custom myMap implementation
const sampleArray = [1, 2, 3, 4];
const mappedArray = sampleArray.myMap(num => num * 2);

console.log("Original Array :", sampleArray);
console.log("Custom myMap Output:", mappedArray); // [2, 4, 6, 8]
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q9. ES6 Class Inheritance (Person & Student)
// =============================================================================
console.log("--- Q9. ES6 Class Inheritance (extends and super) ---");

// Base ES6 Class
class PersonClass {
    constructor(name) {
        this.name = name;
    }

    printName() {
        console.log(`[ES6 Class] Person Name: ${this.name}`);
    }
}

// Derived ES6 Class
class StudentClass extends PersonClass {
    constructor(name, branch) {
        super(name); // Call parent constructor
        this.branch = branch;
    }

    printBranch() {
        console.log(`[ES6 Class] Student Branch: ${this.branch}`);
    }
}

const es6Student = new StudentClass("Aarav", "Information Technology");

es6Student.printName();   // Inherited from PersonClass
es6Student.printBranch(); // Defined on StudentClass

console.log("\nComparing prototype behavior:");
console.log("Is es6Student instance of PersonClass?", es6Student instanceof PersonClass);
console.log("Type of PersonClass:", typeof PersonClass); // Outputs 'function', confirming classes are syntactic sugar over prototypes!
console.log("=================================================================");
