"use strict";

const textContainer = document.querySelector(".text-container");
const rangeContainer = document.querySelector(".range-container");
const controllers = rangeContainer.querySelectorAll(".slider");
const buttons = document.querySelectorAll(".switch-button");
const MIN_VALUE = 0;
const MAX_VALUE = 255;
const inputValues = {
  color: {
    red: MIN_VALUE,
    green: MIN_VALUE,
    blue: MIN_VALUE
  },
  ["background-color"]: {
    red: MIN_VALUE,
    green: MIN_VALUE,
    blue: MIN_VALUE
  }
};
let currentStyleType = "color";

const setStyle = () => {
  const {
    red,
    green,
    blue
  } = inputValues[currentStyleType];
  textContainer.style[currentStyleType] = "rgb(".concat(red, ", ").concat(green, ", ").concat(blue, ")");
};

const onStyleSwitch = evt => {
  currentStyleType = evt.target.id;

  if (!evt.target.classList.contains("active")) {
    setActiveButton(buttons);
  }

  setStyle();
  setRangeValues(controllers);
};

const setActiveButton = buttons => {
  const buttonsList = Array.from(buttons);
  buttonsList.forEach(button => {
    button.classList.toggle("active");
  });
};

const setRangeValues = ranges => {
  const rangesList = Array.from(ranges);
  const colorsList = Object.keys(inputValues[currentStyleType]);
  rangesList.forEach((range, i) => {
    const value = inputValues[currentStyleType][colorsList[i]];
    $("#slider-".concat(i + 1)).slider("value", value);
  });
};

const buttonListeners = buttons => {
  const buttonsList = Array.from(buttons);
  buttonsList.forEach(button => {
    button.addEventListener("click", onStyleSwitch);
  });
};

const onColorRangeChange = color => (event, ui) => {
  inputValues[currentStyleType][color] = ui.value;
  setStyle(ui.value);
};

const handleRangeControllers = ranges => {
  const rangesList = Array.from(ranges);
  const colorsList = Object.keys(inputValues[currentStyleType]);
  rangesList.forEach((range, i) => {
    $("#slider-".concat(i + 1)).slider({
      min: MIN_VALUE,
      max: MAX_VALUE,
      range: "min",
      classes: {
        "ui-slider": "highlight",
        "ui-slider-handle": "ui-slider-handle--".concat(colorsList[i]),
        "ui-slider-range": "ui-slider-range--".concat(colorsList[i])
      },
      slide: onColorRangeChange(colorsList[i])
    });
  });
};

buttonListeners(buttons);
handleRangeControllers(controllers);