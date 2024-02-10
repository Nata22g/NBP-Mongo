import React from 'react'
import videoBg from "../../Assets/bg.mp4"
import image1 from '../../Assets/homepage1.jpg'
import image2 from '../../Assets/homepage2.jpg'
import image3 from '../../Assets/homepage3.jpg'
import useAuth from "../../hooks/useAuth";
import Footer from './Footer'
export default function HomeS() {
  return (
      <div className="Homepage">
        <div>
         <div className="overlay"></div>
          <video src={videoBg} autoPlay loop muted />
          <div className="content">
              <h1>SmartWalls</h1>
              <p>Tennet's assembly and building management </p>
          </div>
        </div>
        <div>
        <div className='opis'>
        <div className='grid'>
          <div className="slikatekst">
            <img src={image1} alt='slika-1' />
            <div className="text-center">
            <p>
            "Smart Walls" je inovativna platforma koja ima za cilj da 
            revolucionizuje način na koji se upravlja stambenim zajednicama.
             Naša aplikacija je osmišljena kako bi pružila efikasno i praktično
              rešenje za sve izazove sa kojima se susreću stanari i upravnici zgrada.
            </p>
            </div>
          </div>
  
          <div className="tekstslika">
            <img src={image2} alt='slika-2' />
            <div className="text-center">
            <p>
            Jedan od ključnih ciljeva naše aplikacije je olakšanje
             komunikacije između stanara i upravnika. Uz "Smart Walls",
              stanari će moći da jednostavno komuniciraju sa upravnikom zgrade,
               dele svoje sugestije, predloge ili prijave kvarova. Bez obzira da
                li je u pitanju problem sa vodom, električnom energijom ili nečim
                 drugim, naša aplikacija će omogućiti brzo i efikasno rešavanje
                  svakodnevnih kvarova.
            </p>
            </div>
          </div>
  
          <div className="slikatekst">
            <img src={image3} alt='slika-3' />
            <div className="text-center">
            <p>
            Uz "Smart Walls" aplikaciju, upravljanje vašom zgradom postaje 
            jednostavnije, efikasnije i modernije. Pridružite se našoj digitalnoj
             revoluciji upravljanja zgradama i uživajte u praktičnosti koju naša
              platforma pruža.
            </p>
            </div>
          </div>
        </div>
      </div>
        </div>
        <footer> <Footer /> </footer>
      </div>
    );  
}

