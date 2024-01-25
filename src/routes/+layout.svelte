<script>
    import Footer from "$lib/components/layout/Footer.svelte";
import Navbar from "$lib/components/layout/Navbar.svelte";
import "../app.css";
</script>
<div class="min-h-screen flex relative flex-col">
    <Navbar />
    <div class="p-8 h-full">
        <slot></slot>
    </div>
    <Footer />
</div>