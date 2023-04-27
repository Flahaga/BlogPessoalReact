import React, { useEffect, useState } from 'react'
import {Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import './DeletarTema.css';
import { useNavigate, useParams } from 'react-router-dom';
import { buscaId, deleteId } from '../../../services/Service';
import Tema from '../../../models/Tema';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';


function DeletarTema() {
  
  let history = useNavigate();
  const { id } = useParams<{id: string}>();
  const token = useSelector<TokenState, TokenState["tokens"]>( //useselector vai pegar o token na store, e atribuir a constante token
  (state) => state.tokens
);
  const [tema, setTema] = useState<Tema>()

  useEffect(() => {
      if (token === "") {
        toast.error('O usuário precisa estar logado', { // toast responsável pelo "card" de informação 
          position: 'top-right', //posição,no canto da tela
          autoClose: 2000, // tempo na tela 2 segundos
          hideProgressBar: false, // para aparecer a barra de progresso
          closeOnClick: true,  // fechar a notificação no x
          pauseOnHover: false, // ao colocar o mouse no card ele pausa
          draggable: false, // move o card de lugar
          theme: "colored", // tema colorido
          progress: undefined, 
      }); 
          history("/login")
  
      }
  }, [token])

  useEffect(() =>{
      if(id !== undefined){
          findById(id)
      }
  }, [id])

  async function findById(id: string) {
      buscaId(`/temas/${id}`, setTema, {
          headers: {
            'Authorization': token
          }
        })
      }

      function sim() {
        history('/temas')
          deleteId(`/temas/${id}`, {
            headers: {
              'Authorization': token
            }
          });
          toast.success('Tema deletado com sucesso', { // toast responsável pelo "card" de informação 
            position: 'top-right', //posição,no canto da tela
            autoClose: 2000, // tempo na tela 2 segundos
            hideProgressBar: false, // para aparecer a barra de progresso
            closeOnClick: true,  // fechar a notificação no x
            pauseOnHover: false, // ao colocar o mouse no card ele pausa
            draggable: false, // move o card de lugar
            theme: "colored", // tema colorido
            progress: undefined, 
        }); 
        }
      
        function nao() {
          history('/temas')
        }
        
return (
  <>
    <Box m={2}>
      <Card variant="outlined">
        <CardContent>
          <Box justifyContent="center">
            <Typography color="textSecondary" gutterBottom>
              Deseja deletar o Tema:
            </Typography>
            <Typography color="textSecondary">
              {tema?.descricao}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
            <Box mx={2}>
              <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                Sim
              </Button>
            </Box>
            <Box mx={2}>
              <Button  onClick={nao} variant="contained" size='large' color="secondary">
                Não
              </Button>
            </Box>
          </Box>
        </CardActions>
      </Card>
    </Box>
  </>
);
}
export default DeletarTema;    
 