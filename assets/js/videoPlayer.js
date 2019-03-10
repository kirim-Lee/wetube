const videoContainer = document.getElementById('jsVideoPlayer');
let videoPlayer, playBtn, volumnBtn, fullScreenBtn;

function getElements() {
    videoPlayer = videoContainer.querySelector('video');
    playBtn = videoContainer.querySelector('#jsPlayButton');
    volumnBtn = videoContainer.querySelector('#jsVolumnButton');
    fullScreenBtn = videoContainer.querySelector('#jsFullScreen');
}

function init () {    
    playBtn.addEventListener('click', handlePlayClick);
    volumnBtn.addEventListener('click', handleVolumnClick);
    fullScreenBtn.addEventListener('click', goFullScreen);
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
    videoContainer.webkitRequestFullscreen();
    fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    fullScreenBtn.removeEventListener('click', goFullScreen);
    fullScreenBtn.addEventListener('click', exitFullScreen);
}

function exitFullScreen() {
    document.webkitExitFullscreen();
    fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreenBtn.addEventListener('click', goFullScreen);
    fullScreenBtn.removeEventListener('click', exitFullScreen);
}

if (videoContainer) {
    getElements();
    init();
}