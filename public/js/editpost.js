const editPost = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#postContent').value.trim();
    const title = document.querySelector('#title').value.trim();

    console.log(content)
    console.log(title)
    if (content && title) {
        const response = await fetch(`/api/posts/`, {
            method: 'PUT',
            body: JSON.stringify({content, title}),
            headers: {
                'Content-Type': 'application/json',
            },
            
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to create post!')
        }
    }
    
}

function getId() {
    var queryString = document.location;
    // var Id = queryString.pop();
    console.log(document)
   };
 

document.querySelector('.edit-post').addEventListener('submit',editPost);

getId();