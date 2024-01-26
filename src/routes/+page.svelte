<script lang="ts">
	import { goto } from "$app/navigation";
    import ToDoInput from "$lib/components/ToDo/ToDoInput.svelte";
	import ToDoList from "$lib/components/ToDo/ToDoList.svelte";
	import ListWrapper from "$lib/components/ui/ListWrapper.svelte";
	import { onMount } from "svelte";
	import { userStore } from "../store/userStore";
	import { userToDoStore } from "../store/userToDoStore";
	import { FirebaseConfig } from "$lib/utils/firebaseConfig";
	import type { ToDoItem } from "$lib/classes/ToDoItem";
	import InputModal from "$lib/components/ui/InputModal.svelte";
    $: completedToDos=$userToDoStore.filter((toDo)=>toDo.getCompleted());
    $: incompleteToDos=$userToDoStore.filter((toDo)=>!toDo.getCompleted());
    $:console.log(completedToDos,incompleteToDos);
    $: user=$userStore;
    $: if (typeof window !== 'undefined' && !user) {
        goto("/login");
    }
    let fireStore=FirebaseConfig.getInstance();
    $:if(user){
        fireStore.getMyTodos(user?.getId()).then((todos:ToDoItem[])=>{
            userToDoStore.set(todos);
            console.log(todos);
        })
    }
    
</script>
<main class="min-w-full min-h-full flex flex-col justify-between">
    <div class="flex justify-between items-center p-4 bg-blue-500 text-white">
       WELCOME ! {user?.getName().toLocaleUpperCase()}
    </div>
    <InputModal/>
    <div class="flex justify-between gap-2 h-full flex-wrap">
        <ListWrapper title="Incomplete Tasks" list={incompleteToDos} />
        <ListWrapper title="Completed Tasks" list={completedToDos} />
    </div>
</main>