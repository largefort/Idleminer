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

// Function to update the resource displays
function updateResourceDisplays() {
    document.getElementById('gold').innerText = gold;
    document.getElementById('silver').innerText = silver;
    document.getElementById('diamond').innerText = diamond;
    document.getElementById('coal').innerText = coal;
    document.getElementById('goldMiners').innerText = goldMiners;
    document.getElementById('silverMiners').innerText = silverMiners;
    document.getElementById('diamondMiners').innerText = diamondMiners;
    document.getElementById('coalMiners').innerText = coalMiners;
}

// Function to play the click sound
function playClickSound() {
    const clickSound = document.getElementById('clickSound');
    clickSound.currentTime = 0; // Reset the audio to the beginning
    clickSound.play();
}

// Function to hire miners
function hireMiner(resourceType) {
    switch (resourceType) {
        case 'gold':
            goldMiners++;
            break;
        case 'silver':
            silverMiners++;
            break;
        case 'diamond':
            diamondMiners++;
            break;
        case 'coal':
            coalMiners++;
            break;
        default:
            break;
    }
    updateResourceDisplays();
}

// Function to sell resources
function sellResource(resourceType) {
    let amountToSell = 0;
    switch (resourceType) {
        case 'gold':
            amountToSell = gold;
            gold = 0;
            break;
        case 'silver':
            amountToSell = silver;
            silver = 0;
            break;
        case 'diamond':
            amountToSell = diamond;
            diamond = 0;
            break;
        case 'coal':
            amountToSell = coal;
            coal = 0;
            break;
        default:
            break;
    }
    // You can modify the sell rate as needed
    const sellRate = 0.5; // 0.5 units per resource
    gold += Math.floor(amountToSell * sellRate);
    updateResourceDisplays();
}

// Function to reset the game
function resetGame() {
    gold = 0;
    silver = 0;
    diamond = 0;
    coal = 0;
    goldMiners = 0;
    silverMiners = 0;
    diamondMiners = 0;
    coalMiners = 0;
    updateResourceDisplays();
}

// Function to mine resources when the button is clicked
function mineResources() {
    gold += goldMiners * minerRates.gold;
    silver += silverMiners * minerRates.silver;
    diamond += diamondMiners * minerRates.diamond;
    coal += coalMiners * minerRates.coal;
    updateResourceDisplays();

    // Show the click text with the amount of resources gained
    const clickText = document.getElementById('clickText');
    const clickAmount = document.getElementById('clickAmount');
    clickAmount.innerText =
        goldMiners * minerRates.gold +
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
}

// Function to get a random number between min (inclusive) and max (exclusive)
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// Start the game
function startGame() {
    // Attach the mineResources function to the button click event
    document.getElementById('mineButton').addEventListener('click', mineResources);

    // Attach the hireMiner function to each hire button
    document.getElementById('hireGoldMiner').addEventListener('click', () => hireMiner('gold'));
    document.getElementById('hireSilverMiner').addEventListener('click', () => hireMiner('silver'));
    document.getElementById('hireDiamondMiner').addEventListener('click', () => hireMiner('diamond'));
    document.getElementById('hireCoalMiner').addEventListener('click', () => hireMiner('coal'));

    // Attach the sellResource function to each sell button
    document.getElementById('sellGold').addEventListener('click', () => sellResource('gold'));
    document.getElementById('sellSilver').addEventListener('click', () => sellResource('silver'));
    document.getElementById('sellDiamond').addEventListener('click', () => sellResource('diamond'));
    document.getElementById('sellCoal').addEventListener('click', () => sellResource('coal'));

    // Attach the resetGame function to the reset button
    document.getElementById('resetGame').addEventListener('click', resetGame);

    // Update resource displays initially
    updateResourceDisplays();
}

// Run the game
startGame();
