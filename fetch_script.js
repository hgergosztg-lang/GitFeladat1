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
