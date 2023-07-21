// Game variables
let coal = 0;
let gold = 0;
let diamonds = 0;
let minerCount = 0;
let autoMineUpgradeLevel = 0;
let minerUpgradeLevel = 0;
let prestigeMultiplier = 1;

// Customizable graphics
const coalImg = document.getElementById('coalImg');
const goldImg = document.getElementById('goldImg');
const diamondsImg = document.getElementById('diamondsImg');

// Initialize selected graphics
let selectedCoalGraphic = '🪨';
let selectedGoldGraphic = '💰';
let selectedDiamondsGraphic = '💎';

// DOM elements
const coalDisplay = document.getElementById('coal');
const goldDisplay = document.getElementById('gold');
const diamondsDisplay = document.getElementById('diamonds');
const mineBtn = document.getElementById('mineBtn');
const hireMinerBtn = document.getElementById('hireMinerBtn');
const minerCountDisplay = document.getElementById('minerCount');
const autoMineUpgradeBtn = document.getElementById('autoMineUpgrade');
const minerUpgradeBtn = document.getElementById('minerUpgrade');
const prestigeBtn = document.getElementById('prestigeBtn');
const statusDisplay = document.getElementById('status');

// Mining function
function mineResources() {
    coal += 1;
    gold += 1;
    diamonds += 1;
    updateDisplay();
}

// Auto-mining function
function autoMineResources() {
    coal += autoMineUpgradeLevel;
    gold += autoMineUpgradeLevel;
    diamonds += autoMineUpgradeLevel;
    updateDisplay();
}

// Hire a new miner
function hireMiner() {
    const cost = Math.floor(10 * Math.pow(1.1, minerCount));
    if (coal >= cost) {
        coal -= cost;
        minerCount++;
        updateDisplay();
    }
}

// Buy auto-mine upgrade
function buyAutoMineUpgrade() {
    const cost = Math.floor(100 * Math.pow(2, autoMineUpgradeLevel));
    if (gold >= cost) {
        gold -= cost;
        autoMineUpgradeLevel++;
        updateDisplay();
    }
}

// Buy miner upgrade
function buyMinerUpgrade() {
    const cost = Math.floor(100 * Math.pow(2, minerUpgradeLevel));
    if (diamonds >= cost) {
        diamonds -= cost;
        minerUpgradeLevel++;
        updateDisplay();
    }
}

// Prestige function
function prestige() {
    if (coal >= 10000 && gold >= 10000 && diamonds >= 10000) {
        coal = 0;
        gold = 0;
        diamonds = 0;
        minerCount = 0;
        autoMineUpgradeLevel = 0;
        minerUpgradeLevel = 0;
        prestigeMultiplier += 0.1;
        updateDisplay();
    }
}

// Event listeners for changing graphics
coalImg.addEventListener('click', () => {
    selectedCoalGraphic = prompt('Enter the new graphic for Coal:');
    updateDisplay();
});

goldImg.addEventListener('click', () => {
    selectedGoldGraphic = prompt('Enter the new graphic for Gold:');
    updateDisplay();
});

diamondsImg.addEventListener('click', () => {
    selectedDiamondsGraphic = prompt('Enter the new graphic for Diamonds:');
    updateDisplay();
});

// Update display function
function updateDisplay() {
    coalImg.textContent = selectedCoalGraphic;
    goldImg.textContent = selectedGoldGraphic;
    diamondsImg.textContent = selectedDiamondsGraphic;

    coalDisplay.textContent = coal;
    goldDisplay.textContent = gold;
    diamondsDisplay.textContent = diamonds;
    minerCountDisplay.textContent = minerCount;
    autoMineUpgradeBtn.textContent = `Auto-Mine Upgrade: ${autoMineUpgradeLevel}`;
    minerUpgradeBtn.textContent = `Miner Upgrade: ${minerUpgradeLevel}`;

    if (coal >= 10000 && gold >= 10000 && diamonds >= 10000) {
        prestigeBtn.disabled = false;
    } else {
        prestigeBtn.disabled = true;
    }
}

// Game loop (auto-mining)
setInterval(autoMineResources, 1000);

// Initial display update
updateDisplay();
