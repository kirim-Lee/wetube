const recorderContainer = document.getElementById('jsRecordContainer');
const recordBtn = document.getElementById('jsRecordBtn');
const videoPreview = document.getElementById('jsVideoPreview');

let streamObject;
let videoRecorder;

// dataavailable event 발생 시 데이터 저장
const handleVideoData = (event) => {
    const { data: videoFile } = event;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(videoFile);
    link.download = 'recorded.webm';
    document.body.appendChild(link);
    link.click();
    videoRecorder.removeEventListener('dataavailable', handleVideoData);
}

// 녹화 시작
const startRecording = () => {
    videoRecorder = new MediaRecorder(streamObject);
    // videoRecorder.start(1000); // 매초마다 저장할때
    videoRecorder.start();
    videoRecorder.addEventListener('dataavailable', handleVideoData);
    recordBtn.addEventListener('click', stopRecording);
}

// 녹화 종료
const stopRecording = () => {
    videoRecorder.stop(); // stop 시 dataavailable 이벤트 발생 시킴
    recordBtn.removeEventListener('click', stopRecording);
    recordBtn.addEventListener('click', getVideo);
    recordBtn.innerHTML = 'Start Recording';
    videoPreview.srcObject = null;
}

const getVideo = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {width: 1280, height:720}
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();

        recordBtn.innerHTML = "Stop recording";
        streamObject = stream;
        startRecording();
    } catch (error) {
        recordBtn.innerHTML = "😟 Cant record";
    } finally {
        recordBtn.removeEventListener('click', getVideo);
    }
    
}

function init() {
    recordBtn.addEventListener('click', getVideo);
}

if(recorderContainer) {
    init();
}