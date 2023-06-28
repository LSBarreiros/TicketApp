const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

/***************************************/
/***********  FORM 1******************/
/*************************************** */

//validation du premier form

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const telephone = document.getElementById("telephone");

function isForm1Valid() {
  
  if (fullName.value !== "" && email.value !== "" && telephone.value !== "") {
    return true;
  } else {
    return false;
  }
}

//changement de form
nextBtnFirst.addEventListener("click", function (event) {
  if (isForm1Valid() === true) {
    event.preventDefault();
    slidePage.style.marginLeft = "-25%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
  } else {

    //show errors
  }
});

/***************************************/
/*********** FORM 2 ******************/
/*************************************** */

const direction = document.getElementById("direction");
const tripStart = document.getElementById("tripStart");
const roundTrip = document.getElementById("roundTrip");
const tripEnd = document.getElementById("tripEnd");
const tripEndFs = document.getElementById("tripEndFs");

//check box avec element checked 
roundTrip.addEventListener("click", function () {
  if (roundTrip.checked) {
    tripEndFs.classList.remove("invisible");
  } else {
    tripEndFs.classList.add("invisible");
  }
});

function isForm2Valid() {
  
  if (roundTrip.checked) {
    if (tripStart.value !== "" && tripEnd.value !== "") {
      return true;
    } else {
      return false;
    }
  } else {
    if (tripStart.value !== "") {
      return true;
    } else {
      return false;
    }
  }
}

nextBtnSec.addEventListener("click", function (event) {
  if (isForm2Valid() === true) {
    event.preventDefault();
    slidePage.style.marginLeft = "-50%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
  }
});

/***************************************/
/*********** FORM 3 ******************/
/*************************************** */

const selecteurBillet = document.querySelector("[name='selection-billet']");
const gabaritSelecteurBillet = document.getElementById("field_radio");
const listeBillets = document.getElementById("listeBillets");

let nbBillet = 0;

selecteurBillet.addEventListener("change", function () {
  nbBillet = this.value;

  //on vide la div avant de la remplir
  listeBillets.replaceChildren();

  for (let i = 0; i < nbBillet; i++) {
    let clone = gabaritSelecteurBillet.cloneNode(true);     //cloneNode(true)n pour avoir tous les enfants clonees, ça veut dire la div + ses enfants(les boutons radio.)
    let cloneRadio = clone.querySelectorAll("input");
    clone.classList.remove("invisible");
      for (let j = 0; j < cloneRadio.length; j++) {
        let name = cloneRadio[j].getAttribute("name");
        console.log(name);
        cloneRadio[j].setAttribute("name", name + i);
      }
      listeBillets.appendChild(clone); // on ajoute le clone dans le div qu'on avait reserve pour ça à la page html!!
  }  
});


/***************************************/
/*********** resultat ******************/
/****************************************/


nextBtnThird.addEventListener("click", function (event) {
  showResults();
  event.preventDefault();
  slidePage.style.marginLeft = "-75%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
let userListeBillets;


function showResults() {
  //User
  document.getElementById("userName").textContent = fullName.value;
  document.getElementById("userEmail").textContent = email.value;
  document.getElementById("userTel").textContent = telephone.value;
  //Direction
  document.getElementById("userDestination").textContent =
    direction.options[direction.selectedIndex].text;
  document.getElementById("userAller").textContent = tripStart.value;
  document.getElementById("userRetour").textContent = tripEnd.value;


  //Total
  let userListeBillets = document.getElementById("userListeBillets");
  let subTotal = 0;

  for (let i = 0; i < nbBillet; i++) {
    
    let rabais = document.querySelector( 'input[name="billet-rabais' + i + '"]:checked').value;

    let rabaisNb = getDiscount(rabais);
    let ticketPrice = getTicketPrice( direction.options[direction.selectedIndex].value);

    let tag = document.createElement("p");
    let ticketPriceDiscount = ticketPrice - (ticketPrice * rabaisNb) / 100;
    let text = document.createTextNode(
      "Billet " + (i + 1) + ": " + rabais + "----" + ticketPriceDiscount + "$"
    );
    subTotal = subTotal + ticketPriceDiscount;
    tag.appendChild(text);
    userListeBillets.appendChild(tag);
  }
  const tps = .05;
  const tvq = .0997;

  document.getElementById("subTotal").textContent = subTotal;
  document.getElementById("tps").textContent =  (subTotal * tps).toFixed(2);
  document.getElementById("tvq").textContent = (subTotal * tvq).toFixed(2);
  document.getElementById("total").textContent = (subTotal + (subTotal * (tps + tvq))).toFixed(2);
}

function getTicketPrice(destination) {
  let isRoundTrip = document.getElementById("roundTrip").checked;
  if (destination === "qc") {
    if (isRoundTrip) {
      return 100;
    } else {
      return 60;
    }
  }
  if (destination === "sb") {
    if (isRoundTrip) {
      return 70;
    } else {
      return 40;
    }
  }
  if (destination === "rn") {
    if (isRoundTrip) {
      return 200;
    } else {
      return 120;
    }
  }
}
function getDiscount(discount) {
  if (discount === "regulier") {
    return 0;
  }
  if (discount === "etudiant") {
    return 15;
  }
  if (discount === "senior") {
    return 20;
  }
  if (discount === "elite") {
    return 25;
  }
}

submitBtn.addEventListener("click", function () {
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
  setTimeout(function () {
    alert("Your Form Successfully Signed up");
    location.reload();
  }, 800);
});
prevBtnSec.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "0%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnThird.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-25%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnFourth.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-50%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
