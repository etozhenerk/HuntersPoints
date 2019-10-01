fetch(
  "https://sheets.googleapis.com/v4/spreadsheets/1sPa0L34LzYXX5i_qmIHw0WXMCkP-vfpHIRg1XbmhjG8/values/B:H?key=AIzaSyBcgKLrhDrhOC6Y0sZcDNuJ0ut_Sx_EkR8"
)
  .then(response => response.json())
  .then(data => getPoints(data))
  .catch(err => console.error(err));

function getPoints(response) {
  const huntName = document.querySelector("#hunt-name"),
    poinsCount = document.querySelector("#points-count"),
    huntClass = document.querySelector("#hunt-class"),
    form = document.querySelector("#form"),
    classIcon = document.querySelector(".hunters-card__img");

  const huntersList = response.values;
  const huntersMember = [];
  const huntersPoints = [];

  const icons = {
    воин: "./img/class/0.png",
    маг: "./img/class/1.png",
    шаман: "./img/class/2.png",
    друид: "./img/class/3.png",
    оборотень: "./img/class/4.png",
    убийца: "./img/class/5.png",
    лучник: "./img/class/6.png",
    жрец: "./img/class/7.png",
    страж: "./img/class/8.png",
    мистик: "./img/class/9.png",
    призрак: "./img/class/10.png",
    жнец: "./img/class/11.png",
    стрелок: "./img/class/12.png",
    паладин: "./img/class/13.png"
  };

  huntersList.forEach((item, i) => {
    if (i > 1 && i < 211) {
      huntersMember.push(item[0]);
      huntersPoints.push([item[0], item[1], item[6]]);
    }
  });

  form.addEventListener("submit", e => {
    e.preventDefault();

    let inputName = document.querySelector("#hunt-search").value;
    huntName.textContent = "Вы ввели неверное имя";
    poinsCount.textContent = "0";
    huntClass.textContent = "Класс игрока";
    classIcon.src = icons["воин"];

    animateCSS(huntName, "fadeInLeft");
    animateCSS(classIcon, "flip");
    animateCSS(poinsCount, "fadeInRight");

    huntersMember.forEach((member, i) => {
      if (
        inputName.toLowerCase() === member.toLowerCase() &&
        inputName !== ""
      ) {
        huntName.textContent = huntersPoints[i][0];
        huntClass.textContent = huntersPoints[i][1];
        classIcon.src = icons[huntersPoints[i][1]];
        poinsCount.textContent = huntersPoints[i][2];
      }
    });
  });
  huntName.classList.remove("animated", "fadeInLeft");
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
