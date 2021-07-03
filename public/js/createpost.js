const submitPost = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#postContent').value.trim();
    const title = document.querySelector('#title').value.trim();

    console.log(content)
    console.log(title)
    if (content && title) {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
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


