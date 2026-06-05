
import type { Player, Role } from '../types';
import './PlayerForm.css';

interface PlayerFormProps {
  players: Player[];
  onPlayerChange: (role: Role, newName: string) => void;
}

const ROLES_ORDER: Role[] = [
  'Levantador',
  'Oposto',
  'Ponteiro 1',
  'Ponteiro 2',
  'Central 1',
  'Central 2',
  'Líbero'
];

// Helper para converter Role para classe CSS válida
const getRoleClass = (role: string) => {
  return role.toLowerCase().replace(' ', '-').replace('í', 'i');
};

export const PlayerForm: React.FC<PlayerFormProps> = ({ players, onPlayerChange }) => {
  return (
    <div className="player-form-container">
      {ROLES_ORDER.map((role) => {
        const player = players.find(p => p.role === role);
        return (
          <div key={role} className="input-group">
            <label htmlFor={`input-${role}`}>{role}</label>
            <input
              id={`input-${role}`}
              type="text"
              value={player?.name || ''}
              onChange={(e) => onPlayerChange(role, e.target.value)}
              placeholder={`Nome do atleta`}
              className={`input-role-${getRoleClass(role)}`}
            />
          </div>
        );
      })}
    </div>
  );
};
