let btnStar = document.getElementById("star");
const favoritosContent = document.getElementById("favoritos-content");
let favoritosList = [];

const btnVaciar = document.getElementById("vaciar-carrito");

let btnFavoritos = document.getElementsByClassName("btn-favorito");

for(let i = 0; i < btnFavoritos.length; i++){
    let el = btnFavoritos[i]
    let prodEl = el.parentElement.parentElement.parentElement;
    el.addEventListener("click", () => {
        saveFavorito(prodEl, el);
    })
}

const initFavoritos = () => {
    const favoritosStorage = localStorage.getItem('favoritos');
    if(favoritosStorage != null){
        btnVaciar.classList.remove("hidden");
        favoritosList = JSON.parse(favoritosStorage);
        let favoritosTemplate = ``;
    
        for(let i = 0; i < favoritosList.length; i++){
            const item = favoritosList[i];
            console.log({item});
            favoritosTemplate += `
                ${item ? item.element : ""}
            `;

            let btnF = document.getElementById(`${item.id}`);
            btnF.classList.add("active");
        }
    
        favoritosContent.innerHTML = favoritosTemplate;
        btnStar.innerHTML = `<span>${favoritosList.length}</span>`;
    }else{
        let btnsF = document.getElementsByClassName("btn-favorito");
        for(let i = 0; i < btnsF.length; i++){
            btnsF[i].classList.remove("active");
        }
        btnVaciar.classList.add("hidden");
        // favoritosContent.innerHTML = "<span class='no-favoritos'>No tienes favoritos <i class='fa-regular fa-face-frown-open'></i></span>";
        favoritosContent.innerHTML = "<span class='no-favoritos'><i class='fa-solid fa-star'></i></span>";
        favoritosContent.innerHTML += "<p class='vacio'>Vacío</p>";
    }
}

const saveFavorito = (element, el) => {
    console.log({el});
    console.log(element.outerHTML);
    favoritosList.push({element: element.outerHTML, id: `${el.id}`})
    localStorage.setItem('favoritos', JSON.stringify(favoritosList))
    initFavoritos();
}

btnVaciar.addEventListener("click", () => {
    localStorage.removeItem("favoritos");
    let carrProd = document.querySelectorAll("#carrito .producto");
    for(let i = 0; i < carrProd.length; i++){
        carrProd[i].remove();
    }
    favoritosList = [];
    btnStar.innerHTML = "";
    initFavoritos();
})

initFavoritos();


