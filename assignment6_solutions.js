/*******************************************************************************
 * ASSIGNMENT 6 - JAVASCRIPT SOLUTIONS
 * 
 * Instructions:
 * All solutions are consolidated into this single JavaScript file.
 * Each question is wrapped in its own function with comprehensive comments 
 * explaining Promises, async/await, event loop mechanics (microtasks vs macrotasks), 
 * error handling, and concurrency combinators.
 * You can run this file directly using Node.js or paste it into your browser console.
 *******************************************************************************/

console.log("=================================================================");
console.log("             ASSIGNMENT 6 - JAVASCRIPT SOLUTIONS                ");
console.log("=================================================================\n");

// =============================================================================
// Q1 - The Startup Morning: Async Coffee Maker
// =============================================================================
console.log("--- Q1 - The Startup Morning: Async Coffee Maker ---");

const delay = (minMs, maxMs) => new Promise(resolve => {
    const time = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
    setTimeout(resolve, time);
});

function boilWater() {
    return delay(1000, 2000).then(() => {
        if (Math.random() < 0.1) throw new Error("Boiler malfunction: Water could not boil!");
        console.log("Step 1: Water boiled successfully.");
        return "Boiled Water";
    });
}

function brewCoffee(water) {
    return delay(1000, 2000).then(() => {
        if (Math.random() < 0.1) throw new Error("Coffee machine error: Brewing failed!");
        console.log(`Step 2: Coffee brewed using ${water}.`);
        return "Brewed Coffee";
    });
}

function pourCup(coffee) {
    return delay(1000, 2000).then(() => {
        if (Math.random() < 0.1) throw new Error("Spill error: Could not pour cup!");
        console.log(`Step 3: ${coffee} poured into cup.`);
        return "Cup of Coffee";
    });
}

// Execution using Promise chaining (.then / .catch)
function runCoffeeMaker() {
    boilWater()
        .then(water => brewCoffee(water))
        .then(coffee => pourCup(coffee))
        .then(() => {
            console.log("Coffee ready for the team! ☕\n");
        })
        .catch(error => {
            console.error(`[Coffee Maker Failed]: ${error.message}\n`);
        });
}

// Run Q1 (delayed slightly to let logs sequence nicely)
setTimeout(() => {
    runCoffeeMaker();
}, 2005);


// =============================================================================
// Q2 - Task Scheduler: Micro vs Macro Challenge
// =============================================================================
console.log("--- Q2 - Task Scheduler: Micro vs Macro Challenge ---");

function runTaskSchedulerDemo() {
    console.log("TaskScheduler: Start");

    // Macrotask (setTimeout)
    setTimeout(() => {
        console.log("Macrotask: setTimeout callback executed");
    }, 0);

    // Microtask (Promise.then)
    Promise.resolve().then(() => {
        console.log("Microtask: Promise.then callback executed");
    });

    console.log("TaskScheduler: Synchronous log");
    console.log("TaskScheduler: End\n");

    /*
     * Explanation:
     * Even though both setTimeout and Promise.resolve have 0ms/immediate scheduling,
     * JavaScript's Event Loop prioritizes the **Microtask Queue** (Promises, queueMicrotask) 
     * over the **Macrotask Queue** (setTimeout, setInterval, I/O). 
     * Once the call stack is clear, the engine empties the entire microtask queue 
     * before picking up any macrotasks from the task queue.
     */
}

runTaskSchedulerDemo();


// =============================================================================
// Q3 - Bug Tracker: Callback to Promise Migration
// =============================================================================
console.log("--- Q3 - Bug Tracker: Callback to Promise Migration ---");

/**
 * Modernized Promise-based version of fetchBugs
 * @returns {Promise<Array>}
 */
function getBugs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 20% random API failure
            if (Math.random() < 0.2) {
                reject(new Error("Bug database server unreachable."));
            } else {
                resolve(["UI glitch", "API timeout", "Login failure", "Memory leak"]);
            }
        }, 1000);
    });
}

