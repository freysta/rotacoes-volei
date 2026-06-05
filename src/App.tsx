import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './App.css';
import type { Player, Role } from './types';
import { PlayerForm } from './components/PlayerForm';
import { RotationGrid } from './components/RotationGrid';

const INITIAL_PLAYERS: Player[] = [
  { id: 'Levantador', role: 'Levantador', name: 'Bruninho' },
  { id: 'Oposto', role: 'Oposto', name: 'Wallace' },
  { id: 'Ponteiro 1', role: 'Ponteiro 1', name: 'Lucarelli' },
  { id: 'Ponteiro 2', role: 'Ponteiro 2', name: 'Leal' },
  { id: 'Central 1', role: 'Central 1', name: 'Lucão' },
  { id: 'Central 2', role: 'Central 2', name: 'Maurício' },
  { id: 'Líbero', role: 'Líbero', name: 'Thales' },
];

function App() {
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const exportRef = useRef<HTMLDivElement>(null);

  const handlePlayerChange = (role: Role, newName: string) => {
    setPlayers(prev => prev.map(p =>
      p.role === role ? { ...p, name: newName } : p
    ));
  };

  const exportAsImage = async () => {
    if (!exportRef.current) return;

    try {
      const canvas = await html2canvas(exportRef.current, {
        backgroundColor: '#0a0a0a',
        scale: 2,
        useCORS: true,
        logging: false
      });

      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.href = image;
      link.download = "rotacoes-volei.png";
      link.click();
    } catch (err) {
      console.error("Failed to export image", err);
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>Escalação 5-1</h2>
        <PlayerForm players={players} onPlayerChange={handlePlayerChange} />

        <button className="export-btn" onClick={exportAsImage}>
          Exportar PNG
        </button>
      </aside>

      <main className="main-content">
        <h1 className="header-title">Federada</h1>

        <div className="export-wrapper" ref={exportRef}>
          <RotationGrid players={players} />
        </div>
      </main>
    </div>
  );
}

export default App;
