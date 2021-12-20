console.log('coś tam');

let endOfPage = 0;

const showPreloader = () => {

}

const hidePreloader = () => {
    let preloader = document.getElementById('preloader');
    console.log('Show preloader');
}

const getData = () => {
    console.log('getData()');

    fetch('https://akademia108.pl/api/ajax/get-users.php')
        .then(response => response.json())
        .then(data => {

            let body = document.body;
            let hr = document.createElement('hr');
            body.appendChild(hr);

        
            console.log(data);
            for (let user of data) {
                let pId = document.createElement('p');
                let pUserName = document.createElement('p');
                let pUserUrl = document.createElement('p');

                pId.innerText = `User ID: ${user.id}`;
                pUserName.innerText = `User Name: ${user.name}`;
                pUserUrl.innerHTML = `User URL: ${user.website}<br>--------`;

                body.appendChild(pId);
                body.appendChild(pUserName);
                body.appendChild(pUserUrl);

            }

        })
        .catch(error => console.error('błąd: ', error));

}


const scrollToEndOfPage = () => {

    let d = document.documentElement;

    let scrollHeight = d.scrollHeight;
    console.log(`Scroll Height: ${scrollHeight}`)

    let scrollTop = d.scrollTop;
    console.log(`Scroll Top: ${scrollTop}`)

    let clientHeight = d.clientHeight;
    console.log(`Client Height: ${clientHeight}`)

    let sumaScrollTopPlusClientHeight = Math.ceil(scrollTop + clientHeight);
    console.log(`Suma: ${sumaScrollTopPlusClientHeight}`)
    console.log('=============')



    if (sumaScrollTopPlusClientHeight >= scrollHeight) {

        endOfPage += 1;
        console.log(`Przeskrolowano do końca strony: ${endOfPage}`);
        getData();
    }

}



window.addEventListener('scroll', scrollToEndOfPage)