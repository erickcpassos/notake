<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let id;
	export let title;
	export let createdAt;
	export let content;

	function remove() {
		dispatch("remove", { id });
	}

	function restrictText(text) {
		if (text.length < 150) {
			return text;
		}

		const newText = text.substring(0, 150) + "...";
		return newText;
	}
</script>

<div class="note">
	<div class="note-header">
		<h3 class="title">{title}</h3>
		<p class="created-at">Criado em {createdAt}</p>
		<div id="icons">
			<i on:click={remove} id="delete" class="fas fa-trash" />
			<i id="edit" class="fas fa-pencil-alt" />
		</div>
	</div>
	<div class="note-body">
		<p class="content">
			{restrictText(content)}
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
