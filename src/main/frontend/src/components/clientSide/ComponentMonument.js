import React from "react";
import VoyageService from "src/services/VoyageService";

class ComponentMonument extends React.Component
{

constructor(props)
{
     super(props);
    this.state={TableM:[]};
}

componentDidMount()
{
  VoyageService.getMonumentsList().then((Response)=> {this.setState({TableM:Response.data})});
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
            Découvrez la culture marocaine avec Maroc Voyages, site à service complet offrant des circuits 
            à la carte sur mesure et individuels dans tous le Maroc.
            À l’opposé du tourisme de masse, Maroc Voyages vous propose un appui logistique pour l’organisation
            de votre séjour au Maroc.
            </p>
          </header>

          <article className="tour-box__cards">


            {
                this.state.TableM.map( m=>
                
            <div className="t-card" data-aos="flip-left" data-aos-duration="1000" key={m.id}>
             
             <img
             src={`${process.env.IMAGE_BASE_URL}`+m.photo}
                alt="image"
                width="500"
                height="500"
                className="t-card__img"
              />
              

              <div className ="t-card__content">
                <div className="t-card__title">
                  <h3 className="name"> <i>Bienvenus à</i></h3>
                  <p className="price"><i><strong className="titre"> {m.historique}</strong> </i></p>
                </div>


                <div className="t-card__description">
                
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
export default ComponentMonument;