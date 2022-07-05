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
            <h2>Contact</h2>
            <div className="border"></div>
            <ul>

            <li><i className="fa fa-phone" aria-hidden="true">+212-633325889 </i></li>
            <li><i className="fa fa-envelope" aria-hidden="true">touriste22@.com</i></li>
            <li><i className="fa fa-globe" aria-hidden="true">www.maroccult.com</i></li>
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