/*******************************************************************************
 * ASSIGNMENT 7 - JAVASCRIPT SOLUTIONS
 * 
 * Instructions:
 * All solutions are consolidated into this single JavaScript file.
 * Each question is wrapped in its own section/function with comments explaining 
 * the DOM manipulation, event delegation, custom event phases, attribute handling,
 * modal mechanics, real-time filters, and form validations.
 * You can run this file directly using Node.js or copy-paste it into your browser console.
 *******************************************************************************/

console.log("=================================================================");
console.log("             ASSIGNMENT 7 - JAVASCRIPT SOLUTIONS                ");
console.log("=================================================================\n");

// =============================================================================
// Q1. Dynamic Product List Manager (Add, Edit, Delete - Using Event Delegation)
// =============================================================================
console.log("--- Q1. Dynamic Product List Manager ---");

class ProductListManager {
    constructor() {
        this.products = [
            { id: 1, name: "Wireless Earbuds" },
            { id: 2, name: "Mechanical Keyboard" }
        ];
    }

    /**
     * Add new product
     */
    addProduct(name) {
        if (!name.trim()) return;
        const newProduct = { id: Date.now(), name: name.trim() };
        this.products.push(newProduct);
        console.log(`Added Product: "${newProduct.name}" [ID: ${newProduct.id}]`);
        return newProduct;
    }

    /**
     * Delete product by ID via event delegation targeting
     */
    deleteProduct(id) {
        this.products = this.products.filter(p => p.id !== id);
        console.log(`Deleted Product ID: ${id}`);
    }

    /**
     * Edit inline text and auto-save
     */
    editProduct(id, newName) {
        const product = this.products.find(p => p.id === id);
        if (product && newName.trim()) {
            product.name = newName.trim();
            console.log(`Auto-Saved Product ID ${id}: New Name = "${product.name}"`);
        }
    }

    render() {
        console.log("Current Product List:");
        console.table(this.products);
    }
}

const manager = new ProductListManager();
manager.render();
manager.addProduct("Gaming Mouse");
manager.editProduct(1, "Wireless Earbuds Pro");
manager.deleteProduct(2);
manager.render();
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q2. Live Character Counter with Warning Behavior
// =============================================================================
console.log("--- Q2. Live Character Counter ---");

class CharacterCounter {
    constructor(maxLen = 100) {
        this.maxLen = maxLen;
        this.text = "";
    }

    typeText(input) {
        let warningColor = "green";

        if (this.text.length + input.length > this.maxLen) {
            console.log(`[preventDefault Triggered]: Maximum limit of ${this.maxLen} characters reached! Typing blocked.`);
            // Simulated preventDefault: truncate excess
            const allowedLength = this.maxLen - this.text.length;
            this.text += input.slice(0, allowedLength);
        } else {
            this.text += input;
        }

        const remaining = this.maxLen - this.text.length;

        if (remaining === 0) {
            warningColor = "red";
        } else if (remaining <= 20) {
            warningColor = "yellow";
        }

        console.log(`Text Length: ${this.text.length}/${this.maxLen} | Remaining: ${remaining} | Counter Color: [ ${warningColor.toUpperCase()} ]`);
        console.log(`Current Text: "${this.text}"`);
    }

    reset() {
        this.text = "";
        console.log("Counter Reset: Text cleared.");
    }
}

const counter = new CharacterCounter(100);
counter.typeText("Hello, this is a live character counter demonstration."); // ~53 chars
counter.typeText(" Adding more text to approach the warning limit..."); // ~50 chars -> total over 100
counter.reset();
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q3. Multi-Step Form with Next/Back & Validation
// =============================================================================
console.log("--- Q3. Multi-Step Form with Next/Back ---");

class MultiStepForm {
    constructor() {
        this.currentStep = 1;
        this.formData = {
            name: "",
            email: "",
            password: ""
        };
    }

