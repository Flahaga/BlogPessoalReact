import React, { useEffect, useState } from 'react'
import {Typography, Button, Card, CardActions, CardContent } from "@material-ui/core"
import {Box} from '@mui/material';
import './DeletarPostagem.css';
import Postagem from '../../../models/Postagem';
import { buscaId, deleteId } from '../../../services/Service';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function DeletarPostagem() {
   
  let history = useNavigate();
    const { id } = useParams<{id: string}>();
    const token = useSelector<TokenState, TokenState["tokens"]>( //useselector vai pegar o token na store, e atribuir a constante token
    (state) => state.tokens
  );
    const [post, setPosts] = useState<Postagem>()

    useEffect(() => {
        if (token == "") {
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
        buscaId(`/postagens/${id}`, setPosts, {
            headers: {
              'Authorization': token
            }
          })
        }

        function sim() {
          history('/posts') // rota do blog
            deleteId(`/postagens/${id}`, { // rota do backEnd
              headers: {
                'Authorization': token
              }
            });
            toast.success('Postagem deletada com sucesso', { // toast responsável pelo "card" de informação 
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
            history('/posts')
          }
  return (
    <>
      <Box m={2}>
        <Card variant="outlined" >
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar a Postagem:
              </Typography>
              <Typography color="textSecondary" >
              {post?.titulo}
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
              <Box>
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
export default DeletarPostagem;