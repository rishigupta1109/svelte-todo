<script lang="ts">
    export let type:'button'|'link'|'submit'|'icon'="button";
    export let disabled:boolean=false;
    export let filled:boolean=false;
    export let color:string="";
    export let className:string="";
    export let href:string="";
    export  let cta="";
    let classes="rounded-md px-4 py-2 ";
    classes+=(filled?`bg-${color} text-white hover:bg-white hover:text-${color} border-2 hover:border-${color}`:`bg-white border-2 border-${color} text-${color} hover:bg-${color} hover:text-white`) ;
</script>

{#if type==="button"}
    <button on:click class={`${classes} ${className}`} disabled={disabled}>
       {cta}
    </button>
{:else if type==="link"}
    <a {href} on:click class={`${classes} ${className}`} >
        {cta}
    </a>
{:else if type==="submit"}
    <input on:click type="submit" class={`${classes} ${className}`} disabled={disabled} value={cta}/>
{:else if type==="icon"}
<button on:click class={`${classes} ${className}`} disabled={disabled}>
    <slot></slot>
 </button>
    {/if}
 