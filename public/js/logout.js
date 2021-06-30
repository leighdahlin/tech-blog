const logout = async () => {
    const reponse = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    });

    if (reponse.ok) {
        document.location.replace('/');
    } else {
        alert(reponse.statusText);
    }
}

document.querySelector('#logout').addEventListener('click', logout)