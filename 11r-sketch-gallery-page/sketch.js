
  
    let x1;
    let x2;
    let number = 20;
    let s = [];
    let x = [];
    let y = [];
    let speedS = [];
    let jelly = [];
    let bubble = [];
    let counter = 0;
    let size;
    let blu = ["#7A5DC7", "#6698FF", "#C12283", "#E38AAE"];
    let pan = [];

    function setup() {
      let canvas = createCanvas(windowWidth, windowHeight);
      canvas.parent("p5-canvas-container");
      canvas.parent("main-container");
      
      size = 20;
      for (let i = 0; i < 5; i++) {
        jelly[i] = new Jelly(random(width), random(height), random(20, 100));
      }
      for (let i = 0; i < 106; i++) {
        pan[i] = true;
      }
      for (let i = 0; i < 30; i++) {
        bubble[i] = new Bubble(random(width), random(height), blu[i % 4]);
      }
    }
    
    function draw() {
      background(21, 20, 84, 200);
    
      for (let i = 0; i < 5; i++) {
        let p = jelly[i];
        p.show();
        p.move();
        p.reappear();
        p.repelledFrom(mouseX, mouseY);
        p.bounce();
        p.slowDown();
      }
    
      for (let i = 0; i < bubble.length; i++) {
        bubble[i].show();
        bubble[i].move();
        bubble[i].reappear();
    
        for (let j = 0; j < jelly.length; j++) {
          if (
            bubble[i].x > jelly[j].x + jelly[j].x1 - jelly[j].s &&
            bubble[i].x < jelly[j].s - jelly[j].x1 + jelly[j].x &&
           bubble[i].y < jelly[j].y &&
       bubble[i].y > -jelly[j].s + jelly[j].y
          ) {
            bubble.splice(i, 1);
            bubble.push(new Bubble(random(width),600,blu[i % 4]))
          }
        }
    
        //if(pan[i*5]=false||pan[i*5+1]=false||pan[i*5+2]=false||pan[i*5+3]=false||pan[i*5+4]=false){
        //   bubble.splice(0,1)}
      }
    }
    
    class Jelly {
      constructor(x, y, s) {
        this.x = x;
        this.y = y;
        this.s = s;
        this.speedX = random(-5, 5);
        this.speedY = random(-3, 3);
        this.xSpd = 0;
      }
    
      show() {
        let shu = 2;
        let tiao = 3;
        let kong = 1.5;
    
        if (this.s > 35 && this.s < 45) {
          shu = 3;
          (kong = 2), (tiao = 10);
        }
        if (this.s >= 45 && this.s < 65) {
          shu = 4;
          kong = 2;
          tiao = 15;
        }
        if (this.s >= 65 && this.s < 88) {
          shu = 5;
          kong = 3;
          tiao = 30;
        }
        if (this.s >= 88 && this.s <= 100) {
          shu = 7;
          kong = 3;
          tiao = 45;
        }
        this.x1 = map(sin(frameCount * 0.06), -1, 1, -this.s / 2, this.s / 2);
        for (let f = 0; f < shu * kong; f += kong) {
          let hh = floor(f % 4.6);
          let r = [128, 89, 138];
          let g = [128, 109, 218];
          let b = [200, 230, 218];
          stroke(r[hh], g[hh], b[hh], 50);
          let len = this.s * 0.7;
    
          for (let i = 0; i < len; i += 1) {
            strokeWeight(3);
            push();
            translate(this.x + f * 5 - tiao, this.y + this.s / 11);
            circle(5 * sin(frameCount * 0.1 + i * 0.1), i, 3);
            pop();
          }
        }
    
        noStroke();
        beginShape();
        fill(255, 110);
        push();
        translate(this.x, this.y);
        // rectMode(CENTER);
        // rect(0, 0, this.s * 2 - this.x1, this.s);
        curveVertex(this.s - this.x1, 0);
        curveVertex(this.s - this.x1, 0);
        curveVertex(this.s, -this.s);
        curveVertex(-this.s, -this.s);
        curveVertex(-this.s + this.x1, 0);
        curveVertex(-this.s + this.x1, 0);
    
        endShape();
    
        let pp = -0.5 * (this.s - this.x1);
        let ppp = 0.7 * (this.s - this.x1);
        beginShape();
    
        curveVertex(this.s - this.x1, 0);
        curveVertex(this.s - this.x1, 0);
        curveVertex(ppp, this.s / 10);
        curveVertex(pp, this.s / 10 - 1);
        curveVertex(-this.s + this.x1, 0);
        curveVertex(-this.s + this.x1, 0);
        endShape();
        pop();
    
        beginShape();
        noFill();
        strokeWeight(2);
        stroke(255, 200);
        //  line(-this.s + this.x, this.y,this.s - this.x, this,y)
        push();
        translate(this.x, this.y);
        curveVertex(-this.s - 1 + this.x1, 0);
        curveVertex(-this.s - 1 + this.x1, 0);
        curveVertex(-this.s - 1, -this.s - 1);
        curveVertex(this.s + 1, -this.s - 1);
        curveVertex(this.s + 1 - this.x1, 0);
        curveVertex(this.s + 1 - this.x1, 0);
        endShape();
        pop();
        //   for (let i = 0; i < 20; i++) {
        // // let bubble1=bubble[i]
        // //   let dis=dist(bubble1.x,bubble1.y,this.x,this.y)
        // //    if(dis<10+this.s){
        // //      bubble.splice(0,1)
        // //    }
        //   }
      }
      slowDown() {
        this.xSpd = this.xSpd * 0.9;
      }
      repelledFrom(targetX, targetY) {
        let distance = dist(this.x, this.y, targetX, targetY);
        if (distance < 30) {
          let xAcc = (targetX - this.x) * -1 * 0.05;
          let yAcc = (targetY - this.y) * -0.05;
          this.xSpd += xAcc;
          //this.ySpd += yAcc;
        }
      }
      move() {
        this.x += this.xSpd;
        this.y += map(sin(frameCount * 0.06), -1, 1, -1.5, 0.5);
      }
      reappear() {
        if (this.y < 0 - this.s) {
          this.y = height + this.s;
        }
      }
      bounce() {
        if (this.x < 0 || this.x > width) {
          this.xSpd = -this.xSpd;
        }
      }
    }
    function mousePressed() {
      bubble.push(new Bubble(mouseX, mouseY, blu[counter % 4]));
      counter++;
    }
    
    class Bubble {
      constructor(x, y, c) {
        this.x = x;
        this.y = y;
        this.color = c;
        this.speedX = random(-5, 5);
        this.speedY = random(-3, -1);
        this.op = random(30, 255);
        this.li = x;
      }
    
      show() {
        push();
        translate(this.x, this.y);
        noStroke();
        let r = red(this.color);
        let g = green(this.color);
        let b = blue(this.color);
        fill(r, g, b, this.op);
        circle(0, 0, size);
        pop();
      }
    
      move() {
        this.x = this.x + 2 * noise(frameCount * 0.1);
        this.y += this.speedY;
      }
      reappear() {
        if (this.x > width) {
          this.x = 0;
        }
        if (this.y < 0) {
          this.y = height;
        } else if (this.y > height) {
          this.y = 0;
        }
      }
    
      checkDistance(other) {
        let d = dist(this.x, this.y, other.x, other.y);
        // curveVertex(this.s - this.x1, 0);
        // curveVertex(this.s - this.x1, 0);
        // curveVertex(this.s, -this.s);
        // curveVertex(-this.s, -this.s);
        // curveVertex(-this.s + this.x1, 0);
        // curveVertex(-this.s + this.x1, 0);
        // strokeWeight(10);
        // stroke(255);
        // circle(-other.s + other.x+other.x1, other.y, 5);
        // point(other.y)
        // point(-other.s + other.y)
        // if (
        //   this.x > other.x + other.x1 - other.s &&
        //   this.x < other.s - other.x1 + other.x &&
        //   this.y < other.y &&
        //   this.y > -other.s + other.y
        // ) {
        if (d < other.s * 2) {
          return true;
        } else {
          return false;
        }
      }
    }
    