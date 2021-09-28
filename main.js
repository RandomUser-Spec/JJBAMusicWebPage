song1 = "";
song2 = "";
song1_status = "";
song2_status = "";
score_right_wrist = 0;
score_left_wrist = 0;
right_wristX = 0;
right_wristY = 0;
left_wristX = 0;
left_wristY = 0;

function preload() {
    song1 = loadSound("Johnny.mp3");
    song2 = loadSound("Gyro.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Has Initialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        right_wristX = results[0].pose.rightWrist.x;
        right_wristY = results[0].pose.rightWrist.y;
        left_wristX = results[0].pose.leftWrist.x;
        left_wristY = results[0].pose.leftWrist.y;
        console.log('leftWrist x = ' + left_wristX + 'leftWrist y = ' + left_wristY);
        console.log('rightWrist x = ' + right_wristX + 'rightWrist y = ' + right_wristY);
        score_left_wrist = results[0].pose.keypoints[9].score
        score_right_wrist = results[0].pose.keypoints[10].score
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    fill("FF000");
    stroke("FF000");
    if(score_right_wrist > 0.2)
    {
        circle(right_wristX, right_wristY, 20);
        song2.stop();
        if(song1_status == false)
        {
            song1.play();
            document.getElementById('song').innerHTML = "Johnny's Theme Is Currently Playing"
            document.body.style.backgroundImage = "url('steel-ball-run.gif')"
        }
    }
    if(score_left_wrist > 0.2)
    {
        circle(left_wristX, left_wristY, 20);
        song1.stop();
        if(song2_status == false)
        {
            song2.play();
            document.getElementById('song').innerHTML = "Gyro's Theme Is Currently Playing"
            document.body.style.backgroundImage = "url('d4c.gif')"
        }
    }
}

function play() {
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function stop() {
    song.stop();
}

function pause() {
    song.pause();
}