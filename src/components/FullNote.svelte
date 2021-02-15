<script>
	import { createEventDispatcher } from 'svelte'
	import { fade } from "svelte/transition";
	export let id, title, content, createdAt;

	const dispatch = createEventDispatcher();

	function hide() {
		dispatch('hide')
	}

</script>

<div transition:fade={{ duration: 200 }} class="container">
	<div class="note">
		<div class="note-header">
			<h3 class="title">{title}</h3>
			<p class="created-at">Criado em {createdAt}</p>
			<div id="icons">
				<i id="close"  class="fas fa-times" on:click={hide}/>
			</div>
		</div>
		<div class="note-body">
			<p class="content">
				{content}
			</p>
		</div>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.note {
		background-color: var(--secondary-blue);
		color: white;
		border-radius: 5px;
		overflow: auto;
		margin: 0.5rem;
		cursor: pointer;
		width: 80%;
		height: 50%;

		
	}

	.note::-webkit-scrollbar {
		width: 7px;
	}

	/* Track */
	.note::-webkit-scrollbar-track {
		margin-left: 10px;
		background: var(--secondary-blue);
		border-radius: 50px;
		overflow: hidden;
	}

	/* Handle */
	.note::-webkit-scrollbar-thumb {
		background: var(--primary-blue);

	}

	/* Handle on hover */
	.note::-webkit-scrollbar-thumb:hover {
		background: var(--terciary-blue);
	}

	.note-header {
		background-color: var(--primary-blue);
		padding: 0.75rem 1rem;
		position: relative;
	}

	.title {
		font-size: 1.2rem;
		text-transform: uppercase;
		font-weight: bold;
		margin-right: 2rem;
	}

	.created-at {
		text-transform: uppercase;
		color: var(--secondary-blue);
		font-size: 0.7rem;
		letter-spacing: 0.1rem;
	}

	.note-body {
		padding: 0.75rem 1rem;
	}

	.content {
		font-size: 0.8rem;
		line-height: 1.3rem;
		overflow: auto;
	}

	#icons {
		position: absolute;
		top: 0;
		right: 0;
		padding: 0.75rem 0.5rem;
	}

	#icons i {
		cursor: pointer;
		margin: 0 0.25rem;
	}

	#close {
		font-size: 1.2rem;
	}
</style>
