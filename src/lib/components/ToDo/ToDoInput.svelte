
<script lang="ts">
	import { Alert } from "$lib/classes/Alert";
	import { ToDoItem } from "$lib/classes/ToDoItem";
	import { primaryColor, primaryColorDark } from "$lib/utils/constant";
	import { FirebaseConfig } from "$lib/utils/firebaseConfig";
	import { generateRandomId } from "$lib/utils/utils";
	import { alertStore } from "../../../store/alertStore";
	import { userStore } from "../../../store/userStore";
	import { userToDoStore } from "../../../store/userToDoStore";
	import Button from "../ui/Button.svelte";
    export let showModal;
    let title: string = "";
    let description: string = "";
    let dueDate: string="";
    $:user=$userStore;
    $:console.log(user);
    const firestore=FirebaseConfig.getInstance();
    const addToDoHandler = () => {
        if(!user){
            alertStore.add(new Alert("Please Login","error"));
            return;
        }
        console.log(title, description);
        try{
            const newToDo= new ToDoItem(generateRandomId(), title, description,user?.getId(),new Date(dueDate));
            userToDoStore.append(newToDo);
            firestore.createTodo(newToDo);
            alertStore.add(new Alert("ToDo Added","success"));
            title = "";
            description = "";
            dueDate="";
            showModal=false;
        }catch(e:any){
            console.log(e);
            alertStore.add(new Alert(e?.message,"error"));
        }
    };
    $: console.log(dueDate);
</script>

<span class="min-w-full bg-blue-300 p-8 rounded-md flex flex-col justify-around items-stretch gap-2 ">
    <p class="text-white">Title :</p>
    <input type="text" bind:value={title} class=" rounded-md w-full outline-none px-4 py-2" placeholder="Title" />
    <p class="text-white">Description :</p>
    <textarea bind:value={description} class=" rounded-md outline-none px-4 py-2" placeholder="Description" />
    <p class="text-white">Due Date :</p>
    <input type="date"  bind:value={dueDate} class=" rounded-md outline-none px-4 py-2" placeholder="Due Date" />
    <Button type='button' filled={true}  on:click={addToDoHandler} cta="Add"></Button>
</span>