<script lang="ts">
	import type { ToDoItem } from "$lib/classes/ToDoItem";
	import ToDoList from "../ToDo/ToDoList.svelte";

    export let title: string = "";
    export let list: ToDoItem[] = [];
</script>

<div class="flex flex-col justify-start gap-2 items-center w-full p-4  bg-blue-300 my-2 text-white min-h-64 rounded-md">
    <p>{title}</p>
    <ToDoList toDoList={list} />
</div>