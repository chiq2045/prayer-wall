<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let os: 'macOs' | 'other' | undefined = $state(undefined);

	onMount(() => {
		const { userAgent, platform } = window.navigator;

		if (/Mac/.test(platform) || /Macintosh/.test(userAgent)) {
			os = 'macOs';
		} else {
			os = 'other';
		}
	});

	let searchInput: HTMLInputElement | null = $state(null);

	const handleGlobalKeyDown = (e: KeyboardEvent) => {
		const target = e.target as HTMLElement;
		if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
		if (
			((e.metaKey && os === 'macOs') || (e.ctrlKey && os === 'other')) &&
			e.key.toLowerCase() === 'k'
		) {
			e.preventDefault();
			searchInput?.focus();
		}
	};
</script>

<svelte:window onkeydown={handleGlobalKeyDown} />
<svelte:head>
	<title>Prayer Wall</title>
</svelte:head>

<div class="card w-full bg-base-100 shadow-sm">
	<div class="card-body">
		<label class="input w-full">
			<svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<g
					stroke-linejoin="round"
					stroke-linecap="round"
					stroke-width="2.5"
					fill="none"
					stroke="currentColor"
				>
					<circle cx="11" cy="11" r="8"></circle>
					<path d="m21 21-4.3-4.3"></path>
				</g>
			</svg>
			<input
				bind:this={searchInput}
				aria-keyshortcuts={os === 'macOs' ? 'Command+K' : os === 'other' ? 'Ctrl+K' : undefined}
				type="search"
				class="grow"
				placeholder="Search"
			/>
			{#if os !== undefined}
				<kbd class="kbd kbd-sm">
					{#if os === 'macOs'}
						⌘
					{:else}
						ctrl
					{/if}
				</kbd>
				<kbd class="kbd kbd-sm">K</kbd>
			{/if}
		</label>
	</div>
</div>

<h1 class="py-4 text-2xl font-semibold">Prayer Wall</h1>

<ul class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	{#each data.prayers as prayer}
		<li class="card w-full list-none bg-base-100 shadow-sm">
			<div class="card-body">
				<div class="flex flex-nowrap justify-between gap-2">
					<div class="badge badge-soft badge-success">
						<span class="status status-success"></span>
						<span class="text-neutral">{prayer.status}</span>
					</div>
					<div class="badge badge-soft badge-neutral">{prayer.category}</div>
				</div>
				<h2 class="card-title">{prayer.title}</h2>
				<div class="flex flex-nowrap">
					<span>{prayer.anonymous ? 'Anonymous' : prayer.author.name}</span>
					<div role="separator" class="divider divider-horizontal"></div>
					<span>{prayer.updatedAt}</span>
				</div>
				<p class="min-h-28">{prayer.description}</p>
				<div class="card-actions grid grid-cols-2 gap-2">
					<span class="col-span-2">{prayer.assignedWarriors.length} Warriors praying</span>
					<button class="btn">Commit to Pray</button>
					<button class="btn btn-primary">Prayed Today</button>
				</div>
			</div>
		</li>
	{/each}
</ul>
