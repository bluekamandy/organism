/**
 *
 * organism
 *
 * by masood
 *
 * initiated: 3/20/21
 * last updated: 3/23/21
 *
 * license: Mozilla Public License 2.0 (https://www.mozilla.org/en-US/MPL/)
 *
 */

/// <reference path="../ts/p5.global-mode.d.ts" />

"use strict";

const showFrameRate = false;

let openSans;

let count = 0.0;
let timer = 0;

let organisms;
let numOrganisms = 100;

let food;

function setup() {
  //noCursor();

  createCanvas(windowWidth, windowHeight);

  //console.log(windowWidth, windowHeight);

  //--Set-up-type--

  openSans = loadFont("data/OpenSans-Regular.ttf");
  textSize(18);
  textFont(openSans);

  //--Create-Organisms--

  organisms = [];

  for (let i = 0; i < numOrganisms; i++) {
    let newOrg = new Organism();
    organisms.push(newOrg);
  }

  //--Create-Food--
  food = new Food();
}

function draw() {
  //--Reset-Global-States--

  noStroke();

  //--Timing-for-Background

  count = count + 0.01;
  let offset = 20 * Math.abs(Math.sin(count));
  background(0 + offset, 32, 100);

  //--Food--

  feed();

  //--Organisms--
  for (let i = 0; i < organisms.length; i++) {
    organisms[i].lifeCycle();
  }

  //--Randomize-Organism-Targets--

  if (millis() - timer >= 10000) {
    if (!food.feeding) {
      let atrRandomizer = int(random(10.0));

      if (atrRandomizer == 1 || atrRandomizer == 2) {
        randomizeAttractor();
        //Organism.randomizeAttractor();
      }
      // else if (atrRandomizer == 2) {
      //shouldFeed = true;
      // Commenting this out because it feels strange for feeding to be automatic.
      //}
      timer = millis();
    }
  }

  //--Print-frame-rate--

  if (showFrameRate) {
    fill(255);
    text(int(getFrameRate()) + " fps", 10, 23);
  }

  checkOrientation();
}

//--Handle-IO-Events--

function touchStarted() {
  food.location = createVector(mouseX, mouseY);
  food.feedingTimer = millis();
  food.feeding = true;
}

function mouseClicked() {
  food.location = createVector(mouseX, mouseY);
  food.feedingTimer = millis();
  food.feeding = true;
}

function feed() {
  if (food.feeding == true) {
    // Feeding
    for (let i = 0; i < organisms.length; i++) {
      organisms[i].attractor = food.location.copy();
    }
    food.foodCycle();
  }
}

function randomizeAttractor() {
  for (let i = 0; i < organisms.length; i++) {
    organisms[i].attractor = createVector(random(width), random(height));
  }
}

/* full screening will change the size of the canvas */

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//--Reload-on-tablet-orientation-change--

function checkOrientation() {
  if (window.DeviceOrientationEvent) {
    window.addEventListener(
      "orientationchange",
      function () {
        location.reload();
      },
      false
    );
  }
}
