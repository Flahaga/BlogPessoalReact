import {createStore} from 'redux';
import { tokenReducer } from './tokens/tokensReducer';

const store = createStore(tokenReducer); // store responsável por salvar as informações

export default store;

//Reducer recebe a ação e também armazena na store,e também recebe o estado atualizado do componente