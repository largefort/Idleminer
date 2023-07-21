let gold = 0;
let silver = 0;
let diamond = 0;
let coal = 0;

let goldMiners = 0;
let silverMiners = 0;
let diamondMiners = 0;
let coalMiners = 0;

let goldMinerLevel = 1;
let silverMinerLevel = 1;
let diamondMinerLevel = 1;
let coalMinerLevel = 1;

const minerRates = {
    gold: 1, // Resource units mined per second
    silver: 2,
    diamond: 3,
    coal: 4,
};

const upgradeCosts = {
    gold: 100,
    silver: 200,
    diamond: 300,
    coal: 400,
};

const autoMineInterval = 1000; // Adjust the interval as needed (1000ms = 1 second)
let autoMiningEnabled = false;

// ... (previous code)

// Function to upgrade a miner
function upgradeMiner(resourceType) {
    const upgradeCost = upgradeCosts[resourceType];
    switch (resourceType) {
        case 'gold':
            if (gold >= upgradeCost) {
                goldMinerLevel++;
                gold -= upgradeCost;
                updateResourceDisplays();
                playHireMinerSound(); // Play the hireMiner sound
            }
            break;
        case 'silver':
            if (silver >= upgradeCost) {
                silverMinerLevel++;
                silver -= upgradeCost;
                updateResourceDisplays();
                playHireMinerSound(); // Play the hireMiner sound
            }
            break;
        case 'diamond':
            if (diamond >= upgradeCost) {
                diamondMinerLevel++;
                diamond -= upgradeCost;
                updateResourceDisplays();
                playHireMinerSound(); // Play the hireMiner sound
            }
            break;
        case 'coal':
            if (coal >= upgradeCost) {
                coalMinerLevel++;
                coal -= upgradeCost;
                updateResourceDisplays();
                playHireMinerSound(); // Play the hireMiner sound
            }
            break;
        default:
            break;
    }

    // Save the game after upgrading a miner
    saveGame();
}

// Function to handle the auto-mine toggle
function toggleAutoMine() {
    autoMiningEnabled = !autoMiningEnabled;
    if (autoMiningEnabled) {
        startAutoMining();
    }
}

// Function to exchange resources
function exchangeResources(fromResourceType, toResourceType, exchangeAmount) {
    const exchangeRate = 2; // Adjust the exchange rate as needed
    switch (fromResourceType) {
        case 'gold':
            if (gold >= exchangeAmount) {
                gold -= exchangeAmount;
                const exchangedAmount = exchangeAmount * exchangeRate;
                switch (toResourceType) {
                    case 'silver':
                        silver += exchangedAmount;
                        break;
                    case 'diamond':
                        diamond += exchangedAmount;
                        break;
                    case 'coal':
                        coal += exchangedAmount;
                        break;
                    default:
                        break;
                }
                updateResourceDisplays();
                playClickSound(); // Play the click sound
            }
            break;
        // Handle other resource types similarly
        default:
            break;
    }

    // Save the game after exchanging resources
    saveGame();
}

// Attach the upgradeMiner function to each upgrade button
document.getElementById('upgradeGoldMiner').addEventListener('click', () => upgradeMiner('gold'));
document.getElementById('upgradeSilverMiner').addEventListener('click', () => upgradeMiner('silver'));
document.getElementById('upgradeDiamondMiner').addEventListener('click', () => upgradeMiner('diamond'));
document.getElementById('upgradeCoalMiner').addEventListener('click', () => upgradeMiner('coal'));

// Attach the toggleAutoMine function to the auto-mine checkbox
document.getElementById('autoMineCheckbox').addEventListener('change', toggleAutoMine);

// Attach the exchangeResources function to the exchange button
document.getElementById('exchangeButton').addEventListener('click', () => {
    const fromResourceType = document.getElementById('exchangeFrom').value;
    const toResourceType = document.getElementById('exchangeTo').value;
    const exchangeAmount = parseInt(document.getElementById('exchangeAmount').value, 10);
    exchangeResources(fromResourceType, toResourceType, exchangeAmount);
});
