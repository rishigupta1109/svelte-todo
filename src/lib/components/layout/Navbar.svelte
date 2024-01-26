<script>
	import { primaryColor, primaryColorDark } from "$lib/utils/constant";
    import { FirebaseConfig } from "$lib/utils/firebaseConfig";
	import  { userStore } from "../../../store/userStore";
	import Button from "../ui/Button.svelte";
    let firestore=FirebaseConfig.getInstance();
    $:user=$userStore;
</script>

<nav class="flex px-8 py-4 bg-blue-300 text-white justify-between items-center">
    <h4>Nuclei | To Do App</h4>
    {#if user}
    <Button type='button' cta="Logout"  on:click={firestore.signOut} filled={true}>Logout</Button>
    {/if}
</nav>