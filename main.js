song = "";
function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();


    video = createCapture(VIDEO);
    video.hide();
}

function play(){
    song.play();
}