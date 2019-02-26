const videoContainer = document.getElementById('jsVideoPlayer');
let videoPlayer, playBtn;

function getElements() {
    videoPlayer = videoContainer.querySelector('video');
    playBtn = videoContainer.querySelector('#jsPlayButton');
}

function init () {    
    playBtn.addEventListener('click', handlePlayClick);
}

function handlePlayClick() {
    if(videoPlayer.paused) {
        videoPlayer.play()
    } else {
        videoPlayer.pause();
    }
}

if (videoContainer) {
    getElements();
    init();
}