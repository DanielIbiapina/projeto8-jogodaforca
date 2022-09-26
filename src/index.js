import ReactDOM from 'react-dom';
import { useState } from 'react';

import img0 from "./assets/forca0.png";
import img1 from "./assets/forca1.png";
import img2 from "./assets/forca2.png";
import img3 from "./assets/forca3.png";
import img4 from "./assets/forca4.png";
import img5 from "./assets/forca5.png";
import img6 from "./assets/forca6.png";
import "./reset.css";
import "./style.css";
import "./palavras.js"
import palavras from './palavras.js';


let alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const toUpper = function (x) {
    return x.toUpperCase();
};
let alfabetao = alfabeto.map(toUpper);

const palavraEscolhida = palavras
    const palavrasEmbaralhadas = palavraEscolhida.sort(comparador);
    const underline = ['']
    let i = 0
    while(i<palavrasEmbaralhadas[0].length){
        underline.push('_ ')
        i++
    }

    function comparador() {
        return Math.random() - 0.5;
    }
function App() {
    const [modoletra, setModoLetra] = useState(true);
    const [visivel, setVisivel] = useState(false)
    
    


    console.log(palavrasEmbaralhadas[0])
    console.log(palavrasEmbaralhadas[0].length)

    function iniciar() {
        alert('iniciando...')
        setModoLetra(false)
        setVisivel(true)
    }

    

    return (
        <div className='containerzao'>
            <div className='container'>
                <div className="imagem">
                    <img src={img0} />
                </div>
                <div className='containerzinho'>
                    <div className="botao" onClick={iniciar}>
                        <button>
                            Escolher a palavra
                        </button>
                    </div>
                    {visivel ? (
                        <ul className='underlines margintop'>

                            {underline}

                        </ul>) : (
                        <div className='underlines margintop none'>

                        </div>
                    )
                    }
                </div>

            </div>
            <div >
                <ul className='teclado'>
                    {
                        modoletra ? alfabetao.map((item) => <li class="divLetraDesativada">{item}</li>) : alfabetao.map((item) => <li class="divLetraAtivada">{item}</li>)
                    }
                </ul>
            </div>

        </div>
    );
}



ReactDOM.render(<App />, document.querySelector(".root"));