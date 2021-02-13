<script>
	export let user;
	export let signIn;
	export let signOut;
</script>

<header id="header">
	<h1>Notake</h1>

	{#if user}
		<section id="user-info">
			<img id="user-avatar" src={user.photoURL} alt="user avatar" />
			<div id="user-details">
				<p id="user-name">{user.displayName}</p>
				<p id="user-email">{user.email}</p>
			</div>
		</section>
	{/if}

	<button on:click={user ? signOut : signIn} class="btn-blue" id="signout"
		>{user ? "Sign Out" : "Sign In"}</button
	>
</header>

<style>
	#header {
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--primary-blue);
		color: white;
		position: fixed;
		top: 0;
		left: 0;
		padding: 1em;
	}

	#header {
		width: 100vw;
		height: 3rem;
		background-color: var(--primary-blue);
		color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	#header h1 {
		font-size: 1rem;
	}

	#signout {
		margin: 0;
	}

	#user-info {
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 0.8rem;
		margin-left: auto;
	}

	#user-avatar {
		height: 2.5rem;
		width: 2.5rem;
		border-radius: 10%;
		border: 1px solid var(--secondary-blue);
	}

	#user-details {
		padding: 0.5rem;
	}

	#user-name {
		font-size: 0.8rem;
	}

	#user-email {
		font-size: 0.7rem;
		color: var(--secondary-blue);
	}

	@media screen and (max-width: 600px) {
		#user-details {
			display: none;
		}
	}
</style>
