fetch(
  "https://sheets.googleapis.com/v4/spreadsheets/1sPa0L34LzYXX5i_qmIHw0WXMCkP-vfpHIRg1XbmhjG8/values/B:H?key=AIzaSyBcgKLrhDrhOC6Y0sZcDNuJ0ut_Sx_EkR8"
)
  .then(response => response.json())
  .then(data => getPoints(data))
  .catch(err => console.error(err));

function getPoints(response) {
  const huntName = document.querySelector("#hunt-name"),
    poinsCount = document.querySelector("#points-count"),
    form = document.querySelector("#form");

  const huntersList = response.values;
  const huntersMember = [];
  const huntersPoints = [];

  huntersList.forEach(item => {
    huntersMember.push(item[0]);
    huntersPoints.push(item[6]);
  });

  form.addEventListener("submit", e => {
    e.preventDefault();

    let inputName = document.querySelector("#hunt-search").value;
    huntName.textContent = "Вы ввели неверное имя";
    poinsCount.textContent = "0";

    huntersMember.forEach((member, i) =>{
      if(inputName === member){
        huntName.textContent = inputName;
        poinsCount.textContent = huntersPoints[i];
      }
    });
  });
  console.log(huntersMember);
  console.log(huntersPoints);
}
