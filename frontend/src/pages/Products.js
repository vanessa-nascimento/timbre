import axios from "axios";
import { Form, useFormik } from 'formik';
import React, { useState } from 'react';
// material
import { Container, Stack, Typography, Input, Button, Grid, FormGroup } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
import ShopProductCard from '../components/_dashboard/products/ProductCard';
//
import PRODUCTS from '../_mocks_/products';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openEvento, setOpenEvento] = useState(false);
  const [codEvento, setCodEvento] = React.useState(null);
  const [evento, setEvento] = React.useState(null);


  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });


  const handleChangeCodEvento = event => {
    setCodEvento({ codEvento: event.target.value });
  }

  const handleSubmitCodEvento = event => {
    event.preventDefault();

    const ola = JSON.stringify(codEvento);
    const obj = JSON.parse(ola);

    axios.get(`http://localhost:8080/api/eventos/token/${obj.codEvento}`)
    .then((response) => {
      setEvento(response.data);
      setOpenEvento(true);
    });
  };

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };


  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <Page title="Eventos | TImbre">
      <Container>
        <Typography variant="h3" sx={{ mb: 5 }}>
          Veja os eventos próximos a você
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <Typography variant="p">
              Possui um código de evento? Insira aqui:
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ m: 2 }}>
            <form onSubmit={handleSubmitCodEvento}>
              <Input
                type="text"
                placeholder="Código do evento"
                name="codEvento"
                onChange={handleChangeCodEvento}
              />
              <Button
              variant="outlined"
              type="submit"
            >
              Verificar
            </Button>
          </form>
          </Stack>
        </Stack>
          
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        {openEvento ?
            <Grid container>
            <p>{evento}</p>
            {evento.map((evento) => (
              <Grid key={evento.id_evento} item xs={12} sm={6} md={3}>
                <ShopProductCard product={evento} />
              </Grid>
            ))}
          </Grid>
          :
          <ProductList products={PRODUCTS} />
        }
        


        
      </Container>
    </Page>
  );
}
