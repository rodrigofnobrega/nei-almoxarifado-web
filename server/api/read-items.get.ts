import fs from 'fs';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
    try{
        const data = fs.readFileSync('static/items.json', 'utf8');
        return{
            status: '200',
            body: JSON.parse(data)
        };
    } catch(error){
        return{
            status: '500',
            body: 'Erro interno do servidor'
        }
    };
});
