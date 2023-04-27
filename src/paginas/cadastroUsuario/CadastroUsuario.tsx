
import  {  useState ,  useEffect ,  ChangeEvent }  from  'react'
import {  Box  }  from  "@mui/material"
import  {  Button ,  Grid ,  TextField ,  Typography  }  from  '@material-ui/core'
import  {  Link ,  useNavigate  }  from  'react-router-dom' ;

import  {  cadastroUsuario  }  from  '../../services/Service' ;
import  User  from  '../../models/User' ;

import  "./CadastroUsuario.css" ;
import { toast } from 'react-toastify';


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
       
       // Estrutura Condicional que verifica se as senhas batem e se a Senha tem mais de 10 caracteres
       if (confirmarSenha === user.senha && user.senha.length >= 10) {

        //Tenta executar o cadastro
        try {
            await cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
            toast.success('Usuário cadastrado com sucesso', { // toast responsável pelo "card" de informação 
                position: 'top-right', //posição,no canto da tela
                autoClose: 2000, // tempo na tela 2 segundos
                hideProgressBar: false, // para aparecer a barra de progresso
                closeOnClick: true,  // fechar a notificação no x
                pauseOnHover: false, // ao colocar o mouse no card ele pausa
                draggable: false, // move o card de lugar
                theme: "colored", // tema colorido
                progress: undefined, 
            }); 
            //Se houver erro, pegue o Erro e retorna uma msg
        } catch (error) {
            console.log(`Error: ${error}`)
            toast.error('Erro ao cadastrar o usuário ', { // toast responsável pelo "card" de informação 
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

    } else {
        toast.error('Erro ao cadastrar o usuário ', { // toast responsável pelo "card" de informação 
            position: 'top-right', //posição,no canto da tela
            autoClose: 2000, // tempo na tela 2 segundos
            hideProgressBar: false, // para aparecer a barra de progresso
            closeOnClick: true,  // fechar a notificação no x
            pauseOnHover: false, // ao colocar o mouse no card ele pausa
            draggable: false, // move o card de lugar
            theme: "colored", // tema colorido
            progress: undefined, 
        }); 

        setUser({ ...user, senha: "" }) // Reinicia o campo de Senha
        setConfirmarSenha("")           // Reinicia o campo de Confirmar Senha
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
                        <TextField value={user.usuário} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}id='usuário' label='usuário' variant='outlined' name='usuário' margin='normal' fullWidth />
                        <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) =>confirmarSenhaHandle(e)}id='confirmarSenha' label='confirmarSenha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth />
                        <TextField value={user.foto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}id='foto' label='Foto' variant='outlined' name='foto' margin='normal' fullWidth />
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


