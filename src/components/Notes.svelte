<script>
	import Note from "./Note.svelte";
	import FullNote from "./FullNote.svelte";
	import { fade } from "svelte/transition";
	import { db } from "../firebase";
	import { collectionData } from "rxfire/firestore";
	import { startWith } from "rxjs/operators";

	export let uid;

	let noteData = {};
	let isFullNoteShown = false;
	let isUpdateFormActive = false;
	let isAddFormActive = false;
	let noteTitle = "";
	let noteContent = "";
	let currentNoteId = "";

	const noteListRef = db
		.collection("users")
		.doc(uid)
		.collection("notes")
		.orderBy("createdAt");

	const notes = collectionData(noteListRef, "id").pipe(startWith([]));

	// FUNCTIONS

	function showAddForm() {
		isAddFormActive = true;
	}

	function hideAddForm() {
		noteTitle = "";
		noteContent = "";
		isAddFormActive = false;
	}

	function addNote(event) {
		event.preventDefault();
		if (!noteTitle.trim() || !noteContent.trim()) return;

		db.collection("users").doc(uid).collection("notes").add({
			title: noteTitle,
			content: noteContent,
			createdAt: Date.now(),
		});

		noteTitle = "";
		noteContent = "";
		isAddFormActive = false;
	}

	function updateNote(event) {
		event.preventDefault();
		if (!noteTitle.trim() || !noteContent.trim()) return;

		db.collection("users")
			.doc(uid)
			.collection("notes")
			.doc(currentNoteId)
			.update({
				title: noteTitle,
				content: noteContent,
			});

		noteTitle = "";
		noteContent = "";
		currentNoteId = "";
		isUpdateFormActive = false;
	}

	function showUpdateForm(event) {
		const { id, title, content } = event.detail;
		noteTitle = title;
		noteContent = content;
		currentNoteId = id;
		isUpdateFormActive = true;
	}

	function hideUpdateForm() {
		noteTitle = "";
		noteContent = "";
		isUpdateFormActive = false;
	}

	function removeItem(event) {
		const { id } = event.detail;
		db.doc(`users/${uid}/notes/${id}`).delete();
	}

	function showFullNote(event) {
		noteData = event.detail;
		isFullNoteShown = true;
	}

	function hideFullNote() {
		noteData = {};
		isFullNoteShown = false;
	}
</script>

<section id="app">
	{#if isAddFormActive}
		<div transition:fade={{ duration: 200 }} id="add-note">
			<form id="add-note-form" autocomplete="off" on:submit={addNote}>
				<label for="title">
					Title
					<input id="title" name="title" type="text" bind:value={noteTitle} />
				</label>
				<label for="content">
					Content
					<textarea id="content" name="content" bind:value={noteContent} />
				</label>

				<div id="buttons">
					<button id="close-form" class="btn-white" on:click={hideAddForm}
						>Cancelar</button
					>
					<button id="submit-form" type="submit" class="btn-white"
						>Adicionar</button
					>
				</div>
			</form>
		</div>
	{/if}

	{#if isUpdateFormActive}
		<div transition:fade={{ duration: 200 }} id="update-note">
			<form id="update-note-form" autocomplete="off" on:submit={updateNote}>
				<label for="title">
					Title
					<input id="title" name="title" type="text" bind:value={noteTitle} />
				</label>
				<label for="content">
					Content
					<textarea id="content" name="content" bind:value={noteContent} />
				</label>

				<div id="buttons">
					<button id="close-form" class="btn-white" on:click={hideUpdateForm}
						>Cancelar</button
					>
					<button id="submit-form" type="submit" class="btn-white"
						>Editar</button
					>
				</div>
			</form>
		</div>
	{/if}

	{#if isFullNoteShown}
		<FullNote {...noteData} on:hide={hideFullNote} />
	{/if}

	<h2 id="section-title">Suas Notas</h2>

	<button id="add-btn" class="btn-white" on:click={showAddForm}
		>Criar Nota</button
	>

	<div id="notes-container">
		{#each $notes as note}
			<Note
				on:expand={showFullNote}
				on:update={showUpdateForm}
				on:remove={removeItem}
				{...note}
			/>
		{/each}
	</div>
</section>

<style>
	#add-note,
	#update-note {
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

	#add-note-form,
	#update-note-form {
		background-color: white;
		border-radius: 10px;
		padding: 2rem;
		display: flex;
		flex-direction: column;
	}

	label {
		margin: 0.8rem 0;
		font-weight: bold;
	}

	input {
		margin: 0;
		border: none;
		border-bottom: 1px solid var(--secondary-blue);
	}

	input:focus {
		border-bottom: 2px solid var(--primary-blue);
	}

	textarea {
		border: 1px solid var(--secondary-blue);
		resize: vertical;
	}

	textarea:focus {
		border: 2px solid var(--primary-blue);
	}

	input,
	textarea {
		width: 100%;
		display: block;
		padding: 0.5rem 0.2rem;
		transition: 0.1s ease;
		outline: 0;
	}

	input:focus,
	textarea:focus {
		padding: 0.75rem 0.2rem;
	}

	#buttons {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	#buttons button {
		font-size: 1rem;
	}

	#app {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	#section-title {
		font-size: 1.5rem;
		text-align: center;
	}

	#add-btn {
		font-size: 1.2rem;
	}

	#notes-container {
		margin: 0.75rem 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media screen and (min-width: 550px) {
		#notes-container {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media screen and (min-width: 960px) {
		#notes-container {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media screen and (min-width: 1100px) {
		#notes-container {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
