<script lang="ts">
	import type { ToDoItem } from "$lib/classes/ToDoItem";
	import { primaryColor } from "$lib/utils/constant";
	import ToDoList from "../ToDo/ToDoList.svelte";

    export let title: string = "";
    export let list: ToDoItem[] = [];
</script>

<div class="flex flex-col justify-start gap-2 items-center w-full p-4 h-full bg-blue-300 my-2 text-white min-h-64 rounded-md">
    <h4 class="w-full bg-blue-500 p-4 rounded-md text-center">{title}</h4>
    {#if list.length===0}
        <h4 class="text-center py-4">No Tasks</h4>
    {/if}
    <ToDoList toDoList={list} />
</div>