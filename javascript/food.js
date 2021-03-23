"use strict";

class Food {
  constructor() {
    // --Class-Constants--
    this.feeding = false;
    this.size = 15;
    this.glowSize = 30;
    this.glowCounter = 1;
    this.rotationSpeed = 0.05;
    this.rotation = 0;
    this.feedingTimer = 0;

    this.location = createVector(random(width), random(height));
    this.duration = int(random(10000, 20000));
  }

  foodCycle() {
    this.display();
    this.changeTimer();
  }

  display() {
    stroke(255, 255, 0);
    fill(255, 255, 0, 80);
    push();
    rectMode(CENTER);
    translate(this.location.x, this.location.y);
    rotate(this.rotation);
    this.rotation = this.rotation + this.rotationSpeed;
    rect(0, 0, this.size, this.size);
    noFill();
    let glowMap = map(this.glowCounter, 0, 25, 255, 0);
    stroke(255, 255, 0, glowMap);
    rect(0, 0, this.size + this.glowCounter, this.size + this.glowCounter);
    this.glowCounter = (this.glowCounter + 0.25) % this.glowSize;
    pop();
  }

  changeTimer() {
    if (millis() - this.feedingTimer >= this.duration) {
      this.feeding = false;
      this.location = createVector(random(width), random(height));
      this.duration = int(random(10000, 20000));
      this.feedingTimer = millis();
      //Organism.randomizeAttractor();
      randomizeAttractor();
    }
  }
}
