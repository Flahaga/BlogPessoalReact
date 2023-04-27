import React, { useEffect } from 'react';
import {Typography, Grid, Button} from '@material-ui/core';
import {Box} from'@mui/material';
import './Home.css';
import TabPostagem from '../../components/postagens/tabpostagem/TabPostagem';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function Home() {
    let history = useNavigate();
    const token = useSelector<TokenState, TokenState["tokens"]>( //useselector vai pegar o token na store, e atribuir a constante token
        (state) => state.tokens
      );
    
    useEffect(() => {
      if (token == "") {
        toast.error("Usuário deve estar logado", { // toast responsável pelo "card" de informação 
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
    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" className='caixa'>
                <Grid alignItems="center" item xs={6}>
                    <Box paddingX={20} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className='titulo'>Seja bem vindo(a)! </Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className='titulo'>Expresse aqui os seus pensamentos e opiniões! </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                            <ModalPostagem/>
                        </Box>
                        <Link to ="/posts">
                        <Button variant="outlined" className='botao'>Ver  Postagens</Button >
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={6} >
                    <img src="https://cdn5.colorir.com/desenhos/color/201533/um-computador-portatil-a-casa-o-quarto-pintado-por-biankamelo-1126111.jpg" alt='' width="500px" height="500px"/>
                </Grid>
                <Grid xs={12} className='postagens'>
                    <TabPostagem />
                </Grid>
            </Grid>
        </>
    );
}


export default Home;