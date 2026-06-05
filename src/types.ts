export type Role =
  | 'Levantador'
  | 'Oposto'
  | 'Ponteiro 1'
  | 'Ponteiro 2'
  | 'Central 1'
  | 'Central 2'
  | 'Líbero';

export interface Player {
  id: Role;
  name: string;
  role: Role;
}

export type CourtPosition = 1 | 2 | 3 | 4 | 5 | 6;

// Maps standard rotation (1-6) to where each starting role is.
// E.g., in rotation 1, Levantador is at position 1.
export const ROTATION_SEQUENCE: CourtPosition[] = [1, 6, 5, 4, 3, 2];

export interface RotationState {
  rotationNumber: number; // 1 to 6
  positions: Record<CourtPosition, Player>;
}
