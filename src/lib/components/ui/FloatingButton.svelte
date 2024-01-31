
<script lang="ts">
	import { fade } from "svelte/transition";

    export let className:string="";
</script>

<button transition:fade data-testid="floating-add-button" on:click class={`fixed rounded-full h-16 aspect-square bottom-16 right-16 border bg-blue-400 hover:scale-110 transition-all hover:bg-blue-400 flex justify-center items-center ${className} z-20`}>
    <slot></slot>
</button>