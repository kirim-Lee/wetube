const videoContainer = document.getElementById('jsVideoPlayer');
let videoPlayer, playBtn, volumnBtn, fullScreenBtn;

function getElements() {
    videoPlayer = videoContainer.querySelector('video');
    playBtn = videoContainer.querySelector('#jsPlayButton');
    volumnBtn = videoContainer.querySelector('#jsVolumnButton');
    fullScreenBtn = videoContainer.querySelector('#jsFullScreen');
    currentTime = videoContainer.querySelector('#currentTime');
    totalTime = videoContainer.querySelector('#totalTime');
}

function init () {    
    playBtn.addEventListener('click', handlePlayClick);
    volumnBtn.addEventListener('click', handleVolumnClick);
    fullScreenBtn.addEventListener('click', goFullScreen);
    videoPlayer.addEventListener('loadedmetadata', setTotalTime);
    
}

if (videoContainer) {
    getElements();
    init();
}


function handlePlayClick() {
    if(videoPlayer.paused) {
        videoPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function handleVolumnClick() {
    videoPlayer.muted = !videoPlayer.muted;
    if(videoPlayer.muted) {
        volumnBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        volumnBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
}

function goFullScreen() {
    fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    fullScreenBtn.removeEventListener('click', goFullScreen);
    fullScreenBtn.addEventListener('click', exitFullScreen);
    if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
    }else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.mozRequestFullscreen) {
        videoContainer.mozRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
    }
}

function exitFullScreen() {
    fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreenBtn.addEventListener('click', goFullScreen);
    fullScreenBtn.removeEventListener('click', exitFullScreen);
    if(document.exitFullscreen) { 
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozExitFullscreen) {
        document.mozExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function formatDate (seconds) {
    const secondNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondNumber / 3600);
    let minutes = Math.floor((secondNumber % 3600) / 60);
    let totalSeconds = secondNumber % 60;

    if (hours < 10) {
        hours = `0${hours}`;
    }
    if( minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (totalSeconds < 10) {
        totalSeconds = `0${totalSeconds}`;
    }

    return `${hours}:${minutes}:${totalSeconds}`;
}

function getCurrentTime() {
    currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

function setTotalTime() {
    console.log('rer');
    const totalTimeString = formatDate(videoPlayer.duration);
    totalTime.innerHTML = totalTimeString;

    setInterval(getCurrentTime, 1000);
}
