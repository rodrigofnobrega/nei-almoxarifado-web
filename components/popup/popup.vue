<template>
    <div class="card popup text-light" :style="{'opacity': showPopup ? '100%' : '0%', 'display': showPopup ? 'flex' : 'none', 'background-color': popupBg}">
        <div class="progress bg-light-emphasis" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar bg-warning" style="width: 100%"></div>
        </div>
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-start">
                <IconsInformation width="23" height="23" class="mb-2 me-2" />
                <h5 class="card-title">Aviso</h5>
            </div>
            <p class="card-text d-flex justify-content-start">{{ popupText }}</p>
        </div>
    </div>
</template>

<script lang="ts">

export default{
    data(){
        return{
            popUp: Object,
            showPopup: false,
            activePopup: 1,
        };
    },
    props: {
        isPopup: {
            type: Boolean,
            required: true
        },
        popupText: {
            type: String,
            required: true
        },
        popupBg: {
            type: String,
            required: true
        }
    },
    methods: {
    },
    mounted(){
        const popUpDom = document.getElementsByClassName('card')[0];
        this.popUp = popUpDom;
    },
    updated(){
        const popUpdestruction = () => {
            this.popUp.classList.remove('d-block');
            this.popUp.classList.add('d-none');
            this.activePopup = 1;
        }
        if(this.activePopup == 1){ 
            if(this.isPopup == false){
                this.showPopup = true;
            }else{
                this.showPopup = this.isPopup;
            }
            this.popUp.style.opacity = '100%';
            this.popUp.classList.remove('d-none');
            this.popUp.classList.add('d-block');
            const disablePopup = () => {
                this.popUp.style.opacity = '0';
                setTimeout(popUpdestruction, 1000);
            };
            if(this.showPopup == true){
                setTimeout(disablePopup, 6500)
            }
        }
        this.activePopup = 0;
    },
}
</script>

<style scoped>
@keyframes opacityAnimation{
    0% {opacity: 0;}
    100% {opacity: 100%}
}

@keyframes movement{
    0% {bottom: -100px;}
    100% {bottom: 10px;}
}

@keyframes widthAnimation{
  0% {width: 0%;}
  100% {width: 100%;}
}
.popup{
    transition: opacity 1s ease-in-out;
    font-size: 17px;
    width: 18rem;
    position: fixed;
    bottom: 10px;
    right: 30px;
    animation-name: movement;
    animation-duration: 1.3s;
    z-index: 5000;
    box-shadow: 0px 0px 10px 4px rgba(254, 213, 30, 0.7);
}
.progress-bar{
    animation: widthAnimation 6.5s;
    color: red;
}

</style>