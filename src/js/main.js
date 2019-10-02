fetch(
  "https://sheets.googleapis.com/v4/spreadsheets/1sPa0L34LzYXX5i_qmIHw0WXMCkP-vfpHIRg1XbmhjG8/values/B:H?key=AIzaSyBcgKLrhDrhOC6Y0sZcDNuJ0ut_Sx_EkR8"
)
  .then(response => response.json())
  .then(data => getPoints(data))
  .catch(err => console.error(err));

function getPoints(response) {
  const huntName = document.querySelector("#hunt-name"),
    poinsCount = document.querySelector("#points-count"),
    form = document.querySelector("#form"),
    classIcon = document.querySelector(".hunters-card__img"),
    advice = document.querySelector(".hunters-advice"),
    adviceText = document.querySelector(".hunters-advice__descr"),
    debtors = document.querySelector(".debtors-list"),
    card = document.querySelector(".hunters-card__info");

  const huntersList = response.values;
  const huntersPoints = [];

  const icons = {
    воин: "./dist/img/class/0.png",
    маг: "./dist/img/class/1.png",
    шаман: "./dist/img/class/2.png",
    друид: "./dist/img/class/3.png",
    оборотень: "./dist/img/class/4.png",
    убийца: "./dist/img/class/5.png",
    лучник: "./dist/img/class/6.png",
    жрец: "./dist/img/class/7.png",
    страж: "./dist/img/class/8.png",
    мистик: "./dist/img/class/9.png",
    призрак: "./dist/img/class/10.png",
    жнец: "./dist/img/class/11.png",
    стрелок: "./dist/img/class/12.png",
    паладин: "./dist/img/class/13.png"
  };

  huntersList.forEach((item, i) => {
    if (i > 1 && i < 211 && item.length !== 0) {
      huntersPoints.push([item[0], item[1], item[6]]);
    }
  });

  form.addEventListener("submit", e => {
    e.preventDefault();

    let inputName = document
      .querySelector("#hunt-search")
      .value.replace(/\s/g, "");

    let member = huntersPoints.find(item => {
      let index = item[0].indexOf(inputName);
      if (index >= 0 && inputName !== "") {
        return item;
      }
    });
    if (member !== undefined) {
      card.style.display = "flex";
      animateCSS(card, "fadeInDown");
      huntName.textContent = member[0];
      classIcon.src = icons[member[1].replace(/\s/g, "")];
      poinsCount.textContent = member[2];

      let number = Number(member[2].replace(/\s/g, ""));
      if (number >= 10000) {
        advice.style.display = "block";
        advice.classList.remove("yellow");
        advice.classList.remove("red");
        advice.classList.add("green");
        animateCSS(advice, "fadeInUp");
        adviceText.innerHTML =
          "У вас много поинтов!<br> Пора их потратить на <a href ='https://hunters.sx/index.php?/forum/59-%D0%BA%D0%BB%D0%B0%D0%BD%D0%BE%D0%B2%D0%B0%D1%8F-%D0%BA%D0%BE%D0%BC%D0%BC%D0%B5%D1%80%D1%86%D0%B8%D1%8F/' target='_blank'>аукционе</a> или в <a href ='https://hunters.sx/index.php?/forum/522-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD-%D0%B3%D0%B8%D0%BB%D1%8C%D0%B4%D0%B8%D0%B8/' target='_blank'>магазине</a>!";
      } else if (number > 0) {
        advice.style.display = "block";
        advice.classList.remove("red");
        advice.classList.remove("green");
        advice.classList.add("yellow");
        animateCSS(advice, "fadeInUp");
        adviceText.innerHTML = `C вашей посещаемостью всё хорошо!`;
      } else if (number <= 0) {
        advice.style.display = "block";
        advice.classList.remove("yellow");
        advice.classList.remove("green");
        advice.classList.add("red");
        animateCSS(advice, "fadeInUp");
        let debt = -2000 * number;
        adviceText.innerHTML = `Необходимо поднять посещаемость!`;
        if (number <= -1) {
          adviceText.innerHTML = `Необходимо поднять посещаемость! <br> Ваша зажолжность составляет ${debt
            .toString()
            .replace(
              /(\d)(?=(\d\d\d)+([^\d]|$))/g,
              "$1 "
            )}&nbsp;юаней.<br> Задолженность нужно погасить в&nbsp;самое ближайшее время,<br> деньги выслать на ник kisk@`;
        }
      }
    } else {
      card.style.display = "none";
      advice.style.display = "block";
        advice.classList.remove("yellow");
        advice.classList.remove("green");
        advice.classList.add("red");
        animateCSS(advice, "fadeInUp");
        adviceText.innerHTML = `Вы ввели неверный ник`;
    }

    animateCSS(huntName, "fadeInLeft");
    animateCSS(classIcon, "flip");
    animateCSS(poinsCount, "fadeInRight");
  });

  let d = 0.3;
  huntersPoints.forEach(member => {
    let number = Number(member[2].replace(/\s/g, ""));
    let debt = -2000 * number;

    if (number <= -1) {
      const card = document.createElement("div");
      card.className = `debtors-card wow fadeInUp`;
      card.innerHTML = `
      <div class="debtors-card__name debtors-card__item wow">Ник: ${
        member[0]
      }</div>
            <div class="debtors-card__class debtors-card__item">Класс: ${member[1][0].toUpperCase() +
              member[1].slice(1)}</span></div>
            <div class="debtors-card__points debtors-card__item">Поинты: ${
              member[2]
            }</div>
            <div class="debtors-card__debt debtors-card__item">Задолжность:<br> ${debt
              .toString()
              .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ")} юаней</div>
            `;

      card.setAttribute("data-wow-delay", `${d}s`);
      d += 0.1;

      debtors.appendChild(card);
    }
  });
}

function animateCSS(element, animationName, callback) {
  const node = element;
  node.classList.add("animated", animationName);

  function handleAnimationEnd() {
    node.classList.remove("animated", animationName);
    node.removeEventListener("animationend", handleAnimationEnd);

    if (typeof callback === "function") callback();
  }

  node.addEventListener("animationend", handleAnimationEnd);
}
