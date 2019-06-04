const numberOfDrones = 20;
let invasionForce = [];

const gameStart = () => {
  invasionForce = [];
  spawnInvasionForce();
  newRound();
};

const spawnInvasionForce = () => {
  invasionForce.push({ type: "mothership", hp: 100 });

  for (var drones = 0; drones <= numberOfDrones; drones++) {
    invasionForce.push({ type: "drone", hp: 20 });
  }
};

const newRound = () => {
  document.getElementById("leader").innerHTML = "";
  document.getElementById("swarm").innerHTML = "";
  showInvasionForce();
};

const showInvasionForce = () => {
  invasionForce.map(alien => {
    alien.type === "mothership"
      ? (document.getElementById("leader").innerHTML +=
          "<p id='mother-ship'>" + alien.type + ": " + alien.hp + "</p>")
      : (document.getElementById("swarm").innerHTML +=
          "<p id='alien'>" + alien.type + ": " + alien.hp + "</p>");
  });
};

const shoot = () => {
  let randomIndex = Math.floor(Math.random() * invasionForce.length);
  invasionForce[randomIndex].hp -= 10;
  deleteDead();
  newRound();
};

const deleteDead = () => {
  invasionForce = invasionForce.filter(alien => alien.hp > 0);
};

gameStart();
