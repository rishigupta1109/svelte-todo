<script lang="ts">
    export let type:'button'|'link'|'submit'|'icon'="button";
    export let disabled:boolean=false;
    export let filled:boolean=false;
    export let className:string="";
    export let href:string="";
    export  let cta="";
    export let testId:string="";
    //props over

    let classes="rounded-md px-4 py-2 ";
    classes+=(filled?`bg-blue-400 text-white transition-all  hover:text-white hover:scale-105 hover:bg-blue-500 `:`hover:scale-105 transition-all bg-white border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white hover:border-white`) ;
</script>

{#if type==="button"}
    <button data-testid={testId} on:click class={`${classes} ${className}`} disabled={disabled}>
       {cta}
    </button>
{:else if type==="link"}
    <a  data-testid={testId} {href} on:click class={`${classes}  ${className}`} >
        {cta}
    </a>
{:else if type==="submit"}
    <input data-testid={testId} on:click type="submit" class={`${classes}  ${className}`} disabled={disabled} value={cta}/>
{:else if type==="icon"}
    <button data-testid={testId} on:click class={`${classes}  ${className}`} disabled={disabled}>
        <slot></slot>
    </button>
{/if}
 