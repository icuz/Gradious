let intervalId;
let time = {
  days: 0,
  hours: 0,
  mins: 0,
  secs: 0
};

function setTimer() {
  clearInterval(intervalId);
  intervalId = null;
  time.days = parseInt(document.getElementById('daysIn').value);
  time.hours = parseInt(document.getElementById('hoursIn').value);
  time.mins = parseInt(document.getElementById('minsIn').value);
  time.secs =parseInt(document.getElementById('secsIn').value);
  displayTime();
}

function start() {
    if(!intervalId) {
        intervalId = setInterval(function() {
            if(time.secs > 0){
                time.secs--;
            } 
            else if(time.mins > 0) {
              time.mins--;
              time.secs = 59;
            }
            else if(time.hours > 0) {
              time.hours--;
              time.mins = 59;
              time.secs = 59;
            }
            else if(time.days > 0) {
              time.days--;
              time.hours = 23;
              time.mins = 59;
              time.secs = 59;
            }
            displayTime();
            if (time.days === 0 && time.hours === 0 && time.mins === 0 && time.secs === 0) {
              clearInterval(intervalId);
              intervalId = null;
              alert('Timer is complete!');
            }
          }, 1000);
    }
}

function stop() {
  clearInterval(intervalId);
  intervalId = null;
}

function reset() {
  stop();
  time = {
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0
  };
  displayTime();
}

function displayTime() {
    let totalSeconds = time.days * 24 * 60 * 60 + time.hours * 60 * 60 + time.mins * 60 + time.secs;
    time.days = Math.floor(totalSeconds / (24 * 60 * 60));
    totalSeconds %= (24 * 60 * 60);
    time.hours = Math.floor(totalSeconds / (60 * 60));
    totalSeconds %= (60 * 60);
    time.mins = Math.floor(totalSeconds / 60);
    time.secs = totalSeconds % 60;
    document.getElementById('days').textContent = pad(time.days);
    document.getElementById('hours').textContent = pad(time.hours);
    document.getElementById('mins').textContent = pad(time.mins);
    document.getElementById('secs').textContent = pad(time.secs);
}

function pad(number) {
  return number.toString().padStart(2, '0');
}

document.getElementById('setTimer').addEventListener('click', setTimer);
document.getElementById('start').addEventListener('click', start);
document.getElementById('stop').addEventListener('click', stop);
document.getElementById('reset').addEventListener('click', reset);