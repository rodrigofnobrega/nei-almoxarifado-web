<template>
	<div class="modal fade" tabindex="-1"> 
		<div class="modal-dialog modal-dialog-start modal-dialog-scrollable"> 
			<div class="modal-content"> 
				<div class="modal-header justify-content-between small">
					<slot name="header" />	
				</div>
				<div class="modal-body">
					<slot name="body" />
				</div>
				<div class="modal-footer">
					<slot name="footer" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.modal-content{
	overflow-y: hidden;
}
@media screen and (max-width: 676px) {
	.modal-dialog{
		margin-top: 10% !important;
		margin-left: 10% !important;
		margin-right: 5% !important;
	}
}
@media screen and (max-width: 412px) {
	.modal-dialog{
		margin-left: 7% !important;
		margin-right: 7% !important;
	}
}
</style>

