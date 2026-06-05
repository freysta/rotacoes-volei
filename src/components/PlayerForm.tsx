import type { Player, Role } from '../types';
import './PlayerForm.css';

interface PlayerFormProps {
  players: Player[];
  onPlayerUpdate: (index: number, updatedPlayer: Player) => void;
}

const ALL_ROLES: Role[] = [
  'Levantador',
  'Oposto',
  'Ponteiro 1',
  'Ponteiro 2',
  'Central 1',
  'Central 2',
  'Líbero'
];

export const PlayerForm: React.FC<PlayerFormProps> = ({ players, onPlayerUpdate }) => {
  return (
    <div className="player-form-grid">
      {players.map((player, index) => (
        <div key={`player-${index}`} className="player-input-card">
          <input
            type="text"
            value={player.name}
            onChange={(e) => onPlayerUpdate(index, { ...player, name: e.target.value })}
            placeholder={`Atleta ${index + 1}`}
          />
          <select 
            value={player.role}
            onChange={(e) => onPlayerUpdate(index, { ...player, role: e.target.value as Role, id: e.target.value as Role })}
          >
            {ALL_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      ))}
    </div>
  );
};
