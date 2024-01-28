
<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Modal from "./Modal.svelte";
	import Button from "./Button.svelte";
    //import over

    export let open=false;
    //props over

    let dispatch=createEventDispatcher();

    function confirm(){
        dispatch("confirm");
    }
    function cancel(){
        dispatch("cancel");
    }

</script>

{#if  open}
<Modal>
    <div class="flex flex-col items-center justify-center ">
        <p class="text-gray-900 text-xl mt-4">Are you sure?</p>
        <div class="flex mt-4 gap-4">
            <Button filled={true} on:click={confirm} cta="YES">Yes</Button>
            <Button filled={false} on:click={cancel} cta="NO" >No</Button>
        </div>
    </div>
</Modal>
{/if}
<slot ></slot>