import axios from 'axios';

const addCommentForm = document.getElementById('jsAddComment');
const commentList = document.getElementById('jsCommentList');
const commentNumber = document.getElementById('jsCommentNumber');

const increaseNumber = (isMinus) => {
    const prevNumber = parseInt(commentNumber.textContent, 10);
    if (isMinus) {
        commentNumber.innerText = prevNumber + isMinus;
        if (prevNumber + isMinus === 1) {
            commentNumber.parentElement.innerHTML = '<span class="video__comment-number" id="jsCommentNumber">1</span> comment';
        }
    } else {
        commentNumber.innerText = prevNumber + 1;
    }
    
}

const addComment = (comment, commentId) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const delBtn = document.createElement('span');
    delBtn.classList.add('deleteComment'); // del btn add class
    delBtn.id = commentId || '';
    span.innerHTML = comment;
    li.appendChild(span);
    li.appendChild(delBtn);
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
        const {commentId} = response.data;
        addComment(comment, commentId);
    }
}

const removeComment = (commentId) => {
    document.getElementById(commentId).parentElement.remove();
    increaseNumber(-1);
}

const handleClickList = async (event) => {
    const target = event.target;
    if (target.className === 'deleteComment' && target.id) {
        event.stopPropagation();
        const response = await axios({
            url: `/api/${target.id}/delete/comment`,
            method: 'POST'
        });

        if (response.status === 200) {
            removeComment(target.id);
        }
    }
}

function init() {
    addCommentForm.addEventListener('submit', handleSubmitComment);
    commentList.addEventListener('click', handleClickList);
}

if (addCommentForm) {
    init();
}
