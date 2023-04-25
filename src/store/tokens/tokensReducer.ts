import {Action } from './Actions';

export interface TokenState { // estado do token
    tokens: string
}

const initialState = { // estado inicial
    tokens: "" // valor vazio
}

export const tokenReducer = (state: TokenState = initialState, action: Action) =>{ // recebe o estado da aplicação,e a ação também
    switch (action.type){  // corpo da função
        case "ADD_TOKEN": {  
            return {tokens: action.payload} // se for ADD_TOKEN ela utiliza as duas propriedades o type e o payload
        }

        default:
            return state  // se não for a função ADD_TOKEN ele retorna ao estado normal
    }
}