"use strict";

class Organism {
  // Clever way to access all organisms, but sadly it is not compatible with Safari, so I'll comment it out until a future date when Safari supports statics.
  //--For-accessing-all-organisms--
  //static allOrganisms = [];

  constructor() {
    // --Class-Constants--
    this.maxVelocity = 0.01;
    this.maxAcceleration = 0.1;
    this.topSpeed = 1.0;

    this.maxTailPoints = 100;

    this.time = 0.0;

    // --Generated/Calculated-on-Init--
    this.size = width > 1000 ? random(5.0, 50.0) : random(5.0, 40.0);
    this.location = createVector(
      random(this.size / 2.0, width - this.size / 2.0),
      random(this.size / 2.0, height - this.size / 2.0)
    );
    this.velocity = createVector(
      random(-this.maxVelocity, this.maxVelocity),
      random(-this.maxVelocity, this.maxVelocity)
    );
    this.acceleration = createVector(
      random(-this.maxAcceleration, this.maxAcceleration),
      random(-this.maxAcceleration, this.maxAcceleration)
    );
    this.attractor = createVector(random(width), random(height));
    this.noseLength = this.size * 0.75;
    this.points = [];
    this.edgeAdjustment = this.maxTailPoints * this.topSpeed + this.noseLength;

    //Organism.allOrganisms.push(this);
  }

  lifeCycle() {
    this.update();
    this.body();
    this.tail();
    this.checkEdges();
  }

  //--Life-Cycle-Methods--

  update() {
    let interest = this.attractor.copy();
    let dir = p5.Vector.sub(interest, this.location);

    dir.normalize();

    dir.mult(0.5);

    this.acceleration = dir.div(this.size);
    let wind = createVector(0.1, 0);
    this.applyForce(wind);

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.location.add(this.velocity);

    this.acceleration.mult(0);
  }

  body() {
    fill(163, 182, 241, 75);
    stroke(50, 91, 175);
    ellipse(this.location.x, this.location.y, this.size, this.size);

    noFill();
    stroke(225, 137, 0);

    let nVelocity = this.velocity.copy();
    nVelocity.normalize();

    line(
      this.location.x,
      this.location.y,
      this.location.x + nVelocity.x * this.noseLength,
      this.location.y + nVelocity.y * this.noseLength
    );
  }

  tail() {
    noFill();
    stroke(208, 152, 78);

    let l = this.location.copy();
    this.points.push(l);

    if (this.points.length == this.maxTailPoints) {
      this.points.shift();
    }

    beginShape();
    for (let i = 0; i < this.points.length; i += 10) {
      noFill();
      curveVertex(this.points[i].x, this.points[i].y);
      stroke(208, 152, 78, 100);

      if (i % 10 == 0) {
        fill(218, 36, 222, 40);
        ellipse(
          this.points[i].x,
          this.points[i].y,
          (this.size * i) / 100,
          (this.size * i) / 100
        );
        noFill();
      }
    }
    endShape();
  }

  checkEdges() {
    if (this.location.x > width + this.size / 2.0 + this.edgeAdjustment) {
      this.location.x = 0 - this.size / 2.0;
      this.points = [];
    } else if (this.location.x < 0 - this.size / 2.0 - this.edgeAdjustment) {
      this.location.x = width + this.size / 2.0;
      this.points = [];
    }

    if (this.location.y > height + this.size / 2.0 + this.edgeAdjustment) {
      this.location.y = 0 - this.size / 2.0;
      this.points = [];
    } else if (this.location.y < 0 - this.size / 2.0 - this.edgeAdjustment) {
      this.location.y = height + this.size / 2.0;
      this.points = [];
    }
  }

  //--Non-Life-Cycle-Methods--

  // static randomizeAttractor() {
  //   for (let i = 0; i < Organism.allOrganisms.length; i++) {
  //     Organism.allOrganisms[i].attractor = createVector(
  //       random(width),
  //       random(height)
  //     );
  //   }
  // }

  applyForce(force) {
    let f = p5.Vector.div(force, this.size);
    this.acceleration.add(f);
  }
}
