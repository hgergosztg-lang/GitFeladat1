import React, { useState } from 'react';

function App() {
  // 1. Valódi adatok a szalloda.txt alapján 
  const [szallodak, setSzallodak] = useState([
    { az: "BS", nev: "Baron Resort", besorolas: 5, helyseg_az: 3, tengerpart_tav: 0 },
    { az: "CL", nev: "Charm Life", besorolas: 3, helyseg_az: 4, tengerpart_tav: 0 },
    { az: "CP", nev: "Cesar Palace", besorolas: 5, helyseg_az: 2, tengerpart_tav: 250 },
    { az: "CW", nev: "Caribbean World Soma Bay", besorolas: 5, helyseg_az: 4, tengerpart_tav: 0 },
    { az: "CZ", nev: "Crowne Plaza", besorolas: 4, helyseg_az: 3, tengerpart_tav: 400 },
    { az: "FJ", nev: "Festival Le Jardin Resort", besorolas: 4, helyseg_az: 4, tengerpart_tav: 0 },
    { az: "JR", nev: "Jinene Resort", besorolas: 4, helyseg_az: 1, tengerpart_tav: 50 },
    { az: "MB", nev: "Marhaba", besorolas: 3, helyseg_az: 1, tengerpart_tav: 0 }
  ]);

  const [ujNev, setUjNev] = useState('');

  // CREATE: Új szálloda felvétele
  const hozzaadas = (e) => {
    e.preventDefault();
    if (!ujNev) return;
    const uj = { 
      az: "NEW" + Math.floor(Math.random() * 100), 
      nev: ujNev, 
      besorolas: 1, 
      helyseg_az: 1, 
      tengerpart_tav: 0 
    };
    setSzallodak([...szallodak, uj]);
    setUjNev('');
  };

  // UPDATE: Név szerkesztése (Egyszerűsítve: kattints a névre)
  const szerkesztes = (az) => {
    const ujNevValtozat = prompt("Add meg az új nevet:");
    if (ujNevValtozat) {
      setSzallodak(szallodak.map(sz => sz.az === az ? { ...sz, nev: ujNevValtozat } : sz));
    }
  };

  // DELETE: Szálloda törlése
  const torles = (az) => {
    if(window.confirm("Biztosan törlöd?")) {
      setSzallodak(szallodak.filter(sz => sz.az !== az));
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Napfény Tours - React CRUD menü</h1>
      
      <form onSubmit={hozzaadas} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Szálloda neve" 
          value={ujNev} 
          onChange={(e) => setUjNev(e.target.value)} 
        />
        <button type="submit">Új szálloda hozzáadása</button>
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#eee' }}>
            <th>Kód</th>
            <th>Név (Szerkesztéshez kattints rá)</th>
            <th>Csillag</th>
            <th>Tengerpart (m)</th>
            <th>Művelet</th>
          </tr>
        </thead>
        <tbody>
          {szallodak.map(sz => (
            <tr key={sz.az}>
              <td>{sz.az}</td>
              <td onClick={() => szerkesztes(sz.az)} style={{ cursor: 'pointer', color: 'blue' }}>
                {sz.nev}
              </td>
              <td>{sz.besorolas}*</td>
              <td>{sz.tengerpart_tav}</td>
              <td>
                <button onClick={() => torles(sz.az)} style={{ color: 'red' }}>Törlés</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
