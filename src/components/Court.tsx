import React from 'react';
import type { Player, Role, CourtPosition } from '../types';
import './Court.css';

interface CourtProps {
  rotationNumber: number;
  players: Player[];
  displayLabel?: string;
  hoveredRole: Role | null;
  onHoverRole: (role: Role | null) => void;
}

const R1_CYCLE_ROLES: Role[] = [
  'Levantador', // pos 1
  'Central 2',  // pos 6
  'Ponteiro 2', // pos 5
  'Oposto',     // pos 4
  'Central 1',  // pos 3
  'Ponteiro 1'  // pos 2
];

const POS_INDEX: Record<CourtPosition, number> = { 1: 0, 6: 1, 5: 2, 4: 3, 3: 4, 2: 5 };
const DISPLAY_POSITIONS: CourtPosition[] = [4, 3, 2, 5, 6, 1]; 

const getRoleClass = (role: string) => {
  return role.toLowerCase().replace(' ', '-').replace('í', 'i');
};

export const Court: React.FC<CourtProps> = ({ 
  rotationNumber, 
  players, 
  displayLabel,
  hoveredRole,
  onHoverRole
}) => {
  const libero = players.find(p => p.role === 'Líbero');

  const getPlayerForPosition = (pos: CourtPosition): { player: Player, isLiberoSub: boolean } => {
    const cycleIndex = POS_INDEX[pos];
    const originalRoleIndex = (cycleIndex - (rotationNumber - 1) + 6) % 6;
    const role = R1_CYCLE_ROLES[originalRoleIndex];
    
    let player = players.find(p => p.role === role) || { id: role, name: '', role };
    let isLiberoSub = false;

    if ((role === 'Central 1' || role === 'Central 2') && [1, 5, 6].includes(pos)) {
      if (libero && libero.name.trim() !== '') {
        player = libero;
        isLiberoSub = true;
      }
    }

    return { player, isLiberoSub };
  };

  return (
    <div className="court-wrapper">
      <div className="court-header">
        <h3>{displayLabel || `Rotação ${rotationNumber}`}</h3>
        <span className="serve-indicator">
          {rotationNumber === 1 ? 'Levantador no Saque' : ''}
        </span>
      </div>
      <div className="court">
        <div className="net"></div>
        <div className="attack-line"></div>
        <div className="court-grid">
          {DISPLAY_POSITIONS.map(pos => {
            const { player, isLiberoSub } = getPlayerForPosition(pos);
            const roleClass = getRoleClass(player.role);
            const isHighlighted = hoveredRole === player.role;

            return (
              <div key={pos} className={`player-spot pos-${pos}`}>
                <div 
                  className={`player-marker role-${roleClass} ${isLiberoSub ? 'is-libero' : ''} ${isHighlighted ? 'is-highlighted' : ''}`}
                  onMouseEnter={() => onHoverRole(player.role)}
                  onMouseLeave={() => onHoverRole(null)}
                >
                  <span className="player-position-num">{pos}</span>
                  <span className="player-name">
                    {player.name || player.role}
                  </span>
                  {isLiberoSub && <span className="sub-badge">Líbero</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
