const Footer = () => {
  return (
    <footer className="text-black py-4"> {/* Réduction du padding vertical */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo à gauche */}
        <div className="mb-4 md:mb-0">
          <svg
            width="100" // Taille du logo réduite
            height="30"
            viewBox="0 0 100 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current w-32 h-20 text-white"
          >
            {/* Ton SVG logo ici */}
            <path d="..." fill="#F996B5" /> {/* Ton logo SVG */}
          </svg>
        </div>

        {/* Liens et informations */}
        <div className="flex flex-col md:flex-row justify-between w-full md:w-auto">
          {/* Section À propos */}
          <div className="footer-section mb-4 md:mb-0 md:ml-6"> {/* Réduction des marges */}
            <h2 className="text-md font-semibold mb-1">À propos</h2> {/* Réduction de la taille de police */}
            <p className="text-sm">
              Powerful Freelance Marketplace System with ability to change the Users (Freelancers & Clients)
            </p>
          </div>

          {/* Section pour patients */}
          <div className="footer-section mb-4 md:mb-0 md:ml-6">
            <h2 className="text-md font-semibold mb-1">For Patients</h2>
            <ul className="text-sm">
              <li className="mb-1">
                <a href="#" className="hover:text-blue-400">
                  Find Freelancers
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:text-blue-400">
                  Post Project
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:text-blue-400">
                  Refund Policy
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:text-blue-400">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Section Contact */}
          <div className="footer-section md:ml-6">
            <h2 className="text-md font-semibold mb-1">Contact</h2>
            <p className="text-sm">Email : contact@exemple.com</p>
            <p className="text-sm">Téléphone : +213 123 456 789</p>
          </div>
        </div>
      </div>

      {/* Icônes des réseaux sociaux */}
      <div className="mt-4 flex justify-center space-x-4"> {/* Réduction des marges et espaces */}
        <a href="#" className="text-white hover:text-blue-400">
          <svg className="w-5 h-5" viewBox="0 0 24 24"> {/* Taille des icônes réduite */}
            <path d="..." fill="currentColor" />
          </svg>
        </a>
        <a href="#" className="text-white hover:text-blue-400">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="..." fill="currentColor" />
          </svg>
        </a>
        <a href="#" className="text-white hover:text-blue-400">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="..." fill="currentColor" />
          </svg>
        </a>
      </div>

      {/* Bas de page */}
      <div className="mt-4 border-t border-gray-600 pt-2 text-center text-sm"> {/* Réduction des marges et de la police */}
        &copy; 2024 tech for hope | Tous droits réservés
      </div>
    </footer>
  );
};

export default Footer;
