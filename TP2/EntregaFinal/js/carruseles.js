"use strict"
let carruseles = [
    {
        categoria: "Acción y Aventura",
        cards: [
            {
                titulo: "Assassins Creed Shadows",
                imagen: "assassinscreedshadow.png",
                precio: 17.99,
                boton: "<button>Sacar de carrito</button>"
            },
            {
                
            }
        ]
    },
];

function crearCarruseles() {
    let section = document.getElementById("carruseles");
    for(let i = 0; i<carruseles.length;i++){
        let article = document.createElement("article");
        for (let j = 0; j < carruseles[i].cards.length; j++) {
            article.innerHTML = article.innerHTML + '<figure><img src="img/Cards/' + carruseles[i].cards[j].imagen + '" alt=""><figcaption><h2>' + carruseles[i].cards[j].titulo + '</h2><h3>$' + carruseles[i].cards[j].precio + ' USD</h3>' + carruseles[i].cards[j].boton +'</figcaption></figure>';
        }
        section.appendChild(article);
    }
}

crearCarruseles();