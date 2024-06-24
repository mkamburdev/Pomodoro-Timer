const buttons = {
  reset: document.getElementById("reset-button"),
  start: document.getElementById("start-button"),
  pomodoro: document.getElementById("pomodoro-button"),
  shortBreak: document.getElementById("short-break-button"),
  longBreak: document.getElementById("long-break-button"),
};

const timerDisplay = document.getElementById("timer-display");

let timer;
let timeLeft;
let isRunning = false;
let currentDuration;

const durations = {
  pomodoro: 1500,
  shortBreak: 300,
  longBreak: 600,
};

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  document.title = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} - Pomodoro Timer`;
}

function playSoundNotification() {
  const audio = new Audio('/public/sounds/sound.mp3');
  audio.play();
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(timer);
    buttons.start.textContent = "Start";
  } else {
    buttons.start.textContent = "Pause";
    timer = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        stopTimer();
        alert("Time's up!");
        playSoundNotification(); 
        setTimer(currentDuration);
      }
      updateTimerDisplay();
    }, 1000);
  }
  isRunning = !isRunning;
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
  buttons.start.textContent = "Start";
}

function setTimer(duration) {
  stopTimer();
  timeLeft = duration;
  currentDuration = duration;
  updateTimerDisplay();
}

function updateButtonStyles(button) {
	Object.values(buttons).forEach(btn => {
	  if (btn !== buttons.start) {
		 btn.classList.remove("bg-white", "text-black");
		 btn.classList.add("bg-transparent", "text-white");
	  }
	});
	if (button !== buttons.start) {
	  button.classList.remove("bg-transparent", "text-white");
	  button.classList.add("bg-white", "text-black");
	}
 }

buttons.reset.addEventListener("click", () => setTimer(currentDuration));
buttons.start.addEventListener("click", toggleTimer);

Object.keys(durations).forEach(key => {
  buttons[key].addEventListener("click", () => {
    setTimer(durations[key]);
    updateButtonStyles(buttons[key]);
  });
});

setTimer(durations.pomodoro);