import axios from 'axios';

const addCommentForm = document.getElementById('jsAddComment');


const handleSubmitComment = (event) => {
    event.preventDefault();    
    const commentInput = addCommentForm.querySelector('input');
    const comment = commentInput.value;    
    sendComment(comment);
}

const sendComment = async (comment) => {
    const videoId = window.location.href.split('/videos/')[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: 'POST',
        data: {
            comment: comment
        }
    });
    console.log(response);
}

function init() {
    addCommentForm.addEventListener('submit', handleSubmitComment);
}

if (addCommentForm) {
    init();
}
