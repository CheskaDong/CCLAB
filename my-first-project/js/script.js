alert('hello!')
function setup(){
    createCanvas(500,500)
    background()
    colormode(HSB)
}


function draw(){
    fill(random(1,100))
    circle(random(width,height,100))
}