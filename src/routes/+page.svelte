<script lang="ts">
	import { goto } from "$app/navigation";
	import ListWrapper from "$lib/components/ui/ListWrapper.svelte";
	import { userStore } from "../store/userStore";
	import { userToDoStore } from "../store/userToDoStore";
	import type { ToDoItem } from "$lib/classes/ToDoItem";
	import InputModal from "$lib/components/ui/InputModal.svelte";
	import { firebaseStore } from "../store/firebaseStore";
    import {alertStore} from "../store/alertStore";
    import { Alert } from "$lib/classes/Alert";
    //imports over

    $: completedToDos=$userToDoStore.filter((toDo)=>toDo.getCompleted());
    $: incompleteToDos=$userToDoStore.filter((toDo)=>!toDo.getCompleted());
    $: user=$userStore;
    $:fireStore=$firebaseStore;

    $: if (typeof window !== 'undefined' && !user) {
        goto("/login");
    }
    $:if(user){
        try{
            fireStore.getMyTodos(user?.getId()).then((todos:ToDoItem[])=>{
                userToDoStore.set(todos);
                console.log("here",todos);
            })
        }catch(err){
            console.log(err);
            alertStore.add(new Alert("Error Fetching Todos","error"));
        }
    }
    
</script>

<main class=" min-h-full flex flex-col justify-between w-full max-w-[1000px]">
    <div class="flex justify-between items-center p-4 bg-blue-500 text-white">
       WELCOME ! {user?.getName().toLocaleUpperCase()}
    </div>
    <InputModal/>
    {#key $userToDoStore}
    <div class="flex justify-between gap-2 h-full flex-wrap">
        <ListWrapper title="Incomplete Tasks" list={incompleteToDos} />
        <ListWrapper title="Completed Tasks" list={completedToDos} />
    </div>
    {/key}
</main>