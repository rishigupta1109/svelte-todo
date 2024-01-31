
<script lang="ts">
	import { Alert } from "$lib/classes/Alert";
	import { ToDoItem } from "$lib/classes/ToDoItem";
	import { descriptionLength, titleLength } from "$lib/utils/constants";
	import { catchError, generateRandomId } from "$lib/utils/utils";
	import { alertStore } from "../../../store/alertStore";
	import { firebaseStore } from "../../../store/firebaseStore";
	import { userStore } from "../../../store/userStore";
	import { userToDoStore } from "../../../store/userToDoStore";
	import Button from "../ui/Button.svelte";
    //import over

    export let showModal;
    //props over

    let title: string = "";
    let description: string = "";
    let dueDate: string="";
    $:user=$userStore;
    $:firestore=$firebaseStore;

    const addToDoHandler = () => {
        if(!user){
            return alertStore.add(new Alert("Please Login","error"));
        }
        if(dueDate===""||new Date(dueDate)<new Date()){
            return alertStore.add(new Alert("Please Enter a Valid Due Date","error"));
        }
            const newToDo= new ToDoItem(generateRandomId(), title, description,user?.getId(),new Date(dueDate));
            firestore.createTodo(newToDo);
            userToDoStore.append(newToDo);
            showModal=false;
            alertStore.add(new Alert("ToDo Added","success"));
            title = "";
            description = "";
            dueDate="";
    };
</script>

<span data-testid="todo-input-container" class="min-w-full bg-blue-400 p-8 rounded-md flex flex-col justify-around items-stretch gap-2 ">
    <p class="text-white">Title : (Max. {titleLength} chars)</p>
    <input data-testid="input-title" type="text" bind:value={title} maxlength={titleLength} class=" rounded-md w-full outline-none px-4 py-2" placeholder="Title" />
    <p class="text-white">Description : (Max. {descriptionLength} chars)</p>
    <textarea data-testid="input-description" bind:value={description}  maxlength={descriptionLength} class=" rounded-md outline-none px-4 py-2" placeholder="Description" />
    <p class="text-white">Due Date : (Future date only)</p>
    <input data-testid="input-due-date" type="date"  bind:value={dueDate} class=" rounded-md outline-none px-4 py-2" placeholder="Due Date" />
    <Button testId="add-button" type='button' filled={false}  on:click={catchError.bind(null,addToDoHandler)} cta="Add"></Button>
</span>