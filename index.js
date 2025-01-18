const timerObj = {
  type: 'pomodoro',
  timer: 25 * 60 * 1000, // Default timer is 25 minutes
  remainingTime: 25 * 60 * 1000, // Tracks remaining time
  isStarted: false,
  isPaused: false,
};

const pomodoro = document.querySelector('.pomodoro');
const shortbreak = document.querySelector('.shortBreak');
const longbreak = document.querySelector('.longBreak');

const start = document.querySelector('.start');
const pause = document.querySelector('.pause');
const reset = document.querySelector('.reset');
const timerDisplay = document.querySelector('.timer');

const toggleActiveClass = (clickedButton) => {
  const topbarButtons = document.querySelectorAll('.topbar button');

  topbarButtons.forEach((button) => {
    button.classList.remove('active');
  });

  clickedButton.classList.add('active');

  if (clickedButton === pomodoro) {
    pomodoro.style.backgroundColor = 'var(--pomodoro-highlight)';
    shortbreak.style.backgroundColor = 'transparent';
    longbreak.style.backgroundColor = 'transparent';
  }

  if (clickedButton === shortbreak) {
    shortbreak.style.backgroundColor = 'var(--shortbreak-highlight)';
    pomodoro.style.backgroundColor = 'transparent';
    longbreak.style.backgroundColor = 'transparent';
  }

  if (clickedButton === longbreak) {
    longbreak.style.backgroundColor = 'var(--longbreak-highlight)';
    shortbreak.style.backgroundColor = 'transparent';
    pomodoro.style.backgroundColor = 'transparent';
  }
};

let timerInterval;
let pomodoroCount = 0; // Tracks the number of completed Pomodoros in a cycle
toggleActiveClass(pomodoro);

// Start or Resume Timer
const startTimer = () => {
  if (timerObj.isStarted && !timerObj.isPaused) return;

  timerObj.isStarted = true;
  timerObj.isPaused = false;

  const futureTime = Date.now() + timerObj.remainingTime;

  timerInterval = setInterval(() => {
    const remainingTime = futureTime - Date.now();
    timerObj.remainingTime = remainingTime; // Update remaining time

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      timerObj.isStarted = false;
      timerObj.remainingTime = 0;
      timerDisplay.textContent = '00:00';

      // Handle auto-switch logic here
      if (timerObj.type === 'pomodoro') {
        pomodoroCount++; // Increment the pomodoro counter
        if (pomodoroCount % 4 === 0) {
          // After 4 Pomodoros, start a long break
          timerObj.type = 'longbreak';
          toggleActiveClass(longbreak);

          document.querySelector('body').style.backgroundColor =
            'var(--longbreak-dark)';
          document.querySelector('.container').style.backgroundColor =
            'var(--longbreak-light)';

          document.querySelector('.pause').style.backgroundColor =
            'var(--longbreak-dark)';
          document.querySelector('.start').style.backgroundColor =
            'var(--longbreak-dark)';
          document.querySelector('.reset').style.backgroundColor =
            'var(--longbreak-dark)';
        } else {
          // After a Pomodoro, start a short break
          toggleActiveClass(shortbreak);

          document.querySelector('body').style.backgroundColor =
            'var(--shortbreak-dark)';
          document.querySelector('.container').style.backgroundColor =
            'var(--shortbreak-light)';

          document.querySelector('.pause').style.backgroundColor =
            'var(--shortbreak-dark)';
          document.querySelector('.start').style.backgroundColor =
            'var(--shortbreak-dark)';
          document.querySelector('.reset').style.backgroundColor =
            'var(--shortbreak-dark)';

          timerObj.type = 'shortbreak';
        }
      } else {
        // After a break, always start a Pomodoro
        toggleActiveClass(pomodoro);
        timerObj.type = 'pomodoro';

        document.querySelector('body').style.backgroundColor =
          'var(--pomodoro-dark)';
        document.querySelector('.container').style.backgroundColor =
          'var(--pomodoro-light)';

        document.querySelector('.pause').style.backgroundColor =
          'var(--pomodoro-dark)';
        document.querySelector('.start').style.backgroundColor =
          'var(--pomodoro-dark)';
        document.querySelector('.reset').style.backgroundColor =
          'var(--pomodoro-dark)';
      }

      // Update timer duration and start the next timer
      updateTimerDuration();
      return;
    }

    const totalSeconds = Math.floor(remainingTime / 1000);
    const mm = Math.floor(totalSeconds / 60);
    const ss = totalSeconds % 60;

    // Update the timer display
    timerDisplay.textContent = `${String(mm).padStart(2, '0')}:${String(
      ss
    ).padStart(2, '0')}`;
  }, 1000);
};

