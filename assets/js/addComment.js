import axios from 'axios';

const addCommentForm = document.getElementById('jsAddComment');
const commentList = document.getElementById('jsCommentList');
const commentNumber = document.getElementById('jsCommentNumber');

const increaseNumber = () => {
    const prevNumber = parseInt(commentNumber.textContent, 10);
    commentNumber.innerText = prevNumber + 1;
}

const addComment = (comment) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerHTML = comment;
    li.appendChild(span);
    commentList.prepend(li);
    increaseNumber();
}

const handleSubmitComment = (event) => {
    event.preventDefault();    
    const commentInput = addCommentForm.querySelector('input');
    const comment = commentInput.value;    
    commentInput.value = '';
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
    if (response.status === 200) {
        addComment(comment);
    }
}

function init() {
    addCommentForm.addEventListener('submit', handleSubmitComment);
}

if (addCommentForm) {
    init();
}
