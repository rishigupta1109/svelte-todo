<script lang="ts">
	import { ToDoItem } from "$lib/classes/ToDoItem";
	import { FirebaseConfig } from "$lib/utils/firebaseConfig";
	import { userToDoStore } from "../../../store/userToDoStore";
	import ToDo from "./ToDo.svelte";
    export let toDoList:ToDoItem[]=[];
    const firestore=FirebaseConfig.getInstance();
    function remove(event:CustomEvent<string>){
        const id=event.detail;
        userToDoStore.remove(id);
        firestore.deleteTodo(id);
    }
    function toggle(event:CustomEvent<string>){
        const id=event.detail;
        userToDoStore.toggle(id);
        const item=$userToDoStore.find((toDo)=>toDo.getId()===id);
        console.log(item);
        firestore.updateTodo(item);
    }
</script>

<div class="flex flex-col justify-between items-stretch w-full gap-2 py-4  max-h-64 overflow-auto">
    {#each toDoList as toDo(toDo)}
        <ToDo {toDo} on:remove={remove} on:toggle={toggle} />
    {/each}
</div>