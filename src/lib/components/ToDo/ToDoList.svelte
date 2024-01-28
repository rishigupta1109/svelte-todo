<script lang="ts">
	import { Alert } from "$lib/classes/Alert";
	import { ToDoItem } from "$lib/classes/ToDoItem";
	import { catchError } from "$lib/utils/utils";
	import { alertStore } from "../../../store/alertStore";
	import  { firebaseStore } from "../../../store/firebaseStore";
	import { userToDoStore } from "../../../store/userToDoStore";
	import ToDo from "./ToDo.svelte";
    //import over

    export let toDoList:ToDoItem[]=[];
    //props over

    const firestore=$firebaseStore;


    function remove(event:CustomEvent<string>){
        const id=event.detail;
        firestore.deleteTodo(id);
        userToDoStore.remove(id);
        alertStore.add(new Alert("ToDo Removed","success"));
    }
    function toggle(event:CustomEvent<string>){
        const id=event.detail;
        const item=$userToDoStore.find((toDo)=>toDo.getId()===id);
        if(!item) return ;
        firestore.updateTodo(item);
        userToDoStore.toggle(id);
    }
</script>

<div class="flex flex-col justify-between items-stretch w-full gap-2 py-4  max-h-64 overflow-auto w-full">
    {#each toDoList as toDo(toDo)}
        <ToDo {toDo} on:remove={catchError.bind(null, remove)} on:toggle={catchError.bind(null, toggle)} />
    {/each}
</div>