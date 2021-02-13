<script>
	import Header from "./components/Header.svelte";
	import Notes from "./components/Notes.svelte";

	import { auth, googleProvider } from "./firebase";
	import { authState } from "rxfire/auth";

	let user;

	const unsubscribe = authState(auth).subscribe((u) => (user = u));

	function signOut() {
		auth.signOut();
	}

	function signIn() {
		auth.signInWithPopup(googleProvider);
	}
</script>

<svelte:head>
	<title>Notake</title>
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
		rel="stylesheet"
	/>
	<link
		rel="stylesheet"
		href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
		integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu"
		crossorigin="anonymous"
	/>
</svelte:head>

<Header {user} {signIn} {signOut} />

<main>
	{#if user}
		<Notes />
	{:else}
		<h1>Logue para ver suas informações</h1>
	{/if}
</main>
