// Target countdown date
const targetDate = new Date("August 15, 2026 00:00:00").getTime();

// Display target date nicely
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

// Create digit element with front/back for flipping
function createDigitElement(value) {
  const digitEl = document.createElement("div");
  digitEl.classList.add("digit");

  const front = document.createElement("div");
  front.classList.add("digit-inner", "digit-front");
  front.textContent = value;

  const back = document.createElement("div");
  back.classList.add("digit-inner", "digit-back");
  back.textContent = value;

  digitEl.appendChild(front);
  digitEl.appendChild(back);

  return digitEl;
}

// Store previous displayed digits to animate only changes
const previousValues = {
  days: "",
  hours: "",
  minutes: "",
  seconds: "",
};

// Initialize digits containers
["days", "hours", "minutes", "seconds"].forEach((id) => {
  const container = document.getElementById(id);
  container.innerHTML = "";
  const digitsCount = id === "days" ? 3 : 2;
  for (let i = 0; i < digitsCount; i++) {
    const digit = createDigitElement("0");
    container.appendChild(digit);
  }
  previousValues[id] = "0".repeat(digitsCount);
});

// Track flick spin state per digit element
const flickIntervals = new WeakMap();

// Flip a digit with animation, only if changed and not already flipping
function flipDigit(digitEl, oldDigit, newDigit) {
  if (oldDigit === newDigit) return;
  if (digitEl.isFlipping) return;

  digitEl.isFlipping = true;

  const front = digitEl.querySelector(".digit-front");
  const back = digitEl.querySelector(".digit-back");

  front.textContent = oldDigit;
  back.textContent = newDigit;

  digitEl.classList.add("flip-up");

  digitEl.addEventListener(
    "animationend",
    () => {
      front.textContent = newDigit;
      digitEl.classList.remove("flip-up");
      digitEl.isFlipping = false;
    },
    { once: true }
  );
}

function startFlick(digitEl) {
  // If already spinning, ignore new triggers
  if (digitEl.spinData && digitEl.spinData.spinning) return;

  const digitInner = digitEl.querySelector(".digit-inner");
  let rotation = 0;
  const totalRotation = 360 * 6; // two full spins
  let rotated = 0;
  const spinSpeed = 60; // degrees per frame

  function spinStep() {
    rotation = (rotation + spinSpeed);
    rotated += spinSpeed;

    digitInner.style.transform = `rotateX(${rotation}deg)`;

    if (rotated >= totalRotation) {
      // Spin complete: reset rotation & digit text
      digitInner.style.transform = "";
      digitEl.spinData.spinning = false;
      digitEl.spinData.animationFrameId = null;

      const front = digitEl.querySelector(".digit-front");
      const back = digitEl.querySelector(".digit-back");
      front.textContent = digitEl.spinData.actualDigit;
      back.textContent = digitEl.spinData.actualDigit;

      return;
    }

    digitEl.spinData.animationFrameId = requestAnimationFrame(spinStep);
  }

  digitEl.spinData = {
    spinning: true,
    animationFrameId: requestAnimationFrame(spinStep),
    actualDigit: digitEl.querySelector(".digit-front").textContent,
  };
}



// Update digits for a group (days, hours, etc.)
function updateDigits(id, value) {
  const container = document.getElementById(id);
  const oldValue = previousValues[id];
  const paddedValue = value.toString().padStart(oldValue.length, "0");

  for (let i = 0; i < paddedValue.length; i++) {
    const digitEl = container.children[i];
    const oldDigit = oldValue[i];
    const newDigit = paddedValue[i];

    flipDigit(digitEl, oldDigit, newDigit);

    // Clean previous listeners
    digitEl.onmouseenter = null;
    digitEl.onmouseleave = null;

    // Add flick spin handlers
    digitEl.onmouseenter = () => startFlick(digitEl);
  }

  previousValues[id] = paddedValue;
}

// Main countdown loop, syncing updates with flip animation
function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff < 0) {
    document.querySelector(".countdown").textContent = "🎉 Time's up!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  updateDigits("days", days);
  updateDigits("hours", hours);
  updateDigits("minutes", minutes);
  updateDigits("seconds", seconds);

  // Schedule next update slightly after animation duration for smooth sync
  setTimeout(updateCountdown, 1200);
}

// Start the countdown on page load
updateCountdown();
