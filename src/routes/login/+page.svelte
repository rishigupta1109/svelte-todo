<script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "$lib/components/ui/Button.svelte";
	import { FirebaseConfig } from "$lib/utils/firebaseConfig";
	import { userStore } from "../../store/userStore";
	
    let fireStore:FirebaseConfig=FirebaseConfig.getInstance();
    $:console.log($userStore);
    $: user=$userStore;
    $: if (typeof window !== 'undefined' && user) {
        goto("/");
    }
</script>


<div class="min-h-screen flex justify-center items-center">
    <Button cta="Sign up with Google" on:click={fireStore.signUpWithGoogle}>
    </Button>
</div>