function processBugTracker() {
    console.log("Fetching bug reports...");
    getBugs()
        .then(bugs => {
            console.log("Bugs retrieved successfully:");
            const tableData = bugs.map((bug, idx) => ({ ID: idx + 1, Description: bug, Status: "Open" }));
            console.table(tableData);
            console.log("");
        })
        .catch(error => {
            console.error(`[Bug Tracker Error]: ${error.message}\n`);
        });
}

setTimeout(() => {
    processBugTracker();
}, 2500);


// =============================================================================
// Q4 - DevOps Delay: Async Timeout Race
// =============================================================================
console.log("--- Q4 - DevOps Delay: Async Timeout Race ---");

const simulateServer = (serverName, durationMs) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.15) {
                reject(new Error(`Server ${serverName} crashed during deployment!`));
            } else {
                resolve(`Response from ${serverName}`);
            }
        }, durationMs);
    });
};

function runServerDeployment() {
    const serverA = simulateServer("Server A", 2000);
    const serverB = simulateServer("Server B", 3000);

    // Promise.race for fastest responder
    Promise.race([serverA, serverB])
        .then(fastest => {
            console.log(`Fastest response: ${fastest}`);
        })
        .catch(err => {
            console.log(`Fastest response check encountered an error: ${err.message}`);
        });

    // Promise.all for all completions
    Promise.all([serverA, serverB])
        .then(results => {
            console.log("Deployment completed for all servers:", results);
            console.log("");
        })
        .catch(err => {
            console.error(`[Deployment Failure]: ${err.message}\n`);
        });
}

setTimeout(() => {
    runServerDeployment();
}, 4000);


// =============================================================================
// Q5 - Frontend Rush: Avoiding Callback Hell
// =============================================================================
console.log("--- Q5 - Frontend Rush: Avoiding Callback Hell ---");

const asyncStage = (stageName) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`Pipeline stage completed: ${stageName}`);
            resolve(stageName);
        }, 1000);
    });
};

// Clean Refactored Version using Async/Await
async function runPipelineAsync() {
    console.log("Starting Build Pipeline (Async/Await Refactor)...");
    try {
        await asyncStage("design");
        await asyncStage("build");
        await asyncStage("test");
        await asyncStage("deploy");
        await asyncStage("celebrate");
        console.log("Pipeline successfully finished!\n");
    } catch (err) {
        console.error("Pipeline failed:", err);
    }
}

setTimeout(() => {
    runPipelineAsync();
}, 8000);


// =============================================================================
// Q6 - E-Commerce Dashboard: Product Card Fetcher
// =============================================================================
console.log("--- Q6 - E-Commerce Dashboard: Product Card Fetcher ---");

async function fetchStoreProducts() {
    const apiUrl = "https://fakestoreapi.com/products";
    console.log(`Fetching products from ${apiUrl}...`);
    
    try {
        // Note: In browser environment, fetch() is native. In Node.js 18+, fetch() is also global.
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const products = await response.json();
        
        // Display first 5 products for concise console output
        console.log("Fetched Products Sample:");
        products.slice(0, 5).forEach(product => {
            console.log(`Product: ${product.title}`);
            console.log(`Price: $${product.price}`);
            console.log(`Image: ${product.image}\n`);
        });
        
    } catch (error) {
        console.error("Failed to load products. Please try again.\n");
    }
}

setTimeout(() => {
    fetchStoreProducts();
}, 14000);


// =============================================================================
// Q7 - The Lazy Loader: Promise Combinator Practice
// =============================================================================
console.log("--- Q7 - The Lazy Loader: Promise Combinator Practice ---");

function loadProfile() { return new Promise((r, rej) => setTimeout(() => Math.random() < 0.2 ? rej("Profile failed") : r("Profile Loaded"), 2000)); }
function loadPosts() { return new Promise((r, rej) => setTimeout(() => Math.random() < 0.2 ? rej("Posts failed") : r("Posts Loaded"), 1500)); }
function loadMessages() { return new Promise((r, rej) => setTimeout(() => Math.random() < 0.2 ? rej("Messages failed") : r("Messages Loaded"), 1000)); }

