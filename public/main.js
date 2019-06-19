const numberOfDrones = 15;
let playerHealth = 100;
let invasionForce = [];
let healingValue = 15;

const gameStart = () => {
  refreshBoard();
  spawnInvasionForce();
  newRound();
};

const refreshBoard = () => {
  document.getElementById("game-end").className = "hide";
  document.getElementById("loser").innerHTML = "";
  document.getElementById("winner").innerHTML = "";
  playerHealth = 100;
  invasionForce = [];
  healingValue = 15;
};

const spawnInvasionForce = () => {
  invasionForce.push({ type: "Mothership", hp: 110 });

  for (var drones = 0; drones <= numberOfDrones; drones++) {
    invasionForce.push({ type: "Drone", hp: 30 });
  }
};

const newRound = () => {
  showHealth();
  playerHealth <= 0
    ? loseGame()
    : invasionForce.length === 0
    ? winGame()
    : null;
  document.getElementById("leader").innerHTML = "";
  document.getElementById("swarm").innerHTML = "";
  healAliens();
  showInvasionForce();
};

const showHealth = () => {
  document.getElementById("health-bar").innerHTML =
    "Your Health: " + Math.floor(playerHealth);
};

const loseGame = () => {
  document.getElementById("game-end").className = "";
  document.getElementById("loser").innerHTML = "You Lose!";
};

const winGame = () => {
  document.getElementById("game-end").className = "";
  document.getElementById("winner").innerHTML =
    "You've Defeated The Invasion Force!";
};

const harmPlayer = attackType => {
  if (invasionForce.length > 0) {
    attackType === "single-shot"
      ? (playerHealth -= 7)
      : attackType === "scatter-shot"
      ? (playerHealth -= 10)
      : attackType === "bomb"
      ? (playerHealth -= 11)
      : (playerHealth -= 32);
  }
  showHealth();
};

const showInvasionForce = () => {
  invasionForce.map(alien => {
    alien.type === "Mothership"
      ? (document.getElementById("leader").innerHTML +=
          "<p id='mother-ship'>" +
          alien.type +
          ": " +
          Math.floor(alien.hp) +
          "</p>")
      : (document.getElementById("swarm").innerHTML +=
          "<p id='alien'>" + alien.type + ": " + Math.floor(alien.hp) + "</p>");
  });
};

const randomIndex = () => {
  return Math.floor(Math.random() * invasionForce.length);
};

const singleShot = () => {
  if (invasionForce.length > 0 && playerHealth > 0) {
    invasionForce[randomIndex()].hp -= 10;
    healingValue += 1;
    AfterAttackCycle("single-shot");
  }
};

const scatterShot = () => {
  if (invasionForce.length > 4 && playerHealth > 0) {
    for (let i = 0; i <= 4; i++) {
      invasionForce[randomIndex()].hp -= 7;
    }
  } else {
    invasionForce.map(alien => (alien.hp -= 7));
  }
  healingValue += 2;
  AfterAttackCycle("scatter-shot");
};

const bomb = () => {
  primaryTarget = randomIndex();
  if (invasionForce.length > 5 && playerHealth > 0) {
    for (let i = primaryTarget - 2; i < primaryTarget + 3; i++) {
      invasionForce[i].hp -= 7;
    }
  } else {
    invasionForce.map(alien => (alien.hp -= 8));
  }
  healingValue += 1;

  AfterAttackCycle("bomb");
};

const nuke = () => {
  if (invasionForce.length > 0 && playerHealth > 0) {
    invasionForce.map(alien => {
      alien.hp -= 12;
    });
    healingValue -= (healingValue / 5) * 3;
    AfterAttackCycle("nuke");
  }
};

const AfterAttackCycle = attackType => {
  checkMotherShip();
  deleteDead();
  harmPlayer(attackType);
  newRound();
};

const heal = () => {
  playerHealth += healingValue;
  healingValue = (healingValue / 4) * 2.9;
  showHealth();
};

const healAliens = () => {
  invasionForce.map(alien => {
    alien.hp += 0.5;
  });
};

const checkMotherShip = () => {
  if (invasionForce[0].hp <= 0) {
    instaKill();
  }
};

const instaKill = () => {
  invasionForce.map(alien => {
    alien.hp = 0;
  });
};

const deleteDead = () => {
  invasionForce = invasionForce.filter(alien => alien.hp > 0);
};

gameStart();
