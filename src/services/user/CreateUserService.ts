interface UserRequest{
    nome: string;
    email: string;
    password: string;
}

class CreateUserService{
 async execute({nome, email, password}:UserRequest){
    console.log(nome);
    return {nome: nome}
}
}
export {CreateUserService}