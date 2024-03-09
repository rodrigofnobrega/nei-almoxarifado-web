<script setup lang="ts"> 
	const person = { name: 'Gabriel' };
	const item = { name: 'Monitor Multilaser', quantity: 2, itemTagging: 2029103923 };
	const requests = [
	{ 
		requestedAt: new Date(Date.now()).toLocaleDateString(),
		message: "Solicito o item para a sala A308",
		quantity: 1,
		person: person.name,
		item: item.name,
		itemTagging: item.itemTagging,
		itemQuantity: item.quantity
	 }, 
	{
		requestedAt: new Date(Date.now()).toLocaleDateString(),
		message: "Solicito o item para a sala B204",
		quantity: 15,
		person: "Clezio",
		item: "Copo descartável",
		itemTagging: 20191029301, 
		itemQuantity: 200
	},
	];
	const colorFocus = (e) => {
		e.target.style.color = "white";
	};
	const colorUnfocus = (e) => {
		e.target.style.color = "rgb(51, 51, 51, 0.7)";
	}

</script>
<template>
    <div class="catalog-header d-flex align-items-center">
        <h2>Controle de Acesso</h2>
        <div class="actions-buttons d-flex">
            <div class="dropdown">
                <button @focusin="colorFocus" @focusout="colorUnfocus" class="action-btn d-flex btn btn-outline-primary border-0" data-bs-toggle="dropdown" data-bs-offset="0,2" data-bs-auto-close="outside" aria-expanded="false">
                    Filtro
                    <IconsFilter class="mx-1" width="1.5em" height="1.5em"/>
                </button>
                <ul class="dropdown-menu" width="20px">
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Mais recentes</button>
                    </li>
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Mais antigos</button>
                    </li>
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Disponíveis</button>
                    </li>
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Indisponíveis</button>
                    </li>
                </ul>
            </div>
            <div class="dropdown">
                <button @focusin="colorFocus" @focusout="colorUnfocus" class="action-btn d-flex btn btn-outline-primary border-0" data-bs-toggle="dropdown" data-bs-offset="0,2" data-bs-auto-close="outsite" aria-expanded="false">
                    Configurações
                    <IconsSettings class="mx-1" width="1.5em" height="1.5em"/>
                </button>
                <ul class="dropdown-menu">
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Mais recentes</button>
                    </li>
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Mais antigos</button>
                    </li>
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Disponíveis</button>
                    </li>
                    <li class="dropdown-item">
                        <button class="btn btn-transparent" type="button">Indisponíveis</button>
                    </li> 
                </ul>
            </div>  
        </div>
     </div>
	 <hr>
    <div class="container d-flex content">
	<!-- TODO: transformar em tabela com linhas !-->
	<div class="row">
		<div v-for="req in requests" class="col-xl-6 col-12 mb-3 mb-xl-0"> 
			<CardsSolicitation 
				:person="req.person"
				:requestedAt="req.requestedAt"
				:message="req.message"
				:itemName="req.item"	
				:itemTagging="req.itemTagging"
				:quantity="req.quantity"
				:itemQuantity="req.itemQuantity"
			> 
			</CardsSolicitation>
		</div>
	</div>
    </div>
</template>


<style scoped>
	.content {
		margin-left: 3vh;
		margin-right: 3vh;
	}

h2{
    font-weight: 300;
    color: rgb(51,51,51, 0.8);
}
.catalog-header{
    justify-content: space-between;
}
.btn-transparent{
	padding: 0px;
}
.action-btn{
    margin-right: 10px;
}
.btn-outline-primary{
    color: rgb(51,51,51, 0.7);
}
.btn-outline-primary:hover{
    color: white !important;  
}
@media screen and (max-width: 872px){
    .catalog-header{
        display: block !important;
        text-align: center;
    }
    .actions-buttons{
        justify-content: center;
        align-content: center;
    }
}
 </style>
