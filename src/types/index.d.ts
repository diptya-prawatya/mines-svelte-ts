export interface Tile {
	type: undefined | string;
	selected: boolean;
}

export type GameState = 'idle' | 'progress' | 'cashout' | 'busted';
export type MinesState = Array<number>;
export type SelectedTilesState = Array<number>;
export type TilesState = Array<Tile>;
export type RevealedState = boolean;
