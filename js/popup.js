function getRandomTime() {
  return Math.floor(Math.random() * 2000) + 10000; // Random time between 10 and 20 seconds in milliseconds
}

function showPopup() {
  // Sample user data
  const users = [
    { name: "John Doe", amount: "$500" },
    { name: "Jane Smith", amount: "$300" },
    // Add more users as needed
  ];

  // Select a random user
  const randomUser = users[Math.floor(Math.random() * users.length)];

  // Display user data in the popup
  document.getElementById("userName").innerText = `User: ${randomUser.name}`;
  document.getElementById("withdrawalAmount").innerText = `Withdrawal Amount: ${randomUser.amount}`;

  // Show the popup with scale, wobble, and opacity effects
  const popupElement = document.getElementById("popup");
  popupElement.style.display = "block";
  setTimeout(() => {
    popupElement.style.transform = "translate(0, 0) scale(1)";
    popupElement.style.opacity = "1";
  }, 10);

  // Set a timeout to hide the popup after 5 seconds
  setTimeout(() => {
    closePopup();
    // Call the function recursively to show the popup again after a random time
    setTimeout(showPopup, getRandomTime());
  }, 5000);
}

function closePopup() {
  const popupElement = document.getElementById("popup");
  popupElement.style.transform = "translate(0, 100%) scale(0.8)"; // Slide out to the bottom, small size
  popupElement.style.opacity = "0"; // Fade out
  setTimeout(() => {
    popupElement.style.display = "none";
    popupElement.style.transform = "translate(0, 100%) scale(0.8)"; // Reset transform for future appearances
  }, 300); // Wait for the transition to complete before hiding
}

// Initial call to start the process
setTimeout(showPopup, getRandomTime());