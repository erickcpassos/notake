<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	import { fade } from "svelte/transition";

	// VARIABLES

	export let id;
	export let title;
	export let createdAt;
	export let content;

	// FUNCTIONS

	function formatDate(timestamp) {
		const date = new Date(timestamp);
		const formattedDate =
			date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
		return formattedDate;
	}

	function remove() {
		dispatch("remove", { id });
	}

	function update() {
		dispatch("update", { id, title, content });
	}

	function expand() {
		dispatch("expand", { id, title, content, createdAt });
	}
</script>

<div transition:fade={{ duration: 200 }} class="note" on:click={expand}>
	<div class="note-header">
		<h3 class="title">{title}</h3>
		<p class="created-at">Criado em {formatDate(createdAt)}</p>
		<div id="icons">
			<i on:click={remove} id="delete" class="fas fa-trash" />
			<i on:click={update} id="update" class="fas fa-pencil-alt" />
		</div>
	</div>
	<div class="note-body">
		<p class="content">
			{content}
		</p>
	</div>
</div>

<style>
	.note {
		background-color: var(--secondary-blue);
		color: white;
		border-radius: 5px;
		overflow: hidden;
		margin: 0.5rem;
		box-shadow: 0px 3px 8px rgb(184, 184, 184);
		cursor: pointer;
		min-width: 250px;
		min-height: 150px;
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
		margin-right: 3rem;
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
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
</style>
