<script>
    import Footer from "$lib/components/layout/Footer.svelte";
import Navbar from "$lib/components/layout/Navbar.svelte";
	import AlertMessage from "$lib/components/ui/AlertMessage.svelte";
import "../app.css";
</script>
<AlertMessage />
<div class="min-h-screen flex relative flex-col">
    <Navbar />
    <div class="p-8 h-full">
        <slot></slot>
    </div>
    <Footer />
</div>