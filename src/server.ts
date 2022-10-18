import express from 'express';
import axios from 'axios';
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/cep/:cep", async (request, response) => {
    const {cep} = request.params;
      const result = await axios
            .get(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => {
                let logradouro = response.data.logradouro;
                let bairro = response.data.bairro;
                let localidade = response.data.localidade;
                let uf = response.data.uf;
                
                const address = logradouro + ', ' + bairro + ', ' + localidade + ' - ' + uf;
                
                return {address}
               }).catch(function(){
                console.log("Ops! Cep não encontrado!")
            })
    return response.json({result});
})



app.listen(process.env.PORT || 3333, () => console.log("Server is running!"));