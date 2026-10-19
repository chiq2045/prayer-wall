<script lang="ts">
	import { onMount } from 'svelte';

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
