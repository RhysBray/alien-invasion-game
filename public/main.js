const numberOfDrones = 15;
let playerHealth = 100;
let invasionForce = [];

const gameStart = () => {
  playerHealth = 10;
  invasionForce = [];
  spawnInvasionForce();
  newRound();
};

const spawnInvasionForce = () => {
  invasionForce.push({ type: "Mothership", hp: 60 });

  for (var drones = 0; drones <= numberOfDrones; drones++) {
    invasionForce.push({ type: "Drone", hp: 20 });
  }
};

const newRound = () => {
  playerHealth <= 0 ? loseGame() : invasionForce.length == 0 ? winGame() : null;
  document.getElementById("leader").innerHTML = "";
  document.getElementById("swarm").innerHTML = "";
  showInvasionForce();
};

const loseGame = () => {
  console.log("You Lose!");
};

const winGame = () => {
  console.log("You Win!");
};

const updateHealthBar = attackType => {
  if (invasionForce.length > 0) {
    attackType === "single-shot"
      ? (playerHealth -= 5)
      : attackType === "scatter-shot"
      ? (playerHealth -= 10)
      : attackType === "bomb"
      ? (playerHealth -= 15)
      : (playerHealth -= 30);
    console.log(playerHealth);
  }
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

const singleShot = () => {
  if (invasionForce.length > 0 && playerHealth > 0) {
    let randomIndex = Math.floor(Math.random() * invasionForce.length);
    invasionForce[randomIndex].hp -= 10;
    checkMotherShip();
    deleteDead();
    updateHealthBar("single-shot");
    newRound();
  }
};

const scatterShot = () => {
  if (invasionForce.length > 0 && playerHealth > 0) {
    let randomIndex1 = Math.floor(Math.random() * invasionForce.length);
    let randomIndex2 = Math.floor(Math.random() * invasionForce.length);
    let randomIndex3 = Math.floor(Math.random() * invasionForce.length);
    let randomIndex4 = Math.floor(Math.random() * invasionForce.length);

    invasionForce[randomIndex1].hp -= 10;
    invasionForce[randomIndex2].hp -= 10;
    invasionForce[randomIndex3].hp -= 5;
    invasionForce[randomIndex4].hp -= 5;
    checkMotherShip();
    deleteDead();
    updateHealthBar("scatter-shot");
    newRound();
  }
};

const bomb = () => {
  if (invasionForce.length > 0 && playerHealth > 0) {
    let randomIndex = Math.floor(Math.random() * invasionForce.length);
    invasionForce[randomIndex + 1].hp -= 10;
    invasionForce[randomIndex + 2].hp -= 10;
    invasionForce[randomIndex].hp -= 10;
    invasionForce[randomIndex - 1].hp -= 10;
    invasionForce[randomIndex - 2].hp -= 10;
    checkMotherShip();
    deleteDead();
    updateHealthBar("bomb");
    newRound();
  }
};

const nuke = () => {
  if (invasionForce.length > 0 && playerHealth > 0) {
    invasionForce.map(alien => {
      alien.hp -= 15;
    });
    checkMotherShip("nuke");
    updateHealthBar();
    deleteDead();
    newRound();
  }
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
