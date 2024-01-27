<script lang="ts">
	import { fly } from "svelte/transition";
	import { alertStore } from "../../../store/alertStore";
	import { getBgColor } from "$lib/utils/utils";

</script>

<div class="fixed top-4 right-4 flex flex-col gap-4 w-fit z-50  ">
    {#each $alertStore as alert(alert)}
        <div transition:fly={{x:100}} class="w-fit {getBgColor(alert.getType())} flex p-4 rounded-md text-white">
            {alert.getType().toLocaleUpperCase()} : 
            {alert.getMessage()}   
        </div>
    {/each}
</div>