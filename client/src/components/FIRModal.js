import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Divider,Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 125
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({close,data}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    close();
  };



  return (
    <div>
 
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant="h4" id="transition-modal-title">FIR id:{data}</Typography>
            <Divider/>
            <Typography id="transition-modal-description">
                Cornish rex. Ocicat persian so burmese for jaguar, or mouser. Puma cornish rex. American bobtail burmese, persian jaguar but singapura devonshire rex. Scottish fold bobcat bobcat munchkin maine coon or kitty american bobtail. Maine coon burmese american shorthair or tomcat, and american shorthair donskoy so cornish rex. Turkish angora lynx and himalayan. Lion leopard. Manx turkish angora burmese or tom, yet scottish fold. Grimalkin. Mouser havana brown but tomcat ocelot. Kitty russian blue. Balinese bobcat yet british shorthair birman or mouser siberian. Egyptian mau turkish angora burmese. American bobtail. Malkin bengal. Singapura cheetah cheetah munchkin birman but leopard so ocicat. Persian tom. Sphynx tomcat. Devonshire rex sphynx puma and savannah siberian tomcat. Birman kitten. Kitty tomcat panther so singapura. Bengal balinese birman grimalkin jaguar devonshire rex munchkin. Puma. Egyptian mau ocelot siberian for kitty tiger so burmese so tomcat.
                <br></br>
                British shorthair. Kitty bombay or tomcat russian blue tiger. Burmese jaguar. Donskoy maine coon ocicat or ragdoll. Cornish rex havana brown for himalayan singapura ragdoll american bobtail bobcat. Munchkin tabby ragdoll but cheetah or mouser. Persian tabby and bengal so lynx siamese. Cornish rex scottish fold american shorthair. Ragdoll munchkin kitty balinese . Cornish rex ragdoll savannah himalayan turkish angora. Kitty burmese panther, yet donskoy abyssinian . Egyptian mau. Persian bombay. Russian blue himalayan abyssinian turkish angora lion or siamese lion. Cougar abyssinian so tabby for savannah. Russian blue grimalkin.
            </Typography>
            <Divider/>
            <Button  onClick={handleOpen} color="primary" variant="contained">
                Accept
            </Button>

            <Button  onClick={handleClose} color="secondary" variant="contained">
                Request More Information
            </Button>

            <Button  onClick={handleClose}  variant="contained">
                Close
            </Button>

          </div>
        </Fade>
      </Modal>
    </div>
  );
}
