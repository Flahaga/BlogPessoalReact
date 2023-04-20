
import  {  useState ,  useEffect ,  ChangeEvent }  from  'react'
import {  Box  }  from  "@mui/material"
import  {  Button ,  Grid ,  TextField ,  Typography  }  from  '@material-ui/core'
import  {  Link ,  useNavigate  }  from  'react-router-dom' ;

import  {  cadastroUsuario  }  from  '../../services/Service' ;
import  User  from  '../../models/User' ;

import  "./CadastroUsuario.css" ;


function CadastroUsuario() {
    let history = useNavigate();
    const [confirmarSenha,setConfirmarSenha] = useState<String>("")
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuário: '',
            senha: '',
            foto:''
        })

    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: '',
            usuário: '',
            senha: '',
            foto:''

        })

    useEffect(() => {
        if (userResult. id != 0) {
            history("/login")
        }
    }, [userResult])


    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){
        setConfirmarSenha(e.target.value)
    }


    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUser({
 ... user,
            [e .target.name]: e.target.value
        })

    }
   async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
       
        if  ( confirmarSenha  ===  user.senha  &&  user.senha. length  >=  8 )  {
            try  {
                await  cadastroUsuario ( `/usuarios/cadastrar` ,  user ,  setUserResult )
                alert ( 'Usuário cadastrado com sucesso' )
            }  catch(error) {
                alert ( 'Dados inconsistentes. Verifique as informações de cadastro.' )
    
                setUser ( { ... user ,  senha : ""  } )  
                setConfirmarSenha ( "" )            
            }
        }   
        }  

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6} className='imagem2'></Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={10}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos2'>Cadastrar</Typography>
                        <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='nome' label='nome' variant='outlined' name='nome' margin='normal' fullWidth />
                        <TextField value={user.usuário} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal' fullWidth />
                        <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) =>confirmarSenhaHandle(e)}id='confirmarSenha' label='confirmarSenha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth />
                        <Box marginTop={2} textAlign='center'>
                            <Link to='/login' className='text-decorator-none'>
                                < Button variant='contained' color='secondary' className='btnCancelar'>
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type='submit' variant='contained' color='primary'>
                                Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>



    );

}


export default CadastroUsuario;