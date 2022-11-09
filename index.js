/*
Draw Squares
  Write a function drawSquares using any non-canvas-based web framework of your choice (or raw JS) that draws greyscale squares overlapping 
  in a pyramid fashion on a webpage. 

  The function takes two arguments, a stepSize and a starting color. 
  StepSize controls the number of pixels to be visible on each side of a square and starting color is a number (0-15) that determines 
  what color to start drawing from (squares should be drawn all the way until white in the center). For instance, if the starting color 
  is 14 then you would draw two squares colored #EEE and #FFF. 

  Ideally, build the CSS in a way that you don't need to utilize flex.
  I've attached sample expected outputs from calling drawSquares(10, 0) and drawSquares(20, 5). 
  Please carefully analyze the samples provided for desired behavior.

Bonus:
  Come up with extensions, functions, and/or customization to the base solution. We want to see your creativity and ingenuity.
*/

/*
const colors = Array.from({length: 16}, (_, v) => v).map((_, index) => (
  `#${Array(3).fill(index.toString(16)).join('')}`
)) */

const colors = [
  "#000",
  "#111",
  "#222",
  "#333",
  "#444",
  "#555",
  "#666",
  "#777",
  "#888",
  "#999",
  "#AAA",
  "#BBB",
  "#CCC",
  "#DDD",
  "#EEE",
  "#FFF",
];

const colorLength = colors.length;
const contentElement = document.getElementById("container");

let stepSize = 20, startColor = 0, startRotate = false, timerID, deg = 0;

const stepSlider = document.getElementById("stepSize");
const startSlider = document.getElementById("startColor");

const sizeValue = document.getElementById("sizeValue");
const colorValue = document.getElementById("colorValue");

const startBtn = document.getElementsByClassName("btn-start")[0];

stepSlider.oninput = function() {
  stepSize = this.value;
  sizeValue.innerHTML = this.value;
  composeContent();
}

startSlider.oninput = function() {
  startColor = this.value;
  colorValue.innerHTML = this.value;
  composeContent();
}

function composeContent() {
  contentElement.innerHTML = "";
  for (let index = startColor; index < colorLength; index++) {
    const boxElement = document.createElement("div");
    boxElement.className = "box";
    boxElement.id = `box--${index}`;
    contentElement.appendChild(boxElement);
  }

  setBoxProperty(stepSize, startColor);
}

function handleSizeEvent(ev) {
  stepSize = ev.target.value;
  composeContent();
}

function handleColorEvent(ev) {
  startColor = ev.target.value;
  composeContent();
}

function setBoxProperty(stepSize, startColor) {
  const containerSize = stepSize * (colorLength - startColor) * 2;
  contentElement.style.width = `${containerSize}px`;
  contentElement.style.height = `${containerSize}px`;

  for (let index = startColor; index < colorLength; index++) {
    const boxByIndex = document.getElementById(`box--${index}`);
    const boxSize = (colorLength - index) * stepSize * 2;

    boxByIndex.style.width = `${boxSize}px`;
    boxByIndex.style.height = `${boxSize}px`;
    boxByIndex.style.backgroundColor = colors[index];
  }
}

function handleRotateClick() {
  startRotate = !startRotate;
  if( startRotate ) {
    timerID = setInterval(() => rotate(), 50);
  }
  else 
    clearInterval(timerID);
  startBtn.textContent = (startRotate ? 'Stop' : 'Start')
}

function rotate() {
  contentElement.style.transform = `rotate(${deg}deg)`
  deg += 10;
}