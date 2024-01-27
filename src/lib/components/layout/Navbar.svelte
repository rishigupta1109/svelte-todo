<script>
	import { firebaseStore } from "../../../store/firebaseStore";
	import  { userStore } from "../../../store/userStore";
	import Button from "../ui/Button.svelte";
	import ConfirmAction from "../ui/ConfirmAction.svelte";
	import Logo from "../ui/Logo.svelte";

    // imports over

    $:firestore=$firebaseStore;

    $:user=$userStore;

    let showConfirmAction=false;
</script>

<nav class="flex px-8 py-4 bg-blue-300 text-white justify-between items-center">
    <Logo/>
    {#if user}
        <ConfirmAction open={showConfirmAction} on:cancel={()=>showConfirmAction=false} on:confirm={firestore.signOut}  >
            <Button type='button' on:click={()=>showConfirmAction=true} cta="Logout"  filled={true}>Logout</Button>
        </ConfirmAction>
    {/if}
</nav>