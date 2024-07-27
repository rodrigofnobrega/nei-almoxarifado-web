<template>
    <div class="container-fluid">
        <div class="sub-catalog bg-light mt-1 ps-2 pe-2">
            <h6 class="sub-catalog-title ps-2 d-flex align-items-center opacity-75">
                <IconsInformation class="me-2"/>
                Descrição da página
            </h6>
            <p class="sub-catalog-text opacity-75">Nesta página temos todos os itens disponíveis do almoxarifado(itens esgotados devem ser cadastrados novamente). 
                Ademais, o cadastro de novos itens e reposição da quantidade de algum item já existente é feito pelo botão 
            <span class="border-bottom border-dark-success pb-1">Adicionar <IconsThinPlus style="margin-bottom: 0px;"  width="18px" height="18px"/></span></p>
        </div>
        <div class="table-box-title  d-flex justify-content-between align-items-center text">
            <div class="d-flex box-title align-items-center px-1 text bg-light-emphasis" style="padding-top: 5px; padding-bottom: 5px;">
                <IconsRequest class="me-1" width="25" height="25"/>
                <p class="box-title-text">
                    Histórico de Solicitações
                </p>
            </div>
            <div class="d-flex justify-content-end aling-items-center me-4 actions" style="margin-top: 2px;">
                <span v-if="!mobileView" @click="changeView = !changeView" type="button" style="color: rgb(0, 0, 0, 0.7);" class=" text-dark-emphasis box-title bg-light-emphasis px-2 table-searchbar me-2 position-sticky d-flex align-items-center">
                    <IconsMenu v-if="changeView" class="me-1"/>
                    <IconsGrid v-if="!changeView" class="me-1"/>
                    Vizualização
                </span>
                <span v-if="requestsLoad" class="box-title bg-light-emphasis position-sticky d-flex align-items-center table-searchbar" style="margin-top: 0.8px;">
                    <input id="tableSearch" v-model="searchInput" class="searchbar bg-transparent form-control" placeholder="Pesquisar"/>          
                    <IconsSearchGlass class="search-glass"/>
                </span>
            </div>
        </div>
        <div class="requests-container mx-2 bg-light">
            <div :class="{'d-flex': !changeView, 'd-block': changeView}" class="justify-content-between mb-5">
                <div class="mx-2 text-dark-emphasis mt-3 rounded-2">
                    <div class="requests-box mt-0 pt-0 z-0">
                        <div class="d-flex box-title align-items-center justify-content-between mx-3" >
                            <div class="d-flex align-items-center">
                                <IconsClock class="me-2 text-dark-warning" width="25" height="25"/>
                                <h5 class="m-0 p-0">Em Progresso
                                </h5>
                                <span>({{requestsCache.inProgressRequests.length}})</span>
                            </div>
                            <div class="dropdown">
                                <button title="Filtro" class="d-flex align-items-center btn btn-transparent px-0 border-0" data-bs-toggle="dropdown" aria-expanded="false">
                                  <IconsBarFilter class="text-dark-emphasis me-1" width="25" height="25" />
                                </button>
                                <div class="dropdown-menu p-0">
                                    <li type=button class="dropdown-item d-flex justify-content-between align-items-center fw-bold text-dark-emphasis" @click="applyFilter(requestsCache.inProgressRequests,'date', 'asc')">Data <IconsUpArrow width="22" height="22"/></li>
                                    <li type=button class="dropdown-item d-flex justify-content-between align-items-center fw-bold text-dark-emphasis" @click="applyFilter(requestsCache.inProgressRequests,'date', 'desc')">Data <IconsBottomArrow width="22" height="22"/></li>
                                    <li type=button class="dropdown-item d-flex justify-content-between align-items-center fw-bold text-dark-emphasis" @click="applyFilter(requestsCache.inProgressRequests,'name', 'asc')">Nome <IconsUpArrow width="22" height="22"/></li>
                                    <li type=button class="dropdown-item d-flex justify-content-between align-items-center fw-bold text-dark-emphasis" @click="applyFilter(requestsCache.inProgressRequests,'name', 'desc')">Nome <IconsBottomArrow width="22" height="22"/></li>
                                </div>
                            </div>
                        </div>
                        <div :class="{'d-flex': changeView, 'd-block': !changeView, 'width-adjust': changeView}">
                            <CardsCard :class="{'card-width-adjust': changeView}" 
                            v-if="requestsCache.inProgressRequests.length > 0" 
                            v-for="(request, index) in requestsCache.inProgressRequests.slice(0, requestsLoaded[0])" 
                            :key="index" class="col-6 card-container mb-3 mx-2 bg-light-background">
                                <template v-slot:header>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <p class="justify-content-start mb-3 fw-bold">
                                            Solicitação
                                        </p>
                                        <p @mouseover="toolTip = true" @mouseout="toolTip = false" class="resquest-time mb-3">{{ request.creationDate.slice(0, 19) }}<IconsClock class="clock ms-2" style="margin-bottom: 2px;"/></p>
                                    </div>
                                </template>
                                <template v-slot:default>
                                    <div class="row cards-row">
                                        <div class="mb-3"> 
                                            <label class="form-label fw-semibold"> Item solicitado </label>
                                            <div class="overflow-x-auto">
                                                <input readonly class="form-control overflow-x-auto" :value="request.item.name"> 
                                            </div>
                                        </div>
                                        <div class="col-6 me-0">
                                            <div class="mb-3"> 
                                                <label class="form-label fw-semibold"> Quantidade Solicitada </label>
                                                <input readonly class="form-control" :value="request.quantityRequested">
                                            </div>		
                                            <div class="mb-3"> 
                                                <label class="form-label fw-semibold"> Código Sipac </label>
                                                <input readonly class="form-control" :value="request.item.sipacCode"> 
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="mb-3"> 
                                                <label class="form-label fw-semibold"> Quantidade Disponível </label>
                                                <input readonly class="form-control" :value="request.item.quantity"> 
                                            </div>		
                                            <div class="mb-0"> 
                                                <label class="form-label fw-semibold"> Tipo </label>
                                                <input readonly class="form-control" :value="request.item.type">
                                            </div>	
                                        </div>
                                        <div class="mb-0"> 
                                            <label class="form-label fw-semibold"> Mensagem </label>
                                            <div class="d-flex">
                                                <textarea readonly class="form-control"> {{ request.description }} </textarea>
                                            </div>
                                        </div>	
                                    </div>
                                </template>
                                <template v-slot:footer>
                                    <div class="d-flex align-items-center justify-content-end">
                                        <span type="button" @click="cancelRequest(request.id, index)" class="fw-bold text-dark-alert d-flex align-items-center">
                                            Cancelar
                                            <IconsClose style="margin-top: 2px;" height="21" width="22"/>
                                        </span>
                                    </div>
                                </template>
                            </CardsCard>
                            <div v-else :style="{'width': !changeView ? '300px' : '100%', 'justify-content': !changeView ? '' : 'center'}" class="d-flex empty-text mt-5 pt-2 opacity-75">
                                <p>
                                    Nenhuma solicitação encontrada...
                                </p>
                            </div>
                    </div>
                    <div :class="{'d-flex align-items-center ms-2': changeView}" v-if="requestsLoaded[0] < requestsCache.inProgressRequests.length">
                        <div class="d-flex justify-content-center">
                            <button title="Carregar Mais" @click="requestsLoaded[0] += 3" class="btn btn-dark-success text-light text-nowrap fw-bold" style="padding: 3px;">
                                <IconsThinPlus width="30" height="30"/>
                            </button>
                        </div>
                        <div class="d-flex justify-content-center">
                        </div>
                    </div>
                </div>
                </div>
                <div class="text-dark-emphasis rounded-2 mx-2" :class="{'mt-4': changeView}">
                    <div class="requests-box pt-0 mt-3">
                        <div class="d-flex align-items-center justify-content-between mx-3">
                            <div class="d-flex align-items-center">
                                <IconsConfirm class="text-light-success me-2" width="30" height="30"/>
                                <h5 class="m-0 p-0">Aceitos
                                </h5>
                                <span>({{requestsCache.acceptedRequests.length}})</span>
                            </div>
                            <div class="dropdown">
                                  <button title="Filtro" class="btn btn-transparent px-0 border-0" data-bs-toggle="dropdown" aria-expanded="false">
                                    <IconsBarFilter class="text-dark-emphasis me-1" width="25" height="25" />
                                  </button>
                                  <div class="dropdown-menu p-0">
                                    <li type=button class="dropdown-item d-flex justify-content-between align-items-center fw-bold text-dark-emphasis" @click="applyFilter(requestsCache.acceptedRequests,'date', 'asc')">Data <IconsUpArrow width="22" height="22"/></li>
                                    <li type=button class="dropdown-item d-flex justify-content-between align-items-center fw-bold text-dark-emphasis" @click="applyFilter(requestsCache.acceptedRequests,'date', 'desc')">Data <IconsBottomArrow width="22" height="22"/></li>
                                    <li type=button class="dropdown-item d-flex justify-content-between align-items-center fw-bold text-dark-emphasis" @click="applyFilter(requestsCache.acceptedRequests,'name', 'asc')">Nome <IconsUpArrow width="22" height="22"/></li>
                                    <li type=button class="dropdown-item d-flex justify-content-between align-items-center fw-bold text-dark-emphasis" @click="applyFilter(requestsCache.acceptedRequests,'name', 'desc')">Nome <IconsBottomArrow width="22" height="22"/></li>
                                </div>
                            </div>
                        </div>
                        <div :class="{'d-flex': changeView, 'd-block': !changeView, 'width-adjust': changeView}">
                            <CardsCard :class="{'card-width-adjust': changeView}" 
                            v-if="requestsCache.acceptedRequests.length > 0"
                             v-for="(request, index) in requestsCache.acceptedRequests.slice(0, requestsLoaded[1])" :key="index" class="col-6 card-container mb-3 mx-2 bg-light-background">
                                <template v-slot:header>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <p class="justify-content-start mb-3 fw-bold">
                                            Solicitação
                                        </p>
                                        <p @mouseover="toolTip = true" @mouseout="toolTip = false" class="resquest-time mb-3">{{ request.creationDate.slice(0, 19) }}<IconsClock class="clock ms-2" style="margin-bottom: 2px;"/></p>
                                    </div>
                                </template>
                                <template v-slot:default>
                                    <div class="row cards-row">
                                        <div class="mb-3"> 
                                            <label class="form-label fw-semibold"> Item solicitado </label>
                                            <div class="overflow-x-auto">
                                                <input readonly class="form-control overflow-x-auto" :value="request.item.name"> 
                                            </div>
                                        </div>
                                        <div class="col-6 me-0">
                                            <div class="mb-3"> 
                                                <label class="form-label fw-semibold"> Quantidade Solicitada </label>
                                                <input readonly class="form-control" :value="request.quantityRequested">
                                            </div>		
                                            <div class="mb-3"> 
                                                <label class="form-label fw-semibold"> Código Sipac </label>
                                                <input readonly class="form-control" :value="request.item.sipacCode"> 
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="mb-3"> 
                                                <label class="form-label fw-semibold"> Quantidade Disponível </label>
                                                <input readonly class="form-control" :value="request.item.quantity"> 
                                            </div>		
                                            <div class="mb-0"> 
                                                <label class="form-label fw-semibold"> Tipo </label>
                                                <input readonly class="form-control" :value="request.item.type">
                                            </div>	
                                        </div>
                                        <div class="mb-0"> 
                                            <label class="form-label fw-semibold"> Mensagem </label>
                                            <div class="d-flex">
                                                <textarea readonly class="form-control"> {{ request.description }} </textarea>
                                            </div>
                                        </div>	
                                    </div>
                                </template>
                                <template v-slot:footer>
                                    <div class="d-flex align-items-center fw-bold text-dark-emphasis justify-content-end">
                                        Resposta feita em: {{ request.updatedDate.slice(0,19) }}
                                        <!--<button class="btn btn-secondary fw-bold px-2 py-1">Ver resposta</button>-->
                                    </div>
                                </template>
                            </CardsCard>
                            <p class="mt-5 pt-2 opacity-75" v-else>Nenhuma solicitação encontrada...</p>
                            <div :class="{'d-flex align-items-center ms-2': changeView}" v-if="requestsLoaded[1] < requestsCache.acceptedRequests.length">
                                <div class="d-flex justify-content-center">
                                    <button title="Carregar Mais" @click="requestsLoaded[1] += 3" class="btn btn-dark-success text-light text-nowrap fw-bold" style="padding: 3px;">
                                        <IconsThinPlus width="30" height="30"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
                <div class="text-dark-emphasis me-0 rounded-2 me-2 ms-2" :class="{'mt-4 ': changeView}">
                    <div class="requests-box mt-3 pt-0">
                        <div class="d-flex align-items-center justify-content-between mx-3">
                            <div class="d-flex align-items-center">
                                <IconsClose class="text-dark-alert me-2" width="30" height="30"/>
                                <h5 class="m-0 p-0">Recusados
                                </h5>
                                <span>({{ requestsCache.rejectedRequests.length }})</span>
                            </div>
                            <div class="dropdown">
                                  <button class="btn btn-transparent px-0 border-0" data-bs-toggle="dropdown" aria-expanded="false">
                                    <IconsBarFilter class="text-dark-emphasis me-1" title="Filtro" width="25" height="25" />
                                  </button>
                                  <div class="dropdown-menu p-0">
                                    <li type=button class="dropdown-item d-flex justify-content-between align-items-center fw-bold text-dark-emphasis" @click="applyFilter(requestsCache.rejectedRequests,'date', 'asc')">Data <IconsUpArrow width="22" height="22"/></li>
                                    <li type=button class="dropdown-item d-flex justify-content-between align-items-center fw-bold text-dark-emphasis" @click="applyFilter(requestsCache.rejectedRequests,'date', 'desc')">Data <IconsBottomArrow width="22" height="22"/></li>
                                    <li type=button class="dropdown-item d-flex justify-content-between align-items-center fw-bold text-dark-emphasis" @click="applyFilter(requestsCache.rejectedRequests,'name', 'asc')">Nome <IconsUpArrow width="22" height="22"/></li>
                                    <li type=button class="dropdown-item d-flex justify-content-between align-items-center fw-bold text-dark-emphasis" @click="applyFilter(requestsCache.rejectedRequests,'name', 'desc')">Nome <IconsBottomArrow width="22" height="22"/></li>
                                </div>
                            </div>
                        </div>
                        <div :class="{'d-flex': changeView, 'd-block': !changeView, 'width-adjust': changeView}">
                            <CardsCard :class="{'card-width-adjust': changeView}" v-if="requestsCache.rejectedRequests.length > 0" 
                                v-for="(request, index) in requestsCache.rejectedRequests.slice(0, requestsLoaded[2])" :key="index" 
                                class="col-6 card-container mb-3 mx-2 bg-light-background">
                                <template v-slot:header>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <p class="justify-content-start mb-3 fw-bold">
                                            Solicitação
                                        </p>
                                        <p @mouseover="toolTip = true" @mouseout="toolTip = false" class="resquest-time mb-3">{{ request.creationDate.slice(0, 19) }}<IconsClock class="clock ms-2" style="margin-bottom: 2px;"/></p>
                                    </div>
                                </template>
                                <template v-slot:default>
                                    <div class="row cards-row">
                                        <div class="mb-3"> 
                                            <label class="form-label fw-semibold"> Item solicitado </label>
                                            <div class="overflow-x-auto">
                                                <input readonly class="form-control overflow-x-auto" :value="request.item.name"> 
                                            </div>
                                        </div>
                                        <div class="col-6 me-0">
                                            <div class="mb-3"> 
                                                <label class="form-label fw-semibold"> Quantidade Solicitada </label>
                                                <input readonly class="form-control" :value="request.quantityRequested">
                                            </div>		
                                            <div class="mb-3"> 
                                                <label class="form-label fw-semibold"> Código Sipac </label>
                                                <input readonly class="form-control" :value="request.item.sipacCode"> 
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="mb-3"> 
                                                <label class="form-label fw-semibold"> Quantidade Disponível </label>
                                                <input readonly class="form-control" :value="request.item.quantity"> 
                                            </div>		
                                            <div class="mb-0"> 
                                                <label class="form-label fw-semibold"> Tipo </label>
                                                <input readonly class="form-control" :value="request.item.type">
                                            </div>	
                                        </div>
                                        <div class="mb-0"> 
                                            <label class="form-label fw-semibold"> Mensagem </label>
                                            <div class="d-flex">
                                                <textarea readonly class="form-control"> {{ request.description }} </textarea>
                                            </div>
                                        </div>	
                                    </div>
                                </template>
                                <template v-slot:footer>
                                    <div class="d-flex align-items-center justify-content-center fw-bold text-dark-emphasis ">
                                        Resposta feita em: {{ request.updatedDate.slice(0,19) }}
                                        <!--<button class="btn btn-secondary fw-bold px-2 py-1">Ver resposta</button>-->
                                    </div>
                                </template>
                            </CardsCard>
                            <p class="mt-5 pt-2 opacity-75" v-else>Nenhuma solicitação encontrada...</p>
                        <div :class="{'d-flex align-items-center ms-2': changeView}" v-if="requestsLoaded[2] < requestsCache.rejectedRequests.length">
                            <div class="d-flex justify-content-center">
                                <button title="Carregar Mais" @click="requestsLoaded[2] += 3" class="btn btn-dark-success text-light text-nowrap fw-bold" style="padding: 3px;">
                                    <IconsThinPlus width="30" height="30"/>
                                </button>
                            </div>
                            <div class="d-flex justify-content-center">
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, onMounted } from 'vue';
import { getRequestByUser } from '../../services/requests/requestsGET';
import { useUser } from '../../stores/user';
import { requestCancel, requestDecline } from '../../services/requests/requestsPATCH';
import { usePopupStore } from '../../stores/popup';
import { useStorageStore } from '../../stores/storage';
import { useSettingsStore } from '../../stores/settings';

