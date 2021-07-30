import axios from "axios";
import React from "react";

// material
import { Grid } from '@material-ui/core';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

const baseURL = "http://localhost:8080/api/eventos";

export default function ProductList({ products, ...other }) {
  const [eventos, setEventos] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setEventos(response.data);
    });
  }, []);

  if (!eventos) return null;

  return (
    <Grid container spacing={3} {...other}>
      {eventos.map((evento) => (
        <Grid key={evento.id_evento} item xs={12} sm={6} md={3}>
          <ShopProductCard product={evento} />
        </Grid>
      ))}
    </Grid>
  );
}
