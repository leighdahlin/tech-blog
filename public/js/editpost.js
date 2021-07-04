const editPost = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#postContent').value.trim();
    const title = document.querySelector('#title').value.trim();
    var post_id = window.location.pathname.split('/')[3];


    console.log(content)
    console.log(title)
    if (content && title) {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({content, title, post_id}),
            headers: {
                'Content-Type': 'application/json',
            },
            
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to edit post!')
        }
    }
    
}

 
document.querySelector('.edit-post').addEventListener('submit',editPost);

// const submitPost = async (event) => {
//     event.preventDefault();

//     const content = document.querySelector('#postContent').value.trim();
//     const title = document.querySelector('#title').value.trim();
//     const user_id = window.location.pathname.split('/')[4];
//     const url = `/api/posts/new/${user_id}`;

//     if (content && title) {
//         const response = await fetch(url, {
//             method: 'POST',
//             body: JSON.stringify({content, title}),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
            
//         });

//         if (response.ok) {
//             document.location.replace(`/dashboard/${user_id}`);

//         } else {
//             alert('Failed to create post!')
//         }
//     }
    
// };