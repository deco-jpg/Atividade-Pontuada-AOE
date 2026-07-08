import axios from "axios";

// Adicione o 'export' aqui na frente
export const api = axios.create({
    baseURL: "http://localhost:8080"
});

// Delete ou comente a linha do export default lá embaixo
// export default api;