
<script lang="ts">

    export let className:string="";
</script>

<button on:click class={`fixed rounded-full h-16 aspect-square bottom-16 right-16 border bg-blue-300 hover:scale-110 transition-all hover:bg-blue-400 flex justify-center items-center ${className}`}>
    <slot></slot>
</button>