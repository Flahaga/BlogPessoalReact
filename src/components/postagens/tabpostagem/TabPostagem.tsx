import React, {useState} from 'react'
import { AppBar, Tab, Tabs, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import { TabContext, TabPanel } from '@material-ui/lab';
import ListaPostagem from '../listapostagem/ListaPostagem';
import './TabPostagem.css';


function TabPostagem() {
    const [value,setvalue] = useState("1")
    function handleChange(event:React.ChangeEvent<{}>, newValue:string){
        setvalue(newValue);
    }
  return (
    <>
      < TabContext value={value} >
        <AppBar position="static">
          <Tabs centered indicatorColor="secondary" className='color' onChange={handleChange}>
            <Tab label="Todas as postagens" value="1" className='color'/>
            <Tab label="Sobre-nós" value="2" className='color' />
          </Tabs>
        </AppBar>
        < TabPanel value="1" >
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <ListaPostagem />
          </Box>
        </TabPanel>
        < TabPanel value="2">
          <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className="titulo">Sobre-nós</Typography>
          <Typography variant="body1" gutterBottom color="textPrimary" align="justify">Projeto do bloco 2 e 3 da Generation Brasil! </Typography>
        </TabPanel>
      </TabContext>
    </>
  );
}
export default TabPostagem ;