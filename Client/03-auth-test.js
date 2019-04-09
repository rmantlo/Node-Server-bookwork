
//get all from authed user
function fetchAllFromAuthRoute() {
    const fetch_url = `http://localhost:3000/authtest/getall`
    const accessToken = localStorage.getItem('SessionToken')

    const response = fetch(fetch_url, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": accessToken
        }
    })
        .then(response => { return response.json() })
        .then(data => {
            console.log(data)
        })
}

//fetch/post to auth/create
function postToAuthRouteCreate() {
    const fetch_url = 'http://localhost:3000/authtest/create'
    const accessToken = localStorage.getItem('SessionToken')

    let authTestDataInput = document.getElementById('authTestData').value;
    let authInputData = { authtestdata: { item: authTestDataInput } };

    const response = fetch(fetch_url, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": accessToken
        },
        body: JSON.stringify(authInputData)
    })
        .then(res => res.json())
        .then(data => console.log(data))
}

//to get single item by user
function getOneByUser() {
    let postIdNumber = document.getElementById('getNumber').value;

    const fetch_url = `http://localhost:3000/authtest/${postIdNumber}`
    const accessToken = localStorage.getItem('SessionToken')
    const response = fetch(fetch_url, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": accessToken
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let myItem = document.getElementById('getItemValue');
            myItem.innerHTML = data.authtestdata;
        })
}

//put to authtest/update
function updateItem() {
    let postIdNumber = document.getElementById('updateNumber').value;
    let authTestDataInput = document.getElementById('updateValue').value;

    const fetch_url = `http://localhost:3000/authtest/update/${postIdNumber}`
    const accessToken = localStorage.getItem('SessionToken')

    let authInputData = { authtestdata: { item: authTestDataInput } }
    const response = fetch(fetch_url, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": accessToken
        },
        body: JSON.stringify(authInputData)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let myItem = document.getElementById('newItemValue');
            myItem.innerHTML = data.authtestdata;
            fetchAllFromAuthRoute();

        })
}

function showCurrentData(e) {
    const fetch_url = `http://localhost:3000/authtest/${e.value}`;
    const accessToken = localStorage.getItem('SessionToken');

    fetch(fetch_url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": accessToken
        }
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            let myItem = document.getElementById('updateValue');
            if (!res) return;
            else myItem.value = res.authtestdata;
        })
}

//deleting an item
function deleteItem() {
    let postIdNumber = document.getElementById('deleteNumber').value;

    const fetch_url = `http://localhost:3000/authtest/delete/${postIdNumber}`
    const accessToken = localStorage.getItem('SessionToken');

    const response = fetch(fetch_url, {
        method: "DELETE",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": accessToken
        }
    })
        .then(res => {
            console.log(res);
            fetchAllFromAuthRoute();
        })
}


//delete by id
function deleteItemById(paramNum){
    const fetch_url = `http://localhost:3000/authtest/delete/${paramNum}`
    const accessToken = localStorage.getItem('SessionToken');

    const response = fetch(fetch_url, {
        method: 'DELETE',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": accessToken
        }
    })
    .then(res => {
        console.log(res);
        fetchAllFromAuthRoute();
    })
}

//deleting all items from single user
//first we display
function fetchFromOneDisplayData(){
    const url = 'http://localhost:3000/authtest/getall';
    const accessToken = localStorage.getItem('SessionToken');

    fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": accessToken
        }
    }).then(
        res => {return res.json()}
    ).catch(err => console.log(err))
    .then( res => {
        let text = '';
        let myList = document.querySelector('ul#fourteen');
        while(myList.firstChild){
            myList.removeChild(myList.firstChild)
        }
        console.log(res);
        for(r of res){
            let listItem = document.createElement('li');
            let textData = r.id + ' ' + r.authtestdata;
            listItem.innerHTML = textData;
            listItem.setAttribute('id', r.id);
            myList.appendChild(listItem);
            myList.addEventListener('click', removeItem);
        }
    })
}

function removeItem(e){
    console.log(e);
    let target = e.target;
    if(target.tagName !== 'LI') return;
    else target.parentNode.removeChild(target);

    let x = target.getAttribute('id')
    deleteItemById(x);
    //console.log('the id number for this item is '+ x)
}