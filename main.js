song = "";
lWx = 0;
lWy = 0;
rWX = 0;
rWY = 0;
scoreLw = 0;
scoreRw = 0;


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
        scoreRw = results[0].pose.keypoints[10].score;   
        scoreLw = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLw + "scoreLeftWrist = " + scoreRw);

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

    fill("#FF0000");
    stroke("#FF0000");
    circle(rWX , rWY , 20);

    if(scoreRw > 0.1){
        circle(rWX, rWY, 20);

        if(rWY > 0 && rWY <= 100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        } else if(rWY > 100 && rWY <= 200){
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        } else if(rWY > 200 && rWY <= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        } else if(rWY > 300 && rWY <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        } else if(rWY > 400 && rWY <= 500){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }

    if(scoreLw > 0.1){
    circle(lWx , lWy , 20);
    inNolWy = Number(lWy);
    remove_decimal = floor(inNolWy);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
  }

}

function modelLoaded(){
    console.log("PoseNet Model ReLoaded!")
}

function play(){

    song.play();
    song.setVolume(1);
    song.rate(1);

}
