import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- 1. MODUL: SZÁLLODA CRUD (Helyi adatokkal) ---
function SzallodaCRUD() {
  const [szallodak, setSzallodak] = useState([
    { az: "BS", nev: "Baron Resort", besorolas: 5, tav: 0 },
    { az: "CL", nev: "Charm Life", besorolas: 3, tav: 0 },
    { az: "CP", nev: "Cesar Palace", besorolas: 5, tav: 250 },
    { az: "CW", nev: "Caribbean World Soma Bay", besorolas: 5, tav: 0 }
  ]);
  const [ujNev, setUjNev] = useState('');

  const hozzaadas = (e) => {
    e.preventDefault();
    if (!ujNev) return;
    setSzallodak([...szallodak, { az: "NEW" + Date.now(), nev: ujNev, besorolas: 1, tav: 0 }]);
    setUjNev('');
  };

  const torles = (az) => setSzallodak(szallodak.filter(sz => sz.az !== az));

  return (
    <div style={{ background: '#fff', padding: '15px' }}>
      <h3 style={{ borderBottom: '2px solid #3498db' }}>Szállodák Kezelése (Helyi CRUD)</h3>
      <form onSubmit={hozzaadas} style={{ marginBottom: '15px' }}>
        <input 
          value={ujNev} onChange={(e) => setUjNev(e.target.value)} 
          placeholder="Új szálloda neve..." style={{ padding: '8px', marginRight: '5px' }}
        />
        <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>Hozzáadás</button>
      </form>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead><tr style={{ background: '#f2f2f2' }}><th>Név</th><th>Besorolás</th><th>Művelet</th></tr></thead>
        <tbody>
          {szallodak.map(sz => (
            <tr key={sz.az}>
              <td style={{ padding: '8px' }}>{sz.nev}</td>
              <td style={{ padding: '8px' }}>{sz.besorolas}*</td>
              <td style={{ padding: '8px' }}><button onClick={() => torles(sz.az)} style={{ color: 'red', cursor: 'pointer' }}>Törlés</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- 2. MODUL: TIC-TAC-TOE ---
function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const handleClick = (i) => {
    if (calculateWinner(board) || board[i]) return;
    const next = board.slice();
    next[i] = xIsNext ? 'X' : 'O';
    setBoard(next);
    setXIsNext(!xIsNext);
  };
  const winner = calculateWinner(board);
  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Amőba Játék</h3>
      <div style={{ fontSize: '20px', marginBottom: '10px' }}>{winner ? "Győztes: " + winner : "Soron jön: " + (xIsNext ? "X" : "O")}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 60px)', gap: '8px', justifyContent: 'center' }}>
        {board.map((v, i) => (
          <button key={i} onClick={() => handleClick(i)} style={{ height: '60px', fontSize: '24px', cursor: 'pointer' }}>{v}</button>
        ))}
      </div>
      <button onClick={() => setBoard(Array(9).fill(null))} style={{ marginTop: '20px', padding: '10px 20px' }}>Új játék</button>
    </div>
  );
}
function calculateWinner(s) {
  const l = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (let [a, b, c] of l) { if (s[a] && s[a] === s[b] && s[a] === s[c]) return s[a]; }
  return null;
}

// --- 3. MODUL: SZÁMOLÓGÉP ---
function Calculator() {
  const [input, setInput] = useState("");
  const updateInput = (val) => setInput(input + val);
  const calculate = () => { try { setInput(eval(input).toString()); } catch(e) { setInput("Hiba"); } };
  return (
    <div style={{ maxWidth: '300px', margin: 'auto', background: '#222', padding: '15px', borderRadius: '10px', color: 'white' }}>
      <h3 style={{ textAlign: 'center' }}>Számológép</h3>
      <div style={{ background: '#444', padding: '10px', textAlign: 'right', fontSize: '24px', marginBottom: '10px' }}>{input || "0"}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>
        {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','+'].map(btn => (
          <button key={btn} onClick={() => updateInput(btn)} style={{ padding: '10px' }}>{btn}</button>
        ))}
        <button onClick={calculate} style={{ background: '#2ecc71', color: 'white' }}>=</button>
        <button onClick={() => setInput("")} style={{ background: '#e74c3c', color: 'white', gridColumn: 'span 4' }}>Törlés</button>
      </div>
    </div>
  );
}

// --- 4. MODUL: AXIOS CRUD (A beküldött PHP-hoz igazítva) ---
function AxiosCRUD() {
  const [lista, setLista] = useState([]);
  const API_URL = "./backend.php"; // Relatív út a Nethelyhez

  const frissites = () => {
    axios.get(API_URL)
      .then(res => setLista(res.data))
      .catch(err => console.error("Adatbázis hiba:", err));
  };

  useEffect(() => { frissites(); }, []);

  const torles = (id) => {
    // A PHP-d a $_GET['id']-t várja a törléshez
    axios.delete(`${API_URL}?id=${id}`)
      .then(() => frissites())
      .catch(err => alert("Hiba a törlésnél!"));
  };

  return (
    <div>
      <h3 style={{ color: '#27ae60' }}>Adatbázis (MySQL + PHP + Axios)</h3>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr style={{ background: '#eee' }}><th>ID</th><th>Város</th><th>Ország</th><th>Művelet</th></tr></thead>
        <tbody>
          {lista.length > 0 ? lista.map(h => (
            <tr key={h.az}>
              <td style={{ padding: '8px' }}>{h.az}</td>
              <td style={{ padding: '8px' }}>{h.nev}</td>
              <td style={{ padding: '8px' }}>{h.orszag}</td>
              <td style={{ padding: '8px' }}>
                <button onClick={() => torles(h.az)} style={{ color: 'red', cursor: 'pointer' }}>Törlés</button>
              </td>
            </tr>
          )) : <tr><td colSpan="4" style={{ textAlign: 'center', padding: '10px' }}>Nincs adat az adatbázisban.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

// --- FŐ ALKALMAZÁS ---
export default function App() {
  const [page, setPage] = useState('crud');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>React Portfólió</h1>
      <nav style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={() => setPage('crud')} style={btnStyle(page === 'crud')}>Helyi CRUD</button>
        <button onClick={() => setPage('tic')} style={btnStyle(page === 'tic')}>Amőba</button>
        <button onClick={() => setPage('calc')} style={btnStyle(page === 'calc')}>Számológép</button>
        <button onClick={() => setPage('axios')} style={{ ...btnStyle(page === 'axios'), background: '#2ecc71', color: 'white' }}>Axios (Adatbázis)</button>
      </nav>

      <div style={{ border: '2px solid #3498db', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        {page === 'crud' && <SzallodaCRUD />}
        {page === 'tic' && <TicTacToe />}
        {page === 'calc' && <Calculator />}
        {page === 'axios' && <AxiosCRUD />}
      </div>
    </div>
  );
}

const btnStyle = (active) => ({
  padding: '12px 20px',
  background: active ? '#3498db' : '#fff',
  color: active ? 'white' : '#34495e',
  border: '1px solid #3498db',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: '0.3s'
});
