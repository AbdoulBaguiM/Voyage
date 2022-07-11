import {Phone, Mail} from "react-feather"

function NFooter() {
    return (

<footer>    
    <div className="foott">
        <div className="saw">
            <div className="saww">
            <h1>Pour plus d'infos</h1>
            <p>
                Pour avoir d'autres informations, rien de plus simple. Inscrivez vous sur notre site, remplissez le formulaire et posez vos questions.
            </p>

            </div>
            <div className="saww">
            <h2>Autres liens</h2>
            <div className="border"></div>
            <ul>

            <a href="/hotels" target="blank"><li>Hôtels</li></a>
            <a href="/riads" target="blank"><li>Riads</li></a>
            <a href="/villas" target="blank"><li>Villas</li></a>
            <a href="/chambres" target="blank"><li>Chambres</li></a>
            </ul>
            </div>
            <div className="saww">
            <h2>Voir plus</h2>
            <div className="border"></div>
            <ul>

            <a href="/villes"><li>Ville touristiques</li></a>
            <a href="/appartements"><li>Appartements</li></a>
            <a href="/natures"><li>Lieux Naturels</li></a>
            <a href="/monuments"><li>Monuments Historiques </li></a>
            </ul></div>
            <div className="saww">
            <h2>Contactez-nous</h2>
            <div className="border"></div>
            <ul>

            <li><Phone/> +212-640405050</li>
            <li><Mail/> {process.env.APP_NAME}@contact.com</li>
            <li> www.{process.env.APP_NAME}.com</li>
            </ul>

            </div>
            </div>
            <div className="footer-bottom">
            Copyright &copy; Touristes site web.Tous les droits sont reserves.

            </div>	
    </div>

</footer>
    );
  }
  
  export default  NFooter;