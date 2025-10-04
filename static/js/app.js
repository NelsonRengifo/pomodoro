const startPauseButton = document.getElementById("start-pause");
const timer = document.getElementById("time");
const resetButton = document.getElementById("reset");

let pomodoroCount = 0;
let intervalId = null;
let isWorking = true;
const pomodoroTime = "25:00";
const shortBreakTime = "05:00";
const longBreakTime = "15:00";
const fullPomodoroCycle = 4;
/*
 * Times are in seconds.
 */
const workStartingTime = 1500;
const shortBreakStartingTime = 300;
const longBreakStartingTime = 900;

let currentTime = workStartingTime;

function setStartingTime(startingTime) {
  currentTime = startingTime;
}

function runTimer() {
  currentTime--;
  let minutes = String(Math.floor(currentTime / 60));
  let seconds = String(currentTime % 60);
  minutes = minutes.padStart(2, "0");
  seconds = seconds.padStart(2, "0");
  let newTime = minutes + ":" + seconds;
  timer.textContent = newTime;
  /*
   * Phase transitioning (work or break).
   */
  if (currentTime <= 0) {
    if (isWorking && pomodoroCount < fullPomodoroCycle) {
      setStartingTime(shortBreakStartingTime);
      isWorking = false;
      pomodoroCount++;
    } else if (isWorking && pomodoroCount == fullPomodoroCycle) {
      setStartingTime(longBreakStartingTime);
      isWorking = false;
      pomodoroCount = 0;
    } else {
      setStartingTime(workStartingTime);
      isWorking = true;
      startPauseButton.textContent = "Start";
      timer.textContent = pomodoroTime;
      stopCounting();
    }
  }
}
/*
 * 1s = 1000ms
 */
function startCounting() {
  intervalId = setInterval(runTimer, 1000);
}
function stopCounting() {
  clearInterval(intervalId);
}

startPauseButton.addEventListener("click", function () {
  if (startPauseButton.textContent == "Start") {
    startPauseButton.textContent = "Pause";
    startCounting();
  } else {
    stopCounting();
    startPauseButton.textContent = "Start";
  }
});

resetButton.addEventListener("click", function () {
  stopCounting();
  startPauseButton.textContent = "Start";

  if (isWorking) {
    timer.textContent = pomodoroTime;
    setStartingTime(workStartingTime);
  } else if (!isWorking && pomodoroCount < fullPomodoroCycle) {
    timer.textContent = shortBreakTime;
    setStartingTime(shortBreakStartingTime);
  } else {
    timer.textContent = longBreakTime;
    setStartingTime(longBreakStartingTime);
  }
});
