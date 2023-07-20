let gold = 0;
let silver = 0;
let diamond = 0;
let coal = 0;
let hireMiners = 0;

// Function to update the resource displays
function updateResourceDisplays() {
    document.getElementById('gold').innerText = gold;
    document.getElementById('silver').innerText = silver;
    document.getElementById('diamond').innerText = diamond;
    document.getElementById('coal').innerText = coal;
    document.getElementById('hireMiners').innerText = hireMiners;
}

// Function to show the clicker number at a random position on the screen
function showClickerNumber(amount) {
    const clickerNumber = document.getElementById('clickerNumber');
    clickerNumber.innerText = `+${amount}`;

    // Random position
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;

    clickerNumber.style.left = `${randomX}px`;
    clickerNumber.style.top = `${randomY}px`;

    // Show the clicker number
    clickerNumber.classList.add('active');

    // After a short delay, hide the clicker number
    setTimeout(() => {
        clickerNumber.classList.remove('active');
    }, 500);
}

// Function to mine resources when the button is clicked
function mineResources() {
    gold += 1;
    silver += 1;
    diamond += 1;
    coal += 1;
    updateResourceDisplays();

    // Show the clicker number for each resource gained
    showClickerNumber(1);
}

// Function to hire miners
function hireMiner() {
    if (gold >= 100) { // Assuming hiring a miner costs 100 gold
        gold -= 100;
        hireMiners += 1;
        updateResourceDisplays();
    }
}

// Function to start the miners automatically mining resources
function startMiners() {
    setInterval(function() {
        if (hireMiners > 0) {
            gold += 1 * hireMiners; // Increase the gold amount for each miner
            silver += 2 * hireMiners; // Increase the silver amount for each miner
            diamond += 3 * hireMiners; // Increase the diamond amount for each miner
            coal += 4 * hireMiners; // Increase the coal amount for each miner
            updateResourceDisplays();
        }
    }, 1000); // Add resources every 1 second
}

// Function to save the game progress to localStorage
function saveGame() {
    const saveData = {
        gold,
        silver,
        diamond,
        coal,
        hireMiners
    };
    localStorage.setItem('idleMinerSave', JSON.stringify(saveData));
}

// Function to load the game progress from localStorage
function loadGame() {
    const saveData = JSON.parse(localStorage.getItem('idleMinerSave'));
    if (saveData) {
        gold = saveData.gold;
        silver = saveData.silver;
        diamond = saveData.diamond;
        coal = saveData.coal;
        hireMiners = saveData.hireMiners;
        updateResourceDisplays();
    }
}

// Function to run the game
function startGame() {
    // Attach the mineResources function to the button click event
    document.getElementById('mineButton').addEventListener('click', mineResources);

    // Attach the hireMiner function to the hire miner button click event
    document.getElementById('hireMinerButton').addEventListener('click', hireMiner);

    // Periodically add resources based on time (in milliseconds)
    setInterval(function() {
        gold += 1; // Increase the gold amount here
        silver += 2; // Increase the silver amount here
        diamond += 3; // Increase the diamond amount here
        coal += 4; // Increase the coal amount here
        updateResourceDisplays();
    }, 1000); // Add resources every 1 second

    // Start the miners automatically
    startMiners();

    // Load the game progress from localStorage
    loadGame();

    // Autosave every 10 seconds
    setInterval(saveGame, 10000);
}

// Run the game
startGame();