// Pause Timer
const pauseTimer = () => {
  if (!timerObj.isStarted || timerObj.isPaused) return;

  clearInterval(timerInterval);
  timerObj.isPaused = true;
};

// Reset Timer
const resetTimer = () => {
  clearInterval(timerInterval);
  timerObj.isStarted = false;
  timerObj.isPaused = false;

  // Reset remaining time based on type
  switch (timerObj.type) {
    case 'pomodoro':
      timerObj.timer = 25 * 60 * 1000;
      break;
    case 'shortbreak':
      timerObj.timer = 5 * 60 * 1000;
      break;
    case 'longbreak':
      timerObj.timer = 15 * 60 * 1000;
      break;
  }
  timerObj.remainingTime = timerObj.timer;

  // Update display
  timerDisplay.textContent = `${String(timerObj.timer / 60000).padStart(
    2,
    '0'
  )}:00`;
};

// Update Timer Duration when Type Changes
const updateTimerDuration = () => {
  resetTimer(); // Reset the timer when the type changes
  startTimer();
};

// Event listeners for Start, Pause, and Reset
start.addEventListener('click', startTimer);
pause.addEventListener('click', pauseTimer);
reset.addEventListener('click', resetTimer);

// Event listeners for Timer Type Buttons
pomodoro.addEventListener('click', () => {
  toggleActiveClass(pomodoro);
  timerObj.type = 'pomodoro';

  document.querySelector('body').style.backgroundColor = 'var(--pomodoro-dark)';
  document.querySelector('.container').style.backgroundColor =
    'var(--pomodoro-light)';

  document.querySelector('.pause').style.backgroundColor =
    'var(--pomodoro-dark)';
  document.querySelector('.start').style.backgroundColor =
    'var(--pomodoro-dark)';
  document.querySelector('.reset').style.backgroundColor =
    'var(--pomodoro-dark)';

  updateTimerDuration();
});
shortbreak.addEventListener('click', () => {
  toggleActiveClass(shortbreak);
  timerObj.type = 'shortbreak';

  document.querySelector('body').style.backgroundColor =
    'var(--shortbreak-dark)';
  document.querySelector('.container').style.backgroundColor =
    'var(--shortbreak-light)';

  document.querySelector('.pause').style.backgroundColor =
    'var(--shortbreak-dark)';
  document.querySelector('.start').style.backgroundColor =
    'var(--shortbreak-dark)';
  document.querySelector('.reset').style.backgroundColor =
    'var(--shortbreak-dark)';
  updateTimerDuration();
});
longbreak.addEventListener('click', () => {
  toggleActiveClass(longbreak);
  timerObj.type = 'longbreak';

  document.querySelector('body').style.backgroundColor =
    'var(--longbreak-dark)';
  document.querySelector('.container').style.backgroundColor =
    'var(--longbreak-light)';

  document.querySelector('.pause').style.backgroundColor =
    'var(--longbreak-dark)';
  document.querySelector('.start').style.backgroundColor =
    'var(--longbreak-dark)';
  document.querySelector('.reset').style.backgroundColor =
    'var(--longbreak-dark)';

  updateTimerDuration();
});