    validateStep(step, value) {
        switch (step) {
            case 1: // Name Validation
                return typeof value === "string" && value.trim().length >= 2;
            case 2: // Email Validation
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            case 3: // Password Validation
                return typeof value === "string" && value.length >= 6;
            default:
                return false;
        }
    }

    nextStep(value) {
        if (this.validateStep(this.currentStep, value)) {
            if (this.currentStep === 1) this.formData.name = value;
            if (this.currentStep === 2) this.formData.email = value;
            if (this.currentStep === 3) this.formData.password = value;

            console.log(`Step ${this.currentStep} Validated Successfully!`);
            this.currentStep++;

            if (this.currentStep > 3) {
                console.log("All 3 Steps Complete! Summary:");
                console.table({
                    Name: this.formData.name,
                    Email: this.formData.email,
                    Password: "*".repeat(this.formData.password.length)
                });
            } else {
                console.log(`Moved to Step ${this.currentStep}`);
            }
        } else {
            console.log(`Validation Failed for Step ${this.currentStep}! Cannot proceed.`);
        }
    }

    backStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            console.log(`Moved Back to Step ${this.currentStep}`);
        } else {
            console.log("Already at Step 1.");
        }
    }
}

const form = new MultiStepForm();
form.nextStep("Rahul Sharma"); // Step 1 Valid
form.nextStep("rahul.sharma@domain.com"); // Step 2 Valid
form.nextStep("secret123"); // Step 3 Valid
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q4. Theme Switcher Using Attribute Manipulation
// =============================================================================
console.log("--- Q4. Theme Switcher ---");

class ThemeSwitcher {
    constructor() {
        this.currentTheme = "light";
        this.attributes = {};
    }

    setTheme(themeName) {
        const allowedThemes = ["light", "dark", "blue"];
        if (!allowedThemes.includes(themeName)) {
            console.log(`Invalid theme: ${themeName}`);
            return;
        }

        this.currentTheme = themeName;
        // setAttribute simulation
        this.attributes["data-theme"] = themeName;
        this.attributes["class"] = `theme-${themeName}`;

        console.log(`Applied Theme: "${themeName}"`);
        console.log(`DOM Attributes Updated: data-theme="${this.attributes['data-theme']}", class="${this.attributes['class']}"`);
    }
}

const themeApp = new ThemeSwitcher();
themeApp.setTheme("dark");
themeApp.setTheme("blue");
themeApp.setTheme("light");
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q5. Image Gallery with Modal Preview
// =============================================================================
console.log("--- Q5. Image Gallery with Modal Preview ---");

class ImageGalleryModal {
    constructor() {
        this.images = [
            "img1.jpg", "img2.jpg", "img3.jpg",
            "img4.jpg", "img5.jpg", "img6.jpg"
        ];
        this.isModalOpen = false;
        this.activeImage = null;
    }

    openModal(imageSrc) {
        this.isModalOpen = true;
        this.activeImage = imageSrc;
        console.log(`Modal Opened -> Displaying Larger Image: "${imageSrc}"`);
    }

    clickInsideModalContent(event) {
        // Event stopPropagation simulation
        console.log("Clicked inside modal content -> stopPropagation() called. Modal remains OPEN.");
    }

    clickModalOverlay(event) {
        this.isModalOpen = false;
        this.activeImage = null;
        console.log("Clicked outside modal -> Closing Modal.");
    }
}

const gallery = new ImageGalleryModal();
gallery.openModal("img3.jpg");
gallery.clickInsideModalContent();
gallery.clickModalOverlay();
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q6. Real-Time Table Filter Using input Event
// =============================================================================
console.log("--- Q6. Real-Time Table Filter ---");

class StudentTableFilter {
    constructor() {
        this.students = [
            { name: "Aarav Sharma", branch: "CSE", cgpa: 8.9 },
            { name: "Ananya Patel", branch: "ECE", cgpa: 9.1 },
            { name: "Bhavya Singh", branch: "IT", cgpa: 7.8 },
            { name: "Chirag Gupta", branch: "CSE", cgpa: 8.4 }
        ];
    }

