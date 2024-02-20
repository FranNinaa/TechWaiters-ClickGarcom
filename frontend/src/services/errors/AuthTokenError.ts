// Define uma classe de erro personalizada chamada AuthTokenError que estende a classe Error padrão do JavaScript.
export class AuthTokenError extends Error{

    // Construtor da classe AuthTokenError.
    constructor() {
        super('Error with authentication token.');

     
        this.name = 'AuthTokenError';
    }  
}
