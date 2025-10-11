const startPauseButton = document.getElementById("start-pause");
const timer = document.getElementById("time");
const resetButton = document.getElementById("reset");
const title = document.getElementById("tab-title");
const pomodoros = document.getElementById("pomodoro-count");

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

const workStartingTime = 25; // 1500
const shortBreakStartingTime = 5; // 300
const longBreakStartingTime = 15; // 900

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
  title.textContent = `Pomodoro Timer: ${newTime}`;

  /*
   * Phase transitioning (work or break).
   */

  if (currentTime <= 0) {
    const transitionSound = document.getElementById("phase-sound");
    transitionSound.play();
    if (isWorking && pomodoroCount < fullPomodoroCycle) {
      setStartingTime(shortBreakStartingTime);
      isWorking = false;
      pomodoroCount++;
    } else if (isWorking && pomodoroCount == fullPomodoroCycle) {
      setStartingTime(longBreakStartingTime);
      isWorking = false;
      pomodoroCount = 0;
    } else {
      pomodoros.textContent = `${pomodoroCount}/4`;
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
  const audio = document.getElementById("click-sound");
  audio.play();
  if (startPauseButton.textContent == "Start") {
    startPauseButton.textContent = "Pause";
    startCounting();
  } else {
    stopCounting();
    startPauseButton.textContent = "Start";
  }
});

resetButton.addEventListener("click", function () {
  const audio = document.getElementById("click-sound");
  audio.play();
  stopCounting();
  startPauseButton.textContent = "Start";

  if (isWorking) {
    timer.textContent = pomodoroTime;
    title.textContent = `Pomodoro Timer: ${pomodoroTime}`;
    setStartingTime(workStartingTime);
  } else if (!isWorking && pomodoroCount < fullPomodoroCycle) {
    timer.textContent = shortBreakTime;
    title.textContent = `Pomodoro Timer: ${shortBreakTime}`;
    setStartingTime(shortBreakStartingTime);
  } else {
    timer.textContent = longBreakTime;
    title.textContent = `Pomodoro Timer: ${longBreakTime}`;
    setStartingTime(longBreakStartingTime);
  }
});
