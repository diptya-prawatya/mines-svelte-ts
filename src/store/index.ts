import { writable, get } from 'svelte/store';
import { initialTiles, isRevealed } from '../utils';
import type {
	GameState,
	MinesState,
	RevealedState,
	SelectedTilesState,
	TilesState
} from 'src/types';

export const gameState = writable<GameState>('idle');
export const minesState = writable<MinesState>([]);
export const revealedState = writable<RevealedState>(isRevealed(initialTiles()));
export const notSelectedTiles = writable<SelectedTilesState>([]);

export const tilesState = (() => {
	const tiles = writable<TilesState>(initialTiles());

	return {
		...tiles,
		revealAll: () => {
			tilesState.update((value) => {
				const tiles = [...value];

				return tiles.map((tile, id) => {
					if (!get(notSelectedTiles).includes(id)) {
						if (get(minesState).includes(id)) {
							return { type: 'mine', selected: get(tilesState)[id].selected };
						} else {
							return { type: 'gem', selected: get(tilesState)[id].selected };
						}
					} else {
						return { type: `${get(tilesState)[id].type}`, selected: get(tilesState)[id].selected };
					}
				});
			});

			return;
		}
	};
})();
