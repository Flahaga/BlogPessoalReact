import  {  ChangeEvent ,  useEffect ,  useState  }  from  'react'
import  {  Box  } from "@mui/material"
import  {  Button ,  Grid ,  TextField ,  Typography  }  from '@material-ui/core'
import  {  Link ,  useNavigate  }  from  'react-router-dom' ;
import { login} from '../../services/Service';
import UserLogin  from  '../../models/UserLogin' ;
import  "./Login.css" ;
import { useDispatch } from 'react-redux';
import { addToken } from '../../store/tokens/Actions';
import { toast } from 'react-toastify';

function Login() {
    let history = useNavigate();
    const dispatch = useDispatch(); // responsável por disparar a ação para o reducer
    const [token, setToken] = useState('');
    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        }
    )

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        if (token != '') {
            dispatch(addToken(token)); // vai disparar a ação do token
            history('/home')
        }
    }, [token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await login(`/usuarios/logar`, userLogin, setToken)

            toast.success('Usuário logado com sucesso', { // toast responsável pelo "card" de informação 
                position: 'top-right', //posição,no canto da tela
                autoClose: 2000, // tempo na tela 2 segundos
                hideProgressBar: false, // para aparecer a barra de progresso
                closeOnClick: true,  // fechar a notificação no x
                pauseOnHover: false, // ao colocar o mouse no card ele pausa
                draggable: false, // move o card de lugar
                theme: "colored", // tema colorido
                progress: undefined, 
            }); 
        } catch (error) {
            toast.error('Erro ao logar o usuário ', { // toast responsável pelo "card" de informação 
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
    }

return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid alignItems='center' xs={6}>
            <Box paddingX={20}>
                <form onSubmit={onSubmit}>
                    <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos1'>Entrar</Typography >
                    <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                    <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                    <Box marginTop={2} textAlign='center'>
                        <Button type='submit' variant='contained' color='primary'>
                            Logar
                        </Button>
                    </Box>
                </form>
                <Box display='flex' justifyContent='center' marginTop={2}>
                    <Box marginRight={1}>
                        <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta? </Typography>
                    </Box>
                    <Link to="/cadastroUsuario">
                <Typography variant='subtitle1' gutterBottom align='center' className='textos1' >Cadastre-se</Typography>
                    </Link>

                </Box>
            </Box>
        </Grid>
        <Grid xs={6} className='imagem'>

        </Grid>
    </Grid>
);
  }

export default Login;