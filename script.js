const api1Url = "https://dummyjson.com/posts";
const api2Url = "https://dummyjson.com/products";
const api3Url = "https://dummyjson.com/todos";

function fetchFromApi1(apiUrl) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(apiUrl) 
                .then(response => response.json())
                .then(data => {
                    console.log(data.posts);
                    resolve(data.posts);
                }) 
                .catch(error => {
                    reject(error);
                });
        }, 1000);
    });
}

function fetchFromApi2(apiUrl) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data.products);
                    resolve(data.products);
                })
                .catch(error => {
                    reject(error);
                });
        },2000);
    });
}

function fetchFromApi3(apiUrl) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data.todos);
                    resolve(data.todos);
                })
                .catch(error => {
                    reject(error);
                });
        },3000);
    });
}


function fetchApi() {
    const tableBody = document.querySelector("#data-table tbody");
    const api1Promise = fetchFromApi1(api1Url);
    const api2Promise = api1Promise.then(() => fetchFromApi2(api2Url));
    const api3Promise = api2Promise.then(() => fetchFromApi3(api3Url));

    api1Promise
        .then(api1Data => {
            api1Data.forEach(item => {
                const row = document.createElement("tr");
                const cell = document.createElement("td");
                cell.innerText = item.title;
                row.appendChild(cell);
                tableBody.appendChild(row);
            });

            return true;
        })
        .then(api1Resolved => {
            if (api1Resolved) {
                return api2Promise;
            }
        })
        .then(api2Data => {
            api2Data.forEach(item => {
                const row = document.querySelector(`#data-table tbody tr:nth-child(${item.id})`);
                const cell = document.createElement("td");
                cell.innerText = item.title;
                row.appendChild(cell);
            });

            return true;
        })
        .then(api2Resolved => {
            if (api2Resolved) {
                return api3Promise;
            }
        })
        .then(api3Data => {
            api3Data.forEach(item => {
                const row = document.querySelector(`#data-table tbody tr:nth-child(${item.id})`);
                const cell = document.createElement("td");
                cell.innerText = item.completed;
                row.appendChild(cell);
            });
        })

        .catch(error => {
            console.error(error);
        });
}

const fetchDataButton = document.querySelector("#fetchDataButton");
fetchDataButton.addEventListener("click", fetchApi);
