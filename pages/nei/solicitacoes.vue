<template>
    <div class="container-fluid">
        <div class="sub-catalog bg-light mb-4 mt-1 ps-2 pe-2">
            <h6 class="sub-catalog-title ps-2 d-flex align-items-center opacity-75">
                <IconsInformation class="me-2"/>
                Descrição da página 
            </h6>
            <p class="sub-catalog-text opacity-75 mb-0">Nesta página temos todos os itens disponíveis do almoxarifado(itens esgotados devem ser cadastrados novamente). 
                Ademais, o cadastro de novos itens e reposição da quantidade de algum item já existente é feito pelo botão 
            <span class="border-bottom border-dark-success pb-1">Adicionar <IconsPlus style="margin-bottom: 0px;"  width="18px" height="18px"/></span></p>
        </div>
        <div class="d-flex align-items-center justify-content-start">
            <span class="ms-5 position-sticky d-flex align-items-center">
                    <IconsSearchGlass class="text-dark search-glass"/>
                    <input id="tableSearch" v-model="searchInput" class="bg-transparent text-dark form-control border-0" placeholder="Pesquisar"/>          
            </span>
        </div>
        <div class="requests-container d-flex justify-content-between">
            <div class="ms-5">
                <div class="d-flex align-items-center justify-content-between my-3">
                    <div class="d-flex align-items-center">
                        <IconsCloseArrow width="30" height="30"/>
                        <h5 class="m-0 p-0">Em Progresso
                        </h5>
                        <span>({{requestsCache.inProgressRequests.length}})</span>
                    </div>
                    <button class="btn btn-transparent px-0">
                        <IconsSettingsDots width="25" height="25"/>
                    </button>
                </div>
                <CardsCard v-for="(request, index) in requestsCache.inProgressRequests" :key="index" class="card-container mb-3">
                    <template v-slot:header>
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="justify-content-start mb-3 fw-bold">
                                Solicitação
                            </h6>
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
                            <button class="btn btn-dark-alert fw-bold py-1 px-1">
                                cancelar
                            </button>
                        </div>
                    </template>
                </CardsCard>
            </div>
            <div>
                <div class="d-flex align-items-center justify-content-between my-3">
                    <div class="d-flex align-items-center">
                        <IconsConfirm class="text-light-success" width="30" height="30"/>
                        <h5 class="m-0 p-0">Aceitos
                        </h5>
                        <span>({{requestsCache.acceptedRequests.length}})</span>
                    </div>
                    <button class="btn btn-transparent px-0">
                        <IconsSettingsDots width="25" height="25"/>
                    </button>
                </div>
                <CardsCard v-for="(request, index) in requestsCache.acceptedRequests" :key="index" class="card-container mb-3">
                    <template v-slot:header>
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="justify-content-start mb-3 fw-bold">
                                Solicitação
                            </h6>
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
                        <div>A</div>
                    </template>
                </CardsCard>
            </div>
            <div class="me-5">
                <div class="d-flex align-items-center justify-content-between my-3">
                    <div class="d-flex align-items-center">
                        <IconsClose class="text-dark-alert" width="30" height="30"/>
                        <h5 class="m-0 p-0">Recusados
                        </h5>
                        <span>({{ requestsCache.rejectedRequests.length }})</span>
                    </div>
                    <button class="btn btn-transparent px-0">
                        <IconsSettingsDots width="25" height="25"/>
                    </button>
                </div>
                <CardsCard v-for="(request, index) in requestsCache.rejectedRequests" :key="index" class="card-container mb-3">
                    <template v-slot:header>
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="justify-content-start mb-3 fw-bold">
                                Solicitação
                            </h6>
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
                        <div>A</div>
                    </template>
                </CardsCard>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { getRequestByUser } from '../../services/requests/requestsGET';
import { useUser } from '../../stores/user';

definePageMeta({
    layout: 'client'
})

const userStore = useUser();

const requestsCache = ref({
    acceptedRequests: [],
    inProgressRequests: [],
    rejectedRequests: []
})
const totalPages = ref(0);
const pagination = ref(0);
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
    totalPages.value = res.totalPages;
    pagination.value++;
    if(totalPages.value > 1){
        for(let i = 0; i < totalPages.value; i++){
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
requestsReq();
onMounted(() => {
    console.log(requestsCache.value)
})
</script>

<style scoped>
.container-fluid{
    padding: 100px 0 100px 0;
}
.requests-container{
    border-top: solid 1px #ccc;
}
.card-container{
    box-shadow: 0px 0px 10px 1px rgb(0, 0, 0, 0.3);
    border: solid 1px rgb(0, 0, 0, 0.3);
    width: 350px;
    transition: box-shadow 0.2s ease-in-out, transform 0.1s ease-in-out;
}
.card-container:hover{
    box-shadow: 0px 0px 15px 1px rgb(254, 213, 30, 0.8);
    transform: scale(1.03)
}

.resquest-time{
	font-size: 15px;
	opacity: 80%;
}
.sub-catalog{
    border-radius: 13px;
    margin-top: -14px;
    padding-top: 10px;
    padding-bottom: 20px;
    margin-right: 10%;
    margin-left: 10%;
    border: 1px #D9D9D9 solid;
    box-shadow: 3px 3px 13px 0px rgb(0, 0, 0, 0.2);
}
.sub-catalog-text{
    padding: 0px 10px 0px 10px;
    font-size: 15px;
}
.sub-catalog-title{
    font-weight: 400;
    color: rgb(51,51,51, 0.8);
}
.table-searchbar{
    width: 300px;
    border: none;
    border-radius: 10px 10px 10px 10px;
    top: 70px;
}
.searchbar{
    border-radius: 8px 0px 0px 8px;
    font-weight: 500;
}
</style>