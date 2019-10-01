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
    classIcon = document.querySelector(".hunters-card__img"),
    advice = document.querySelector(".hunters-advice"),
    adviceText = document.querySelector(".hunters-advice__descr");

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
    advice.style.display = "none";
    advice.classList.remove("green");
    advice.classList.remove("yellow");
    advice.classList.remove("orange");
    advice.classList.remove("red");
    adviceText.innerHTML = "";

    animateCSS(huntName, "fadeInLeft");
    animateCSS(classIcon, "flip");
    animateCSS(poinsCount, "fadeInRight");

    huntersMember.forEach((member, i) => {
      let index = member.indexOf(inputName);
      if (
        index >= 0 &&
        inputName !== ""
      ) {
        
        huntName.textContent = huntersPoints[i][0];
        huntClass.textContent = huntersPoints[i][1][0].toUpperCase() + huntersPoints[i][1].slice(1);
        classIcon.src = icons[huntersPoints[i][1].replace(/\s/g, '')];
        poinsCount.textContent = huntersPoints[i][2];

        let number = Number(huntersPoints[i][2].replace(/\s/g, ''));
        if(number >= 20000){
          advice.style.display = "block";
          advice.classList.remove("yellow");
          advice.classList.remove("orange");
          advice.classList.remove("red");
          advice.classList.add("green");
          animateCSS(advice, "fadeInDown");
          adviceText.innerHTML = "У вас много поинтов!<br> Пора их потратить на <a href ='https://hunters.sx/index.php?/forum/59-%D0%BA%D0%BB%D0%B0%D0%BD%D0%BE%D0%B2%D0%B0%D1%8F-%D0%BA%D0%BE%D0%BC%D0%BC%D0%B5%D1%80%D1%86%D0%B8%D1%8F/' target='_blank'>аукционе</a> или в <a href ='https://hunters.sx/index.php?/forum/522-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD-%D0%B3%D0%B8%D0%BB%D1%8C%D0%B4%D0%B8%D0%B8/' target='_blank'>магазине</a>!";
        }else if(number >= 0){
          advice.style.display = "block";
          advice.classList.remove("red");
          advice.classList.remove("orange");
          advice.classList.remove("green");
          advice.classList.add("yellow");
          let debt = -2000 * number;
          animateCSS(advice, "fadeInDown");
          adviceText.innerHTML = `C вашей посещаемостью всё хорошо!`;
        }else if(number <= -5000){
          advice.style.display = "block";
          advice.classList.remove("yellow");
          advice.classList.remove("orange");
          advice.classList.remove("green");
          advice.classList.add("red");
          animateCSS(advice, "fadeInDown");
          let debt = -2000 * number;
          adviceText.innerHTML = `Вы на грани кика из клана! <br> Ваша зажолжность составляет ${debt.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}&nbsp;юаней.<br> Задолженность нужно погасить в самое ближайшее время,<br> деньги выслать на ник kisk@`;
        }else if(number <= 0){
          advice.style.display = "block";
          advice.classList.remove("yellow");
          advice.classList.remove("green");
          advice.classList.remove("red");
          advice.classList.add("orange");
          animateCSS(advice, "fadeInDown");
          let debt = -2000 * number;
          adviceText.innerHTML = `Необходимо поднять посещаемость! <br> Ваша зажолжность составляет ${debt.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} юаней`;
        }
      } 
    });
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
