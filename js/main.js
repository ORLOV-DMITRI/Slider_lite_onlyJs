"use strict";
const BtnBack = document.querySelector(".slider-back");
const BtnNext = document.querySelector(".slider-next");
const SelectCountSlider = document.querySelector(".select-number");
const DotsList = document.querySelector(".dots-check");
const ActiveDots = document.querySelector(".dot-activ");
const srcSlide = [];
let classNumber = 0;
let newSrc = [];
let offset = 0;
let countSlide = 1;
let speedAnimation = 1;
let stepStop = 5;
let currentSliderCount = [];
let dotNumber = 1;

CopySrc();
CreateSlide();
ReloadSlider();
BtnNext.onclick = SlideNext;
BtnBack.onclick = SlideBack;
SelectCountSlider.onchange = ReloadSlider;

// (length-end+start>end-start+1)

DotsList.onclick = (event) => {
  Dots(event);
};

function Dots(event) {
  DotsList.classList.add("dots-event-non");
  if (event.target.classList.contains("dot-activ")) return;
  if (!event.target.classList.contains("btn-check")) return;

  let tapDotsClass = event.target.className;
  let tapDotsNum = parseInt(tapDotsClass.match(/\d+/));
  console.log(tapDotsNum + "На которую нажал");
  let x = 0;
  let alldots = document.querySelectorAll(".dots-check");
  let activ = document.querySelector(".dot-activ").className;
  let activNum = parseInt(activ.match(/\d+/));

  if (tapDotsNum > activNum) {
    let timer = setInterval(() => {
      SlideNext();
      let activ = document.querySelector(".dot-activ").className;
      let activNum = parseInt(activ.match(/\d+/));
      console.log(activNum + 1 + "там где класс активный");
      if (activNum + 1 === tapDotsNum) {
        clearInterval(timer);
        DotsList.classList.remove("dots-event-non");
      }
    }, 1000);
  } else if (tapDotsNum < activNum) {
    let timer = setInterval(() => {
      SlideBack();
      let activ = document.querySelector(".dot-activ").className;
      let activNum = parseInt(activ.match(/\d+/));
      console.log(activNum + 1 + "там где класс активный");
      if (activNum - 1 === tapDotsNum) {
        clearInterval(timer);
        DotsList.classList.remove("dots-event-non");
      }
    }, 1000);
    console.log(tapDotsNum - activNum);
  }
}

//Оценивает текущие положение активного слайда и делает активной нужную точку
function RenderDots() {
  setTimeout(() => {
    let tempSlideHtml = document.querySelectorAll(".slide-single");
    let tempClassName = tempSlideHtml[1].className;
    classNumber = parseInt(tempClassName.match(/\d+/));
    let curDot = document.querySelector(`.dot--${classNumber}`);
    curDot.classList.add("dot-activ");
    let allDots = document.querySelectorAll(".btn-check");
    for (let i = 0; i < allDots.length; i++) {
      if (i == classNumber - 1) {
        continue;
      } else {
        allDots[i].classList.remove("dot-activ");
      }
    }
  }, 300);
}
//..........................
//Сбрасывает количество слайдеров
function ReloadSlider() {
  document.querySelector(".slide-single").remove();
  CreateSlide();
  classNumber = 0;
  GetCurrentSliderCount();
  AddDots();
}
function GetCurrentSliderCount() {
  countSlide = Number(SelectCountSlider.value);
  GetCountSlide(countSlide);
  newSrc = [];
  for (let i = 0; i < countSlide; i++) {
    newSrc[i] = srcSlide[i];
  }
}
function GetCountSlide(countSlide) {
  currentSliderCount = [];
  for (let i = 0; i < countSlide - 1; i++) {
    currentSliderCount.push(i);
  }
  currentSliderCount.unshift(countSlide - 1);
  currentSliderCount.unshift("");
}
//............................
//Создание и добавление точек под слайдер
function AddDots() {
  let dots = document.querySelectorAll(".btn-check");
  for (let j = 0; j < dots.length; j++) {
    dots[j].remove();
  }
  for (let i = 0; i < countSlide; i++) {
    CreateDots(i + 1);
  }
}
function CreateDots(num) {
  let dot = document.createElement("div");
  dot.classList.add("btn-check");
  dot.classList.add(`dot--${num}`);
  if (num === 1) {
    dot.classList.add("dot-activ");
  }
  dot.textContent = num;
  // dot.textContent = num;
  DotsList.appendChild(dot);
}
//....................................
//Копирует путь к изображениям
function CopySrc() {
  let allSlidesImg = document.querySelectorAll(".slide-single");
  for (let j = 0; j < allSlidesImg.length; j++) {
    srcSlide[j] = allSlidesImg[j].src;
    allSlidesImg[j].remove();
  }
}
//............................

//Функция создает первый слайд и нумерует - 1, что бы от него отталкиваться
function CreateSlide() {
  let img = document.createElement("img");
  img.src = srcSlide[0];

  img.classList.add("slide-single");
  img.classList.add(`slide--${1}`);
  img.style.left = "0px";
  document.querySelector(".slider-track").appendChild(img);
}
//............................

//Перелистывает слайд в лево
function SlideNext() {
  BtnBack.onclick = null;
  BtnNext.onclick = null;
  setTimeout(function () {
    TimerSlideNext();
    RenderDots();
  }, 100);
}
//............................

