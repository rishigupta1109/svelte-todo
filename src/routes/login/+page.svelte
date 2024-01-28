<script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "$lib/components/ui/Button.svelte";
	import { userStore } from "../../store/userStore";
	import { firebaseStore } from "../../store/firebaseStore";
	import { catchError } from "$lib/utils/utils";
	//imports over

    $:fireStore=$firebaseStore;
    $: user=$userStore;
    $: if (typeof window !== 'undefined' && user) {
        goto("/");
    }
</script>


<div class="min-h-full flex flex-col gap-8 justify-center items-center">
    <h1 class="text-blue-400">
        Welcome to Nuclei`s Own ToDo App
    </h1>
    <Button cta="Sign up with Google" on:click={catchError.bind(null, fireStore.signUpWithGoogle)}/>
</div>