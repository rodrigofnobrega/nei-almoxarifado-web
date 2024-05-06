<template>
    <div class="page-title bg-light row d-block ms-0">
		<div class="catalog-header d-flex align-items-center">
			<h3 class="mt-2"><slot name="titulo" /></h3>
		</div>
	</div>
</template>

<style scoped>
.page-title{
	width: 100%;
	border-bottom: 1px ridge #D9D9D9;
	margin-bottom: 20px;
}
h3{
    font-weight: 300;
    color: rgb(51,51,51, 0.8);
}
.catalog-header{
    justify-content: space-between;
}

@media screen and (max-width: 700px){
    .catalog-header{
        display: block !important;
        text-align: center;
    }
    .actions-buttons{
        justify-content: center;
        align-content: center;
    }
}
</style>