//Перелистывает слайд в право
function SlideBack() {
  BtnBack.onclick = null;
  BtnNext.onclick = null;

  setTimeout(function () {
    TimerSlideBack();
    RenderDots();
  }, 100);
}
//............................

//Создает следующий слайд на основе предидущего
function TimerSlideNext() {
  CreateSlideGeneric(GetClassNumberGeneric("next"), 530);
  GetOffsetAnimationGeneric(-stepStop, 530, -stepStop, speedAnimation);
  //Если назад то stepPosition = 5, currentPositionIndex1 = -530; stopIntervalPosition = 5;
  //Если вперед то stepPosition = -5, currentPositionIndex1 = 530; stopIntervalPosition = -5;
}

//Создает следующий слайд на основе предидущего в обратном направлении
function TimerSlideBack() {
  CreateSlideGeneric(GetClassNumberGeneric("back"), -530);
  GetOffsetAnimationGeneric(stepStop, -530, stepStop, speedAnimation);
  //Если назад то stepPosition = 5, currentPositionIndex1 = -530; stopIntervalPosition = 5;
  //Если вперед то stepPosition = -5, currentPositionIndex1 = -530; stopIntervalPosition = -5;
}

// function GetClassNumberGeneric(direction) {
//   let tempSlideHtml = document.querySelectorAll(".slide-single");
//   let tempClassName = tempSlideHtml[0].className;
//   let classNumber = parseInt(tempClassName.match(/\d+/));

//   if (direction === "next") {
//     if (classNumber === srcSlide.length) {
//       classNumber = 0;
//     }
//     return classNumber;
//   } else if (direction === "back") {
//     switch (classNumber) {
//       case 1:
//         classNumber = 9;
//         break;
//       case 10:
//         classNumber = 8;
//         break;
//       case 9:
//         classNumber = 7;
//         break;
//       case 8:
//         classNumber = 6;
//         break;
//       case 7:
//         classNumber = 5;
//         break;
//       case 6:
//         classNumber = 4;
//         break;
//       case 5:
//         classNumber = 3;
//         break;
//       case 4:
//         classNumber = 2;
//         break;
//       case 3:
//         classNumber = 1;
//         break;
//       case 2:
//         classNumber = 0;
//         break;

//       default:
//         break;
//     }

//     return classNumber;
//   } else {
//     console.log("Ошибка тут");
//   }
// }
function GetClassNumberGeneric(direction) {
  let tempSlideHtml = document.querySelectorAll(".slide-single");
  let tempClassName = tempSlideHtml[0].className;
  classNumber = parseInt(tempClassName.match(/\d+/));

  if (direction === "next") {
    if (classNumber === newSrc.length) {
      classNumber = 0;
    }
    return classNumber;
  } else if (direction === "back") {
    classNumber = currentSliderCount[classNumber];
    return classNumber;
  } else {
    console.log("Ошибка тут");
  }
}
function CreateSlideGeneric(classNumber, startPosition) {
  offset = 1;
  let img = document.createElement("img");
  img.src = srcSlide[classNumber];
  img.classList.add("slide-single");
  img.classList.add(`slide--${classNumber + 1}`);
  img.style.left = offset * startPosition + "px";
  document.querySelector(".slider-track").appendChild(img);
  offset = 1;
}
function GetOffsetAnimationGeneric(
  stepPosition,
  currentPosition,
  stopIntervalPosition,
  speedAnimation
) {
  let currentSlideInHtml = document.querySelectorAll(".slide-single");
  let currentPositionIndex1 = currentPosition;
  let currentPositionIndex0 = 0;
  let timer = setInterval(() => {
    currentSlideInHtml[0].style.left = `${currentPositionIndex0}px`;
    currentPositionIndex0 += stepPosition;

    currentSlideInHtml[1].style.left = `${currentPositionIndex1}px`;
    currentPositionIndex1 += stepPosition;

    if (currentPositionIndex1 === stopIntervalPosition) {
      currentSlideInHtml[0].remove();
      clearInterval(timer);

      BtnNext.onclick = SlideNext;

      BtnBack.onclick = SlideBack;
    }
  }, speedAnimation);

  //Если назад то stepPosition = 5, currentPositionIndex1 = -530; stopIntervalPosition = 5;
  //Если вперед то stepPosition = -5, currentPositionIndex1 = -530; stopIntervalPosition = -5;
}

// есть текущее 4 а нажатое 10, вперед 5 шагов, назад 3 шага

// (length-end+start>end-start+1)
// // Если длина минус конец плюс начало больше чем конец минус начало плюс 1

// const t = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// let текущее = 3; // start
// let нажал = 9;// end
// let длина = 10;// length
// let первоеУсловие = длина - нажал + текущее; 4
// let второеУсловие = нажал - текущее +1;7

// let n = 0;
// for (let j = текущее; j > 1; j--) {
//       n++;
// }
// console.log(n +1+ ' шагов назад');

// let k = 0;

// for (let i = текущее; i < нажал; i++) {
//     ++k;

// }
// console.log(k+' шагов вперед');

// let текущее = 4;//2
// let нажал = 10;//8

// let n = 0;
// for (let j = текущее; j > 1; j--) {
//       n++;
// }
// console.log(n +1+ ' шагов назад');

// let k = 0;

// for (let i = текущее; i < нажал; i++) {
//     ++k;

// }
// console.log(k+' шагов вперед');
