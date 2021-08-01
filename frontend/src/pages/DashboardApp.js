import { filter } from 'lodash';
// material
import {
  Box, Grid, 
  Card,
  CardHeader,
  Table,
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// components
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import Page from '../components/Page';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { UserListHead, UserMoreMenu } from '../components/_dashboard/user';

import {
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits
} from '../components/_dashboard/app';

import USERLIST from '../_mocks_/user';
import axios from "axios";
import React from "react";

const TABLE_HEAD = [
  { id: 'nome', label: 'Nome', alignRight: false },
  { id: 'cod_evento', label: 'Código do Evento', alignRight: false },
  { id: 'ingressos', label: 'Ingressos', alignRight: false },
  { id: 'data_inicio', label: 'Data inicio', alignRight: false },
  { id: 'min', label: 'Capacidade mínima', alignRight: false },
  { id: 'max', label: 'Capacidade máxima', alignRight: false },
  { id: 'e_publico', label: 'É público?', alignRight: false },
  { id: '' }
];


// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
const baseURL = "http://localhost:8080/api/eventos/organizador/";

export default function DashboardApp() {
  
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const [eventosOrganizador, setEventosOrganizador] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setEventosOrganizador(response.data);
    });
  }, []);



  if (!eventosOrganizador) return null;


  return (
    <Page title="Painel do Anfitrião | TImbre">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h3">Painel do Anfitrião</Typography>
        </Box>
        <Grid container spacing={3}>

          <Grid item xs={12} md={6} lg={8}>
            <Card>
              <CardHeader title="Eventos Organizados" />
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={USERLIST.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />

                <TableBody>
                  {eventosOrganizador.map(row => {
                      const { id_evento, cod_evento, nome, qt_convite, capacidade_min, capacidade_max, e_publico, data_inicio } = row;
                      const isItemSelected = selected.indexOf(nome) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id_evento}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, nome)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={nome} />
                              <Typography variant="subtitle2" noWrap>
                              
                                {nome}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{cod_evento}</TableCell>
                          <TableCell align="left">{qt_convite}</TableCell>
                          <TableCell align="left">{data_inicio}</TableCell>
                          <TableCell align="left">{capacidade_min}</TableCell>
                          <TableCell align="left">{capacidade_max}</TableCell>
                          <TableCell align="left">{e_publico ? 'Sim' : 'Não'}</TableCell>
                    

                          <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {eventosOrganizador > 0 && (
                    <TableRow style={{ height: 53 * eventosOrganizador }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {!eventosOrganizador && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={USERLIST.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>
          
          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
