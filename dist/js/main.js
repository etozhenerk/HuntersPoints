!function(e){var t={};function s(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t){function s(e,t,s){const n=e;n.classList.add("animated",t),n.addEventListener("animationend",(function e(){n.classList.remove("animated",t),n.removeEventListener("animationend",e),"function"==typeof s&&s()}))}fetch("https://sheets.googleapis.com/v4/spreadsheets/1nNBcBNmY91B_M6488peXdlLAoyAAKoOFBhzOs4wXX6c/values/B:H?key=AIzaSyBcgKLrhDrhOC6Y0sZcDNuJ0ut_Sx_EkR8").then(e=>{if(e.ok)return e.json();throw new Error("Данные не были получены , ошибка:"+e.status)}).then(e=>(function(e){const t=document.querySelector("#hunt-name"),n=document.querySelector("#points-count"),r=document.querySelector("#form"),i=document.querySelector(".hunters-card__img"),a=document.querySelector(".hunters-advice"),d=document.querySelector(".hunters-advice__descr"),o=document.querySelector(".debtors-list"),l=document.querySelector(".hunters-card__info"),c=e.values,u=[],p={"воин":"./dist/img/class/0.png","маг":"./dist/img/class/1.png","шаман":"./dist/img/class/2.png","друид":"./dist/img/class/3.png","оборотень":"./dist/img/class/4.png","убийца":"./dist/img/class/5.png","лучник":"./dist/img/class/6.png","жрец":"./dist/img/class/7.png","страж":"./dist/img/class/8.png","мистик":"./dist/img/class/9.png","призрак":"./dist/img/class/10.png","жнец":"./dist/img/class/11.png","стрелок":"./dist/img/class/12.png","паладин":"./dist/img/class/13.png"};c.forEach((e,t)=>{t>1&&t<211&&0!==e.length&&"вышел"!==e[2]&&"твинк"!==e[2]&&u.push([e[0],e[1],e[6]])}),u.sort(),r.addEventListener("submit",e=>{e.preventDefault();let r=document.querySelector("#hunt-search").value.replace(/\s/g,""),o=u.find(e=>{if(e[0].indexOf(r)>=0&&""!==r)return e});if(void 0!==o){l.style.display="flex",s(l,"fadeInDown"),t.textContent=o[0],i.src=p[o[1].replace(/\s/g,"")],n.textContent=o[2];let e=Number(o[2].replace(/\s/g,""));if(e>=1e4)a.style.display="block",a.classList.remove("yellow"),a.classList.remove("red"),a.classList.add("green"),s(a,"fadeInUp"),d.innerHTML="У вас много поинтов!<br> Пора их потратить на <a href ='https://hunters.sx/index.php?/forum/59-%D0%BA%D0%BB%D0%B0%D0%BD%D0%BE%D0%B2%D0%B0%D1%8F-%D0%BA%D0%BE%D0%BC%D0%BC%D0%B5%D1%80%D1%86%D0%B8%D1%8F/' target='_blank'>аукционе</a> или в <a href ='https://hunters.sx/index.php?/forum/522-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD-%D0%B3%D0%B8%D0%BB%D1%8C%D0%B4%D0%B8%D0%B8/' target='_blank'>магазине</a>!";else if(e>0)a.style.display="block",a.classList.remove("red"),a.classList.remove("green"),a.classList.add("yellow"),s(a,"fadeInUp"),d.innerHTML="C вашей посещаемостью всё хорошо!";else if(e<=0){a.style.display="block",a.classList.remove("yellow"),a.classList.remove("green"),a.classList.add("red"),s(a,"fadeInUp");let t=-2e3*e;d.innerHTML="Необходимо поднять посещаемость!",e<=-1&&(d.innerHTML=`Необходимо поднять посещаемость! <br> Ваша зажолжность составляет ${t.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ")}&nbsp;юаней.<br> Задолженность нужно погасить в&nbsp;самое ближайшее время,<br> деньги выслать на ник kisk@`)}}else l.style.display="none",a.style.display="block",a.classList.remove("yellow"),a.classList.remove("green"),a.classList.add("red"),s(a,"fadeInUp"),d.innerHTML="Вы ввели неверный ник";s(t,"fadeInLeft"),s(i,"flip"),s(n,"fadeInRight")});let f=.3;u.forEach(e=>{let t=Number(e[2].replace(/\s/g,"")),s=-2e3*t;if(t<=-1){const t=document.createElement("div");t.className="debtors-card wow fadeInUp",t.innerHTML=`\n      <div class="debtors-card__name debtors-card__item wow">Ник: ${e[0]}</div>\n            <div class="debtors-card__class debtors-card__item">Класс: ${e[1][0].toUpperCase()+e[1].slice(1)}</span></div>\n            <div class="debtors-card__points debtors-card__item">Поинты: ${e[2]}</div>\n            <div class="debtors-card__debt debtors-card__item">Задолжность:<br> ${s.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ")} юаней</div>\n            `,t.setAttribute("data-wow-delay",`${f}s`),f+=.1,o.appendChild(t)}})})(e)).catch(e=>console.warn(e))}]);
