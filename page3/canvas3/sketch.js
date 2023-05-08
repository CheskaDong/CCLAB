
  let img;
  let s = 9;
 
  function preload() {
    img = loadImage("img/6.jpeg");
    sound=loadSound("sound/2.mp3")
  }
  function setup() {
    createCanvas(540, 360);
    angleMode(DEGREES);
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvasContainer")
  
  }
  function draw() {
    background(0);
    let hr = hour();
  let mn = minute();
  let sc = second();
    
    img.loadPixels(); //very important
    image(img, 0, 0, width, height);
  
        
    for (let x = 0; x < width; x += s) {
      for (let y = 0; y < height; y += s) {
        
        let i = (x + y*img.width) * 4;
  
        let r = 20+img.pixels[i + 0]+sc*2;
        let g = 30+img.pixels[i + 1];
        let b = img.pixels[i + 2];
        // let ssc=second()
        //  if (ssc>40){
  
        
      fill(r,g,b);
        noStroke()
        circle(x, y, s);
        if(mouseIsPressed){
          fill(0,0,0);
          noStroke()
          rect(x, y, s);
         fill(r-sc*5,g-sc*4,b-sc*4);
          noStroke()
          circle(x, y, s);
       }
     }
     
      }
   
    }
     for (let i = 0; i < 2000; i++) {
      sortPixels();
    }
    img.updatePixels();
      translate(200, 200);
    rotate(-90);
  
   
  
    strokeWeight(10);
  //   stroke(255, 100, 150);
  //   noFill();
  //   let secondAngle = map(sc, 0, 60, 0, 360);
  //   //arc(0, 0, 300, 300, 0, secondAngle);
  
  //   stroke(150, 100, 255);
  //   let minuteAngle = map(mn, 0, 60, 0, 360);
  //   //arc(0, 0, 280, 280, 0, minuteAngle);
  
  //   stroke(150, 255, 100);
  //   let hourAngle = map(hr % 12, 0, 12, 0, 360);
  //   //arc(0, 0, 260, 260, 0, hourAngle);
  
    // push();
    // rotate(secondAngle);
    // stroke(255);
    // line(0, 0, 100, 0);
    // pop();
  
  //   push();
  //   rotate(minuteAngle);
  //   stroke(225);
  //   line(0, 0, 75, 0);
  //   pop();
  
  //   push();
  //   rotate(hourAngle);
  //   stroke(187);
  //   line(0, 0, 50, 0);
  //   pop();
  
  //   stroke(255);
  //   point(0, 0);
  if(mouseIsPressed){
    sound.play()
  }
  
  

  function sortPixels() {
    // Get a random pixel.
    const x = random(img.width);
    const y = random(img.height - 1);
  
    // Get the color of the pixel.
    const colorOne = img.get(x, y);
  
    // Get the color of the pixel below the first one.
    const colorTwo = img.get(x, y + 1);
  
    // Get the total R+G+B of both colors.
    const totalOne = red(colorOne) + green(colorOne) + blue(colorTwo);
    const totalTwo = red(colorTwo) + green(colorTwo) + blue(colorTwo);
  
    // If the first total is less than the second total, swap the pixels.
    // This causes darker colors to fall to the bottom,
    // and light pixels to rise to the top.
    if (totalOne < totalTwo) {
      img.set(x, y, colorTwo);
      img.set(x, y + 1, colorOne);
    }
  }