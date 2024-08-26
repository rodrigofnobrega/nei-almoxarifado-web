<template>
    <div class="card">
		<div class="card-header bg-primary"> 
			<slot name="header" />	
		</div>
		<div class="card-body">
			<slot> </slot>
		</div>
		<div class="card-footer">
			<slot name="footer"/>
		</div>
    </div>
</template>

<style scoped> 
.card{
    box-shadow: 0px 0px 10px 2px rgb(0, 0, 0, 0.3);
}
.card-header{
	height: 40px;
}
</style>
