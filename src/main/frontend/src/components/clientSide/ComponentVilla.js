import React from "react";
import VoyageService from "src/services/VoyageService";

class ComponentVilla extends React.Component
{

constructor(props)
{
     super(props);
    this.state={TableVilla:[]};
}

componentDidMount()
{
  VoyageService.getVillasList().then((Response)=> {this.setState({TableVilla:Response.data})});
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
                this.state.TableVilla.map( villa=>
                
            <div className="t-card" data-aos="flip-left" data-aos-duration="1000" key={villa.id}>
             
             <img
             src={`${process.env.IMAGE_BASE_URL}`+villa.photo}
                alt="image"
                width="500"
                height="500"
                className="t-card__img"
              />
              <div className ="t-card__content">
                <div className="t-card__title">
                  <h3 className="name"> <i>Bienvenus à</i></h3>
                  <p className="price"><i><strong className="titre"> {villa.description}</strong> </i></p>
                </div>

                <div className="t-card__description">

                <h4> Cantact:</h4> <br></ br>
                    <b>Tél:</b> 0612362548  <br></br>
                    <b>Email:</b>touristique22@gmail.com
                </div>

                <div className="t-card__items">
                  <div className="days">Villa</div>

                  <div className="likes">
                	 {villa.nombreChambre} Chambre
                       
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
export default ComponentVilla;