var deletePost = async (event) => {
    if (event.target.hasAttribute('data-id')) {


        const id = event.target.getAttribute('data-id');
        const user_id = window.location.pathname.split('/')[2];

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        })

        if (response.ok) {
            document.location.replace(`/dashboard/${user_id}`)
        } else {
            alert('Failed to delete post')
        }
    }
}

let testPostID = (event) => {
    // if(event.target !== event.currrentTarget) {
        console.log(event.target.getAttribute('data-id'))
    // }

}

document.querySelector('.user-posts').addEventListener('click', deletePost)



