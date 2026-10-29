/*******************************************************************************
 * ASSIGNMENT 4 - JAVASCRIPT SOLUTIONS
 * 
 * Instructions:
 * All solutions are consolidated into this single JavaScript file.
 * Each question is wrapped in its own section/function with comments explaining 
 * the logic, classes, objects, RegExp validations, and DOM manipulation dynamics.
 * You can run this file directly using Node.js or copy-paste it into your browser console.
 *******************************************************************************/

console.log("=================================================================");
console.log("             ASSIGNMENT 4 - JAVASCRIPT SOLUTIONS                ");
console.log("=================================================================\n");

// =============================================================================
// Q1: E-Commerce Product Manager (Classes + Objects)
// =============================================================================
console.log("--- Q1: E-Commerce Product Manager ---");

class Product {
    /**
     * @param {number} id - Unique product identifier
     * @param {string} name - Product name
     * @param {number} price - Original product price
     * @param {string} category - Category tag
     */
    constructor(id, name, price, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }

    /**
     * Applies a percentage discount to the product price.
     * @param {number} percent - Discount percentage (e.g., 10 for 10%)
     */
    applyDiscount(percent) {
        if (percent > 0 && percent <= 100) {
            const discountAmount = (this.price * percent) / 100;
            this.price -= discountAmount;
            console.log(`Applied ${percent}% discount on "${this.name}". New Price: ₹${this.price.toFixed(2)}`);
        }
    }

    /**
     * Returns a formatted summary string of the product details.
     * @returns {string} Formatted product info
     */
    getDetails() {
        return `[ID: ${this.id}] ${this.name.padEnd(20)} | Category: ${this.category.padEnd(12)} | Price: ₹${this.price.toFixed(2)}`;
    }
}

// Instantiate product objects
const products = [
    new Product(101, "Wireless Mouse", 850, "Electronics"),
    new Product(102, "Mechanical Keyboard", 3500, "Electronics"),
    new Product(103, "Gaming Headset", 2400, "Electronics"),
    new Product(104, "USB-C Cable", 450, "Accessories"),
    new Product(105, "4K Monitor", 18500, "Electronics")
];

console.log("All Products List:");
products.forEach(p => console.log(p.getDetails()));

// Apply discount to one item
products[1].applyDiscount(10);

// Filter products with price > 1000
const premiumProducts = products.filter(product => product.price > 1000);

console.log("\nProducts with Price > ₹1000 (Filtered):");
premiumProducts.forEach(p => console.log(p.getDetails()));
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q2: Student Form Validator (Forms + RegExp)
// =============================================================================
console.log("--- Q2: Student Form Validator ---");

/**
 * Validates student form data against regular expressions.
 * @param {Object} formData - Object containing name, email, phone, password
 * @returns {Object} Validation results with status and error messages
 */
function validateStudentForm(formData) {
    // Regex Patterns
    const nameRegex = /^[A-Za-z\s]+$/; // Alphabets only
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Standard email
    const phoneRegex = /^\d{10}$/; // Exactly 10 digits
    // Password: At least 1 uppercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const errors = {};

    if (!nameRegex.test(formData.name)) {
        errors.name = "Invalid Name: Must contain alphabets only.";
    }
    if (!emailRegex.test(formData.email)) {
        errors.email = "Invalid Email: Must follow example@domain.com format.";
    }
    if (!phoneRegex.test(formData.phone)) {
        errors.phone = "Invalid Phone: Must be exactly 10 digits.";
    }
    if (!passwordRegex.test(formData.password)) {
        errors.password = "Invalid Password: Must contain 1 uppercase, 1 number, 1 special char, and >= 8 chars.";
    }

    const isValid = Object.keys(errors).length === 0;
    return { isValid, errors };
}

// Test sample student registration data
const testStudentValid = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    password: "Password123!"
};

const testStudentInvalid = {
    name: "John123",
    email: "john.doe@com",
    phone: "98765",
    password: "pass"
};

console.log("Validating Correct Student Data:", validateStudentForm(testStudentValid));
console.log("Validating Incorrect Student Data:", validateStudentForm(testStudentInvalid));
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q3: Library Management System (Classes + Objects)
// =============================================================================
console.log("--- Q3: Library Management System ---");

class Book {
    constructor(title, author, ISBN, isIssued = false) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.isIssued = isIssued;
    }

    /**
     * Issues the book if available.
     */
    issueBook() {
        if (!this.isIssued) {
            this.isIssued = true;
            console.log(`Success: Book "${this.title}" (ISBN: ${this.ISBN}) has been issued.`);
        } else {
            console.log(`Failed: Book "${this.title}" is already issued.`);
        }
    }

    /**
     * Returns the issued book.
     */
    returnBook() {
        if (this.isIssued) {
            this.isIssued = false;
            console.log(`Success: Book "${this.title}" has been returned to the library.`);
        } else {
            console.log(`Notice: Book "${this.title}" was not marked as issued.`);
        }
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    displayAvailableBooks() {
        console.log("\n--- Available Books in Library ---");
        const available = this.books.filter(b => !b.isIssued);
        if (available.length === 0) {
            console.log("No available books.");
        } else {
            available.forEach(b => console.log(`- "${b.title}" by ${b.author} [ISBN: ${b.ISBN}]`));
        }
    }

    issueBookByISBN(isbn) {
        const book = this.books.find(b => b.ISBN === isbn);
        if (book) {
            book.issueBook();
        } else {
            console.log(`Error: Book with ISBN ${isbn} not found in library inventory.`);
        }
    }
}

