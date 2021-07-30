import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Button, Card, Link, Typography, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
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
  const { nome, cover, preco, status, priceSale, descricao } = product;
  const [open, setOpen] = React.useState(false);

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
          <ProductImgStyle alt={nome} src={cover} />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link to="#" color="inherit" underline="hover" component={RouterLink}>
            <Typography variant="subtitle2" noWrap>
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
            <Typography variant="h3" noWrap>{nome}</Typography>
            <Typography variant="text" Wrap>{descricao}</Typography>
            <Typography variant="text" Wrap>Preço: {(preco === "0.00") ? 'Grátis' : fCurrency(preco) }</Typography>
            <Typography variant="text" Wrap>Capacidade mínima: {preco}</Typography>
            <Typography variant="text" noWrap>Capacidade máxima: {preco}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            fechar
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Comprar agora
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
