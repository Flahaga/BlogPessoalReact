import { useState, useEffect, ChangeEvent } from 'react'
import { Box } from "@mui/material"
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom';

import { cadastroUsuario } from '../../services/Service';
import User from '../../models/User';

import "./CadastroUsuario.css";

function CadastroUsuario() {

    let history = useNavigate()

    const [confirmarSenha, setConfirmarSenha] = useState<String>("")

    const [user, setUser] = useState<User>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })

    const [userResult, setUserResult] = useState<User>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })

    useEffect(() => {
        if (userResult.id !== 0) {
            history("/login")
        }
    }, [userResult])

    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    async function cadastrar(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        // Estrutura Condicional que verifica se as senhas batem e se a Senha tem mais de 8 caracteres
        if (confirmarSenha === user.senha && user.senha.length >= 8) {

            //Tenta executar o cadastro
            try {
                await cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
                alert('Usuario cadastrado com sucesso')

                //Se houver erro, pegue o Erro e retorna uma msg
            } catch (error) {
                console.log(`Error: ${error}`)
                alert("Erro ao cadastrar o Usuário")
            }

        } else {
            alert('Dados inconsistentes. Verifique as informações de cadastro.')

            setUser({ ...user, senha: "" }) // Reinicia o campo de Senha
            setConfirmarSenha("")           // Reinicia o campo de Confirmar Senha
        }
    }

    /*  Operadores utilizados 
        = : Atribuição (valor = 9)         - Atribui um valor a uma variavel/constante
        == : Op. Aritmetico (valor == 9.0) - Verifica se os valores são iguais
        === : Op. Idêntico (valor === 9.0) - Verifica se os valores e tipos são iguais
    */


    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6} className='imagem2'></Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={10}>

                    <form onSubmit={cadastrar}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos2'>Cadastrar</Typography>

                        <TextField
                            value={user.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='nome' label='Nome' variant='outlined'
                            name='nome' margin='normal' fullWidth
                            placeholder='Insira seu nome'
                            required />

                        <TextField
                            value={user.foto}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='foto' label='Foto' variant='outlined'
                            name='foto' margin='normal' fullWidth
                            placeholder='Insira um link de foto'
                            required />

                        <TextField
                            value={user.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='usuario' label='Usuário' variant='outlined'
                            name='usuario' margin='normal' fullWidth
                            placeholder='Insira um email válido'
                            required />

                        <TextField
                            value={user.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='senha' label='Senha' variant='outlined'
                            name='senha' margin='normal' type='password' fullWidth
                            placeholder='Insira no mínimo 8 caracteres'
                            required />

                        <TextField
                            value={confirmarSenha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)}
                            id='confirmarSenha' label='Confirmar Senha' variant='outlined'
                            name='confirmarSenha' margin='normal' type='password' fullWidth
                            placeholder='Insira novamente a senha'
                            required />

                        <Box marginTop={2} textAlign='center'>
                            <Link to='/login' className='text-decorator-none'>
                                <Button variant='contained' color='secondary' className='btnCancelar'>
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
    )
}

export default CadastroUsuario