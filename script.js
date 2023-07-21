// Game variables
let gold = 0;
let totalGold = 0; // New statistic to track total gold collected
let miners = 0;
let totalMiners = 0; // New statistic to track total miners hired
let minerCost = 10;
let miningSkillLevel = 1; // New variable to track mining skill level

// Mining locations data
const miningLocations = {
  forest: {
    name: "Forest",
    resources: ["Wood", "Berries"],
    productionRate: 1, // Resource production rate per second
  },
  mountain: {
    name: "Mountain",
    resources: ["Stone", "Ore"],
    productionRate: 2,
  },
  cave: {
    name: "Cave",
    resources: ["Gems", "Crystals"],
    productionRate: 3,
  },
};

let currentLocation = "forest"; // Default location is the forest

// Resource inventory data
let resources = {
  Wood: 0,
  Berries: 0,
  Stone: 0,
  Ore: 0,
  Gems: 0,
  Crystals: 0,
};

// Offline progression variables
let lastLoginTime = Date.now(); // Store the last login time

// DOM elements
const goldDisplay = document.getElementById('gold');
const totalGoldDisplay = document.getElementById('total-gold');
const minersDisplay = document.getElementById('miners');
const totalMinersDisplay = document.getElementById('total-miners');
const mineButton = document.getElementById('mine');

const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');

const playerNameDisplay = document.getElementById('player-name');
const playerLevelDisplay = document.getElementById('player-level');
const badgeList = document.getElementById('badge-list');

const upgradeMiningButton = document.getElementById('upgrade-mining');
const locationList = document.getElementById('location-list');
const resourceInventory = document.getElementById('resource-inventory');

// Function to mine resources based on the location's production rate
function mineResources() {
  const location = miningLocations[currentLocation];
  const productionRate = location.productionRate * miningSkillLevel;
  location.resources.forEach(resource => {
    // Increment the quantity of the mined resource in the player's inventory
    resources[resource] += productionRate;
  });
  updateDisplay();
}

// Function to update the resource inventory display
function updateInventoryDisplay() {
  // Clear the existing inventory display
  resourceInventory.innerHTML = '';
  
  // Loop through the resources object and display each resource and its quantity
  for (const resource in resources) {
    const resourceElement = document.createElement('div');
    resourceElement.textContent = `${resource}: ${resources[resource]}`;
    resourceInventory.appendChild(resourceElement);
  }
}

// Function to change the current mining location
function changeLocation(location) {
  currentLocation = location;
  updateDisplay();
}

// Function to hire a miner
function hireMiner() {
  if (gold >= minerCost) {
    gold -= minerCost;
    miners++;
    totalMiners++; // Track total miners hired
    minerCost *= 2; // Increase the cost of the next miner
    updateDisplay();
  }
}

// Function to upgrade mining efficiency
function upgradeMining() {
  const upgradeCost = 100 * miningSkillLevel; // Upgrade cost increases with skill level
  if (gold >= upgradeCost) {
    gold -= upgradeCost;
    miningSkillLevel++; // Increase the mining skill level
    updateDisplay();
    updateSkillsDisplay();
  }
}

// Function to add a badge to the profile
function addBadge(badgeName) {
  const badgeElement = document.createElement('li');
  badgeElement.textContent = badgeName;
  badgeList.appendChild(badgeElement);
}

// Function to update the player profile display
function updateProfile() {
  playerNameDisplay.textContent = 'Player Name'; // Replace with the player's actual name
  playerLevelDisplay.textContent = `Level ${calculatePlayerLevel()}`;
  totalGoldDisplay.textContent = totalGold;
  totalMinersDisplay.textContent = totalMiners;
  // Add example badges (you can add conditions to unlock specific badges)
  addBadge('Mining Novice');
  addBadge('Wealthy Miner');
  addBadge('Experienced Digger');
  addBadge('Super Clicker');
  // Add more badges based on the player's achievements
}

// Function to calculate the player's level (this is just a simple example)
function calculatePlayerLevel() {
  return Math.floor(totalGold / 1000) + 1;
}

// Function to update the display
function updateDisplay() {
  goldDisplay.textContent = `Gold: ${gold}`;
  minersDisplay.textContent = `Miners: ${miners}`;
  mineButton.textContent = `Mine (${(miners + 1) * miningSkillLevel} G/s) - Cost: ${minerCost} Gold`;
  updateInventoryDisplay();
}

// Function to update the skills display
function updateSkillsDisplay() {
  upgradeMiningButton.textContent = `Upgrade Mining (Cost: ${100 * miningSkillLevel} Gold)`;
}

// ... (previous code) ...

// Event listeners
mineButton.addEventListener('click', mineResources);
upgradeMiningButton.addEventListener('click', upgradeMining);
locationList.addEventListener('click', (event) => {
  if (event.target.nodeName === 'LI') {
    changeLocation(event.target.dataset.location);
  }
});

// ... (previous code) ...

// Initial display update
updateDisplay();
updateProfile();
updateSkillsDisplay();
updateInventoryDisplay();

// Start the game loop
// ... (previous code) ...

// Save the game state when the window is closed or reloaded
// ... (previous code) ...

// Load the game state when the window is loaded
// ... (previous code) ...
