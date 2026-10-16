<script lang="ts">
	// import type { Snippet } from 'svelte';
	// type DialogProps = { dialog: HTMLDialogElement; children: Snippet<[]>; title: string };

	let { dialog = $bindable(), children, title } = $props();
</script>

<dialog bind:this={dialog} class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm" aria-label="close">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
				</svg>
			</button>
		</form>
		<h1 class="text-lg font-bold">{title}!</h1>
		{@render children()}
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>Close</button>
	</form>
</dialog>
