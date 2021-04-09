let offset = 0;
let maxView = 50;
let offsetLoadNext = 200;

let memes;
let categories = [];
let categorySelect = document.querySelector("#categorySelect");
let imagesDiv = document.querySelector(".images");
let docElem = document.documentElement;
let docBody = document.body;


addCategory({
    name: "All",
    id: "all"
});

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function (){
    if(this.status === 200 && this.readyState === 4){
        memes = JSON.parse(this.responseText)["memes"];
        updateImages();
    }
}

xhr.open("GET", "https://api.tilera.xyz/jensmemes/v1/memes");
xhr.send();


xhr = new XMLHttpRequest();
xhr.onreadystatechange = function (){
    if(this.status === 200 && this.readyState === 4){
        let categories = JSON.parse(this.responseText)["categories"];
        categories.forEach((element) => {
            addCategory(element);
        });
    }
}

xhr.open("GET", "https://api.tilera.xyz/jensmemes/v1/categories");
xhr.send();

function addCategory(category){
    let optionItem = document.createElement("option");
    optionItem.setAttribute("value", category["id"]);
    optionItem.innerText = category["name"];
    categorySelect.appendChild(optionItem);
}

function updateImages(clear = false){
    if(clear){
        imagesDiv.innerHTML = "";
        offset = 0;
    }

    let category = categorySelect.value
    console.log("showing all elements of category " + category);
    let count = 0;
    console.log("offset: " + offset + "    meme length: " + memes.length)
    for(let i = offset; i < memes.length; i++){
        let meme = memes[i];
        if(category === meme["category"] || category === "all" && count < maxView){
            count++;
            let container = document.createElement("div")
            container.className = "imgContainer";

            if(endsWithArray(meme["link"], [".mp4", ".3gp"])){
                let video = document.createElement("video")
                video.setAttribute("src", meme["link"]);
                video.setAttribute("controls", "");
                video.setAttribute("onerror", "imageNotFound();");
                video.setAttribute("onclick", "openImgInNewTab(this);");
                container.appendChild(video);
            } else {
                let image = document.createElement("img")
                image.setAttribute("src", meme["link"]);
                image.setAttribute("onerror", "imageNotFound(this);");
                image.setAttribute("onclick", "openImgInNewTab(this);");
                container.appendChild(image);
            }
            imagesDiv.appendChild(container);

        } else if(count >= maxView){
            offset = i;
            return;
        }
    }
    offset = memes.length;
}

function endsWithArray(text = "", array = []){
    for(let i = 0; i < array.length; i++){
        if(text.endsWith(array[i])){
            return true;
        }
    }
    return false;
}

document.addEventListener('scroll', (event) => {
    let scrollTop = (docBody.scrollTop || docElem.scrollTop);
    let height = docElem.scrollHeight - docElem.clientHeight;
    if(scrollTop + offsetLoadNext > height){
        updateImages();
    }
});

categorySelect.onchange = () => {
    updateImages(true);
}

function imageNotFound(element) {
    console.log("deleting " + element.getAttribute("src") + ", because not found");
    element.parentNode.remove();
}

function openImgInNewTab(element){
    window.open(element.src);
}