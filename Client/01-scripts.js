function fetchHelloDataFromAPI() {
    fetch('http://localhost:3000/test/helloclient', {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then((response) => {
            console.log("Fetch response:", response)
            return response.text();
        })
        .then(function (text) {
            console.log(text);
        });
}

function postToOne() {
    let url = 'http://localhost:3000/test/one';

    fetch(url, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        })
    }).then(response => {
        return response.text();
    })
        .catch(err => console.log('Error:', err))
        .then(response => console.log('Success:', response))
}

function postToOneArrow() {
    let url = 'http://localhost:3000/test/one';
    fetch(url, {
        method: 'POST',
        headers: new Headers({
            "Content-Type": "application/json"
        })
    }).then(res => res.text())
        .catch(err => console.error('Error:', err))
        .then(response => console.log('Success:', response));
}

function postData() {
    let content = { testdata: { item: 'This was saved!' } };
    let testDataAfterFetch = document.getElementById('test-data');
    let createdAtAfterFetch = document.getElementById('created-at');

    fetch('http://localhost:3000/test/seven', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(content)
    })
        .then(res => res.json())
        .then(function (text) {
            console.log(text);
            testDataAfterFetch.innerHTML = text.testdata.testdata;
            createdAtAfterFetch.innerHTML = text.testdata.createdAt;
        })
}

function fetchFromOneDisplayData() {
    let url = 'http://localhost:3000/test/one';
    let dataView = document.getElementById('display-one');

    fetch(url, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json"
        })
    })
        .then(res => res.json())
        .catch(err => console.log('Error:', err))
        .then(results => {
            let myList = document.querySelector('#getjson');
            for (r of results) {
                console.log('Response:', r.testdata);
                let listItem = document.createElement('li');
                listItem.innerHTML = r.testdata;
                myList.appendChild(listItem);
            }
        })
}