<script lang="ts">
	import { alertStore } from "../../../store/alertStore";

    function getBgColor(type:string):string{
        switch(type){
            case "success":
                return "green-400";
            case "error":
                return "red-400";
            case "warning":
                return "yellow-400";
            case "info":
                return "blue-400";
            default:
                return "gray-400";
        }
    }
</script>
<div class="fixed top-4 right-4 flex flex-col gap-4 w-64 z-50  ">
    {#each $alertStore as alert(alert)}
        <div class="w-full bg-{getBgColor(alert.getType())} flex p-4 rounded-md text-white">
            {alert.getType()} : 
            {alert.getMessage()}   
        </div>
    {/each}
</div>