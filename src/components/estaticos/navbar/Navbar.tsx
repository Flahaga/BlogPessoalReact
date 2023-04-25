import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/Actions';

function Navbar() {
    const token = useSelector<TokenState, TokenState["tokens"]>( //useselector vai pegar o token na store, e atribuir a constante token
    (state) => state.tokens
  );
    let history = useNavigate();
    const dispatch = useDispatch(); // responsável por disparar o token
   
    function goLogout(){
        dispatch(addToken(''));
        alert("Usuário deslogado")
       history('/login')
    }
       
var navbarComponent;
if(token != ""){
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
