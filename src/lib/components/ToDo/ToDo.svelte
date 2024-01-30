<script lang="ts">
    import {ToDoItem} from "$lib/classes/ToDoItem";
	import { createEventDispatcher } from "svelte";
	import Button from "../ui/Button.svelte";
	import { getDueDateHTML, getRemainingDays } from "$lib/utils/utils";
	import DeleteIcon from "../icons/DeleteIcon.svelte";
	import { receive,send } from "$lib/utils/transition";
	import ConfirmAction from "../ui/ConfirmAction.svelte";
    //import over

    export let toDo: ToDoItem;
    //props over

    let title: string = toDo.getTitle();
    let description: string = toDo.getDescription();
    let dueDate: Date = toDo.getDateDue();
    const checked=toDo.getCompleted();
    let showConfirmAction=false;
    $:status=toDo.getCompleted()?"done":"todo";

    const dispatch = createEventDispatcher();
    const remove = () => dispatch("remove", toDo.getId());
    const toggle = () => dispatch("toggle", toDo.getId());
    
</script>

<span  in:receive={{ key: toDo.getId() }} out:send={{ key: toDo.getId() }} class="flex justify-between items-center bg-white text-black p-4 gap-4 w-full rounded-md">
    <div class="flex gap-4">
        <input type="checkbox" data-testid="{status}-checkbox-{toDo.getId()}" {checked} class="cursor-pointer " on:change={toggle} />
        <div data-testid="{status}-item-{toDo.getId()}">
            <h5>{title.toLocaleUpperCase()}</h5>
            <p class="opacity-65">{description}</p>
            {#if !checked}
            {@html getDueDateHTML(dueDate)}
            {/if}
            {#if checked}
            <p class="text-green-500">Completed on {toDo.getDateCompleted()?.toDateString()}</p>
            {/if}
        </div>
    </div>
    <ConfirmAction  open={showConfirmAction} on:cancel={()=>showConfirmAction=false}  on:confirm={remove}>
        <Button testId="{status}-delete-button-{toDo.getId()}" on:click={(e)=>showConfirmAction=true} cta="Remove" type="icon" className="rounded-lg max-h-16 " filled={true} >
            <DeleteIcon  className="h-8 w-8 sm:w-10 md:h-10 p-2 text-white"/>
        </Button>
    </ConfirmAction>
    
    
</span>