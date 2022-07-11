import React from "react";
import VoyageService from "src/services/VoyageService";

class ComponentVille extends React.Component
{

constructor(props)
{
     super(props);
    this.state={TableVille:[]};
}

componentDidMount()
{
    VoyageService.getVillesList().then((Response)=> {this.setState({TableVille:Response.data})});
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
            this.state.TableVille.map( ville=>
                
            <div className="t-card" data-aos="flip-left" data-aos-duration="1000" key={ville.id}>
              <img
                src={`${process.env.IMAGE_BASE_URL}`+ville.photo}
                alt="england"
                width="500"
                height="500"
                className="t-card__img"
              />
              

              <div className ="t-card__content">
                <div className="t-card__title">
                  <h5 className="name" style={{color: 'grey'}}> <i>Bienvenue à</i></h5>
                  <p className="price"><strong className="titre"> {ville.name}</strong></p>
                </div>

                <div className="t-card__description">
                <h4><a href={ville.map} style={{color: 'blue'}}>Carte</a></h4> <br></ br>
                <p></p>
                </div>

                <div className="t-card__items">
                  <div className="likes">
                	  Météo {	ville.meteo}
                  </div>
                </div>
              </div>
            </div>)
                
}
                 
          </article>
        </div>
      </section>
    </div>)
}

}
export default ComponentVille;