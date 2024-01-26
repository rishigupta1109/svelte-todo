<script lang="ts">
    import {ToDoItem} from "$lib/classes/ToDoItem";
	import { createEventDispatcher } from "svelte";
	import Button from "../ui/Button.svelte";
    
	import { getRemainingDays } from "$lib/utils/utils";
	import DeleteIcon from "../icons/DeleteIcon.svelte";
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
            return `<p class="text-red-400">due : ${dueDate?.toDateString()}</p>`;
        }
        return `<p class="text-black opacity-65">due : ${dueDate?.toDateString()} ( ${getRemainingDays(dueDate)})</p>`;
    }
</script>

<span class="flex justify-between items-center bg-white text-black p-4 gap-4 w-full rounded-md">
    <div class="flex gap-4">
        <input type="checkbox" {checked} on:change={toggle} />
        <div>
            <h5>{title.toLocaleUpperCase()}</h5>
            <p class="opacity-65">{description}</p>
            {@html getDueDateHTML()}
        </div>
    </div>
    <Button  cta="Remove" type="icon" className="rounded-lg max-h-16 " filled={true} on:click={remove}>
       <!-- <img src="Delete Button.svg" alt="remove" class="w-6 h-6 text-white"/> -->
       <DeleteIcon className="h-8 w-8 sm:w-10 md:h-10 p-2 text-white"/>
       
    </Button>
</span>