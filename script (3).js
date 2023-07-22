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

// Function to get a random number between min (inclusive) and max (exclusive)
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

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

// Function to play the hireMiner sound
function playHireMinerSound() {
    const hireMinerSound = document.getElementById('hireMinerSound');
    hireMinerSound.currentTime = 0; // Reset the audio to the beginning
    hireMinerSound.play();
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

// Function to mine resources when the button is clicked
function mineResources() {
    gold += 1 + goldMiners * minerRates.gold;
    silver += 1 + silverMiners * minerRates.silver;
    diamond += 1 + diamondMiners * minerRates.diamond;
    coal += 1 + coalMiners * minerRates.coal;
    updateResourceDisplays();

    // Show the click text with the amount of resources gained
    const clickText = document.getElementById('clickText');
    const clickAmount = document.getElementById('clickAmount');
    clickAmount.innerText = 1 + goldMiners * minerRates.gold +
        silverMiners * minerRates.silver +
        diamondMiners * minerRates.diamond +
        coalMiners * minerRates.coal;

    // Get the dimensions of the clickText container and the window
    const clickTextRect = clickText.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate random X and Y coordinates for the clickText within the window
    const minX = 0;
    const maxX = windowWidth - clickTextRect.width;
    const minY = 0;
    const maxY = windowHeight - clickTextRect.height;
    const randomX = getRandomNumber(minX, maxX);
    const randomY = getRandomNumber(minY, maxY);

    // Apply the random position to the clickText
    clickText.style.left = `${randomX}px`;
    clickText.style.top = `${randomY}px`;

    // Show the click text
    clickText.classList.add('active');

    // Hide the click text after a short delay
    setTimeout(() => {
        clickText.classList.remove('active');
    }, 1000);

    // Play the click sound
    playClickSound();

    // Save the game after every click
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
                playHireMinerSound(); // Play the hireMiner sound
            }
            break;
        case 'silver':
            if (silver >= cost) {
                silverMiners++;
                silver -= cost;
                updateResourceDisplays();
                playHireMinerSound(); // Play the hireMiner sound
            }
            break;
        case 'diamond':
            if (diamond >= cost) {
                diamondMiners++;
                diamond -= cost;
                updateResourceDisplays();
                playHireMinerSound(); // Play the hireMiner sound
            }
            break;
        case 'coal':
            if (coal >= cost) {
                coalMiners++;
                coal -= cost;
                updateResourceDisplays();
                playHireMinerSound(); // Play the hireMiner sound
            }
            break;
        default:
            break;
    }

    // Save the game after hiring a miner
    saveGame();
}

// Function to automatically mine resources
function autoMineResources() {
    gold += goldMiners * minerRates.gold;
    silver += silverMiners * minerRates.silver;
    diamond += diamondMiners * minerRates.diamond;
    coal += coalMiners * minerRates.coal;
    updateResourceDisplays();
}

// Start the auto-mining process
function startAutoMining() {
    setInterval(autoMineResources, 1000); // Adjust the interval as needed (1000ms = 1 second)
}

// Start the game
function startGame() {
    // Load the game data from localStorage
    loadGame();

    // Attach the mineResources function to the button click event
    document.getElementById('mineButton').addEventListener('click', mineResources);

    // Attach the hireMiner function to each hire button
    document.getElementById('hireGoldMiner').addEventListener('click', () => hireMiner('gold'));
    document.getElementById('hireSilverMiner').addEventListener('click', () => hireMiner('silver'));
    document.getElementById('hireDiamondMiner').addEventListener('click', () => hireMiner('diamond'));
    document.getElementById('hireCoalMiner').addEventListener('click', () => hireMiner('coal'));

    // Start the auto-mining process
    startAutoMining();
}

// Run the game
startGame();