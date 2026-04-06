const API_URL = 'backend.php';

async function listaFrissit() {
    try {
        const response = await fetch(API_URL);
        const adatok = await response.json();
        
        const tbody = document.getElementById("lista");
        tbody.innerHTML = "";
        
        adatok.forEach(h => {
            tbody.innerHTML += `
                <tr>
                    <td>${h.az}</td>
                    <td>${h.nev}</td>
                    <td>${h.orszag}</td>
                    <td><button onclick="torol(${h.az})" style="background:#ffcdd2">Törlés</button></td>
                </tr>`;
        });
    } catch (err) {
        console.error(err);
    }
}

async function hozzaad() {
    const nev = document.getElementById("nev").value;
    const orszag = document.getElementById("orszag").value;

    if (!nev || !orszag) return;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nev: nev, orszag: orszag })
    });

    document.getElementById("nev").value = "";
    document.getElementById("orszag").value = "";
    listaFrissit();
}

async function torol(id) {
    if (confirm("Biztosan törlöd?")) {
        await fetch(`${API_URL}?id=${id}`, {
            method: 'DELETE'
        });
        listaFrissit();
    }
}

window.onload = listaFrissit;
