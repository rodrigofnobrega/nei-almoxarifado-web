import { defineStore } from "pinia";

export const useStorageStore = defineStore('storage', {
    state: () => ({
      items: [
        {name: "Cartolina Amarela", sipac: null, type: "Unidade", qtd: 5, history: ["03/03/2023 13:30:00 - Adicionado"], storage: "almoxarifado-escolar"},
        {name: "Lapiseira", sipac: "2342342354", type: "Caixa", qtd: 7, history: ["03/03/2023 14:32:34 - Consumido"], storage: "almoxarifado-escolar"},
        {name: "Folha em Branco A4", sipac: "4442342354", type: "Sacola", qtd: 30, history: ["03/03/2023 12:01:23 - Consumido"], storage: "almoxarifado-escolar"},
        {name: "Sabão em pó", sipac: "5442342354", type: "Unidade", qtd: 12, history: ["03/03/2023 11:23:30 - Solicitado"], storage: "almoxarifado-escolar"},
        {name: "Esponja", sipac: "6442342354", type: "Sacola", qtd: 3, history: ["03/04/2023 16:00:00 - Solicitado"], storage: "almoxarifado-escolar"},
    ]
    }),
});
