const pomodoro = document.querySelector('.pomodoro');
const shortbreak = document.querySelector('.shortBreak');
const longbreak = document.querySelector('.longBreak');

const bdy = document.querySelector('body');
const cont = document.querySelector('.container');
const btns = document.querySelectorAll('.btn');
const act = document.querySelector('.active');

const strt = document.querySelector('.start');
strt.addEventListener('click', () => {});

const timerTypes = [pomodoro, shortbreak, longbreak];

changeColorTheme();

timerTypes.forEach((element) => {
  element.addEventListener('click', () => {
    removeActiveClass();
    element.classList.add('active');
    changeColorTheme();
  });
});

function removeActiveClass() {
  timerTypes.forEach((el) => {
    el.classList.remove('active');
  });
}

function changeColorTheme() {
  timerTypes.forEach((el) => {
    if (el.classList.contains('active')) {
      if (el.classList.contains('pomodoro')) {
        bdy.style.backgroundColor = 'var(--pomodoro-dark)';
        btns.forEach((elm) => {
          elm.style.backgroundColor = 'var(--pomodoro-light)';
        });

        const ac = document.querySelector('.active');
        ac.style.backgroundColor = 'var(--pomodoro-highlight)';
        cont.style.backgroundColor = 'var(--pomodoro-light)';
      } else if (el.classList.contains('shortBreak')) {
        bdy.style.backgroundColor = 'var(--shortbreak-dark)';
        btns.forEach((elm) => {
          elm.style.backgroundColor = 'var(--shortbreak-light)';
        });
        const ac = document.querySelector('.active');
        ac.style.backgroundColor = 'var(--shortbreak-highlight)';
        cont.style.backgroundColor = 'var(--shortbreak-light)';
      } else if (el.classList.contains('longBreak')) {
        bdy.style.backgroundColor = 'var(--longbreak-dark)';
        btns.forEach((elm) => {
          elm.style.backgroundColor = 'var(--longbreak-light)';
        });
        const ac = document.querySelector('.active');
        ac.style.backgroundColor = 'var(--longbreak-highlight)';
        cont.style.backgroundColor = 'var(--longbreak-light)';
      }
    }
  });
}

function updateTimer() {}
