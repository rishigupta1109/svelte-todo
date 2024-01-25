<script>
    import ToDoInput from "$lib/components/ToDo/ToDoInput.svelte";
	import ToDoList from "$lib/components/ToDo/ToDoList.svelte";
	import ListWrapper from "$lib/components/ui/ListWrapper.svelte";
	import { userToDoStore } from "../store/userToDoStore";
    $: completedToDos=$userToDoStore.filter((toDo)=>toDo.getCompleted());
    $: uncompletedToDos=$userToDoStore.filter((toDo)=>!toDo.getCompleted());
    $:console.log(completedToDos,uncompletedToDos);
</script>
<main class="min-w-full min-h-full flex flex-col justify-between">
    <ToDoInput />
    <div class="flex justify-between gap-2">
        <ListWrapper title="Uncompleted" list={uncompletedToDos} />
        <ListWrapper title="Completed" list={completedToDos} />
    </div>
</main>