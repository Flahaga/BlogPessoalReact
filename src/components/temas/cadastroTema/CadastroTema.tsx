import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import Tema from '../../../models/Tema';
import { useNavigate, useParams } from 'react-router-dom';
import { buscaId,put,post } from '../../../services/Service';
import './CadastroTema.css';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function CadastroTema() {
    let history= useNavigate()
    const { id } = useParams<{id: string}>(); // useParams responsável pelos paramêtros enviados pela url
    const token = useSelector<TokenState, TokenState["tokens"]>( //useselector vai pegar o token na store, e atribuir a constante token
    (state) => state.tokens
  );
    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    useEffect(() => { // useEffect responsável pelo ciclo de vida
        if (token === "") {
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
        buscaId(`/temas/${id}`, setTema, {
            headers: {
              'Authorization': token
            }
          })
        }

        function updatedTema(e: ChangeEvent<HTMLInputElement>) { //o updatedTema captura os "valores" preenchidos pelo usuário através do formulário

            setTema({
                ...tema,
                [e.target.name]: e.target.value,
            })
    
        }
        
        async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
            e.preventDefault()
            if (id !== undefined) {

                try {
                    await put(`/temas`, tema, setTema, { //put atualiza
                        headers: {
                            'Authorization': token
                        }
                    })
    
                    toast.success('Tema atualizado com sucesso', { // toast responsável pelo "card" de informação 
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
                    console.log(`Error: ${error}`)
                    toast.error('Erro,verifique a quantidade minima de caracteres', { // toast responsável pelo "card" de informação 
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
                try {
                    await post(`/temas`, tema, setTema, { // post cadastra
                        headers: {
                            'Authorization': token
                        }
                    })
    
                    toast.success('Tema cadastrado com sucesso', { // toast responsável pelo "card" de informação 
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
                    console.log(`Error: ${error}`)
                    toast.error('Erro,verifique a quantidade minima de caracteres', { // toast responsável pelo "card" de informação 
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
    
            back()
    
        }
    
        function back() { //  back redireciona para a rota desejada
            history('/temas')
        }
  
  
        return (
            <Container maxWidth="sm" className="topo">
                <form onSubmit={onSubmit}>
                    <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>
                    <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </form>
            </Container>
        )
    }

export default CadastroTema;

/*  Operadores utilizados 
        = : Atribuição (valor = 9)         - Atribui um valor a uma variavel/constante
        == : Op. Aritmetico (valor == 9.0) - Verifica se os valores são iguais
        === : Op. Idêntico (valor === 9.0) - Verifica se os valores e tipos são iguais
    */
