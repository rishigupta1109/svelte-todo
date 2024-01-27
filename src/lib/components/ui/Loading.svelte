<script>
	import { loadingStore } from "../../../store/loadingStore";
	import Modal from "./Modal.svelte";
</script>

{#if $loadingStore}
    <Modal>
        <div class="flex flex-col items-center justify-center">
            <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            <p class="text-gray-900 text-xl mt-4">Loading...</p>
        </div>
    </Modal>
{/if}
