import type { Player, Role } from '../types';
import { Court } from './Court';
import './RotationGrid.css';

interface RotationGridProps {
  players: Player[];
  startingRotation?: number;
  hoveredRole: Role | null;
  onHoverRole: (role: Role | null) => void;
}

export const RotationGrid: React.FC<RotationGridProps> = ({ 
  players, 
  startingRotation = 1,
  hoveredRole,
  onHoverRole
}) => {
  const rotations = Array.from({ length: 6 }, (_, i) => {
    const rot = startingRotation + i;
    return rot > 6 ? rot - 6 : rot;
  });

  return (
    <div className="rotation-grid">
      {rotations.map((rot, index) => (
        <Court 
          key={`rot-${rot}-${index}`} 
          rotationNumber={rot} 
          players={players} 
          displayLabel={`Rotação ${index + 1} (Rodízio ${rot})`}
          hoveredRole={hoveredRole}
          onHoverRole={onHoverRole}
        />
      ))}
    </div>
  );
};
