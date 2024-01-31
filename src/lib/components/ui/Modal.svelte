<script>
	import {  fly } from "svelte/transition";
    export let showModal;
    //props over
    function closeModal(){
        showModal=false;
    }
</script>

<div on:click={closeModal} role="button" tabindex="0" data-testid="modal" on:keydown={(e)=>{
    if(e.key==="Escape"){
        closeModal();
    }
}} class="bg-black bg-opacity-50 fixed top-0 left-0 min-h-screen min-w-full z-10">
    <div data-testid="modal-data-container" on:click|stopPropagation role="button" tabindex="0" on:keydown={()=>{}} transition:fly={{x:100}} class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-1 z-20 w-2/5  min-w-[300px] min-h-[250px] flex justify-center items-center">
        <slot></slot>
    </div>
</div>