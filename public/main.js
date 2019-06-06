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
  playerHealth <= 0 ? loseGame() : invasionForce.length == 0 ? winGame() : null;
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
          "<p id='mother-ship'>" + alien.type + ": " + alien.hp + "</p>")
      : (document.getElementById("swarm").innerHTML +=
          "<p id='alien'>" + alien.type + ": " + alien.hp + "</p>");
  });
};

const randomIndex = () => {
  return Math.floor(Math.random() * invasionForce.length);
};

const singleShot = () => {
  if (invasionForce.length > 0 && playerHealth > 0) {
    invasionForce[randomIndex()].hp -= 10;
    healingValue += 1;
    checkMotherShip();
    deleteDead();
    harmPlayer("single-shot");
    newRound();
  }
};

const scatterShot = () => {
  if (invasionForce.length > 0 && playerHealth > 0) {
    invasionForce[randomIndex()].hp -= 10;
    invasionForce[randomIndex()].hp -= 10;
    invasionForce[randomIndex()].hp -= 5;
    invasionForce[randomIndex()].hp -= 5;
    healingValue += 2;
    checkMotherShip();
    deleteDead();
    harmPlayer("scatter-shot");
    newRound();
  }
};

const bomb = () => {
  if (invasionForce.length > 0 && playerHealth > 0) {
    primaryTarget = randomIndex();
    invasionForce[primaryTarget + 1].hp
      ? (invasionForce[primaryTarget + 1].hp -= 5)
      : null;
    invasionForce[primaryTarget + 2].hp
      ? (invasionForce[primaryTarget + 1].hp -= 6)
      : null;
    invasionForce[primaryTarget].hp -= 10;
    invasionForce[primaryTarget - 1].hp
      ? (invasionForce[primaryTarget + 1].hp -= 9)
      : null;
    invasionForce[primaryTarget - 2].hp
      ? (invasionForce[primaryTarget + 1].hp -= 7)
      : null;
    healingValue += 1;
    checkMotherShip();
    deleteDead();
    harmPlayer("bomb");
    newRound();
  }
};

const nuke = () => {
  if (invasionForce.length > 0 && playerHealth > 0) {
    invasionForce.map(alien => {
      alien.hp -= 12;
    });
    healingValue -= (healingValue / 5) * 3;
    checkMotherShip("nuke");
    harmPlayer();
    deleteDead();
    newRound();
  }
};

const heal = () => {
  playerHealth += healingValue;
  healingValue = (healingValue / 3) * 2.5;
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
