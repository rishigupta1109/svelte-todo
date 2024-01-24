<script>
    import Footer from "$lib/components/layout/Footer.svelte";
import Navbar from "$lib/components/layout/Navbar.svelte";
import "../app.css";
</script>
<div class="min-h-screen">
    <Navbar />
    <div class="p-8">
        <slot></slot>
    </div>
    <Footer />
</div>