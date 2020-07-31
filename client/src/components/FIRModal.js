import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Divider, Button, Typography, Grid } from "@material-ui/core";
import "./modal.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 125,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({ close, firid, accept,moreinfo,status }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    close();
  };
  const acceptFIR = () => {
    accept(firid);
    close();
  }
  const moreinfoFIR = () => {
    moreinfo(firid);
    close();
  }
 
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
            <Typography variant="h4" id="transition-modal-title">
              FIR id :{firid}
            </Typography>
            <br></br>
            <Divider />
            <br></br>
            
              <Typography id="transition-modal-description" className="modal-body">
                <Grid spacing={3} container >
                  <Grid item xs={12}>
                    <Typography variant="h6">Main FIR</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    Cornish rex. Ocicat persian so burmese for jaguar, or
                    mouser. Puma cornish rex. American bobtail burmese, persian
                    jaguar but singapura devonshire rex. Scottish fold bobcat
                    bobcat munchkin maine coon or kitty american bobtail. Maine
                    coon burmese american shorthair or tomcat, and american
                    shorthair donskoy so cornish rex. Turkish angora lynx and
                    himalayan. Lion leopard. Manx turkish angora burmese or tom,
                    yet scottish fold. Grimalkin. Mouser havana brown but tomcat
                    ocelot. Kitty russian blue. Balinese bobcat yet british
                    shorthair birman or mouser siberian. Egyptian mau turkish
                    angora burmese. American bobtail. Malkin bengal. Singapura
                    cheetah cheetah munchkin birman but leopard so ocicat.
                    Persian tom. Sphynx tomcat. Devonshire rex sphynx puma and
                    savannah siberian tomcat. Birman kitten. Kitty tomcat
                    panther so singapura. Bengal balinese birman grimalkin
                    jaguar devonshire rex munchkin. Puma. Egyptian mau ocelot
                    siberian for kitty tiger so burmese so tomcat.
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                    <Typography variant="h6">How did it Happen</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    British shorthair. Kitty bombay or tomcat russian blue
                    tiger. Burmese jaguar. Donskoy maine coon ocicat or ragdoll.
                    Cornish rex havana brown for himalayan singapura ragdoll
                    american bobtail bobcat. Munchkin tabby ragdoll but cheetah
                    or mouser. Persian tabby and bengal so lynx siamese. Cornish
                    rex scottish fold american shorthair. Ragdoll munchkin kitty
                    balinese . Cornish rex ragdoll savannah himalayan turkish
                    angora. Kitty burmese panther, yet donskoy abyssinian .
                    Egyptian mau. Persian bombay. Russian blue himalayan
                    abyssinian turkish angora lion or siamese lion. Cougar
                    abyssinian so tabby for savannah. Russian blue grimalkin.
                  </Grid>
                  
                  <br></br>
                  <Grid item xs={12}>
                    <Typography variant="h6">Main FIR</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    Cornish rex. Ocicat persian so burmese for jaguar, or
                    mouser. Puma cornish rex. American bobtail burmese, persian
                    jaguar but singapura devonshire rex. Scottish fold bobcat
                    bobcat munchkin maine coon or kitty american bobtail. Maine
                    coon burmese american shorthair or tomcat, and american
                    shorthair donskoy so cornish rex. Turkish angora lynx and
                    himalayan. Lion leopard. Manx turkish angora burmese or tom,
                    yet scottish fold. Grimalkin. Mouser havana brown but tomcat
                    ocelot. Kitty russian blue. Balinese bobcat yet british
                    shorthair birman or mouser siberian. Egyptian mau turkish
                    angora burmese. American bobtail. Malkin bengal. Singapura
                    cheetah cheetah munchkin birman but leopard so ocicat.
                    Persian tom. Sphynx tomcat. Devonshire rex sphynx puma and
                    savannah siberian tomcat. Birman kitten. Kitty tomcat
                    panther so singapura. Bengal balinese birman grimalkin
                    jaguar devonshire rex munchkin. Puma. Egyptian mau ocelot
                    siberian for kitty tiger so burmese so tomcat.
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                    <Typography variant="h6">How did it Happen</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    British shorthair. Kitty bombay or tomcat russian blue
                    tiger. Burmese jaguar. Donskoy maine coon ocicat or ragdoll.
                    Cornish rex havana brown for himalayan singapura ragdoll
                    american bobtail bobcat. Munchkin tabby ragdoll but cheetah
                    or mouser. Persian tabby and bengal so lynx siamese. Cornish
                    rex scottish fold american shorthair. Ragdoll munchkin kitty
                    balinese . Cornish rex ragdoll savannah himalayan turkish
                    angora. Kitty burmese panther, yet donskoy abyssinian .
                    Egyptian mau. Persian bombay. Russian blue himalayan
                    abyssinian turkish angora lion or siamese lion. Cougar
                    abyssinian so tabby for savannah. Russian blue grimalkin.
                  </Grid>
                  
                  <br></br>
                  <Grid item xs={12}>
                    <Typography variant="h6">Possible suspects</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    Hauzari Athva and Khunur Patel
                  </Grid>
                </Grid>
              </Typography>
              <br></br>
              <Divider />
              <br></br>
              <Grid container spacing={3}>
                <Grid item >
                  <Button onClick={acceptFIR} color="primary">
                    Accept
                  </Button>
                </Grid>
                <Grid item >
                  <Button onClick={moreinfoFIR} color="secondary" 
                    disabled = {status === "More information requested"}
                  >
                    Request More Information
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={handleClose}>Close</Button>
                </Grid>
              </Grid>
            
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
