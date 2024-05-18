<template>
    <div class="position-static toolTip d-flex justify-content-start">
        <p v-show="toolTipState" class="tooltipText position-fixed bg-dark-emphasis text-light rounded-1 p-2">{{ toolTipText }}</p>
    </div>
</template>

<script>
export default{
    props: {
        toolTipState: {
            type: Boolean,
            required: true
        },
        toolTipText: {
            type: String,
            required: true
        }
    },
    methods: {
        tooltipTrigger(id){
            this.toolTipState = !this.toolTipState
        }
    }
}
</script>

<style scoped>
.tooltipText{
    z-index: 10000;
    white-space: nowrap;
    font-size: 13px;
    opacity: 75%;
    border: none;
}


</style>