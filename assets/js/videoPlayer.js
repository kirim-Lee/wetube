import getBlobDuration from 'get-blob-duration';

const videoContainer = document.getElementById('jsVideoPlayer');
let videoPlayer, playBtn, volumnBtn, fullScreenBtn, currentTime, totalTime, volumnRange;

function getElements() {
    videoPlayer = videoContainer.querySelector('video');
    playBtn = videoContainer.querySelector('#jsPlayButton');
    volumnBtn = videoContainer.querySelector('#jsVolumnButton');
    fullScreenBtn = videoContainer.querySelector('#jsFullScreen');
    currentTime = videoContainer.querySelector('#currentTime');
    totalTime = videoContainer.querySelector('#totalTime');
    volumnRange = videoContainer.querySelector('#jsVolumn');

}

const registerView = () => {
    const videoId = window.location.href.split('/videos/')[1];
    fetch(`/api/${videoId}/view`, {
        method: "POST"
    });
}

function init () {    
    playBtn.addEventListener('click', handlePlayClick);
    volumnBtn.addEventListener('click', handleVolumnClick);
    fullScreenBtn.addEventListener('click', goFullScreen);
    videoPlayer.addEventListener('loadedmetadata', setTotalTime);
    videoPlayer.addEventListener('ended', handleEnded);
    volumnRange.addEventListener('input', handleDrag);

    videoPlayer.volume = 0.5;
    
}

if (videoContainer) {
    getElements();
    init();
}
function handleDrag(event) {
    const value = event.target.value;
    videoPlayer.volume = value;
    if (value >= 0.7) {
        volumnBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else if(value >= 0.2) {
        volumnBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
        volumnBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
    }

}

function handleEnded() {
    registerView();
    videoPlayer.currentTime = 0;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handlePlayClick() {
    if(videoPlayer.paused) {
        videoPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';volumnBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

function handleVolumnClick() {
    videoPlayer.muted = !videoPlayer.muted;
    if(videoPlayer.muted) {
        
        volumnRange.value = 0;
    } else {
        volumnBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        volumnRange.value = videoPlayer.volume;
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

async function setTotalTime() {
    const blob = await fetch(videoPlayer.src).then(resp => resp.blob());
    const duration = await getBlobDuration(blob);
    const totalTimeString = formatDate(duration);
    totalTime.innerHTML = totalTimeString;

    setInterval(getCurrentTime, 1000);
}
