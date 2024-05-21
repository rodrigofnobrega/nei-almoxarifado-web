<template>
<div class="card mx-2 rounded-4">
    <slot name="image-cap"/>
    <div class="card-body p-3 text-dark-emphasis">
        <slot name="body"/>
    </div>
</div>
</template>

<style scoped>
.card{
    transition: transform 0.5s ease-in-out;
    border: 1px #b6b6b6 solid;
    box-shadow:  0px 0px 10px 0px rgb(0, 0, 0, 0.2);
}

.card-body{
    transition: color, background-color 0.4s ease-in-out;
}
.card:hover{
    transform: scale(1.04);
}

.card:hover{
    background-color: #0B3B69;
    color: white;
}
.card:hover .text-dark-emphasis{
    color: white !important;
}
.card:hover .stretched-link{
    color: white;
}
@media screen and (max-width: 962px){
    .card-body{
        padding: 10px !important;
    }
}
@media screen and (max-width: 812px){
    .card-body{
        padding: 20px !important;
    }
}
</style>