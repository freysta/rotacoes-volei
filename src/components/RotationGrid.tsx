
import type { Player } from '../types';
import { Court } from './Court';
import './RotationGrid.css';

interface RotationGridProps {
  players: Player[];
}

export const RotationGrid: React.FC<RotationGridProps> = ({ players }) => {
  const rotations = [1, 2, 3, 4, 5, 6];

  return (
    <div className="rotation-grid">
      {rotations.map(rot => (
        <Court key={rot} rotationNumber={rot} players={players} />
      ))}
    </div>
  );
};
