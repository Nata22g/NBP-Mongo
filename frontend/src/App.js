import "./App.css";
import { Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import HomeS from "./Components/FirstPage/HomeS";
import RequiredAuth from "./Components/RequiredAuth";
import LoginPage from "./Components/FirstPage/LoginPage";
import HomePage from "./Components/FirstPage/HomePage";
import Error from "./Components/FirstPage/Error";
import Layout from "./Components/FirstPage/Layout";

//stanar
import IzmeniStanara from "./Components/Stanar/IzmeniStanara";
import KvaroviStanar from "./Components/Stanar/KvaroviStanar";
import Stanar from "./Components/Stanar/Stanar";
import PrijaviKvar from "./Components/Stanar/PrijaviKvar";
import StanarLayout from "./Components/Stanar/StanarLayout";
import ObavestenjaStanar from "./Components/Stanar/ObavestenjaStanar";
import DodajObavestenjeStanar from "./Components/Stanar/DodajObavestenjeStanar";
import PlatiRacun from "./Components/Stanar/PlatiRacun";
//direktor
import NavBarDirektor from "./Components/Direktor/DirektorLayout";
import Direktor from "./Components/Direktor/Direktor";
import IzmeniDirektora from "./Components/Direktor/IzmeniDirektora"
import Upravnici from "./Components/Direktor/Upravnici";
import Kvarovi from "./Components/Direktor/Kvarovi";
import PrikazSvihZgrada from "./Components/Direktor/PrikazSvihZgrada";
import DodajUpravnika from "./Components/Direktor/DodajUpravnika";
import PrikazZgradaPoUpravniku from "./Components/Direktor/PrikazZgradaPoUpravniku";
import DirektorLayout from "./Components/Direktor/DirektorLayout";
import PregledZgrada from "./Components/Direktor/PregledZgrada";
import UpravnikLayout from "./Components/Upravnik/UpravnikLayout";

//upravnik
import Upravnik from './Components/Upravnik/Upravnik'
import Zgrade from './Components/Upravnik/Zgrade';
import IzmeniUpravnika from "./Components/Upravnik/IzmeniUpravnika";
//import KvaroviUpravnik from './Components/Upravnik/KvaroviUpravnik';
import OglasnaTabla from './Components/Upravnik/OglasnaTabla'
import PregledStanara from './Components/Upravnik/PregledStanara'
import PregledKvarovaUpravnik from './Components/Upravnik/PregledKvarovaUpravnik';
import DodajStanara from './Components/Upravnik/DodajStanara'
import DodajObavestenje from './Components/Upravnik/DodajObavestenje';
//import ZgradeUpravnikK from "./Components/Upravnik/ZgradeUpravnikK";
import Naplata from "./Components/Upravnik/Naplata";

function App() {
  const { user } = useAuth();
  console.log("App.js:", user);
  return (
    <>
      <Router>
        <Routes>
          {/*public rute*/}
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
          </Route>
          {/*zasticene rute, stitimo ih reqAuth*/}
          <Route element={<RequiredAuth allowedRole={"Stanar"} />}>
            <Route path="/" element={<StanarLayout />}>
              <Route path="/Home" element={<HomePage />} />
              <Route path="/Stanar" element={<Stanar />} />
              <Route path="/IzmeniStanara" element={<IzmeniStanara />} />
              <Route path="/KvaroviStanar" element={<KvaroviStanar />} />
              <Route path="/PrijaviKvar" element={<PrijaviKvar />} />
              <Route path="/ObavestenjaStanar" element={<ObavestenjaStanar/>}/>
              <Route path="/DodajObavestenjeStanar" element={<DodajObavestenjeStanar/>}/>
              <Route path="/PlatiRacun" element={<PlatiRacun/>}/>
              
            </Route>
          </Route>

          <Route element={<RequiredAuth allowedRole={"Direktor"} />}>
            <Route path="/" element={<DirektorLayout />}>
              <Route path="/Direktor" element={<Direktor />} />
              <Route path="/IzmeniDirektora" element={<IzmeniDirektora />} />
              <Route path="/Upravnici" element={<Upravnici />} />
              <Route path="/Kvarovi" element={<Kvarovi />} />
              <Route path="/PregledZgrada" element={<PregledZgrada />} />
              <Route path="/DodajUpravnika" element={<DodajUpravnika />} />
              <Route path="/PrikazSvihZgrada" element={<PrikazSvihZgrada />} />
              <Route
                path="/PrikazZgradaPoUpravniku"
                element={<PrikazZgradaPoUpravniku />}
              />
            </Route>
          </Route>

        

      <Route element={<RequiredAuth allowedRole={"Upravnik"} />}>
        <Route path="/" element={<UpravnikLayout />}>
          <Route path="/Upravnik" element={<Upravnik />} />
          <Route path="/IzmeniUpravnika" element={<IzmeniUpravnika />} />
          <Route path="/Zgrade" element={<Zgrade />} />
          <Route path="/PregledStanara" element={<PregledStanara />} />
          <Route path="/OglasnaTabla" element={<OglasnaTabla />} />
          <Route path="/PregledKvarovaUpravnik" element={<PregledKvarovaUpravnik />} />
          <Route path="/DodajStanara" element={<DodajStanara />} />
          <Route path="/DodajObavestenje" element={<DodajObavestenje />} />
          <Route path="/HomeU" element={<HomeS />} />
          <Route path="Naplata" element={<Naplata/>}/>
          
         </Route>
      </Route>

      {/*Catch All Errori*/}
      <Route path="*" element={<Error />} />

    </Routes>
    </Router>
    </>
  );
}

export default App;

