import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// material
import { 
  Box, 
  Button, 
  Card, 
  Link, 
  Typography, 
  Grid, 
  Stack, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  TextField, 
  FormGroup 
} from '@material-ui/core';
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
  const [openMoreDetails, setOpenDetails] = React.useState(false);
  const [openPayment, setPayment] = React.useState(false);

  const MY_API = 'AIzaSyCRN1MfsabTqX35m29e4TU0rr4aC9q2O_o';
  var querystring = 'q='+latitude+','+longitude;
  let url_location =  `https://www.google.com/maps/embed/v1/place?key=${MY_API}&`+querystring;
  

  const handleClickOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleClickOpenPayment = () => {
    setPayment(true);
  };

  const handleClosePayment = () => {
    setPayment(false);
    setOpenDetails(false);
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
            <Button to="#" color="primary" variant="outlined" onClick={handleClickOpenDetails}>
              Ver detalhes
            </Button>
            <Button to="#" color="primary" variant="contained" onClick={handleClickOpenPayment} component={RouterLink}>
              Comprar Ingresso
            </Button>
          </Stack>
        </Stack>
      </Card>
      {/* dialog de detalhes do produto */}
      <Dialog
        open={openMoreDetails}
        onClose={handleCloseDetails}
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
          <Button onClick={handleCloseDetails} color="primary">
            Voltar
          </Button>
          <Button onClick={handleClickOpenPayment} color="primary" autoFocus>
            Comprar agora
          </Button>
        </DialogActions>
      </Dialog>


      {/* dialog de compra de ingresso */}
      <Dialog
        open={openPayment}
        onClose={handleClosePayment}
        aria-labelledby="dialog-compra"
        aria-describedby="dialog-compra"
        fullWidth="fullWidth"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">Pagamento</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            <Stack mt={3}>
              <Typography variant="h3" Wrap>Confirme os dados</Typography>
            </Stack>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Stack mb={2}>
                  <Typography variant="h4" Wrap>{nome}</Typography>
                </Stack>
                <Stack mb={2}>
                  <Typography variant="subtitle1" Wrap>{descricao}</Typography>
                </Stack>
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
                <form noValidate autoComplete="off">
                  <TextField fullWidth id="outlined-basic" label="Nome" />
                  <TextField fullWidth id="outlined-basic" label="CPF" />
                  {/* se não for gratis */}
                  <FormGroup>
                      <TextField fullWidth id="outlined-basic" label="Numero do Cartão" />
                      <TextField fullWidth id="outlined-basic" label="Vencimento do Cartão" />
                      <TextField fullWidth id="outlined-basic" label="CVV" />
                  </FormGroup>
                </form>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePayment} color="primary">
            Voltar
          </Button>
          <Button onClick={handleClosePayment} color="primary" autoFocus>
            Comprar agora
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
