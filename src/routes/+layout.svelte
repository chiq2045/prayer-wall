<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';
	import ArchiveBox from '#lib/components/icons/archive-box.svelte';
	import Home from '#lib/components/icons/home.svelte';
	import QueueList from '#lib/components/icons/queue-list.svelte';
	import Sun from '#lib/components/icons/sun.svelte';
	import Plus from '#lib/components/icons/plus.svelte';
	import Dialog from '#lib/components/dialog/dialog.svelte';

	let { children }: LayoutProps = $props();
	let dialog: HTMLDialogElement | null = $state(null);
	let anonumous = $state(true);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#snippet menu()}
	<ul class="menu menu-horizontal px-4">
		<li>
			<a href="/" class={page.url.pathname === '/' ? 'menu-active' : ''}>
				<Home />
				Prayer Wall
			</a>
		</li>
		<li>
			<a
				href="/prayers/desk"
				class={page.url.pathname.startsWith('/prayers/desk') ? 'menu-active' : ''}
			>
				<ArchiveBox />
				Prayer Desk
			</a>
		</li>
		<li>
			<a
				href="/prayers/requests"
				class={page.url.pathname.startsWith('/prayers/requests') ? 'menu-active' : ''}
			>
				<QueueList />
				Prayer Requests
			</a>
		</li>
		<li>
			<a
				href="/testimonies"
				class={page.url.pathname.startsWith('/testimonies') ? 'menu-active' : ''}
			>
				<Sun />
				Testimonies
			</a>
		</li>
	</ul>
{/snippet}

<header>
	<nav class="navbar bg-base-100 shadow-sm">
		<div class="navbar-start">
			<h1>Prayer Wall</h1>
		</div>
		<div class="navbar-center hidden lg:flex">
			{@render menu()}
		</div>
		<div class="navbar-end">
			<button class="btn btn-primary" onclick={() => dialog?.showModal()}>
				<Plus />
				<span class="sr-only lg:not-sr-only">New Prayer</span>
			</button>
		</div>
		<div class="dock lg:hidden">
			<a href="/" class={page.url.pathname === '/' ? 'dock-active' : ''}>
				<Home />
				<span class="dock-label">
					<span class="sr-only">Prayer</span>
					Wall
				</span>
			</a>
			<a
				href="/prayers/desk"
				class={page.url.pathname.startsWith('/prayers/desk') ? 'dock-active' : ''}
			>
				<ArchiveBox />
				<span class="dock-label">
					<span class="sr-only">Prayer</span>
					Desk
				</span>
			</a>
			<a
				href="/prayers/requests"
				class={page.url.pathname.startsWith('/prayers/requests') ? 'dock-active' : ''}
			>
				<Home />
				<span class="dock-label">
					<span class="sr-only">Prayer</span>
					Requests
				</span>
			</a>
			<a
				href="/testimonies"
				class={page.url.pathname.startsWith('/testimonies') ? 'dock-active' : ''}
			>
				<Home />
				<span class="dock-label"> Testimonies </span>
			</a>
		</div>
	</nav>
</header>

<main>
	{@render children()}
</main>

<Dialog bind:dialog title="Post a Prayer Request">
	<form method="post" action="/prayers/new">
		<label class="label" for="prayer-request">Prayer Request</label>
		<input
			id="prayer-request"
			name="request"
			type="text"
			placeholder="e.g. Healing for my ailing grandma"
			required
			class="input"
		/>
		<label for="prayer details" class="label">Details</label>
		<input
			id="details"
			name="details"
			type="text"
			placeholder="Describe your request in more detail so that prayer warriors can know how to pray for you..."
			class="input"
		/>
		<div class="rounded-md bg-base-200 p-2">
			<input
				id="anonymous-checkbox"
				name="anonumous"
				type="checkbox"
				bind:checked={anonumous}
				class="checkbox checkbox-secondary"
			/>
			<label class="label" for="anonymous-checkbox">Post anonymously</label>
		</div>
		<div class="modal-actions">
			<button type="button" class="btn btn-ghost" onclick={() => dialog?.close()}> Cancel </button>
			<button type="submit" class="btn btn-primary">Submit</button>
		</div>
	</form>
</Dialog>