// Setup library
const myLibrary = new Library();
myLibrary.addBook(new Book("Clean Code", "Robert C. Martin", "978-0132350884"));
myLibrary.addBook(new Book("JavaScript: The Good Parts", "Douglas Crockford", "978-0596517748"));
myLibrary.addBook(new Book("You Don't Know JS", "Kyle Simpson", "978-1491904244", true));

myLibrary.displayAvailableBooks();
console.log("\nAttempting to issue ISBN 978-0132350884:");
myLibrary.issueBookByISBN("978-0132350884");
myLibrary.displayAvailableBooks();
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q4: Custom Form Builder (Forms + Classes)
// =============================================================================
console.log("--- Q4: Custom Form Builder ---");

class FormBuilder {
    /**
     * @param {Array<Object>} fieldConfigs - Array of field configs e.g., [{type: 'text', label: 'Username', name: 'username'}]
     */
    constructor(fieldConfigs) {
        this.fieldConfigs = fieldConfigs;
    }

    /**
     * Generates HTML markup string for the dynamic form.
     * @returns {string} Form HTML string
     */
    generateFormHTML() {
        let html = '<form id="dynamicGeneratedForm" class="generated-form">\n';
        this.fieldConfigs.forEach(field => {
            html += `  <div class="form-group">\n`;
            html += `    <label for="${field.name}">${field.label}</label>\n`;
            html += `    <input type="${field.type}" id="${field.name}" name="${field.name}" placeholder="Enter ${field.label}" />\n`;
            html += `  </div>\n`;
        });
        html += `  <button type="submit">Submit</button>\n`;
        html += `</form>`;
        return html;
    }

    /**
     * Simulated DOM collector that extracts values from a form object.
     * @param {Object} inputValues - Simulated form input values
     * @returns {Object} Data object
     */
    getFormData(inputValues) {
        const formData = {};
        this.fieldConfigs.forEach(field => {
            formData[field.name] = inputValues[field.name] || "";
        });
        return formData;
    }
}

const formFields = [
    { type: "text", label: "Username", name: "username" },
    { type: "email", label: "Email Address", name: "email" },
    { type: "password", label: "Password", name: "password" }
];

const builder = new FormBuilder(formFields);
console.log("Generated HTML Form String:");
console.log(builder.generateFormHTML());

// Simulating getFormData on user submit
const simulatedUserInputs = { username: "coder123", email: "coder@dev.com", password: "SecretPassword1!" };
console.log("\nExtracted Form Data on Submit:", builder.getFormData(simulatedUserInputs));
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q5: Movie Ticket Booking (Objects + RegExp)
// =============================================================================
console.log("--- Q5: Movie Ticket Booking ---");

function bookMovieTicket(name, email, seats) {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Seat validation: integer 1 to 10
    const seatsNum = Number(seats);
    const isValidSeats = Number.isInteger(seatsNum) && seatsNum >= 1 && seatsNum <= 10;

    if (!nameRegex.test(name)) {
        console.log("Booking Failed: Name must contain alphabets only.");
        return null;
    }
    if (!emailRegex.test(email)) {
        console.log("Booking Failed: Invalid email format.");
        return null;
    }
    if (!isValidSeats) {
        console.log("Booking Failed: Seats must be an integer between 1 and 10.");
        return null;
    }

    // Store in booking object upon validation success
    const bookingInfo = {
        bookingId: "TKT-" + Math.floor(100000 + Math.random() * 900000),
        name: name.trim(),
        email: email.trim(),
        seats: seatsNum,
        totalAmount: seatsNum * 250 // ₹250 per ticket
    };

    console.log("Booking Successful! Ticket Details:");
    console.table(bookingInfo);
    return bookingInfo;
}

console.log("Testing Valid Booking:");
bookMovieTicket("Alice Smith", "alice@cinema.com", 3);

console.log("\nTesting Invalid Seat Count (12 seats):");
bookMovieTicket("Bob Ross", "bob@cinema.com", 12);
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q6: Employee Management System (Classes + Object Methods)
// =============================================================================
console.log("--- Q6: Employee Management System ---");

