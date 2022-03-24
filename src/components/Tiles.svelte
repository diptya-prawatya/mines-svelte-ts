<script lang="ts">
	import gem from '../assets/gem.svg';
	import mine from '../assets/mine.svg';
	import gem_audio from '../assets/gem.mp3';
	import mine_audio from '../assets/mine.mp3';

	import * as api from '../api';
	import { gameState, minesState, tilesState, revealedState, notSelectedTiles } from '../store';

	const tile = async (id: number) => {
		const { status, mines } = await api.clickTile(id);

		gameState.set(status);

		if ($gameState === 'idle') {
			return;
		} else if ($gameState === 'progress') {
			tilesState.update((tiles) => {
				tiles[id].type = 'gem';
				return tiles;
			});
			revealedState.set(true);
		} else {
			minesState.set(mines);
			tilesState.revealAll();
		}

		tilesState.update((tiles) => {
			tiles[id].selected = false;
			return tiles;
		});
		$notSelectedTiles.push(id);

		playAudio(id);
	};

	const playAudio = (id: number) => {
		let url = $tilesState[id].type === 'gem' ? gem_audio : mine_audio;

		new Audio(url).play();
	};

	$: tileDisabled = $gameState === 'progress' ? false : true;
	$: tilesLength = $tilesState.length;
</script>

<div class="grid-container" style="grid-template-columns: repeat(5,auto);">
	{#each { length: tilesLength } as _, id (id)}
		<button disabled={tileDisabled} class="tile" on:click={() => tile(id)}>
			{#if $tilesState[id].type !== undefined}
				<img
					class:notSelected={$tilesState[id].selected}
					src={$tilesState[id].type === 'gem' ? gem : mine}
					alt="icon"
				/>
			{/if}
		</button>
	{/each}
</div>

<style>
	.grid-container {
		display: grid;
		grid-gap: 0.5em;
	}
	.grid-container button {
		border-radius: 0.5em;
		border: none;
		width: 120px;
		height: 120px;
		padding: 1em;
	}
	.tile {
		background: rgb(54, 83, 99);
	}
	.notSelected {
		height: 60px;
		width: 60px;
		padding: 12px;
		background: rgb(33, 55, 67);
		border-radius: 2.5em;
	}
</style>
