let utazasok = [
    { id: 1, nev: "Párizs", ar: 200000 },
    { id: 2, nev: "Róma", ar: 150000 }
];

// LISTA MEGJELENÍTÉS
function listaFrissit() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    utazasok.forEach((u, index) => {
        lista.innerHTML += `
            <li>
                ${u.nev} - ${u.ar} Ft
                <button onclick="torol(${index})">Törlés</button>
                <button onclick="modosit(${index})">Módosítás</button>
            </li>
        `;
    });
}

// HOZZÁADÁS
function hozzaad() {
    let nev = document.getElementById("nev").value;
    let ar = document.getElementById("ar").value;

    if (nev === "" || ar === "") {
        alert("Tölts ki mindent!");
        return;
    }

    utazasok.push({
        id: Date.now(),
        nev: nev,
        ar: ar
    });

    listaFrissit();
}

// TÖRLÉS
function torol(index) {
    utazasok.splice(index, 1);
    listaFrissit();
}

// MÓDOSÍTÁS
function modosit(index) {
    let ujNev = prompt("Új név:", utazasok[index].nev);
    let ujAr = prompt("Új ár:", utazasok[index].ar);

    utazasok[index].nev = ujNev;
    utazasok[index].ar = ujAr;

    listaFrissit();
}

// BETÖLTÉS
listaFrissit();
