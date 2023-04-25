export type Action = {type: "ADD_TOKEN"; payload: string}; // está exportando uma ação, a payload é uma propriedade para armazenar o token
// toda ação precisa ter duas propriedades o tipo(type) e a informação(payload)

export const addToken = (token: string): Action =>({
    type: "ADD_TOKEN",
    payload: token,
});

// essa ação será enviada para o reducer