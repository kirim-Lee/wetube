const videoContainer = document.getElementById('jsVideoPlayer');
let videoPlayer, playBtn, volumnBtn;

function getElements() {
    videoPlayer = videoContainer.querySelector('video');
    playBtn = videoContainer.querySelector('#jsPlayButton');
    volumnBtn = videoContainer.querySelector('#jsVolumnButton');
}

function init () {    
    playBtn.addEventListener('click', handlePlayClick);
    volumnBtn.addEventListener('click', handleVolumnClick);
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

if (videoContainer) {
    getElements();
    init();
}