definePageMeta({
    layout: 'client'
})

const userStore = useUser();
const popUpStore = usePopupStore();
const store = useStorageStore();
const settingsStore = useSettingsStore();

const requestsCache = ref({
    acceptedRequests: [],
    inProgressRequests: [],
    rejectedRequests: []
})
const totalPages = ref(0);
const totalElements = ref(0);
const pagination = ref(0);
const requestsLoaded = ref([3, 3, 3]);
const searchInput = ref('');

const filter = ref({ type: '', order: '' });

const changeView = ref(false);

const applyFilter = (requests, type, order) => {
    filter.value.type = type;
    filter.value.order = order;
    sortRequests(requests, filter.value.type, filter.value.order);
};
const sortRequests = (requests, type, order) => {
    if (type === 'date') {
        requests.sort((a, b) => {
            const dateA = new Date(a.creationDate);
            const dateB = new Date(b.creationDate);
            return order === 'asc' ? dateA - dateB : dateB - dateA;
        });
    } else if (type === 'name') {
        requests.sort((a, b) => {
            const nameA = a.item.name.toLowerCase();
            const nameB = b.item.name.toLowerCase();
            if (nameA < nameB) return order === 'asc' ? -1 : 1;
            if (nameA > nameB) return order === 'asc' ? 1 : -1;
            return 0;
        });
    }
};
const requestsReq = async () => {
    const res = await getRequestByUser(userStore, userStore.id, 0);
    res.content.map((request) => {
        switch(request.status){
            case 'PENDENTE':
                requestsCache.value.inProgressRequests.push(request);
                break;
            case 'ACEITO':
                requestsCache.value.acceptedRequests.push(request);
                break;
            case 'RECUSADO':
                requestsCache.value.rejectedRequests.push(request);
                break;
        }
    })
    totalElements.value = res.totalElements;
    totalPages.value = res.totalPages;
    pagination.value++;
    if(totalPages.value > 1){
        for(let i = 1; i < totalPages.value; i++){
            const res = await getRequestByUser(userStore, userStore.id, pagination.value);
            res.content.map((request) => {
            switch(request.status){
                case 'PENDENTE':
                    requestsCache.value.inProgressRequests.push(request);
                    break;
                case 'ACEITO':
                    requestsCache.value.acceptedRequests.push(request);
                    break;
                case 'RECUSADO':
                    requestsCache.value.rejectedRequests.push(request);
                    break;
                }
            })
        }
    } 

}
const requestsSearchreq = async (searchQuery) => {
    const res = await getRequestByUser(userStore, userStore.id, 0);
    res.content.map((request) => {
        switch(request.status){
            case 'PENDENTE':
                if(request.item.name.includes(searchQuery)){
                    requestsCache.value.inProgressRequests.push(request);
                }
                break;
            case 'ACEITO':
                if(request.item.name.includes(searchQuery)){
                    requestsCache.value.acceptedRequests.push(request);
                }
                break;
            case 'RECUSADO':
                if(request.item.name.includes(searchQuery)){
                    requestsCache.value.rejectedRequests.push(request);
                }
                break;
        }
    })
    totalPages.value = res.totalPages;
    pagination.value++;
    if(totalPages.value > 1){
        for(let i = 1; i < totalPages.value; i++){
            const res = await getRequestByUser(userStore, userStore.id, pagination.value);
            res.content.map((request) => {
            switch(request.status){
                case 'PENDENTE':
                    if(request.item.name.includes(searchQuery)){
                        requestsCache.value.inProgressRequests.push(request);
                    }
                    break;
                case 'ACEITO':
                    if(request.item.name.includes(searchQuery)){
                        requestsCache.value.acceptedRequests.push(request);
                    }
                    break;
                case 'RECUSADO':
                    if(request.item.name.includes(searchQuery)){
                        requestsCache.value.rejectedRequests.push(request);
                    }
                    break;
            }
        })
        }
    } 
}

