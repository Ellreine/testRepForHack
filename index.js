const windowPosition = {
  top: window.pageYOffset,
  left: window.pageXOffset,
  right: window.pageXOffset + document.documentElement.clientWidth,
  bottom: window.pageYOffset + document.documentElement.clientHeight,
};
const body = document.querySelector("body");
const shoots = document.querySelector(".shoots-text");
const hits = document.querySelector(".hits-text");
const formTimer = document.querySelector(".form-timer");
let clickCounter = 0;
let scoreAirplane = 0;

window.addEventListener("click", function () {
  clickCounter = clickCounter + 1;
  shoots.innerHTML = `${clickCounter}`;
});

// Рандомное число (взято с MDN)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Cоздание самолета
function createAirplane() {
  // Create Airplane
  const airplane = document.createElement("div");
  airplane.className = "airplane";
  airplane.style.backgroundImage = "url(./airplane.png)";

  const size = getRandomArbitrary(100, 200);
  airplane.style.position = "absolute";
  airplane.style.height = size / 4 + "px";
  airplane.style.width = size + "px";
  body.append(airplane);

  //   Параметры начального положения
  let startX = getRandomArbitrary(-70, -100);
  airplane.style.transform = `translateX(${startX}px)`;
  airplane.style.top = getRandomArbitrary(0, 75) + "%";

  //   изменение скорости
  const speed = getRandomArbitrary(6, 10);
  const interval = setInterval(function () {
    startX = startX + speed;
    const currentAirplaneX = airplane.getBoundingClientRect();

    if (currentAirplaneX.x <= windowPosition.right * 0.95) {
      airplane.style.transform = `translate(${startX}px)`; // <----- Проверка выхода за экран
    } else {
      airplane.remove();
      clearInterval(interval);
    }
  }, 25);

  //   Прослушивание на попадание по самолету
  airplane.addEventListener("click", function () {
    const positionAriplane = this.getBoundingClientRect();
    airplane.remove();
    createBang(size, positionAriplane);
    scoreAirplane += 1;
    hits.innerHTML = `${scoreAirplane}`;
  });
}

// Создание взрыва
function createBang(sizeAirplane, posAir) {
  // Create bang
  const bang = document.createElement("img");
  bang.classList = "bang none-select";
  bang.src = "./bang2.png";
  const sizeBang = sizeAirplane * 1.1;
  bang.style.height = sizeBang + "px";
  bang.style.width = sizeBang + "px";
  body.append(bang);

  // Параметры положения
  bang.style.left = posAir.x + "px";
  bang.style.top = posAir.y - 50 + "px";

  this.setTimeout(function () {
    bang.remove();
  }, 1000);
}

// Отправка формы

formTimer.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("Отправка!");

  const time = formTimer.elements.time.value;
  console.log(time);

  formTimer.className = "hidden";
  startTimer(time);

  const timeForClick = setInterval(() => {
    createAirplane();
    setTimeout(() => {
      clearInterval(timeForClick);
    }, time * 1000);
  }, getRandomArbitrary(300, 700));
});

// Таймер
function startTimer(time) {
  const timerElement = document.querySelector(".section-timer__text");
  let second = time;
  timerElement.innerHTML = `${second}`;

  timerInterval = setInterval(() => {
    second = second - 1;
    timerElement.innerHTML = `${second}`;

    if (second === -1) {
      clearInterval(timerInterval);
      timerElement.innerHTML = ``;

      let airplaneElement = document.querySelectorAll(".airplane"); // <---- удаление самолетов
      airplaneElement.forEach((e) => {
        const pos = e.getBoundingClientRect();
        e.remove();
        createBang(100, pos);
      });

      // Вывеска в центре экрана
      const finishGame = document.createElement("div");
      const pElement = document.createElement("p");
      finishGame.className = "finish-game";
      pElement.innerHTML = "Time is over! :3";
      finishGame.append(pElement);
      body.append(finishGame);
    }
  }, 1000);
}
