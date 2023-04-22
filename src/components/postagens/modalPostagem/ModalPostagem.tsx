import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Button } from "@material-ui/core"
import { Box, Modal } from '@mui/material'
import CloseIcon from '@material-ui/icons/Close';
import './ModalPostagem.css';
import CadastroPost from '../cadastroPost/CadastroPost';


function getModalStyle() { //responsável por centralizar a modal
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) => // usestyles serve para guardar as configurações da modal
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

function ModalPostagem () {
  const classes = useStyles(); 
  const [modalStyle] = React.useState(getModalStyle); //  a modalstyle guarda uma função, no caso a getmodalsyle
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true); // se o modal for verdadeiro ele abre , se for falso ele fecha
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Box display="flex" justifyContent="flex-end" className="cursor">
        <CloseIcon onClick={handleClose}/>
      
      </Box>
      
      <CadastroPost/>
      
    </div>
  );

  return (
    <div>
      <Button
        variant="outlined"
        className="btnModal"
        onClick={handleOpen}>Nova Postagem</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
export default ModalPostagem;