import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/Actions';
import { toast } from 'react-toastify'


function Navbar() {
    const token = useSelector<TokenState, TokenState["tokens"]>( //useselector vai pegar o token na store, e atribuir a constante token
        (state) => state.tokens
    );
    let history = useNavigate();
    const dispatch = useDispatch(); // responsável por disparar o token

    function goLogout() {
        dispatch(addToken(''));
        toast.info("Usuário deslogado", { // toast responsável pelo "card" de informação 
            position: 'top-right', //posição,no canto da tela
            autoClose: 2000, // tempo na tela 2 segundos
            hideProgressBar: false, // para aparecer a barra de progresso
            closeOnClick: true,  // fechar a notificação no x
            pauseOnHover: false, // ao colocar o mouse no card ele pausa
            draggable: false, // move o card de lugar
            theme: "colored", // tema colorido
            progress: undefined, 
        });
        history('/login')
    }

    var navbarComponent;
    if (token != "") {
        navbarComponent = <AppBar position="static" className='color'>
            <Toolbar variant="dense">
                <Box className='cursor'>
                    <Typography variant="h5" color="inherit">
                        BlogPessoal
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="start">
                    <Link to="/home" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Home
                            </Typography>
                        </Box>
                    </Link>
                    <Link to="/posts" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Postagens
                            </Typography>
                        </Box>
                    </Link>
                    <Link to="/temas" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Temas
                            </Typography>
                        </Box>
                    </Link>
                    <Link to="/formularioTema" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Cadastrar tema
                            </Typography>
                        </Box>
                    </Link>

                    <Box mx={1} className='cursor' onClick={goLogout}>
                        <Typography variant="h6" color="inherit">
                            Sair
                        </Typography>
                    </Box>

                </Box>

            </Toolbar>
        </AppBar>
    }
    return (
        <>
            {navbarComponent}
        </>
    )
}

export default Navbar;