    filterTable(searchQuery) {
        console.log(`Filter Input: "${searchQuery}"`);
        const query = searchQuery.toLowerCase().trim();

        const filtered = this.students.filter(s => {
            return s.name.toLowerCase().includes(query) ||
                   s.branch.toLowerCase().includes(query) ||
                   s.cgpa.toString().includes(query);
        });

        if (filtered.length === 0) {
            console.log("Result: [ No results found ]");
        } else {
            console.table(filtered);
        }
    }
}

const tableFilter = new StudentTableFilter();
tableFilter.filterTable("cse");
tableFilter.filterTable("xyz");
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q7. Detect Mouse Path & Coordinates Logger
// =============================================================================
console.log("--- Q7. Mouse Path & Coordinates Logger ---");

class MouseTrackerBox {
    constructor(width = 400, height = 400) {
        this.bounds = { width, height };
        this.dots = [];
    }

    onMouseMove(clientX, clientY) {
        console.log(`Mouse Coordinates inside 400x400 Box: X = ${clientX}px, Y = ${clientY}px`);
    }

    onDoubleClick(clientX, clientY) {
        const dot = { x: clientX, y: clientY, color: "red" };
        this.dots.push(dot);
        console.log(`Double-Click Detected! Dropped Red Dot at (${clientX}, ${clientY})`);
    }
}

const boxTracker = new MouseTrackerBox();
boxTracker.onMouseMove(150, 220);
boxTracker.onDoubleClick(150, 220);
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q8. Custom Dropdown Using Only JavaScript
// =============================================================================
console.log("--- Q8. Custom Dropdown ---");

class CustomDropdown {
    constructor(options) {
        this.options = options;
        this.selectedOption = options[0];
        this.isOpen = false;
    }

    toggle() {
        this.isOpen = !this.isOpen;
        console.log(`Dropdown Toggled -> Status: ${this.isOpen ? "OPEN" : "CLOSED"}`);
    }

    selectOption(option) {
        if (this.options.includes(option)) {
            this.selectedOption = option;
            this.isOpen = false;
            console.log(`Selected Option: "${option}". Updated Button Text: "${option}"`);
        }
    }

    clickOutsideCapturingPhase() {
        // Capturing phase listener closing mechanism
        if (this.isOpen) {
            this.isOpen = false;
            console.log("Click Outside Detected during Capturing Phase -> Dropdown CLOSED.");
        }
    }
}

const dropdown = new CustomDropdown(["Option 1: CSE", "Option 2: ECE", "Option 3: IT"]);
dropdown.toggle();
dropdown.selectOption("Option 2: ECE");
dropdown.toggle();
dropdown.clickOutsideCapturingPhase();
console.log("-----------------------------------------------------------------\n");


// =============================================================================
// Q9. Form Submit Blocker with preventDefault() and Live Errors
// =============================================================================
console.log("--- Q9. Form Submit Blocker with preventDefault() ---");

function submitFormHandler(formData) {
    console.log("Attempting Form Submission...");

    const errors = {};

    // Name Validation
    if (!formData.name || !formData.name.trim()) {
        errors.name = "Name is required.";
    }

    // Email Validation
    if (!formData.email || !formData.email.includes("@")) {
        errors.email = "Email is required and must contain '@'.";
    }

    // Password Validation
    if (!formData.password || formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters long.";
    }

    if (Object.keys(errors).length > 0) {
        console.log("[preventDefault Triggered]: Form submission blocked!");
        console.log("Inline Error Messages:");
        console.table(errors);
        return false;
    } else {
        console.log("Form Submitted Successfully! 🎉");
        return true;
    }
}

console.log("Testing Form Submission with Invalid Data:");
submitFormHandler({ name: "", email: "invalidemail.com", password: "123" });

console.log("\nTesting Form Submission with Corrected Data:");
submitFormHandler({ name: "Aarav", email: "aarav@gmail.com", password: "securepassword123" });
console.log("=================================================================");
