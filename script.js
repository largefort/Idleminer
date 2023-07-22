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

const notifications = document.getElementById('notifications');
const notificationTimeout = 2000; // Duration of notification display in milliseconds

// Resource deposit unlock thresholds
const unlockThresholds = {
    silver: 10, // Unlock silver deposit when player collects 10 gold
    diamond: 50, // Unlock diamond deposit when player collects 50 gold
    coal: 100, // Unlock coal deposit when player collects 100 gold
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

function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    notifications.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, notificationTimeout);
}

function checkResourceUnlock() {
    if (collectedResources.gold >= unlockThresholds.silver) {
        document.querySelector('.silver').classList.add('unlocked');
    }
    if (collectedResources.gold >= unlockThresholds.diamond) {
        document.querySelector('.diamond').classList.add('unlocked');
    }
    if (collectedResources.gold >= unlockThresholds.coal) {
        document.querySelector('.coal').classList.add('unlocked');
    }
}

function collectResource(deposit) {
    const resourceType = deposit.classList[1];
    collectedResources[resourceType]++;
    updateCollectedResourcesUI();
    deposit.classList.remove('glowing-deposit');
    deposit.querySelectorAll('.resource-particle').forEach((particle) => particle.remove());

    // Show notification for collected resource
    showNotification(`+1 ${resourceType}`);

    checkResourceUnlock();
}

function updateCollectedResourcesUI() {
    document.getElementById('goldCount').textContent = collectedResources.gold;
    document.getElementById('silverCount').textContent = collectedResources.silver;
    document.getElementById('diamondCount').textContent = collectedResources.diamond;
    document.getElementById('coalCount').textContent = collectedResources.coal;
}

function purchaseUpgrade(upgradeType) {
    const cost = upgradeCosts[upgradeType];
    if (collectedResources.gold >= cost) {
        collectedResources.gold -= cost;
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
    undergroundTunnel.style.animation = 'slideUpAnimation 3s forwards';

    setTimeout(() => {
        undergroundTunnel.style.display = 'none';
        undergroundTunnel.style.top = '100vh';
    }, 3000);

    requestAnimationFrame(animateUndergroundTunnel);
}

animateScene();
animateUndergroundTunnel();
