const cart = document.querySelector('.cart');
const worker1 = document.querySelector('.worker:nth-of-type(1)');
const worker2 = document.querySelector('.worker:nth-of-type(2)');
const undergroundTunnel = document.querySelector('.underground-tunnel');
const collectedResources = {
    gold: 0,
    silver: 0,
    diamond: 0,
    coal: 0,
};

let cartPosition = -10;
let worker1Position = 20;
let worker2Position = 50;

// Upgrade costs and effects
const upgradeCosts = {
    pickaxe: 10,
    workers: 50,
};

const upgradeEffects = {
    pickaxe: 2, // Increase mining efficiency by reducing cart travel time
    workers: 1, // Increase resource yield by adding more resource particles per deposit
};

function animateScene() {
    cart.style.animation = 'cartAnimation 4s infinite'; // Cart animation lasting 4 seconds, repeating infinitely
    worker1.style.animation = 'workerAnimation1 3s infinite'; // Worker 1 animation lasting 3 seconds, repeating infinitely
    worker2.style.animation = 'workerAnimation2 3s infinite'; // Worker 2 animation lasting 3 seconds, repeating infinitely

    // Create resource particles
    createResourceParticles('.gold');
    createResourceParticles('.silver');
    createResourceParticles('.diamond');
    createResourceParticles('.coal');

    // Animate glowing resource deposits
    const glowingDeposits = document.querySelectorAll('.glowing-deposit');
    glowingDeposits.forEach((deposit) => {
        deposit.style.animation = 'glowAnimation 1s ease-in-out infinite alternate';
    });

    // Add event listeners for resource collection
    const resourceDeposits = document.querySelectorAll('.resource-deposit');
    resourceDeposits.forEach((deposit) => {
        deposit.addEventListener('click', () => {
            collectResource(deposit);
        });
    });

    requestAnimationFrame(animateScene);
}

function createResourceParticles(resourceClass) {
    const resourceDeposit = document.querySelector(resourceClass);
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.classList.add('resource-particle');
        particle.style.left = Math.random() * 40 + 'px';
        particle.style.bottom = Math.random() * 40 + 'px';
        resourceDeposit.appendChild(particle);
    }
}

function collectResource(deposit) {
    const resourceType = deposit.classList[1]; // Get the class name of the deposit (e.g., 'gold', 'silver', etc.)
    collectedResources[resourceType]++; // Increase the count for the collected resource
    updateCollectedResourcesUI(); // Update the UI to display the new collected resources
    deposit.classList.remove('glowing-deposit'); // Remove glowing effect after collecting resources
    deposit.querySelectorAll('.resource-particle').forEach((particle) => particle.remove()); // Remove resource particles
}

function updateCollectedResourcesUI() {
    // Update the UI to display the new collected resources
    document.getElementById('goldCount').textContent = collectedResources.gold;
    document.getElementById('silverCount').textContent = collectedResources.silver;
    document.getElementById('diamondCount').textContent = collectedResources.diamond;
    document.getElementById('coalCount').textContent = collectedResources.coal;
}

function purchaseUpgrade(upgradeType) {
    const cost = upgradeCosts[upgradeType];
    if (collectedResources.gold >= cost) {
        collectedResources.gold -= cost; // Deduct the cost from collected gold
        applyUpgradeEffect(upgradeType);
        updateCollectedResourcesUI();
        updateUpgradeCosts();
    }
}

function applyUpgradeEffect(upgradeType) {
    switch (upgradeType) {
        case 'pickaxe':
            cart.style.animationDuration = `${4 / upgradeEffects.pickaxe}s`;
            break;
        case 'workers':
            increaseResourceParticles('.gold');
            increaseResourceParticles('.silver');
            increaseResourceParticles('.diamond');
            increaseResourceParticles('.coal');
            break;
        // Add more upgrade cases as needed for other upgrades
    }
}

function increaseResourceParticles(resourceClass) {
    const resourceDeposit = document.querySelector(resourceClass);
    for (let i = 0; i < upgradeEffects.workers; i++) {
        const particle = document.createElement('div');
        particle.classList.add('resource-particle');
        particle.style.left = Math.random() * 40 + 'px';
        particle.style.bottom = Math.random() * 40 + 'px';
        resourceDeposit.appendChild(particle);
    }
}

function updateUpgradeCosts() {
    document.getElementById('pickaxeCost').textContent = upgradeCosts.pickaxe;
    document.getElementById('workersCost').textContent = upgradeCosts.workers;
}

function animateUndergroundTunnel() {
    undergroundTunnel.style.display = 'block';
    undergroundTunnel.style.animation = 'slideUpAnimation 3s forwards'; // Slide up animation lasting 3 seconds, and staying at the final state

    setTimeout(() => {
        undergroundTunnel.style.display = 'none';
        undergroundTunnel.style.top = '100vh';
    }, 3000);

    requestAnimationFrame(animateUndergroundTunnel);
}

// Start the animations
animateScene();
animateUndergroundTunnel();
