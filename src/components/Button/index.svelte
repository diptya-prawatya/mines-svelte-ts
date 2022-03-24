<script>
	import Button from './Button.svelte';
	import * as api from '../../api';
	import { gameState, tilesState, minesState, notSelectedTiles } from '../../store';
	import { initialTiles, isRevealed } from '../../utils';

	const bet = async () => {
		const { status } = await api.clickBetButton();

		tilesState.set(initialTiles());
		minesState.set([]);
		gameState.set(status);
		notSelectedTiles.set([]);
	};

	const cashout = async () => {
		const { status, mines } = await api.clickCashoutButton();

		gameState.set(status);
		minesState.set(mines);

		tilesState.revealAll();
	};

	$: inProgress = $gameState === 'progress' ? true : false;
	$: isDisabled = $gameState === 'idle' ? false : !isRevealed($tilesState);
	$: onClick = $gameState === 'progress' ? cashout : bet;
	$: label = $gameState === 'progress' ? 'Cashout' : 'Bet';
</script>

<Button {inProgress} {isDisabled} clickButton={onClick} {label} />
