<script>
	import ToDoInput from "../ToDo/ToDoInput.svelte";
	import FloatingButton from "./FloatingButton.svelte";
	import Modal from "./Modal.svelte";
    //import over
    
    let showModal=false;
</script>


{#if showModal}
    <Modal on:click={()=>{showModal=false;}}>
        <ToDoInput bind:showModal={showModal} />
    </Modal>
{/if}

<FloatingButton on:click={()=>{
    showModal=true;
}}>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
    </svg>
</FloatingButton>