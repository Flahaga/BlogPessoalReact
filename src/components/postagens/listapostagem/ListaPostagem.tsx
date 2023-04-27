import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import {Box} from '@mui/material';
import './ListaPostagem.css';
import Postagem from '../../../models/Postagem';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';


function ListaPostagem() {
  const [posts, setPosts]= useState<Postagem[]>([]) //todo set guarda as informações
  let history= useNavigate();// useNavigate faz a verificação e direciona para a tela principal
  const token = useSelector<TokenState, TokenState["tokens"]>( //useselector vai pegar o token na store, e atribuir a constante token
  (state) => state.tokens
);

  useEffect(()=>{
    if(token == ""){
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
  
  async function getPostagem(){ //await vai esperar algo 
    await busca("/postagens", setPosts, {
      headers:{ //header busca o token 
        "Authorization":token // vai dar uma autorização para o token
      }
    })
  }
  
  useEffect(()=>{
    getPostagem()
  },[posts.length]) 
    return (
      <>
      {      
       posts.map(post => (
        <Box m={2} >
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary"gutterBottom >
              Postagens
              </Typography>
              <Typography variant="h5" component="h2">
                {post.titulo}
              </Typography>
              <Typography variant="body2" component="p">
              {post.texto}
            </Typography>
            <Typography variant="body2" component="p">
              {post.tema?.descricao}
            </Typography>
            </CardContent>
            <CardActions >
              <Box display="flex" justifyContent="center" mb={1.5} >
  
                <Link to={`/formularioPostagem/${post.id}`}className="text-decorator-none">
                  <Box mx={1}>
                    < Button variant="contained" className="marginLeft" size='small' color="primary" >
                      atualizar
                    </Button>
                  </Box>
                </Link>
                <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                  <Box mx={1}>
                    <Button variant="contained" size='small' color="secondary">
                      deletar
                    </Button>
                  </Box>
                </Link>
              </Box>
            </CardActions>
          </Card>
        </Box>
      ))}
      </>
    );
  }
  
  
  export default ListaPostagem;