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
.card-header{
	height: 40px;
}
</style>
