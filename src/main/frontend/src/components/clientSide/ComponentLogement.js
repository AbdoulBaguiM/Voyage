import React from "react";
import VoyageService from "src/services/VoyageService";
import { Star as StarIcon } from "../../icons/star"

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
              our top tours
            </h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit
              ducimus illum corporis magni voluptas, ex eum dolorum quia
              officia! Deleniti quia ut.
            </p>
          </header>

          <article className="tour-box__cards">


            {
                this.state.TableLogement.map( logement=>
                
            <div className="t-card" data-aos="flip-left" data-aos-duration="1000" key={logement.id}>
              <img
                src={`${process.env.IMAGE_BASE_URL}`+logement.photo}
                alt="england"
                width="500"
                height="500"
                className="t-card__img"
              />
              

              <div className ="t-card__content">
                <div className="t-card__title">
                 
                  <p className="price"><i><strong className="titre"> {logement.description}</strong> </i></p>
                </div>

                <div className="t-card__description">
                <h4> Contact:</h4> <br></ br>
                <b>Tél:</b> 0612362548  <br></br>
                <b>Email:</b>touristique22@gmail.com
                </div>

                <div className="t-card__items">
                  <div className="days">Logement</div>

                  <div className="likes">
                  {	logement.surface}
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
export default ComponentLogement;