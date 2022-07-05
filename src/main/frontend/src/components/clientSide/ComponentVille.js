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
            QUE FAIRE au Maroc</h2><hr></hr>
            <p>
            Découvrez la culture marocaine avec Maroc Voyages, site à service complet offrant des circuits à la carte sur mesure et individuels dans tous le Maroc.
            À l’opposé du tourisme de masse, Maroc Voyages vous propose un appui logistique pour l’organisation de votre séjour au Maroc.
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
                  <h3 className="name"> <i>Bienvenu à</i></h3>
                  <p className="price"><i><strong className="titre"> {ville.name}</strong> </i></p>
                </div>

                <div className="t-card__description">
                <h4><a href={ville.map}>Localisation</a> </h4> <br></ br>
               <p></p>
                </div>

                <div className="t-card__items">
                  <div className="days">Ville</div>

                  <div className="likes">
                	Meteo {	ville.meteo}
                       
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