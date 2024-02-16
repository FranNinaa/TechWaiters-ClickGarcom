# TechWaiters-ClickGarcom

## Para testar a parte Mobile

Acesse o api.ts (mobile/src/services/api.ts) e coloque o seu IP.

```
import axios from "axios";

const api = axios.create({
    //colocar o ip da sua maquina aqui
    baseURL: "http://seu_ip:5000"
})

export { api };
```

