import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Link from 'next/link';
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
import api from 'src/services/api';

export const AppartementListResults = ({...rest }) => {
  const [appartements, setAppartements] = useState([]);

  const fetchAppartements = () => {
    api.get('/appartements').then(res => {
      setAppartements(res.data);
    });
  };

  useEffect(()=> {
    fetchAppartements();
  }, []);

  const [selectedAppartementIds, setselectedAppartementIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newselectedAppartementIds;

    if (event.target.checked) {
      newselectedAppartementIds = appartements.map((customer) => customer.id);
    } else {
      newselectedAppartementIds = [];
    }

    setselectedAppartementIds(newselectedAppartementIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedAppartementIds.indexOf(id);
    let newselectedAppartementIds = [];

    if (selectedIndex === -1) {
      newselectedAppartementIds = newselectedAppartementIds.concat(selectedAppartementIds, id);
    } else if (selectedIndex === 0) {
      newselectedAppartementIds = newselectedAppartementIds.concat(selectedAppartementIds.slice(1));
    } else if (selectedIndex === selectedVilleIds.length - 1) {
      newselectedAppartementIds = newselectedAppartementIds.concat(selectedAppartementIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedAppartementIds = newselectedAppartementIds.concat(
        selectedVilleIds.slice(0, selectedIndex),
        selectedVilleIds.slice(selectedIndex + 1)
      );
    }

    selectedAppartementIds(newselectedAppartementIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };


  const deleteAppartement = (e,id) => {
    e.preventDefault();
    api.delete('/appartements/'+ id)
    .then((res) => {
      if(appartements) {
        setAppartements((prevElement) => {
          return prevElement.filter((appartement) => appartement.id !== id);
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
                    checked={selectedAppartementIds.length === appartements.length}
                    color="primary"
                    indeterminate={
                      selectedAppartementIds.length > 0
                      && selectedAppartementIds.length < appartements.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  {''}
                </TableCell>
                <TableCell>
                  Nombre de chambre
                </TableCell>
                <TableCell>
                  Agent de securite 
                </TableCell>
                <TableCell>
                  Ascenseur
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              {appartements.slice(0, limit).map((appartement) => (
                <TableRow
                  hover
                  key={appartement.id}
                  selected={selectedAppartementIds.indexOf(appartement.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedAppartementIds.indexOf(appartement.id) !== -1}
                      onChange={(event) => handleSelectOne(event, appartement.id)}
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
                        src={`${process.env.IMAGE_BASE_URL}`+appartement.photo}
                        sx={{ mr: 2 }}
                      >
                        
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                       
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {appartement.nombreChambre}
                  </TableCell>
                 
                  <TableCell>
                    {appartement.ascenseur ? 'Avec' : 'Sans'}
                  </TableCell>
                  <TableCell>
                    {appartement.agentSecurite ? 'Oui' : 'Non'}
                  </TableCell>
                  <TableCell>
                    <ButtonGroup>
                      <Button size="sm" color="primary">
                        <Link href={`/admin/appartements/${appartement.id}`}><EditIcon/></Link></Button>
                      <Button size="sm" color="error" onClick={(e,id) => deleteAppartement(e,appartement.id)}><TrashIcon/></Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={appartements.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

AppartementListResults.propTypes = {
  appartements: PropTypes.array.isRequired
};
