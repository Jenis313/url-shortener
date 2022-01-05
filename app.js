// alert('connected');
let urlForm = document.querySelector('.url-form');
// console.log(urlForm);
function makeDiv(shortUrl, url){
    let newDiv = document.createElement("div");
    newDiv.classList.add('short-url-cont');
    let leftPara = document.createElement("p");
    let middlePara = document.createElement("p");
    let cpyBtn = document.createElement('button');
    leftPara.classList.add('ori-url');
    middlePara.classList.add('short-url');
    cpyBtn.classList.add('copy-btn');
    leftPara.innerHTML = url;
    middlePara.innerHTML = shortUrl;
    cpyBtn.innerHTML = 'Copy'
    newDiv.append(leftPara);
    newDiv.append(middlePara);
    newDiv.append(cpyBtn);
    return newDiv;
}
function copyFunc(text){
    navigator.clipboard.writeText(text);
}
urlForm.addEventListener('submit', (e) => {
    let link = document.querySelector('#link').value;
    // console.log(link);
    fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
    .then((data) => {
        return data.json()
    })
    .then(data => {
        // console.log('data --> ', data)
        let resultHideDiv = document.querySelector('#results');
        resultHideDiv.innerHTML = '';
        resultHideDiv.appendChild(makeDiv(data.result.short_link, link))

        // after result
        let copyBtn = document.querySelector('.copy-btn')
        copyBtn.addEventListener('click', (e) => {
            console.log('clicked');
            copyFunc(data.result.short_link)
            copyBtn.classList.add('copied')
            copyBtn.innerHTML = 'Copied';
            e.preventDefault();
        })

    })
    .catch((err) => {
        console.log('err is -> ', err);
    })
    e.preventDefault();
})
