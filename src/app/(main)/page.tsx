import Image from "next/image";
import Hbutton from "@/components/ui/navigation/ghostbotton";
import Header from "@/components/ui/navigation/logo";
import Footer from "@/components/ui/navigation/footer"; // Importation du footer

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Rectangle en haut de la page */}
      <div className="h-16 w-full flex items-center justify-center">
        <Header />
        <Hbutton />
      </div>

      <div className="flex-1 bg-red-200 flex items-center justify-center">
        {/* Change 'bg-red-200' à la couleur que tu veux */}
        <h1 className="text-5xl font-bold text-center mt-8">
          <span className="text-primary">Tech for</span>{" "}
          <span className="text-primary">hope</span>
        </h1>
      </div>

      {/* Autres contenus de la page */}
      {/* Ajoute d'autres contenus ici si nécessaire */}

      {/* Footer */}
      <Footer /> {/* Ajoute ici le composant Footer */}
    </div>
  );
}
