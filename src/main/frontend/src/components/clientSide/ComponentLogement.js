import React from "react";
import VoyageService from "src/services/VoyageService";
import { Star as StarIcon } from "../../icons/star"
import { Town as TownIcon } from '../../icons/town';
import { Avatar, Box, Button,ButtonGroup, Card, CardContent, Divider, Grid, Typography } from '@mui/material';

class ComponentLogement extends React.Component
{

constructor(props)
{
     super(props);
    this.state={TableLogement:[]};
}

componentDidMount()
{
    VoyageService.getLogementsList().then((Response)=> {this.setState({TableLogement:Response.data})});
}


render()
{
    return(

    <div >
    <section className="section-tours" id="tours">
        <div className="container tour-box" data-aos="fade-up">
        <header className="tour-box__heading">
            <h2 className="heading heading--2 color-blue margin-bottom">
            QUE FAIRE au Maroc <hr></hr>
            </h2>
            <p>
            Découvrez la culture marocaine avec {process.env.APP_NAME}, site à service 
            complet offrant des circuits à la carte sur mesure et individuels dans tous le Maroc.
            À l’opposé du tourisme de masse, {process.env.APP_NAME} vous propose un appui logistique pour l’organisation
            de votre séjour au Maroc.
            </p>
          </header>

          <article className="tour-box__cards">


            {
                this.state.TableLogement.map( logement=>
                
            <div className="t-card" data-aos="flip-left" data-aos-duration="1000" key={logement.id}>
              <img
                src={`${process.env.IMAGE_BASE_URL}`+logement.photo}
                alt={logement.name}
                className="t-card__img"
              />
              

              <div className ="t-card__content">
                <div className="t-card__title" style={{textAlign: 'center'}}>
                  <p className="price"><strong className="titre">{logement.description}</strong></p>
                </div>

                <div className="t-card__description" style={{fontSize: '12px'}}>
                <b>Tél:</b> {logement.contact}  <br></br>
                <b>Email:</b> {logement.email}
                </div>

                <div className="t-card__items">
                  <div className="days">Logement</div>

                  <div className="likes">
                  {	logement.surface} m²
                  </div>
                </div>

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
            {logement.villeName}
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
            {logement.rating_cache}
            {' '}
          </Typography>
            </Grid>
            </Grid>
            </Box>

              </div>
            </div>)
                
}
                 
          </article>
        </div>
      </section>
    </div>)
}

}
export default ComponentLogement;