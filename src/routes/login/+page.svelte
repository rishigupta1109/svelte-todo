<script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "$lib/components/ui/Button.svelte";
	import { userStore } from "../../store/userStore";
	import { firebaseStore } from "../../store/firebaseStore";
	//imports over

    $:fireStore=$firebaseStore;
    $: user=$userStore;
    $: if (typeof window !== 'undefined' && user) {
        goto("/");
    }
</script>


<div class="min-h-screen flex justify-center items-center">
    <Button cta="Sign up with Google" on:click={fireStore.signUpWithGoogle}/>
</div>