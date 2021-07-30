import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// material
import { Box, Button, Card, Link, Typography, Grid, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const { nome, preco, status, descricao, capacidade_min, capacidade_max, latitude, longitude } = product;
  const [open, setOpen] = React.useState(false);

  const MY_API = 'AIzaSyCRN1MfsabTqX35m29e4TU0rr4aC9q2O_o';
  var querystring = 'q='+latitude+','+longitude;
  let url_location =  `https://www.google.com/maps/embed/v1/place?key=${MY_API}&`+querystring;
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {status && (
            <Label
              variant="filled"
              color={(status === 'promoção' && 'error') || 'info'}
              sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute',
                textTransform: 'uppercase'
              }}
            >
              {status}
            </Label>
          )}
          <ProductImgStyle alt={nome} src="https://via.placeholder.com/300" />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link to="#" color="inherit" underline="hover" component={RouterLink}>
            <Typography variant="subtitle1" Wrap>
              {nome}
            </Typography>
          </Link>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <ColorPreview/>
            <Typography variant="subtitle1">
              {(preco === "0.00") ? 'Grátis' : fCurrency(preco) }
            </Typography>
          </Stack>
          <Stack spacing={2}>
            <Button to="#" color="primary" variant="outlined" onClick={handleClickOpen}>
              Ver detalhes
            </Button>
            <Button to="#" color="primary" variant="contained" component={RouterLink}>
              Comprar Ingresso
            </Button>
          </Stack>
        </Stack>
      </Card>
      {/* dialog de detalhes do produto */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-mais-detalhes"
        aria-describedby="dialog-mais-detalhes"
        fullWidth="fullWidth"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">Mais detalhes</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h3" Wrap>{nome}</Typography>
                <Typography variant="subtitle1" Wrap>{descricao}</Typography>
                <br/>
                <Typography variant="text" mb={2} Wrap>
                  <p>Capacidade mínima: {capacidade_min}</p>
                  <p>Capacidade máxima: {capacidade_max}</p>
                </Typography>
                <Stack mt={3}>
                  <Typography variant="subtitle1" Wrap>Localização:</Typography>
                  <iframe frameBorder="0" width="100%" height="100%"  src={url_location}></iframe>
                </Stack>
                <Stack mt={3}>
                  <Typography variant="h4">
                    <p>Preço: {(preco === "0.00") ? 'Grátis' : fCurrency(preco) }</p>
                  </Typography>
                </Stack>
                <br/>
              </Grid>
              <Grid item xs={12} md={6}>
                <img alt={nome} src="https://via.placeholder.com/400" />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Voltar
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Comprar agora
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
