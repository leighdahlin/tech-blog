const formSelector = document.querySelector('.comment');

const newComment = async (event) => {
    event.preventDefault();

   const content = document.querySelector('#comment-box').value.trim();
   //gets the post id from the pathname by spliting it on every /
   var post_id = window.location.pathname.split('/')[2];


    if (content) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({content, post_id}),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            document.location.replace(`/post/${post_id}`);
        } else {
            alert('Failed to create post!')
        }

    }
}

const createTextBox = () => {
    const div = document.createElement('div');
    div.setAttribute('class','form-group');

    formSelector.appendChild(div)

    const commentBox = document.createElement('textarea');
    commentBox.setAttribute('class','form-control');
    commentBox.setAttribute('id','comment-box');
    commentBox.setAttribute('rows','2');

    div.appendChild(commentBox);

    const div2 = document.createElement('div');
    div2.setAttribute('class','form-group');

    formSelector.appendChild(div2)

    const submitBtn = document.createElement('button');
    submitBtn.setAttribute('type','submit');
    submitBtn.setAttribute('id','submit-comment');
    submitBtn.textContent = "Submit";

    div2.appendChild(submitBtn);



}



document.querySelector('#newComment').addEventListener('click',createTextBox)

document.querySelector('.comment').addEventListener('submit',newComment)
