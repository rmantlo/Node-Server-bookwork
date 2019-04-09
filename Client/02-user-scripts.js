
///createuser
function userSignUp() {
    let userName = document.getElementById('userSignUp').value;
    let userPass = document.getElementById('passSignUp').value;
    console.log(userName, userPass);

    let newUserData = { user: { username: userName, password: userPass } };
    fetch('http://localhost:3000/api/user/createuser', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(newUserData)
    })
        .then(res => res.json())
        .then(function (response) {
            console.log(response.sessionToken);
            let token = response.sessionToken;
            localStorage.setItem('SessionToken', token)
        })
}

function userSignIn(){
    let userName = document.getElementById('userSignin').value;
    let userPass = document.getElementById('passSignin').value;
    console.log(userName, userPass);

    let userData = {user: { username: userName, password: userPass}};
    fetch('http://localhost:3000/api/user/signin', {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(userData)
    })
    .then( res => res.json())
    .then(function(response){
        console.log(response.sessionToken)
        let token = response.sessionToken;
        localStorage.setItem('SessionToken', token);
    })
}

//helper function for token
function getSessionToken(){
    let data = localStorage.getItem('SessionToken');
    console.log(data);
    return data;
}