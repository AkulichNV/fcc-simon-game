const audioC = new Audio();
let gameOn = false;
let gamePlay = false;
let error = false;
let strict = false;
const arrId = ['g', 'r', 'y', 'b'];
let strGame = '';
let strPlayer = '';
let count = 0;
let timeout = 0;
let time1;
let time2;
let errorTime;
let compareTime;
let timeout1 = 400;
let timeout2 = 800;

const buttons = document.getElementsByClassName('circle');
const buttonOnOff = document.getElementById('off');
const buttonPlay = document.getElementById('play');
const displayCount = document.getElementById('screen');
const countId = document.getElementById('count');
const buttonStrict = document.getElementById('strict');

function PowerOnOff() {
  if (!gameOn) {
    buttonOnOff.style.backgroundColor = 'tomato'; 
    buttonPlay.setAttribute('style', 'background-color: mediumseagreen;background-image: url("./assets/icons/play.png");background-repeat: no-repeat;cursor: pointer;');
    displayCount.style.backgroundColor = 'dodgerblue';
    // buttonStrict.style.backgroundColor = 'khaki';
    buttonStrict.setAttribute('style', 'background-color: khaki;background-image: url("./assets/icons/strict.png");background-repeat: no-repeat;cursor: pointer;');

    countId.innerHTML = '--';
    gameOn = true;
  } else {
    clearTimeout(time1);
    clearTimeout(time2);
    clearTimeout(errorTime);
    clearTimeout(compareTime);
    buttonOnOff.style.backgroundColor = 'white'; 
    buttonPlay.setAttribute('style', 'background-color: white;background-image: none;cursor: default;');
    displayCount.style.backgroundColor = 'white';
    // buttonStrict.style.backgroundColor = 'white';
    buttonStrict.setAttribute('style', 'background-color: white;background-image: none;cursor: default;');
    countId.innerHTML = '';
    strGame = '';
    strPlayer = '';
    count = 0;
    timeout = 3000;
    timeout1 = 400;
    timeout2 = 800;
    gameOn = false;
    gamePlay = false;
    error = false;
    strict = false;
  }
}

function PlayOn() {
  if (gameOn) {
    if (!gamePlay) {
      gamePlay = true;
      count = 1;
      countId.innerHTML = count;
      PlayLoop();
    } else {
      count = 1;
      countId.innerHTML = count;
      strGame = '';
      clearTimeout(time1);
      clearTimeout(time2);
      clearTimeout(errorTime);
      clearTimeout(compareTime);
      compareTime = window.setTimeout(PlayLoop, 1000);
    }
  }
}

function PlayLoop() {
  if (gamePlay) {
    if (!error) {
      RandomCol(); 
    }
    countId.innerHTML = count;
    error = false;
    strPlayer = ''; 
    PlayGame(strGame);
    timeout = timeout1 + 10000;
    errorTime = window.setTimeout(Error, timeout);
  }
}

function ColorSoundOn(id, click) {
  if (gamePlay) {
    const colId = id;
    const colorBlock = document.getElementById(colId);  
    if (colId === 'g') {
      colorBlock.style.background = 'mediumseagreen';
      audioC.src = 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';
    } else if (colId === 'r') {
      colorBlock.style.background = 'tomato';
      audioC.src = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3';
    } else if (colId === 'y') {
      colorBlock.style.background = 'khaki';
      audioC.src = 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';
    } else if (colId === 'b') {
      colorBlock.style.background = 'dodgerblue';
      audioC.src = 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';
    }
    audioC.autoplay = true;
    if (click === 1) {
      strPlayer += colId;
      clearTimeout(errorTime);
      Compare(strGame, strPlayer);
    }
  }
}

function ColorSoundOff(id) {
  const colId = id;
  const colorBlock = document.getElementById(colId);
  if (colId === 'g') {
    colorBlock.style.background = 'green';
  } else if (colId === 'r') {
    colorBlock.style.background = 'red';
  } else if (colId === 'y') {
    colorBlock.style.background = 'yellow';
  } else if (colId === 'b') {
    colorBlock.style.background = 'blue';
  }
}

function RandomCol() {
  const randomId = Math.floor(Math.random() * arrId.length);
  const id = arrId[randomId];
  strGame += id;
}

function PlayGame(str) {
  let arrGame = [];
  arrGame = str.split('');
  timeout1 = 400;
  timeout2 = 800;
  for (let i = 0; i < arrGame.length; i++) {
    time1 = window.setTimeout(((n) => () => ColorSoundOn(arrGame[n], 0))(i), timeout1);
    time2 = window.setTimeout(((n) => () => ColorSoundOff(arrGame[n]))(i), timeout2);
    timeout1 += 700;
    timeout2 += 700;
  }
}
function Compare(str1, str2) {
  if (gamePlay) {
    const s = str1.slice(0, str2.length);
    if (s !== str2) {
      Error();
    }
    if (str1 === str2) {
      if (count < 20) {
        count++;
        window.setTimeout(() => { countId.innerHTML = count; }, 1000);
        compareTime = window.setTimeout(PlayLoop, 1000);
      } else {
        countId.innerHTML = 'win';
        count = 1;
        strGame = '';
        compareTime = window.setTimeout(PlayLoop, 1000);
      }
    }
  }
}

function Error() {
  if (!strict) {
    countId.innerHTML = '!!';
    error = true;
    compareTime = window.setTimeout(PlayLoop, 1000);
  } else {
    countId.innerHTML = '!!';
    count = 1;
    strGame = '';
    compareTime = window.setTimeout(PlayLoop, 1000);
  }
}

function Strict() {
  if (!strict) {
    strict = true;
    buttonStrict.style.backgroundColor = 'yellow';
  } else {
    strict = false;
    buttonStrict.style.backgroundColor = 'khaki';
  }
}