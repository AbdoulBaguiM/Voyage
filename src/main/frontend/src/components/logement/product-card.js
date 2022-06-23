import PropTypes from 'prop-types';
import { Avatar, Box, Button,ButtonGroup, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Phone as PhoneIcon } from '../../icons/phone';
import { Star as StarIcon } from '../../icons/star';
import { Edit as EditIcon } from '../../icons/edit';
import { Trash as TrashIcon } from '../../icons/trash';
import { Town as TownIcon } from '../../icons/town';

export const ProductCard = ({ product, deleteProduct, ...rest}) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3,
        }}
      >
        <Avatar
          alt="Product"
          src={`${process.env.IMAGE_BASE_URL}`+product.photo}
          variant="square"
          sx={{ width: 100, height: 100 }}
        />
      </Box>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h5"
      >
        {product.surface} m²
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {product.description}
      </Typography>
      <Typography
        align="center"
        color="textSecondary"
        variant="body2"
      >
        {product.email}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <TownIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {product.villeName}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <StarIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {product.rating_cache}
            {' '}
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <Divider />
    <Box sx={{ p: 1 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{alignItems: 'center',
                display: 'flex'}}
        >
          <PhoneIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {product.contact}
            {' '}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{alignItems: 'center',
                display: 'flex'}}
        >
          <ButtonGroup>
          <a href={`/admin/logement/${product.id}`}>
            <Button size="sm" color="primary">
                <EditIcon/>
            </Button></a>
            <Button size="sx" color="error" onClick={(e,id) => deleteProduct(e,product.id)}><TrashIcon/></Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};
