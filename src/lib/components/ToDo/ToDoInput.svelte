
<script lang="ts">
	import { ToDoItem } from "$lib/classes/ToDoItem";
	import { generateRandomId } from "$lib/utils/utils";
	import { userToDoStore } from "../../../store/userToDoStore";
	import Button from "../ui/Button.svelte";

    let title: string = "";
    let description: string = "";
    let dueDate: string;
    const addToDoHandler = () => {
        console.log(title, description);
        try{
            const newToDo= new ToDoItem(generateRandomId(), title, description,"userId",new Date(dueDate));
            userToDoStore.append(newToDo);
            title = "";
            description = "";
        }catch(e){
            console.log(e);
        }
    };
    $: console.log(dueDate);
</script>

<span class="min-w-full bg-blue-300 p-8 rounded-md flex flex-col justify-around items-stretch gap-2">
    <input type="text" bind:value={title} class="border-2 rounded-md border-blue-400 px-4 py-2" />
    <textarea bind:value={description} class="border-2 rounded-md border-blue-400 px-4 py-2" />
    <input type="date"  bind:value={dueDate} class="border-2 rounded-md border-blue-400 px-4 py-2" />
    <Button type='button' filled={false} color="blue-500" on:click={addToDoHandler} cta="Add"></Button>
</span>