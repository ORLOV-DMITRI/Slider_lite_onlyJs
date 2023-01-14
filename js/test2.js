"use strict";
const BtnBack = document.querySelector(".slider-back");
const BtnNext = document.querySelector(".slider-next");


const srcSlide = [];
let offset = 0;

CopySrc();
Draw();

BtnNext.onclick = SlideLeft;
BtnBack.onclick = SlideRight;

//Перелистывает слайд в лево
function SlideLeft() {
  BtnNext.onclick = null;

  setTimeout(function () {
    TimerSlideNext();
  }, 100);
}
//............................
function SlideRight() {
  BtnBack.onclick = null;
  // step -= 1;
  setTimeout(function () {
    TimerSlideBack();
  }, 100);
}

//Создает изначально три слайда на страницу
function Draw() {
  CreateSlide();

}
//............................

//Создает клон последнего слайда  для случая переключения в обратную сторону
function CreateSlideClone() {
  let imgClone = document.createElement("img");
  imgClone.src = srcSlide[srcSlide.length - 1];
  imgClone.classList.add("slide-single");
  imgClone.classList.add("slide-clone");
  imgClone.style.left = -1 * 530 + "px";

  document
    .querySelector(".slider-track")
    .insertBefore(imgClone, document.querySelector(".slider-track").firstChild);
}
//............................

// function CreateSlideReverse() {
//   let img = document.createElement("img");
//   img.src = srcSlide[stepReverse];
//   console.log(stepReverse + 1 + " stepReverse");
//   img.classList.add("slide-single");
//   img.classList.add(`slide--${slideNumberReverse}`);
//   slideNumberReverse--;
//   if (slideNumberReverse < 1) {
//     slideNumberReverse = 10;
//   }
//   img.style.left = offset * -530 + "px";
//   document
//     .querySelector(".slider-track")
//     .insertBefore(img, document.querySelector(".slider-track").firstChild);
//   // document.querySelector(".slider-track").appendChild(img);
//   if (stepReverse - 1 == -1) {
//     stepReverse = 9;
//   } else {
//     stepReverse--;
//   }

//   offset = 1;
// }
//Функция создает слайд присваивает классы и нумерует и помещает в слайдер трак
function CreateSlide() {
  let img = document.createElement("img");
  img.src = srcSlide[0];

  img.classList.add("slide-single");
  img.classList.add(`slide--${1}`);
  img.style.left ="0px";
  document.querySelector(".slider-track").appendChild(img);
}
//............................

//Копирует путь к изображениям
function CopySrc() {
    let allSlidesImg = document.querySelectorAll(".slide-single");
  for (let j = 0; j < allSlidesImg.length; j++) {
    srcSlide[j] = allSlidesImg[j].src;
    allSlidesImg[j].remove();
  }
}
//............................

// Создает первый слайд, что бы он был всегда
// function CreateFirstSlide() {
//   let slidesAll = document.querySelectorAll(".slide-single");
//   if (slidesAll.length === 0) {
//     let firstImg = document.createElement("img");
//     firstImg.src = srcSlide[0];
//     firstImg.classList.add("slide-single");
//     firstImg.classList.add("slide--1");
//     firstImg.classList.add("slide--active");
//     firstImg.style.left = 0 + "px";
//     document.querySelector(".slider-track").appendChild(firstImg);
//   } else {
//     console.log("чмо");
//   }
// }
//............................

function TimerSlideBack() {
  let tempSlideHtml = document.querySelectorAll(".slide-single");
  let style = tempSlideHtml[0].className;
  let style1 = parseInt(style.match(/\d+/));

  switch (style1) {
    case 1:
      style1 = 9;
      break;
    case 10:
      style1 = 8;
      break;
    case 9:
      style1 = 7;
      break;
    case 8:
      style1 = 6;
      break;
    case 7:
      style1 = 5;
      break;
    case 6:
      style1 = 4;
      break;
    case 5:
      style1 = 3;
      break;
    case 4:
      style1 = 2;
      break;
    case 3:
      style1 = 1;
      break;
    case 2:
      style1 = 0;
      break;

    default:
      break;
  }

  CreateSlideReverseMini();

  //NodeList(2) [img.slide-single.slide--4, img.slide-single.slide--5]
  function CreateSlideReverseMini() {
    let img = document.createElement("img");
    img.src = srcSlide[style1];
    img.classList.add("slide-single");
    img.classList.add(`slide--${style1+1}`);

    img.style.left = offset * -530 + "px";
    document.querySelector(".slider-track").appendChild(img);
    // document
    //   .querySelector(".slider-track")
    //   .insertBefore(img, document.querySelector(".slider-track").firstChild);

    offset = 1;
  }
  let currentSlideInHtml = document.querySelectorAll(".slide-single");
  let currentPositionIndex1 = -530;
  let currentPositionIndex0 = 0;
  let stepPosition = 5;
  console.log(currentSlideInHtml, style1);
  let timer = setInterval(() => {
    currentSlideInHtml[0].style.left = `${currentPositionIndex0}px`;
    currentPositionIndex0 += stepPosition;

    currentSlideInHtml[1].style.left = `${currentPositionIndex1}px`;
    currentPositionIndex1 += stepPosition;

    if (currentPositionIndex1 === 5) {
      currentSlideInHtml[0].remove();
      //   CreateSlideReverse();
      clearInterval(timer);
      BtnBack.onclick = SlideRight;
    }
  }, 2);
}

//Монстр
function TimerSlideNext() {
  let tempSlideHtml = document.querySelectorAll(".slide-single");
  let style = tempSlideHtml[0].className;
  let style1 = parseInt(style.match(/\d+/));

  if (style1 === 10) {
    style1 = 0;
  }
  CreateSlideMini();

  function CreateSlideMini() {
    let img = document.createElement("img");
    // slideNumber = style1;
    // slideNumber += style1;
    img.src = srcSlide[style1];
    img.classList.add("slide-single");
    img.classList.add(`slide--${style1+1}`);
    // slideNumber++;
    // if (slideNumber > 10) {
    //   slideNumber = 1;
    // }
    img.style.left = offset * 530 + "px";
    document.querySelector(".slider-track").appendChild(img);

    offset = 1;
  }

  let currentSlideInHtml = document.querySelectorAll(".slide-single");

  let currentPositionIndex1 = 530;
  let currentPositionIndex0 = 0;
  let stepPosition = 5;
  console.log(currentSlideInHtml, style1);
  let timer = setInterval(() => {
    currentSlideInHtml[0].style.left = `${currentPositionIndex0}px`;
    currentPositionIndex0 -= stepPosition;

    currentSlideInHtml[1].style.left = `${currentPositionIndex1}px`;
    currentPositionIndex1 -= stepPosition;

    if (currentPositionIndex1 === -5) {
      currentSlideInHtml[0].remove();
      clearInterval(timer);
      BtnNext.onclick = SlideLeft;
    }
  }, 3);
}
//............................
