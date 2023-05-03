import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import store from './store/Store';
import Navbar from './components/estaticos/navbar/Navbar';
import Login from './paginas/login/Login';
import Home from './paginas/home/Home';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import ListaTema from './components/temas/listatema/ListaTema';
import ListaPostagem from './components/postagens/listapostagem/ListaPostagem';
import CadastroPost from './components/postagens/cadastroPost/CadastroPost';
import CadastroTema from './components/temas/cadastroTema/CadastroTema';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';
import DeletarTema from './components/temas/deletarTema/DeletarTema';
import Footer from './components/estaticos/footer/Footer';

function App() {
    return (
        <Provider store={store}>
            <ToastContainer />
            <BrowserRouter>
                <Navbar />

                <div style={{ minHeight: '100vh' }}>

                    <Routes>
                        <Route path="/" element={<Login />} />

                        <Route path="/login" element={<Login />} />

                        <Route path="/home" element={<Home />} />

                        <Route path="/cadastro" element={<CadastroUsuario />} />

                        <Route path="/temas" element={<ListaTema />} />

                        <Route path="/posts" element={<ListaPostagem />} />

                        <Route path="/formularioPostagem" element={<CadastroPost />} />

                        <Route path="/formularioPostagem/:id" element={<CadastroPost />} />

                        <Route path="/formularioTema" element={<CadastroTema />} />

                        <Route path="/formularioTema/:id" element={<CadastroTema />} />

                        <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />

                        <Route path="/deletarTema/:id" element={<DeletarTema />} />
                    </Routes>

                </div>

                <Footer />
            </BrowserRouter>
        </Provider>
    )
}

export default App
