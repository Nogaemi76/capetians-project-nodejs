//ACTIVE NAV

const activenav = (element) => {
  let navli = document.getElementsByClassName("li_nav");
  for (let i = 0; i < navli.length; i++) {
    switch (element) {
      case "index":
        navli[0].style.backgroundColor = "#4285F4";
        break;
      case "hugues_capet":
        navli[1].style.backgroundColor = "#4285F4";
        break;
      case "louisix":
        navli[2].style.backgroundColor = "#4285F4";
        break;
      case "philippe_lebel":
        navli[3].style.backgroundColor = "#4285F4";
        break;
      case "philippe_auguste":
        navli[4].style.backgroundColor = "#4285F4";
        break;
      case "contact":
        navli[5].style.backgroundColor = "#4285F4";
        break;
    }
  }
}


//BURGER MENU

document.getElementById("menu_burger").onclick = function () {
    showBurger();
};
const showBurger = () => {
    var element = document.getElementById("menu_burger");
    element.classList.toggle("close");
    document.getElementById("aside_nav").classList.toggle("show");
}


//CLOCK

//add a zero when number is under ten
const checkTime = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

const myclock = () => {
  var today = new Date();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();
  h = checkTime(hours);
  m = checkTime(minutes);
  s = checkTime(seconds);
  document.getElementById('clock').innerHTML = h + "h " + m + "m " + s + "s";
  setTimeout(myclock, 500);

  if (minutes % 2 === 0) {
    document.getElementById('clock').classList.remove('clockOddColor');
  } else {
    document.getElementById('clock').classList.add('clockOddColor');
  };
}
myclock();


// AUTOMATIC SLIDER

var slideIndex = 0;
const showSlides = () => { 
    let slides = document.getElementsByClassName("slide");
    console.log(slides);
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { 
      slideIndex = 1 
    }
    console.log(slideIndex);
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}
showSlides();