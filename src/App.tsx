import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './App.css';
import type { Player, Role } from './types';
import { PlayerForm } from './components/PlayerForm';
import { RotationGrid } from './components/RotationGrid';
import simulacoesData from './simulacoes.json';

function App() {
  const [players, setPlayers] = useState<Player[]>(simulacoesData[0].jogadores as Player[]);
  const [startingRotation, setStartingRotation] = useState<number>(1);
  const [hoveredRole, setHoveredRole] = useState<Role | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const handleLoadSimulation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value, 10);
    setPlayers(simulacoesData[index].jogadores as Player[]);
  };

  const handlePlayerUpdate = (index: number, updatedPlayer: Player) => {
    const newPlayers = [...players];
    newPlayers[index] = updatedPlayer;
    setPlayers(newPlayers);
  };

  const exportAsImage = async () => {
    if (!exportRef.current) return;
    try {
      const canvas = await html2canvas(exportRef.current, {
        backgroundColor: '#040D21', // Darker background for the export
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
      <nav className="top-toolbar">
        <h1 className="header-title">Federada</h1>
        
        <div className="toolbar-actions">
          <div className="simulation-select-container">
            <select onChange={handleLoadSimulation} className="sim-select glass-select">
              <option value="" disabled selected>Carregar Cenário Rápido</option>
              {simulacoesData.map((sim, index) => (
                <option key={index} value={index}>{sim.nome}</option>
              ))}
            </select>
          </div>
          <button className="export-btn" onClick={exportAsImage}>
            Exportar PNG
          </button>
        </div>
      </nav>

      <div className="workspace">
        <main className="main-content">
          <div className="rotation-controls">
            <span className="control-label">Levantador começa em:</span>
            <div className="segmented-control">
              {[
                { val: 1, label: 'Pos 1' },
                { val: 2, label: 'Pos 6' },
                { val: 3, label: 'Pos 5' },
                { val: 4, label: 'Pos 4' },
                { val: 5, label: 'Pos 3' },
                { val: 6, label: 'Pos 2' }
              ].map(pos => (
                <button 
                  key={pos.val}
                  className={`segment-btn ${startingRotation === pos.val ? 'active' : ''}`}
                  onClick={() => setStartingRotation(pos.val)}
                >
                  {pos.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="export-wrapper" ref={exportRef}>
            <RotationGrid 
              players={players} 
              startingRotation={startingRotation} 
              hoveredRole={hoveredRole}
              onHoverRole={setHoveredRole}
            />
          </div>
        </main>

        <aside className="right-sidebar">
          <div className="sidebar-header">
            <h2>Elenco</h2>
            <p>Ajuste os 7 atletas do seu time</p>
          </div>
          <PlayerForm players={players} onPlayerUpdate={handlePlayerUpdate} />
        </aside>
      </div>
    </div>
  );
}

export default App;
