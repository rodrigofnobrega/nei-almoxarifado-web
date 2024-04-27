<template>
    <div class="block">
        <slot />
    </div>
</template>

<script>
</script>

<style>
.block {
    width: 300px;
    height: 400px;
    border: 1px 0px 0px 0px;
    opacity: 0px;
    margin: 100px auto;
    background-color: #f2f2f2;
    justify-content: center;         
    display: flex;  
    border-radius: 15px;                         
}

</style>
<!--
 Alteração do layout para ficar uma coisa padrão,
 tanto para a tela de cadastro, quanto para a tela de login.
 Portanto, caso haja alguma correção (que possivelmente haverá),
 faze-lá imediatamente. 
-->