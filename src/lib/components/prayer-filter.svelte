<script lang="ts">
	import { windowNavigator } from '#lib/state/navigator.svelte.ts';

	let { searchInput = $bindable() }: { searchInput: HTMLInputElement | null } = $props();
</script>

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
				aria-keyshortcuts={windowNavigator.os === 'macOs'
					? 'Command+K'
					: windowNavigator.os === 'other'
						? 'Ctrl+K'
						: undefined}
				type="search"
				class="grow"
				placeholder="Search"
			/>
			{#if windowNavigator.os !== undefined}
				<kbd class="kbd kbd-sm">
					{#if windowNavigator.os === 'macOs'}
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
