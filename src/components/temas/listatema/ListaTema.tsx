import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import './ListaTema.css';
import Tema from '../../../models/Tema';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';

function ListaTema() {
  const [temas, setTemas] = useState<Tema[]>([]) //todo set guarda as informações
  const token = useSelector<TokenState, TokenState["tokens"]>( //useselector vai pegar o token na store, e atribuir a constante token
  (state) => state.tokens
);
  let history = useNavigate(); // useNavigate faz a verificação e direciona para a tela principal

  useEffect(() => {
    if (token === "") {
      alert("Voce precisa estar logado")
      history("/login")
    }
  }, [token])

  async function getTema() { //await vai esperar algo 
    await busca("/temas", setTemas, {
      headers: { //header busca o token 
        "Authorization": token // vai dar uma autorização para o token
      }
    })
  }

  useEffect(() => {
    getTema()
  }, [temas.length])
  return (
    <>
      {
        temas.map(tema => (
          <Box m={2} >
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom >
                  Tema
                </Typography>
                <Typography variant="h5" component="h2">
                  {tema.descricao}
                </Typography>
              </CardContent>
              <CardActions >
                <Box display="flex" justifyContent="center" mb={1.5} >

                  <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      < Button variant="contained" className="marginLeft" size='small' color="primary" >
                        atualizar
                      </Button>
                    </Box>
                  </Link>
                  <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
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


export default ListaTema;