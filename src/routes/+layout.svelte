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
	import { onMount } from 'svelte';
	import { windowNavigator } from '#lib/state/navigator.svelte.ts';

	let { children }: LayoutProps = $props();

	onMount(() => {
		const { userAgent, platform } = window.navigator;

		if (/Mac/.test(platform) || /Macintosh/.test(userAgent)) {
			windowNavigator.os = 'macOs';
		} else {
			windowNavigator.os = 'other';
		}
	});
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
			<button class="btn btn-primary">
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

<main class="px-6 pt-6 md:px-10">
	{@render children()}
</main>
