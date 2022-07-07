import React from "react";
import VoyageService from "src/services/VoyageService";

class ComponentNature extends React.Component
{

constructor(props)
{
     super(props);
    this.state={TableNature:[]};
}

componentDidMount()
{
    VoyageService.getNaturesList().then((Response)=> {this.setState({TableNature:Response.data})});
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
                this.state.TableNature.map( nature=>
                
            <div className="t-card" data-aos="flip-left" data-aos-duration="1000" key={nature.id}>
              <img
             src={`${process.env.IMAGE_BASE_URL}`+nature.photo}
                alt="image"
                className="t-card__img"
              />
              

              <div className ="t-card__content">
                <div className="t-card__title">
                  <p className="price"><strong className="titre"> {nature.description}</strong></p>
                </div>

                <div className="t-card__description">

                </div>

                <div className="t-card__items">
                  <div className="days">{nature.type}</div>

               
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
export default ComponentNature;