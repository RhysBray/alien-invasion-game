const numberOfDrones = 15;
let invasionForce = [];

const gameStart = () => {
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
  document.getElementById("leader").innerHTML = "";
  document.getElementById("swarm").innerHTML = "";
  showInvasionForce();
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

const shoot = () => {
  let randomIndex = Math.floor(Math.random() * invasionForce.length);
  invasionForce[randomIndex].hp -= 10;
  checkMotherShip();
  deleteDead();
  newRound();
};

const scatterShot = () => {
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
  newRound();
};

const bomb = () => {
  let randomIndex = Math.floor(Math.random() * invasionForce.length);
  invasionForce[randomIndex + 1].hp -= 10;
  invasionForce[randomIndex + 2].hp -= 10;
  invasionForce[randomIndex].hp -= 10;
  invasionForce[randomIndex - 1].hp -= 10;
  invasionForce[randomIndex - 2].hp -= 10;
  checkMotherShip();
  deleteDead();
  newRound();
};

const nuke = () => {
  invasionForce.map(alien => {
    alien.hp -= 15;
  });
  checkMotherShip();
  deleteDead();
  newRound();
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
