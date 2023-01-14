"use strict";
const BtnBack = document.querySelector(".slider-back");
const BtnNext = document.querySelector(".slider-next");
const SelectCountSlider = document.querySelector(".select-number");
const srcSlide = [];
let classNumber = 0;
let newSrc = [];
let offset = 0;
let countSlide = 1;
const speedAnimation = 1;
const stepStop = 5;
let currentSliderCount = [];





CopySrc();
CreateSlide();
ReloadSlider();

BtnNext.onclick = SlideNext;
BtnBack.onclick = SlideBack;
SelectCountSlider.onchange = ReloadSlider;







//Сбрасывает количество слайдеров
function ReloadSlider() {
  document.querySelector(".slide-single").remove();
  CreateSlide();
  classNumber = 0;
  GetCurrentSliderCount()
}
function GetCurrentSliderCount() {
  countSlide = Number(SelectCountSlider.value);
  console.log(countSlide);
  GetCountSlide(countSlide);
  newSrc = [];
  for (let i = 0; i < countSlide; i++) {
    newSrc[i] = srcSlide[i];
  }
}
function GetCountSlide(countSlide) {
  currentSliderCount = [];
  for (let i = 0; i < countSlide-1; i++) {
    currentSliderCount.push(i);
  }
  currentSliderCount.unshift(countSlide-1);
  currentSliderCount.unshift('');
  console.log(currentSliderCount);
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
  }, 100);
}
//............................

//Перелистывает слайд в право
function SlideBack() {
  BtnBack.onclick = null;
  BtnNext.onclick = null;

  setTimeout(function () {
    TimerSlideBack();
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
