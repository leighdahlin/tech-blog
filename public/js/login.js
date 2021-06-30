const loginForm = async (event) => {
    event.preventDefault();
    console.log("YOU MADE IT IN HERE")
    //get values input by user in login form
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email,password}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            console.log(response)
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

const signUpForm = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {'Content-Type': 'application/json'},
        })
    }

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }    
}

document.querySelector('.login').addEventListener('submit',loginForm);

document.querySelector('.sign-up').addEventListener('submit',signUpForm);