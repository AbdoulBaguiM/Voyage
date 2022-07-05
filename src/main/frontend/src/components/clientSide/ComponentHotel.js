import React from "react";
import VoyageService from "src/services/VoyageService";
import { Star as StarIcon } from "../../icons/star"

class ComponentHotel extends React.Component
{

constructor(props)
{
     super(props);
    this.state={TableHotel:[]};
}

componentDidMount()
{
    VoyageService.getHotelsList().then((Response)=> {this.setState({TableHotel:Response.data})});
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
            Découvrez la culture marocaine avec Maroc Voyages, site à service 
            complet offrant des circuits à la carte sur mesure et individuels dans tous le Maroc.
            À l’opposé du tourisme de masse, Maroc Voyages vous propose un appui logistique pour l’organisation
            de votre séjour au Maroc.
            </p>
          </header>

          <article className="tour-box__cards">


            {
                this.state.TableHotel.map( hotel=>
                
            <div className="t-card" data-aos="flip-left" data-aos-duration="1000" key={hotel.id}>
              <img
                src={`${process.env.IMAGE_BASE_URL}`+hotel.photo}
                alt="england"
                width="500"
                height="500"
                className="t-card__img"
              />
              

              <div className ="t-card__content">
                <div className="t-card__title">
                  <h3 className="name"> <i>Bienvenu à</i></h3>
                  <p className="price"><i><strong className="titre"> {hotel.name}</strong> </i></p>
                </div>

                <div className="t-card__description">
                    <h4> Contact:</h4> <br></ br>
                    <b>Tél:</b> 0612362548  <br></br>
                    <b>Email:</b>touristique22@gmail.com
                </div>

                <div className="t-card__items">
                  <div className="days"> {hotel.type==true ? 'Hôtel' : 'Riad'} </div>

                  <div className="likes">
                  {	hotel.appreciation}
                    <StarIcon/>
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
export default ComponentHotel;