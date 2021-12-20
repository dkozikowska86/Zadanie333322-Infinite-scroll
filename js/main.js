console.log('JS działa');

let endOfPage = 0;
let preloading = false;


const showPreloader = () => {
    let preloader = document.getElementById('preloader');
    console.log(`showPreloader()`);
    preloader.style.display = 'block';
    preloading = true;
}


const hidePreloader = () => {
    let preloader = document.getElementById('preloader');
    console.log(`hidereloader()`);
    preloader.style.display = 'none';
    preloading = false;
}


const getData = () => {

    if (!preloading) {

        showPreloader();

        fetch('https://akademia108.pl/api/ajax/get-users.php')
            .then(response => response.json())
            .then(data => {

                console.log(data);

                let body = document.body;
                let hr = document.createElement('hr');
                body.appendChild(hr);

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

                    hidePreloader()
                }

            })
            .catch(error => console.error('błąd: ', error));
    }
}


const scrollToEndOfPage = () => {

    let d = document.documentElement;
    let scrollHeight = d.scrollHeight;
    let scrollTop = d.scrollTop;
    let clientHeight = d.clientHeight;
    let sumaScrollTopPlusClientHeight = Math.ceil(scrollTop + clientHeight);

    console.log(`Scroll Height: ${scrollHeight}`);
    console.log(`Scroll Top: ${scrollTop}`);
    console.log(`Client Height: ${clientHeight}`);
    console.log(`Suma: ${sumaScrollTopPlusClientHeight}`);
    console.log('=============');

    if (sumaScrollTopPlusClientHeight >= scrollHeight) {

        endOfPage += 1;
        console.log(`Przeskrolowano do końca strony: ${endOfPage}x.`);

        getData();

    }
}


window.addEventListener('scroll', scrollToEndOfPage);