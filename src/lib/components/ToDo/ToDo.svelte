<script lang="ts">
    import {ToDoItem} from "$lib/classes/ToDoItem";
	import { createEventDispatcher } from "svelte";
	import Button from "../ui/Button.svelte";
	import { get } from "svelte/store";
	import { getRemainingDays } from "$lib/utils/utils";
    export let toDo: ToDoItem;
    const dispatch = createEventDispatcher();
    const remove = () => dispatch("remove", toDo.getId());
    const toggle = () => dispatch("toggle", toDo.getId());
    let title: string = toDo.getTitle();
    let description: string = toDo.getDescription();
    let dueDate: Date = toDo.getDateDue();
    const checked=toDo.getCompleted();
    
    function getDueDateHTML():string{
        if(dueDate?.getTime()<Date.now()){
            return `<span class="text-red-400">due : ${dueDate?.toDateString()}</span>`;
        }
        return `<span class="text-black opacity-65">due : ${dueDate?.toDateString()} ( ${getRemainingDays(dueDate)})</span>`;
    }
</script>

<span class="flex justify-between bg-white text-black p-4 gap-4 w-full rounded-md">
    <div class="flex gap-4">
        <input type="checkbox" {checked} on:change={toggle} />
        <div>
            <h3>{title.toLocaleUpperCase()}</h3>
            <p class="opacity-65">{description}</p>
            {@html getDueDateHTML()}
        </div>
    </div>
    <Button color="red-400" cta="Remove" type="icon" className="rounded-lg " filled={true} on:click={remove}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
        </svg>
    </Button>
</span>