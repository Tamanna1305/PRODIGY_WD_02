let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const clearLapsBtn = document.getElementById("clearLapsBtn");
const laps = document.getElementById("laps");

function updateDisplay() {
  const time = Date.now() - startTime + elapsedTime;
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)));

  display.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(2, "0")}`;
}

startStopBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10);
    startStopBtn.textContent = "Pause";
    isRunning = true;
  } else {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    startStopBtn.textContent = "Start";
    isRunning = false;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00.00";
  startStopBtn.textContent = "Start";
  // Do NOT clear laps on reset
});

lapBtn.addEventListener("click", () => {
  if (isRunning) {
    const li = document.createElement("li");
    li.textContent = `Lap ${laps.children.length + 1}: ${display.textContent}`;
    laps.appendChild(li);
  }
});

clearLapsBtn.addEventListener("click", () => {
  laps.innerHTML = "";
});

