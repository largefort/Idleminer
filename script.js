// Game state
let resources = {
    gold: 0,
    silver: 0,
    copper: 0,
    diamond: 0,
    emerald: 0,
    ruby: 0,
};

let hdMode = false;
let miners = 0;
let minerRate = 1;
const minerCost = 10;
let upgradeCost = 100;
let resourceMultiplier = 1;
let eventActive = false;

// Function to mine resources
function mine(resource) {
    resources[resource] += resourceMultiplier;
    updateResourcesDisplay();
}

// Function to hire a miner
function hireMiner() {
    if (resources.gold >= minerCost) {
        resources.gold -= minerCost;
        miners++;
        minerRate += 1; // Increase the miner rate when hiring a new miner
        updateResourcesDisplay();
        updateMinerDisplay();
    }
}

// Function to buy an upgrade
function buyUpgrade() {
    if (resources.gold >= upgradeCost) {
        resources.gold -= upgradeCost;
        resourceMultiplier += 1; // Increase resource production multiplier
        upgradeCost *= 2; // Double the upgrade cost for the next upgrade
        updateResourcesDisplay();
        updateUpgradeDisplay();
    }
}

// Function to automate resource gathering by hired miners
function automateMining() {
    for (const resource in resources) {
        resources[resource] += miners * minerRate * resourceMultiplier;
    }
    updateResourcesDisplay();
}

// Function to start a special event
function startEvent() {
    if (!eventActive) {
        eventActive = true;
        setTimeout(endEvent, 10000); // Event will last for 10 seconds (adjust as needed)
        resourceMultiplier *= 2; // Double resource production during the event
        updateResourcesDisplay();
        updateUpgradeDisplay();
    }
}

// Function to end the special event
function endEvent() {
    eventActive = false;
    resourceMultiplier /= 2; // Reset resource production multiplier after the event
    updateResourcesDisplay();
    updateUpgradeDisplay();
}

// Function to update resource display
function updateResourcesDisplay() {
    // ... (same as before)
}

// Function to update miner display
function updateMinerDisplay() {
    const minerButton = document.getElementById('hire-miner-button');
    minerButton.innerText = `Hire Miner (${miners})`;
}

// Function to update upgrade display
function updateUpgradeDisplay() {
    const upgradeButton = document.getElementById('buy-upgrade-button');
    upgradeButton.innerText = `Buy Upgrade (Cost: ${upgradeCost})`;
}

// Function to toggle HD mode
function toggleHDMode() {
    // ... (same as before)
}

// Initialization
document.getElementById('toggle-hd-button').addEventListener('click', toggleHDMode);
document.getElementById('hire-miner-button').addEventListener('click', hireMiner);
document.getElementById('buy-upgrade-button').addEventListener('click', buyUpgrade);

// Automated mining using setInterval
setInterval(automateMining, 1000); // Update every 1 second
updateResourcesDisplay();
updateMinerDisplay();
updateUpgradeDisplay();
