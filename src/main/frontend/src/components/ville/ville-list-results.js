import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Link from 'next/link';
import axios from "axios";
import { Edit as EditIcon } from '../../icons/edit';
import { Trash as TrashIcon } from '../../icons/trash';
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
import { getInitials } from '../../utils/get-initials';

export const VilleListResults = ({...rest }) => {
  const [villes, setVilles] = useState([]);

  const fetchVilles = () => {
    axios.get(`${process.env.API_BASE_URL}/villes`).then(res => {
      setVilles(res.data);
    });
  };

  useEffect(()=> {
    fetchVilles();
  }, []);

  const [selectedVilleIds, setselectedVilleIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newselectedVilleIds;

    if (event.target.checked) {
      newselectedVilleIds = villes.map((customer) => customer.id);
    } else {
      newselectedVilleIds = [];
    }

    setselectedVilleIds(newselectedVilleIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedVilleIds.indexOf(id);
    let newselectedVilleIds = [];

    if (selectedIndex === -1) {
      newselectedVilleIds = newselectedVilleIds.concat(selectedVilleIds, id);
    } else if (selectedIndex === 0) {
      newselectedVilleIds = newselectedVilleIds.concat(selectedVilleIds.slice(1));
    } else if (selectedIndex === selectedVilleIds.length - 1) {
      newselectedVilleIds = newselectedVilleIds.concat(selectedVilleIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedVilleIds = newselectedVilleIds.concat(
        selectedVilleIds.slice(0, selectedIndex),
        selectedVilleIds.slice(selectedIndex + 1)
      );
    }

    setselectedVilleIds(newselectedVilleIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };


  const deleteVille = (e,id) => {
    e.preventDefault();
    fetch(`${process.env.API_BASE_URL}/villes/`+ id, {
      method: "DELETE",
    }).then((res) => {
      if(villes) {
        setVilles((prevElement) => {
          return prevElement.filter((ville) => ville.id !== id);
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
                    checked={selectedVilleIds.length === villes.length}
                    color="primary"
                    indeterminate={
                      selectedVilleIds.length > 0
                      && selectedVilleIds.length < villes.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Nom
                </TableCell>
                <TableCell>
                  Surface
                </TableCell>
                <TableCell>
                  Météo
                </TableCell>
                <TableCell>
                  Guides
                </TableCell>
                <TableCell>
                  Logements
                </TableCell>
                <TableCell>
                  Monuments
                </TableCell>
                <TableCell>
                  Nature
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {villes.slice(0, limit).map((ville) => (
                <TableRow
                  hover
                  key={ville.id}
                  selected={selectedVilleIds.indexOf(ville.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedVilleIds.indexOf(ville.id) !== -1}
                      onChange={(event) => handleSelectOne(event, ville.id)}
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
                        src={`${process.env.IMAGE_BASE_URL}`+ville.photo}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(ville.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {ville.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {ville.surface}
                  </TableCell>
                  <TableCell>
                    {ville.meteo}
                  </TableCell>
                  <TableCell>
                    {ville.guides.length}
                  </TableCell>
                  <TableCell>
                    {ville.logements.length}
                  </TableCell>
                  <TableCell>
                    {ville.monuments.length}
                  </TableCell>
                  <TableCell>
                    {ville.nature.length}
                  </TableCell>
                  <TableCell>
                    <ButtonGroup>
                      <Button size="sm" color="primary">
                        <Link href={`/admin/ville/${ville.id}`}><EditIcon/></Link></Button>
                      <Button size="sm" color="error" onClick={(e,id) => deleteVille(e,ville.id)}><TrashIcon/></Button>
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
        count={villes.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

VilleListResults.propTypes = {
  villes: PropTypes.array.isRequired
};
