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
const colorLength = colors.length; //Length of colors Array

/*
const colors = Array.from({length: 16}, (_, v) => v).map((_, index) => (
  `#${Array(3).fill(index.toString(16)).join('')}`
)) */

const contentElement = document.getElementById("container"); //Get the container element handler for the parent of the boxes.

const stepSlider = document.getElementById("stepSize"); //Get StepSize slider element handler
const startSlider = document.getElementById("startColor"); //Get StartColor slider element handler

const sizeValue = document.getElementById("sizeValue"); //Get the element handler which shows the size of step.
const colorValue = document.getElementById("colorValue"); //Get the element handler which shows the value of startColor .

const startBtn = document.getElementsByClassName("btn__start")[0]; //Get Start Button handler

let stepSize = 20, startColor = 0, startRotate = false, timerID, deg = 0; //Set Initial Value;

function drawSquare() {
  const numberOfBox = colorLength - startColor; //Get the number of boxes from startColor
  clearContainer(numberOfBox); //Clear container Element
  
  const boxElementArray = Array.from({length: numberOfBox}, (_, v) => (v + startColor)).map((index) => {
    const boxElement = document.createElement("div");
    const boxSize = (colorLength - index) * stepSize * 2; //Set Properties of box element
    boxElement.className = "box";
    boxElement.id = `box--${index}`;
    boxElement.style.width = `${boxSize}px`;
    boxElement.style.height = `${boxSize}px`;
    boxElement.style.backgroundColor = colors[index];
    return boxElement;
  });

  contentElement.append(...boxElementArray); //Append all the box elements to container
}

function clearContainer(numberOfBox) {
  contentElement.innerHTML = "";
  const containerSize = stepSize * numberOfBox * 2; //Set size of container
  contentElement.style.width = `${containerSize}px`;
  contentElement.style.height = `${containerSize}px`;
}

function handleRotateClick() {
  startRotate = !startRotate;
  if( startRotate ) 
    timerID = setInterval(() => rotate(), 50);
  else {
    clearInterval(timerID);
    contentElement.style.transform = `rotate(${0}deg)`
    deg = 0;
  }
  startBtn.textContent = (startRotate ? 'Stop' : 'Start')
}

function rotate() {
  contentElement.style.transform = `rotate(${deg}deg)`
  deg += 10;
}

stepSlider.oninput = function() {
  stepSize = parseInt(this.value);
  sizeValue.innerHTML = this.value;
  drawSquare();
}

startSlider.oninput = function() {
  startColor = parseInt(this.value);
  colorValue.innerHTML = this.value;
  drawSquare();
}
