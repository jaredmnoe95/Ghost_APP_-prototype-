let failCount = 0;

function verifyPIN() {
  const input = document.getElementById("pinInput").value;
  const realPIN = localStorage.getItem("ghostPIN");
  const status = document.getElementById("loginStatus");

  if (input !== realPIN) {
    failCount++;
    if (failCount >= 3) {
      alert(`Warning: ${failCount} failed login attempts.`);
    }
  }

  if (input === realPIN) {
    openApp();
    failCount = 0; // Reset on successful login
  } else if (input === realPIN.split("").reverse().join("")) {
    status.innerText = "Ghost Spoof Mode Enabled.";
    openApp(true);
    failCount = 0; // Reset on successful login (Spoof mode)
  } else {
    status.innerText = "Incorrect PIN.";
  }
}

function checkForMalware() {
  let malwareDetected = true; // This would be a real check in production

  if (malwareDetected) {
    alert("ALERT: Malware/Spyware detected in the system!");
    logUserAction('Malware Detected', 'Malware/Spyware was found.');
  }
}

function nuclearPurge() {
  const msgRef = ref(db, "messages");
  msgRef.remove(); // This removes all messages

  alert('All messages have been deleted!');
  logUserAction('NUKE', 'All messages deleted by ' + localStorage.getItem('ghostName'));
}

function logUserAction(action, details) {
  const alertBox = document.getElementById('alertsLog');
  const newAlert = document.createElement("li");
  newAlert.textContent = `${action}: ${details}`;
  alertBox.appendChild(newAlert);
}
