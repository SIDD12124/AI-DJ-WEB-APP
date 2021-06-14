song = "";
lWx = 0;
lWy = 0;
rWX = 0;
rWY = 0;


function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();


    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on('pose', gotPoses)
}



function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        lWx = results[0].pose.leftWrist.x;
        lWy = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + lWx +" Left Wrist Y = " + lWy);

        rWx = results[0].pose.rightWrist.x;
        rWY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rWx +" Right Wrist Y = " + rWY);
    }
}

function draw(){
    image(video, 0, 0 ,600, 500);
}

function modelLoaded(){
    console.log("PoseNet Model ReLoaded!")
}

function play(){

    song.play();
    song.setVolume(1);
    song.rate(1);

}