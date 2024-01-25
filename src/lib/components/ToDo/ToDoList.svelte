<script lang="ts">
	import { ToDoItem } from "$lib/classes/ToDoItem";
	import { userToDoStore } from "../../../store/userToDoStore";
	import ToDo from "./ToDo.svelte";
    export let toDoList:ToDoItem[]=[];
</script>

<div class="flex flex-col justify-between items-stretch w-full gap-2">
    {#each toDoList as toDo(toDo)}
        <ToDo {toDo} on:remove={(event)=>userToDoStore.remove(event.detail)} on:toggle={(event)=>userToDoStore.toggle(event.detail)} />
    {/each}
</div>