class Employee {
    constructor(id, name, department, salary) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.salary = salary; // Monthly salary
    }

    getAnnualSalary() {
        return this.salary * 12;
    }

    applyBonus(percent) {
        if (percent > 0) {
            const bonus = (this.getAnnualSalary() * percent) / 100;
            return bonus;
        }
        return 0;
    }
}

const employees = [
    new Employee(1, "Rohan", "Engineering", 75000),
    new Employee(2, "Sneha", "HR", 50000),
    new Employee(3, "Vikram", "Sales", 60000),
    new Employee(4, "Anita", "Marketing", 55000),
    new Employee(5, "Karan", "Engineering", 90000)
];

console.log("Employee Annual Salaries:");
employees.forEach(emp => {
    console.log(`Employee: ${emp.name.padEnd(8)} | Dept: ${emp.department.padEnd(12)} | Annual Base: ₹${emp.getAnnualSalary()}`);
});

// Calculate total annual company payout (base salaries) using reduce()
const totalCompanyPayout = employees.reduce((total, emp) => {
    return total + emp.getAnnualSalary();
}, 0);

console.log(`\nTotal Annual Company Payout: ₹${totalCompanyPayout.toLocaleString()}`);
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q7: Login Form Validation using RegExp
// =============================================================================
console.log("--- Q7: Login Form Validation using RegExp ---");

function validateLoginForm(username, password) {
    const errors = [];

    // Username check: at least 5 characters
    if (typeof username !== "string" || username.length < 5) {
        errors.push("Username must be at least 5 characters long.");
    }

    // Password checks
    if (typeof password !== "string" || password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }
    if (!/\d/.test(password)) {
        errors.push("Password must include at least one numeric digit.");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("Password must include at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
        errors.push("Password must include at least one lowercase letter.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("Password must include at least one special character.");
    }

    if (errors.length === 0) {
        console.log("Login Validation Passed: Success!");
        return { success: true, message: "Login successful!" };
    } else {
        console.log("Login Validation Failed with errors:");
        errors.forEach(err => console.log(` - ${err}`));
        return { success: false, errors };
    }
}

console.log("Testing Valid Credentials:");
validateLoginForm("adminUser", "Secure@123");

console.log("\nTesting Invalid Credentials:");
validateLoginForm("usr", "weak");
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q8: Dynamic Object Updater
// =============================================================================
console.log("--- Q8: Dynamic Object Updater ---");

// Initial user object
let user = {
    name: "John",
    email: "john@mail.com",
    age: 21
};

/**
 * Updates the global user object dynamically.
 * @param {Object} newDetails - Key-value pairs to update
 */
function updateUserObject(newDetails) {
    console.log("Original User Object:", { ...user });

    // Dynamic key update
    Object.keys(newDetails).forEach(key => {
        if (key in user) {
            user[key] = newDetails[key];
        }
    });

    console.log("Updated User Object :", { ...user });
    return user;
}

updateUserObject({ name: "John Doe", age: 22 });
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q9: Shopping Cart Total (Classes + RegExp for Coupon)
// =============================================================================
console.log("--- Q9: Shopping Cart Total ---");

class Cart {
    constructor() {
        this.items = [];
    }

    addItem(name, price, quantity) {
        this.items.push({ name, price, quantity });
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    /**
     * Validates coupon code via RegExp and calculates final total.
     * Expected pattern: SAVE20 (20% off), DISC10 (10% off), etc.
     * @param {string} couponCode - Coupon string
     */
    applyCoupon(couponCode) {
        // Regex format: 4 uppercase letters followed by 2 digits (e.g., SAVE20, DISC10)
        const couponRegex = /^[A-Z]{4}(\d{2})$/;
        const match = couponCode.match(couponRegex);

        const subtotal = this.getTotal();
        console.log(`Cart Subtotal: ₹${subtotal.toFixed(2)}`);

        if (match) {
            const discountPercent = parseInt(match[1], 10);
            const discountAmount = (subtotal * discountPercent) / 100;
            const finalTotal = subtotal - discountAmount;

            console.log(`Valid Coupon "${couponCode}" applied! (${discountPercent}% OFF)`);
            console.log(`Discount Amount: -₹${discountAmount.toFixed(2)}`);
            console.log(`Final Payable Total: ₹${finalTotal.toFixed(2)}`);
            return finalTotal;
        } else {
            console.log(`Invalid Coupon Code "${couponCode}". Format must be like SAVE20 or DISC10.`);
            console.log(`Final Payable Total: ₹${subtotal.toFixed(2)}`);
            return subtotal;
        }
    }
}

const myCart = new Cart();
myCart.addItem("Running Shoes", 2500, 1);
myCart.addItem("Socks (3-pack)", 300, 2);
myCart.addItem("Water Bottle", 500, 1);

console.log("Testing Valid Coupon 'SAVE20':");
myCart.applyCoupon("SAVE20");

console.log("\nTesting Invalid Coupon 'DISCOUNT50':");
myCart.applyCoupon("DISCOUNT50");
console.log("=================================================================");