const loadRequests = ref(true);
let typingTimeout = null;
const requestsLoad = computed(() => {
    if(searchInput.value !== ''){
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            pagination.value = 0;
            requestsCache.value = {acceptedRequests: [], inProgressRequests: [], rejectedRequests: []};
            requestsSearchreq(searchInput.value);
        }, 1000);
        return 1;
    }
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        pagination.value = 0;
        requestsCache.value = {acceptedRequests: [], inProgressRequests: [], rejectedRequests: []};
        requestsReq();
    }, 500);
    return 1;
    
})


const cancelRequest = async (requestId, index) => {
    try{
        const res = await requestCancel(userStore, requestId);
        popUpStore.throwPopup("Solicitação cancelada com sucesso", 'blue');
        requestsCache.value.inProgressRequests.splice(index, 1);
        
    } catch(err){
        popUpStore.throwPopup("ERRO: Algum problema ocorreu, contate o suporte", 'red')
    }

}
settingsStore.isMobile ? changeView.value = true : null;
const mobileView = ref(false);
const teste = () => {
    if(window.innerWidth <= 1115){
        changeView.value = true;
        mobileView.value = changeView.value;
    }else{
        mobileView.value = false;
    }
}
onMounted(() => {   
    loadRequests.value = false;
    window.addEventListener('resize', teste)
})
</script>

