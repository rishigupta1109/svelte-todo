<script>
    import Footer from "$lib/components/layout/Footer.svelte";
    import Navbar from "$lib/components/layout/Navbar.svelte";
	import AlertMessage from "$lib/components/ui/AlertMessage.svelte";
	import Loading from "$lib/components/ui/Loading.svelte";
    import "../app.css";
</script>


<svelte:head>
    <title>To Do App | Nuclei</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/N.svg" />
</svelte:head>


<AlertMessage />
<Loading />


<div class="min-h-screen flex justify-center relative flex-col">
    <Navbar />
    <div class="p-8 h-full flex justify-center items-center w-full">
        <slot></slot>
    </div>
    <Footer />
</div>