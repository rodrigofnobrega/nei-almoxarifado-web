<template>
    <div class="position-fixed toolTip d-flex justify-content-start">
        <p :class="{'tooltipText': true, 'show': toolTipState}" class="tooltipText position-fixed bg-dark-emphasis text-light rounded-1 p-2">{{ toolTipText }}</p>
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
    font-size: 14px;
    border: none;
    opacity: 0;
    transition: opacity 0.2s ease-in;
    transition-delay: 1.2s;
}

.tooltipText.show {
    opacity: 0.85;
    transition: opacity 0.2s ease-in;
    transition-delay: 1.2s;
}

.tooltipText:not(.show) {
    transition: opacity 0.1s ease-out;
    transition-delay: 0s;
}

</style>