async function runLazyLoader() {
    const startTime = Date.now();
    console.log("Loading dashboard modules concurrently...");

    const results = await Promise.allSettled([loadProfile(), loadPosts(), loadMessages()]);
    
    const endTime = Date.now();
    const duration = endTime - startTime;

    results.forEach((res, idx) => {
        const moduleNames = ["Profile", "Posts", "Messages"];
        if (res.status === "fulfilled") {
            console.log(`Module [${moduleNames[idx]}]: Success -> "${res.value}"`);
        } else {
            console.log(`Module [${moduleNames[idx]}]: Failed -> Reason: "${res.reason}"`);
        }
    });

    console.log(`Total time taken: ${duration}ms\n`);
}

setTimeout(() => {
    runLazyLoader();
}, 16000);


// =============================================================================
// Q8 - Order Processing Flow: Async Retry Mechanism
// =============================================================================
console.log("--- Q8 - Order Processing Flow: Async Retry Mechanism ---");

function submitOrder() {
    return new Promise((resolve, reject) => {
        // Fails 50% of the time
        if (Math.random() < 0.5) {
            reject(new Error("Network timeout during order placement"));
        } else {
            resolve("Order transaction confirmed");
        }
    });
}

async function processOrderWithRetry() {
    const maxRetries = 3;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt}: Sending order request...`);
            const result = await submitOrder();
            console.log(`Attempt ${attempt}: Success! ${result}\n`);
            return result;
        } catch (err) {
            console.log(`Attempt ${attempt}: Failed (${err.message})`);
            if (attempt === maxRetries) {
                throw new Error("Order could not be processed");
            }
        }
    }
}

setTimeout(async () => {
    try {
        await processOrderWithRetry();
    } catch (finalError) {
        console.error(`[Final Failure]: ${finalError.message}\n`);
    }
}, 19000);


// =============================================================================
// Q9 - Debugging the Event Loop
// =============================================================================
console.log("--- Q9 - Debugging the Event Loop ---");

/*
 * Predicted Output Order:
 * 1. "Script start" (Synchronous execution)
 * 2. "Script end" (Synchronous execution)
 * 3. "Promise callback" (Microtask queue - flushed before macrotasks)
 * 4. "Timeout callback" (Macrotask queue - executed after microtasks)
 */

function runEventLoopDebug() {
    console.log("Script start");
    
    setTimeout(() => console.log("Timeout callback"), 0);
    
    Promise.resolve().then(() => console.log("Promise callback"));
    
    console.log("Script end");
}

setTimeout(() => {
    runEventLoopDebug();
    console.log("");
}, 21000);


// =============================================================================
// Q10 - The Final Delivery: Async Pipeline Debugger
// =============================================================================
console.log("--- Q10 - The Final Delivery: Async Pipeline Debugger ---");

const deliveryStep = (stepName) => {
    return new Promise((resolve, reject) => {
        const timeout = Math.floor(Math.random() * 1000) + 1000; // 1-2s delay
        setTimeout(() => {
            // 10% chance of step failure
            if (Math.random() < 0.1) {
                reject(new Error(`Step '${stepName}' encountered an error`));
            } else {
                resolve(stepName);
            }
        }, timeout);
    });
};

async function runPipeline() {
    console.log("Start Pipeline");
    try {
        await deliveryStep("Step 1: Order taken");
        console.log("Step 1: Order taken");

        await deliveryStep("Step 2: Food prepared");
        console.log("Step 2: Food prepared");

        await deliveryStep("Step 3: Package ready");
        console.log("Step 3: Package ready");

        await deliveryStep("Step 4: Out for delivery");
        console.log("Step 4: Out for delivery");

        console.log("Delivery completed!\n");
    } catch (err) {
        console.error("Pipeline failed! Error:", err.message, "\n");
    }
}

setTimeout(() => {
    runPipeline();
}, 23000);
console.log("=================================================================");
