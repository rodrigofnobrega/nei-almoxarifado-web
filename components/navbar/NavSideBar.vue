<template>
    <div class="nav bg-light-emphasis d-flex offcanvas show showing" :class="{ 'collapsed': isCollapsed }" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div class="offcanvas-body ps-3" >
                <ul class="list-group-flush container d-block" :class="{ 'collapsed': isCollapsed }">
                    <a class="text-decoration-none" href="/" aria-current="true">
                        <div class="item-bg item-top" :class="{'active': $route.path === '/', 'text-dark-emphasis': $route.path !== '/'}">
                            <IconsHome class="nav-icon"/>
                            <span class="list-group-item">Home</span>
                        </div>
                    </a>
                    <a class="text-decoration-none" href="/controle-de-acesso" aria-current="true">
                        <div class="item-bg" :class="{'active': $route.path === '/controle-de-acesso', 'text-dark-emphasis': $route.path !== '/controle-de-acesso' }">
                            <IconsControl class="nav-icon"/>
                            <span class="list-group-item">Controle de Acesso</span>
                        </div>
                    </a>
                    <a class="text-decoration-none" href="/inventario" aria-current="true">
                        <div class="item-bg" :class="{'active': $route.path === '/inventario', 'text-dark-emphasis': $route.path !== '/inventario'}">
                            <IconsSpreadSheet class="nav-icon"/>
                            <span class="list-group-item">Catálogo</span>
                            <button class="svg-button" @click="rotate" data-bs-toggle="dropdown" aria-expanded="false">
                                <IconsDownArrow class="small-rotate-arrow" :style="{ transform: isRoted ? 'rotate(180deg)' : 'rotate(0deg)'}" :class="{'text-dark-emphasis': $route.path !== '/inventario'}" width="24px" height="24px"/>
                            </button>
                        </div>
                    </a>
                    <div :class="{'hiden': !isRoted}">
                        <a class="text-decoration-none" v-for="route in dropdwonRoutes" :href="route.path" :key="route.name"  aria-current="true">
                            <div class="item-bg" :class="{'active': $route.path === route.path, 'text-dark-emphasis': $route.path !== route.path }">
                                <span class="list-group-item">{{route.name}}</span>
                            </div>
                        </a>
                    </div>
                    <a class="text-decoration-none" href="/registro" aria-current="true">
                        <div class="item-bg" :class="{'active': $route.path === '/registro', 'text-dark-emphasis': $route.path !== '/registro'}">
                            <IconsDirectory class="nav-icon"/>
                            <span class="list-group-item">Registro</span>
                        </div>
                    </a>
                    <a class="text-decoration-none" href="/configuracoes" aria-current="true">
                        <div class="item-bg" :class="{'active': $route.path === '/configuracoes', 'text-dark-emphasis': $route.path !== '/configuracoes'}">
                            <IconsSettings class="nav-icon"/>
                            <span class="list-group-item">Configurações</span>
                        </div>
                    </a>
                    <a class="text-decoration-none" href="/sobre" aria-current="true">
                        <div class="item-bg text-start" :class="{'active': $route.path === '/sobre', 'text-dark-emphasis': $route.path !== '/sobre'}">
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
import { useStorageStore } from '../../stores/storage';
    
export default {
    data() {
        return {
            isRoted: false,
            isCollapsed: false,
            dropdwonRoutes: []
        }
    },
    methods: {
        sidebarColapse() {
          this.isCollapsed = !this.isCollapsed;
        },
        rotate(){
            console.log(this.dropdwonRoutes);
            this.isRoted = !this.isRoted;
        },
      },
    mounted(){
        const store = useStorageStore();
        const routes  = useRoutes();
        for(let i = 0; i < routes.length; i++){
            if(routes[i].includes('/inventario/')){
                store.setSublink({
                    path: routes[i],
                    name: routes[i].split('/')[2]
                });
            }
        }
        console.log(store.sidebarSublinks);
        this.dropdownRoutes = store.sidebarSublinks;
    }
}
</script>
    
<style scoped>
.offcanvas{
    border: none;
    width: 160px;
    height: 97vh;  
    top: 3%;
    padding-top: 20px;
    overflow-x: hidden;
    transition: width 0.6s ease-in-out;
}
.offcanvas-body{
    bottom: 0;
    margin-right: 0px;
    padding-right: 0px;
    margin-bottom: -200px;
}
.small-rotate-arrow{
  transition: transform 0.3s ease-in-out;
  margin-left: 35px;
}
.svg-button{
    border: none;
    padding: 0;
    margin: 0;
    background: none;
}
.nav{   
    margin: 0;
    position: sticky;
    display: flex;
    transition: width 0.6s ease-in-out;
}
.list-group-item{
    display: flex;
    font-size: 12px;
    margin-left: 7px;
    margin-top: 2px;
    text-decoration: none;
    text-align: start;
    white-space: nowrap;
    transition: opacity 1.5s ease-in-out;
}
.item-top{
    margin-bottom: -9px;
}
.item-bg{
    transition: width 0.6s ease-in-out;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    margin-top: 25px;
    padding-left: 5px;
    height: 42px;
    width: 145px;
}
.collapsed {
    width: 50px; 
    
}
.colapse-btn{
    padding: 0;
    width: 160px;
    bottom: 0;
    height: 40px;
    transition: width 0.6s ease-in-out;
    overflow: hidden;
}
.collapsed .colapse-btn{
    width: 50px;
    height: 40px;
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
.hiden{
    display: none;
}
.item-bg:hover{
    background: #D9D9D9;
    color: #333333;
    border-radius: 9px;
}
.list-group-item:hover{
    color: #333333;
}
</style>