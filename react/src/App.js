import React, { useState } from 'react';

// --- 1. MODUL: SZÁLLODA CRUD (szalloda.txt adatokkal) ---
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
          value={ujNev} 
          onChange={(e) => setUjNev(e.target.value)} 
          placeholder="Új szálloda neve..." 
          style={{ padding: '8px', marginRight: '5px' }}
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
      <button onClick={() => setBoard(Array(9).fill(null))} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>Új játék</button>
    </div>
  );
}

function calculateWinner(s) {
  const l = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (let [a, b, c] of l) { if (s[a] && s[a] === s[b] && s[a] === s[c]) return s[a]; }
  return null;
}

// --- 3. MODUL: KOMOLYABB CALCULATOR ---
function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const ops = ["/", "*", "+", "-", "."];

  const updateInput = (val) => {
    if (ops.includes(val) && input === "" || ops.includes(val) && ops.includes(input.slice(-1))) {
      return;
    }
    setInput(input + val);
    if (!ops.includes(val)) {
      setResult(eval(input + val).toString());
    }
  };

  const calculate = () => { setInput(eval(input).toString()); };
  const deleteLast = () => { if (input === "") return; setInput(input.slice(0, -1)); };
  const clearAll = () => { setInput(""); setResult(""); };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', background: '#222', padding: '15px', borderRadius: '10px' }}>
      <h3 style={{ color: 'white', textAlign: 'center' }}> Számológép</h3>
      <div style={{ background: '#444', color: 'white', padding: '10px', textAlign: 'right', minHeight: '50px', marginBottom: '10px', borderRadius: '5px' }}>
        <div style={{ fontSize: '14px', color: '#aaa' }}>{result ? '(' + result + ')' : ''}</div>
        <div style={{ fontSize: '24px' }}>{input || "0"}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>
        <button onClick={clearAll} style={{ gridColumn: 'span 2', background: '#e74c3c', color: 'white' }}>AC</button>
        <button onClick={deleteLast} style={{ background: '#f39c12', color: 'white' }}>DEL</button>
        <button onClick={() => updateInput('/')}>/</button>
        
        {[7,8,9].map(n => <button key={n} onClick={() => updateInput(n.toString())}>{n}</button>)}
        <button onClick={() => updateInput('*')}>*</button>
        
        {[4,5,6].map(n => <button key={n} onClick={() => updateInput(n.toString())}>{n}</button>)}
        <button onClick={() => updateInput('-')}>-</button>
        
        {[1,2,3].map(n => <button key={n} onClick={() => updateInput(n.toString())}>{n}</button>)}
        <button onClick={() => updateInput('+')}>+</button>
        
        <button onClick={() => updateInput('0')} style={{ gridColumn: 'span 2' }}>0</button>
        <button onClick={() => updateInput('.')}>.</button>
        <button onClick={calculate} style={{ background: '#2ecc71', color: 'white' }}>=</button>
      </div>
    </div>
  );
}

// --- FŐ ALKALMAZÁS (SPA MENÜ) ---
export default function App() {
  const [page, setPage] = useState('crud');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '800px', margin: 'auto', minHeight: '100vh', background: '#f4f7f6' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#2c3e50' }}>Web-1 Beadandó</h1>
         </header>
      
      <nav style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
        <button onClick={() => setPage('crud')} style={btnStyle(page === 'crud')}>Szálloda CRUD</button>
        <button onClick={() => setPage('tic')} style={btnStyle(page === 'tic')}>Amőba Játék</button>
        <button onClick={() => setPage('calc')} style={btnStyle(page === 'calc')}>Számológép</button>
      </nav>

      <main style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
        {page === 'crud' && <SzallodaCRUD />}
        {page === 'tic' && <TicTacToe />}
        {page === 'calc' && <Calculator />}
      </main>

      <footer style={{ textAlign: 'center', marginTop: '40px', color: '#7f8c8d', fontSize: '0.9em' }}>
      </footer>
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
