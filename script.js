let gold = 0;
let silver = 0;
let diamond = 0;
let coal = 0;

let goldMiners = 0;
let silverMiners = 0;
let diamondMiners = 0;
let coalMiners = 0;

const minerRates = {
    gold: 1, // Resource units mined per second
    silver: 2,
    diamond: 3,
    coal: 4,
};

// Update the resource displays
function updateResourceDisplays() {
    document.getElementById('gold').innerText = gold;
    document.getElementById('silver').innerText = silver;
    document.getElementById('diamond').innerText = diamond;
    document.getElementById('coal').innerText = coal;
}

// Function to play the click sound
function playClickSound() {
    const clickSound = document.getElementById('clickSound');
    clickSound.currentTime = 0; // Reset the audio to the beginning
    clickSound.play();
}

// Function to save the game data to localStorage
function saveGame() {
    const gameData = {
        gold,
        silver,
        diamond,
        coal,
        goldMiners,
        silverMiners,
        diamondMiners,
        coalMiners,
    };
    localStorage.setItem('idleMinerGameData', JSON.stringify(gameData));
}

// Function to load the game data from localStorage
function loadGame() {
    const savedData = localStorage.getItem('idleMinerGameData');
    if (savedData) {
        const gameData = JSON.parse(savedData);
        gold = gameData.gold || 0;
        silver = gameData.silver || 0;
        diamond = gameData.diamond || 0;
        coal = gameData.coal || 0;
        goldMiners = gameData.goldMiners || 0;
        silverMiners = gameData.silverMiners || 0;
        diamondMiners = gameData.diamondMiners || 0;
        coalMiners = gameData.coalMiners || 0;
        updateResourceDisplays();
    }
}

// Function to mine resources continuously by miners
function autoMineResources() {
    gold += goldMiners * minerRates.gold;
    silver += silverMiners * minerRates.silver;
    diamond += diamondMiners * minerRates.diamond;
    coal += coalMiners * minerRates.coal;
    updateResourceDisplays();

    // Save the game data to localStorage after auto-mining
    saveGame();
}

// Function to hire miners
function hireMiner(resourceType) {
    const cost = 10; // Adjust the hiring cost here
    switch (resourceType) {
        case 'gold':
            if (gold >= cost) {
                goldMiners++;
                gold -= cost;
                updateResourceDisplays();
                playClickSound(); // Play the click sound when hiring a miner
            }
            break;
        case 'silver':
            if (silver >= cost) {
                silverMiners++;
                silver -= cost;
                updateResourceDisplays();
                playClickSound(); // Play the click sound when hiring a miner
            }
            break;
        case 'diamond':
            if (diamond >= cost) {
                diamondMiners++;
                diamond -= cost;
                updateResourceDisplays();
                playClickSound(); // Play the click sound when hiring a miner
            }
            break;
        case 'coal':
            if (coal >= cost) {
                coalMiners++;
                coal -= cost;
                updateResourceDisplays();
                playClickSound(); // Play the click sound when hiring a miner
            }
            break;
        default:
            break;
    }

    // Save the game data to localStorage after hiring a miner
    saveGame();
}

// Start the game
function startGame() {
    // Load the game data from localStorage
    loadGame();

    // Attach the mineResources function to the button click event
    document.getElementById('mineButton').addEventListener('click', autoMineResources);

    // Attach the hireMiner function to each hire button
    document.getElementById('hireGoldMiner').addEventListener('click', () => hireMiner('gold'));
    document.getElementById('hireSilverMiner').addEventListener('click', () => hireMiner('silver'));
    document.getElementById('hireDiamondMiner').addEventListener('click', () => hireMiner('diamond'));
    document.getElementById('hireCoalMiner').addEventListener('click', () => hireMiner('coal'));

    // Start auto-mining by miners
    setInterval(autoMineResources, 1000); // Auto-mine every 1 second
}

// Run the game
startGame();
