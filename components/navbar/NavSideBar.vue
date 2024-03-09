<template>
    <div class="nav bg-light-emphasis d-flex offcanvas show" :class="{ 'collapsed': isCollapsed }" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div class="offcanvas-body ps-3" >
                <ul class="list-group-flush container d-block" :class="{ 'collapsed': isCollapsed }">
                    <a class="nav-route text-decoration-none" href="/" aria-current="true">
                        <div class="nav-container item-bg text-dark-emphasis">
                            <IconsHome class="nav-icon"/>
                            <span class="list-group-item">Home</span>
                        </div>
                    </a>
                    <a class="nav-route text-decoration-none" href="/controle-de-acesso" aria-current="true">
                        <div class="nav-container item-bg text-dark-emphasis">
                            <IconsControl class="nav-icon"/>
                            <span class="list-group-item">Controle de Acesso</span>
                        </div>
                    </a>
                    <a class="nav-route text-decoration-none" href="/inventario" aria-current="true">
                        <div class="nav-container item-bg text-dark-emphasis">
                            <IconsSpreadSheet class="nav-icon"/>
                            <span class="list-group-item">Catálogo</span>
                        </div>
                    </a>
                    <a class="nav-route text-decoration-none" href="/registro" aria-current="true">
                        <div class="nav-container item-bg text-dark-emphasis">
                            <IconsDirectory class="nav-icon"/>
                            <span class="list-group-item">Registro</span>
                        </div>
                    </a>
                    <a class="nav-route text-decoration-none" href="/configuracoes" aria-current="true">
                        <div class="nav-container item-bg text-dark-emphasis">
                        <IconsSettings width="25px" height="25px" class="nav-icon"/>
                            <span class="list-group-item">Configurações</span>
                        </div>
                    </a>
                    <a class="nav-route text-decoration-none" href="/sobre" aria-current="true">
                        <div class="nav-container item-bg text-start text-dark-emphasis">
                            <IconsInformation class="nav-icon"/>
                            <span class="d-inline-block list-group-item">Sobre</span>
                        </div>
                    </a>
                </ul>
            </div>
            <div class="offcanvas-footer d-block" :class="{ 'collapsed': isCollapsed }">
                <button class="colapse-btn d-flex align-items-center justify-content-center btn bg-gray-light text-dark" @click="sidebarColapse" type="button" id="sideBareColapse" >
                    <IconsCloseArrow :style="{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0)' }" class="rotate-arrow"/>
                </button>
            </div>
    </div>
    </template>
    
    <script >
    
    export default {
      data() {
        return {
          isCollapsed: false
        }
      },
      methods: {
        sidebarColapse() {
          this.isCollapsed = !this.isCollapsed;
        }
      },
      mounted(){
        /*Código para aplicar o actvie na sidebar*/ 
        const currentRoute = this.$route.path;
        let navRoutes = document.getElementsByClassName("nav-route");
        let navContainers = document.getElementsByClassName("nav-container");
        for(let i = 0; i < navRoutes.length; i++){
            if(navRoutes[i].getAttribute('href') === currentRoute){
                navContainers[i].classList.add('active');
                navContainers[i].classList.remove('text-dark-emphasis');
            };
        };
      },
    }
</script>
    
<style scoped>
.offcanvas{
    border: none;
    width: 200px;
    height: 95vh;  
    top: 5%;
    padding-top: 30px;
    transition: width 0.6s ease-in-out;
}
.offcanvas-body{
    bottom: 0;
    margin-right: 0px;
    padding-right: 0px;
    margin-bottom: -200px;
}
.nav{   
    margin: 0;
    position: sticky;
    display: flex;
    transition: width 0.6s ease-in-out;
}
.list-group-item{
    display: flex;
    font-size: 13px;
    margin-left: 7px;
    text-decoration: none;
    text-align: start;
    white-space: nowrap;
    transition: opacity 1.5s ease-in-out;
}
.item-bg{
    transition: width 0.6s ease-in-out;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    margin-top: 15px;
    padding-left: 5px;
    height: 52px;
    width: 180px;
}
.collapsed {
  width: 50px; 
  
}
.colapse-btn{
    padding: 0;
    width: 200px;
    bottom: 0;
    height: 55px;
    transition: width 0.6s ease-in-out;
    overflow-x: hidden;
}
.collapsed .colapse-btn{
    width: 50px;
    height: 55px;
}
.collapsed .list-group-item{
    visibility: hidden;
    opacity: 0;
}
.collapsed .item-bg{
    width: 35px;
}
.rotate-arrow{
    transition: transform 0.6s ease-in-out;
}
.list-group-flush{
    margin-left: -20px;
}
.nav-icon{
    flex-shrink: 0; 
}
.active{
    color: white;
    background: #0B3B69;
    border-radius: 9px;
}
.item-bg:hover{
    background: #D9D9D9;
    color: #333333;
    border-radius: 9px;
}
</style>