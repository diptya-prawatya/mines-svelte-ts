<script>
	export let inProgress;
	export let isDisabled;
	export let clickButton;
	export let label;
</script>

<button
	class="button"
	class:bet={!inProgress}
	class:cashout={inProgress}
	disabled={isDisabled}
	on:click={clickButton}>{label}</button
>

<style>
	.button {
		border-radius: 0.5em;
		margin-top: 2em;
		border: none;
		width: 12em;
		height: 3em;
		font-size: 1em;
		justify-self: center;
	}
	.bet {
		background-color: rgb(31, 255, 32);
	}
	.cashout {
		background-color: rgb(255, 255, 0);
	}
</style>
