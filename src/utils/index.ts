import type { Tile } from 'src/types';

export const initialTiles = (): Array<Tile> => {
	const createTiles: Array<Tile> = new Array(25);

	for (let i = 0; i < createTiles.length; i++) {
		createTiles[i] = {
			type: undefined,
			selected: true
		};
	}

	return createTiles;
};

export const isRevealed = (tiles: Array<Tile>): boolean => {
	return tiles.some((tile) => tile.type !== undefined);
};
