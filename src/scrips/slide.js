// home

const slides = document.querySelector(".slider").children;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const indicator = document.querySelector(".indicator");
let index = 0;

prev.addEventListener("click", function () {
  prevSlide();
  updateCircleIndicator();
  resetTimer();
});

next.addEventListener("click", function () {
  nextSlide();
  updateCircleIndicator();
  resetTimer();
});

// create circle indicators
function circleIndicator() {
  for (let i = 0; i < slides.length; i++) {
    const div = document.createElement("div");
    div.innerHTML = i + 1;
    div.setAttribute("onclick", "indicateSlide(this)");
    div.id = i;
    if (i == 0) {
      div.className = "active";
    }
    indicator.appendChild(div);
  }
}
circleIndicator();

function indicateSlide(element) {
  index = element.id;
  changeSlide();
  updateCircleIndicator();
  resetTimer();
}

function updateCircleIndicator() {
  for (let i = 0; i < indicator.children.length; i++) {
    indicator.children[i].classList.remove("active");
  }
  indicator.children[index].classList.add("active");
}

function prevSlide() {
  if (index == 0) {
    index = slides.length - 1;
  } else {
    index--;
  }
  changeSlide();
}

function nextSlide() {
  if (index == slides.length - 1) {
    index = 0;
  } else {
    index++;
  }
  changeSlide();
}

function changeSlide() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  slides[index].classList.add("active");
}

function resetTimer() {
  // when click to indicator or controls button
  // stop timer
  clearInterval(timer);
  // then started again timer
  timer = setInterval(autoPlay, 8000);
}

function autoPlay() {
  nextSlide();
  updateCircleIndicator();
}

let timer = setInterval(autoPlay, 8000);

//  Services

const controls = document.querySelector(".content");
const container = document.querySelector(".thumbnail-container");
const allBox = container.children;
const containerWidth = container.offsetWidth;
const margin = 30;
var items = 0;
var totalItems = 0;
var jumpSlideWidth = 0;

// item setup per slide

responsive = [
  { breakPoint: { width: 0, item: 2 } }, //if width greater than 0 (1 item will show)
  { breakPoint: { width: 1200, item: 4 } },
];

function load() {
  for (let i = 0; i < responsive.length; i++) {
    if (window.innerWidth > responsive[i].breakPoint.width) {
      items = responsive[i].breakPoint.item;
    }
  }
  start();
}

let indexLi = 0;

function start() {
  var totalItemsWidth = 0;
  for (let i = 0; i < allBox.length; i++) {
    // width and margin setup of items
    allBox[i].style.width = containerWidth / items - margin + "px";
    allBox[i].style.margin = margin / 2 + "px";
    totalItemsWidth += containerWidth / items;
    totalItems++;
  }

  totalItems = totalItems * 2

  // thumbnail-container width set up
  container.style.width = totalItemsWidth + "px";

  // slides controls number set up
  const allSlides = Math.ceil(totalItems / items);
  const ul = document.createElement("ul");
  for (let i = 1; i <= allSlides; i++) {
    const li = document.createElement("li");
    li.id = i;
    li.innerHTML = i;
    li.setAttribute("onclick", "controlSlides(this)");
    ul.appendChild(li);
    indexLi++;
    if (i == 1) {
      li.className = "active";
    }
  }
  controls.appendChild(ul);


  
}



// when click on numbers slide to next slide
function controlSlides(ele) {
  // select controls children  'ul' element
  const ul = controls.children;

  // select ul children 'li' elements;
  const li = ul[0].children;

  var active;

  for (let i = 0; i < li.length; i++) {
    if (li[i].className == "active") {
      // find who is now active
      active = i;
      // remove active class from all 'li' elements
      li[i].className = "";
    }
  }
  // add active class to current slide
  ele.className = "active";

  var numb = ele.id - 1 - active;
  jumpSlideWidth = jumpSlideWidth + (containerWidth * numb)/2;
  container.style.marginLeft = -jumpSlideWidth + "px";
}

window.onload = load();

setTimeout(() => {
  let ul = document.querySelector(".thumbnail-slider .content ul");
  console.log({ ul });
  console.log({ indexLi });


  let liClicked = 0;

  setInterval(() => {
    ul.children[liClicked].click();
    liClicked++;
    if (liClicked == indexLi) {
      liClicked = 0;
    }
  }, 5000);


}, 2000);

