import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import Link from 'next/link';
import axios from "axios";
import { Edit as EditIcon } from '../../../icons/edit';
import { Trash as TrashIcon } from '../../../icons/trash';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../../utils/get-initials';
import authHeader from 'src/services/auth-header';
import AuthService from 'src/services/auth.service';

export const CustomerListResults = ({...rest }) => {
  const [customers, setCustomers] = useState([]);
  const currentUser = AuthService.getCurrentUser();
  
  const fetchCustomers = () => {
    axios.get(`${process.env.API_BASE_URL}/comptes`, { headers: authHeader() }).then(res => {
      setCustomers(res.data);
    });
  };

  useEffect(()=> {
      fetchCustomers();
  }, []);

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };


  const deleteUser = (e,id) => {
    e.preventDefault();
    fetch(`${process.env.API_BASE_URL}/comptes/`+ id, {
      method: "DELETE",
      headers: authHeader(),
    }).then((res) => {
      if(customers) {
        setCustomers((prevElement) => {
          return prevElement.filter((customer) => customer.id !== id);
        });
      }
    });
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 950 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Nom
                </TableCell>
                <TableCell>
                  Prénom
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Téléphone
                </TableCell>
                <TableCell>
                  Pays
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={process.env.IMAGE_BASE_URL+customer.avatar}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(customer.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.lastName}
                  </TableCell>
                  <TableCell>
                    {customer.email}
                  </TableCell>
                  <TableCell>
                    {customer.telephone}
                  </TableCell>
                  <TableCell>
                    {customer.pays}
                  </TableCell>
                  {customer.id != currentUser.id ?  
                    <TableCell>
                    <ButtonGroup>
                      <Button size="sm" color="primary">
                        <Link href={`/admin/customers/${customer.id}`}><EditIcon/></Link></Button>
                      <Button size="sm" color="error" onClick={(e,id) => deleteUser(e,customer.id)}><TrashIcon/></Button>
                    </ButtonGroup>
                  </TableCell>
                  : ''}
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};