<style scoped>
.teste{
    display: flex !important;
}
.container-fluid{
    padding: 80px 0 100px 0;
}
.requests-container{
    box-shadow: 3px 3px 13px 0px rgb(0, 0, 0, 0.5);
    border: 1px #D9D9D9 solid;
    border-radius: 0px 10px 10px 10px;
    border-top: solid 1px #ccc;
}
.card-container{
    box-shadow: 0px 0px 10px 1px rgb(0, 0, 0, 0.3);
    border-radius: 10px;
    width: 100%;
    transition: box-shadow 0.2s ease-in-out, transform 0.1s ease-in-out;
}
.table-box-title{
    margin-left: 8px;
    margin-top: -30px;
    padding: 9px 0px 0px 0px;
    font-weight: 400;
    color: rgb(51,51,51, 0.8);
}
.box-title{
    border-radius: 10px 10px 0px 0px;
}
.requests-box{
    width: 100%;
    padding: 10px 20px 0px 0px;
    overflow-x: scroll;
    z-index: 10000 !important;
}
.box-title-text{
    font-size: 20px;
}
.card-container:hover {
    transform: scale(1.03)
}
.response-container{
    box-shadow: 0px 0px 10px 1px rgb(0, 0, 0, 0.3);
    border: solid 1px rgb(0, 0, 0, 0.3);
    display: none;
    width: 0px;
    top: 342px;
    position: absolute;
}
.requests-search{
    border-bottom: solid 1px rgb(51, 51, 51, 0.2)
}
.requests-comp{
    background-color: rgb(242, 242, 242);
    border: solid 1px rgb(0, 0, 0, 0.2);
}
.resquest-time{
	font-size: 15px;
	opacity: 80%;
}
.sub-catalog{
    border-radius: 10px;
    margin-top: -14px;
    margin-bottom: 60px !important;
    padding-top: 10px;
    padding-bottom: 20px;
    margin-right: 10%;
    margin-left: 10%;
    border: 1px #D9D9D9 solid;
    box-shadow: 3px 3px 13px 0px rgb(0, 0, 0, 0.5);
}
.sub-catalog-text{
    padding: 0px 10px 0px 10px;
    font-size: 15px;
}
h6{
    font-weight: 400;
    color: rgb(51,51,51, 0.8);
}
p{
    padding: 0;
    margin: 0;
}
.table-searchbar{
    border: none;
    border-radius: 10px 10px 10px 10px;
    top: 70px;
}
.searchbar{
    border-radius: 8px 0px 0px 8px;
    font-weight: 500;
}
.action-btn{
    font-weight: 500;
    font-size: 15px;
    border: none;
    border-radius: 10px 10px 0px 0px;
    border-bottom: 1px ridge #1F69B1;
    margin-right: 10px;
    box-shadow: inset 0px -12px 15px -18px rgb(11, 59, 105, 0.7);
    color: rgb(0, 0, 0, 0.7); 
    transition: background-color 0.2s ease-in-out;
}
.action-btn:hover{
    color: white !important; 
    background-color: #0B3B69; 
}
.table-searchbar{
    border: none;
    border-bottom: solid 1px #1F69B1;
    border-radius: 10px 10px 0px 0px;
    box-shadow: inset 0px -12px 15px -18px rgb(11, 59, 105, 0.7);
    color: rgb(0, 0, 0, 0.7); 
    transition: box-shadow 0.3s ease;
}
.empty-text{
    width: 300px;
    height: 100px;
    margin-left: 60px;
}
.table-actions{
    width: 100%;
}
.table-searchbar:hover {
    box-shadow: inset 0px -12px 15px -18px rgba(11, 59, 105, 0.7), 0px 0px 7px 0px rgba(11, 59, 105, 0.7);
}
.table-searchbar:hover,
.table-searchbar:focus-within {
    box-shadow: inset 0px -12px 15px -18px rgba(11, 59, 105, 0.7), 0px 0px 7px rgba(11, 59, 105, 0.7); /* Sombra interna na parte inferior e contorno ao redor */
}
.searchbar{
    border: none;
    border-radius: 0;
    font-weight: 500;
}
.search-glass{
    padding-left: 0px;
}

.width-adjust{
    width: 100%;
}
.card-width-adjust{
    width: 30%;
}
@media screen and (max-width: 1115px){
    .card-width-adjust{
        width: 48%;
    }   
    .empty-text{
        width: 100%;
        justify-content: center !important;
    }
}
@media screen and (max-width: 670px){
    .box-title-text{
        font-size: 18px;
    }
    .actions{
        margin-top: 0px !important;
    }
    .card-width-adjust{
        width: 80%;
    }
    .table-searchbar{  
        width: 140px;
    }
}
@media screen and (max-width: 450px){
    .box-title-text{
        font-size: 16px;
    }
    .actions{
        margin-top: -1px !important;
    }
    .table-searchbar{
        margin-top: 2px !important;  
        width: 115px;
    }
    .searchbar{
        font-size: 14px;
    }
    .card-width-adjust{
        width: 100%;
    }
}
@media screen and (max-width: 370px){
    .box-title-text{
        font-size: 15px;
    }
    .actions{
        margin-top: -1px !important;
    }
    .table-searchbar{
        margin-top: 2px !important;  
        width: 115px;
    }
    .searchbar{
        font-size: 13px;
    }
    .card-width-adjust{
        width: 100%;
    }
}
</style>