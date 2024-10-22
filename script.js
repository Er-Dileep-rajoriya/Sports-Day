function logMessage(message) {
  const logBox = document.getElementById("logBox");
  const logEntry = document.createElement("div");
  logEntry.className = "log-message";
  logEntry.innerText = message;
  logBox.appendChild(logEntry);
  logBox.scrollTop = logBox.scrollHeight; // Auto-scroll to the latest message
}

function OpeningCeremony(callback) {
  logMessage("Welcome to the Sports Day event!");
  let scores = {
    Red: 0,
    Blue: 0,
    Green: 0,
    Yellow: 0,
  };
  logMessage("Initializing scores...");

  setTimeout(() => {
    logMessage("Scores initialized: " + JSON.stringify(scores));
    callback(scores);
  }, 1000);
}

function Race100M(scores, callback) {
  logMessage("The 100m race is starting...");

  let raceTimes = {
    Red: Math.floor(Math.random() * 6) + 10,
    Blue: Math.floor(Math.random() * 6) + 10,
    Green: Math.floor(Math.random() * 6) + 10,
    Yellow: Math.floor(Math.random() * 6) + 10,
  };

  logMessage("Race times: " + JSON.stringify(raceTimes));

  let sortedTeams = Object.keys(raceTimes).sort(
    (a, b) => raceTimes[a] - raceTimes[b]
  );

  scores[sortedTeams[0]] += 50;
  scores[sortedTeams[1]] += 25;
  scores[sortedTeams[2]] += 10;
  scores[sortedTeams[3]] += 5;

  logMessage("Updated scores after the 100m race: " + JSON.stringify(scores));

  setTimeout(() => {
    callback(scores);
  }, 3000);
}

function LongJump(scores, callback) {
  logMessage("The Long Jump event is starting...");

  setTimeout(() => {
    let colors = ["Red", "Blue", "Green", "Yellow"];
    let winningColor = colors[Math.floor(Math.random() * colors.length)];

    logMessage(`${winningColor} wins the Long Jump!`);
    scores[winningColor] += 100;

    logMessage("Updated scores after Long Jump: " + JSON.stringify(scores));

    callback(scores);
  }, 2000);
}

function HighJump(scores, callback) {
  logMessage("The High Jump event is starting...");

  const inputBox = document.getElementById("highJumpInput");
  inputBox.style.display = "block";

  document
    .getElementById("highJumpInput")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        let winningColor = inputBox.value.trim();
        if (scores.hasOwnProperty(winningColor)) {
          logMessage(`${winningColor} wins the High Jump!`);
          scores[winningColor] += 50;
        } else {
          logMessage("No valid winner for the High Jump.");
        }

        logMessage("Updated scores after High Jump: " + JSON.stringify(scores));
        inputBox.style.display = "none";
        callback(scores);
      }
    });
}

function AwardCeremony(scores) {
  logMessage("The Award Ceremony is starting...");

  let sortedTeams = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);

  logMessage("Final Scores: " + JSON.stringify(scores));
  logMessage(`1st Place: ${sortedTeams[0]}`);
  logMessage(`2nd Place: ${sortedTeams[1]}`);
  logMessage(`3rd Place: ${sortedTeams[2]}`);
  logMessage(`4th Place: ${sortedTeams[3]}`);
}

document.getElementById("startButton").addEventListener("click", function () {
  OpeningCeremony(function (scores) {
    Race100M(scores, function (updatedScores) {
      LongJump(updatedScores, function (updatedScores2) {
        HighJump(updatedScores2, function (updatedScores3) {
          AwardCeremony(updatedScores3);
        });
      });
    });
  });
});
