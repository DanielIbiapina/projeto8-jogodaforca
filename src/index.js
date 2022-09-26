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

let i = 0
let conta = 0

const palavraEscolhida = palavras
const palavrasEmbaralhadas = palavraEscolhida.sort(comparador);
const underline = []
const imagens = [img0, img1, img2, img3, img4, img5, img6]

while (i < palavrasEmbaralhadas[0].length) {
    underline.push('_ ')
    i++
}

function comparador() {
    return Math.random() - 0.5;
}

const palavraArray = palavrasEmbaralhadas[0].split('')

function App() {
    const [modoletra, setModoLetra] = useState(true);
    const [visivel, setVisivel] = useState(false);
    const [corletra, setCorletra] = useState([])
    const [imagemforca, setImagemforca] = useState([imagens[conta]])




    console.log(palavrasEmbaralhadas[0])
    console.log(palavrasEmbaralhadas[0].length)

    function iniciar() {
        alert('iniciando...')
        setModoLetra(false)
        setVisivel(true)
    }

    function verificar(letra) {
        
        console.log(letra)
        const letrinha = letra.toLowerCase()
        console.log(letrinha)
        const novoArray = [...corletra, letra]
       
        console.log(imagemforca)
       
        
        let cont = 0;
        let k = 0;
        while (cont < palavraArray.length) {
            if (letrinha === palavraArray[cont]){
                if(k==0){alert('acertou')}
                setCorletra(novoArray)
                k++
                underline[cont] = letrinha
                console.log(underline)
            }
            if (letrinha !== palavraArray[cont] && cont == (palavraArray.length - 1) && k<1){
                alert('errou')
                conta++
                const novaImagem = [imagens[conta]]
                setImagemforca(novaImagem)
                console.log(conta)

            }
            cont++
        }


        
    }



    return (
        <div className='containerzao'>
            <div className='container'>
                <div className="imagem">
                    <img src={imagemforca[0]} />
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
                        modoletra ?
                            alfabetao.map((letra) => <li class="divLetraDesativada" >{letra}</li>) : (

                                alfabetao.map((letra, index) => <li key={index} class={corletra.includes(letra) ?"letraVermelha":"divLetraAtivada"} onClick={() => verificar(letra)}>
                                    {letra}
                                </li>)
                            )


                    }

                </ul>
            </div>

        </div>
    );
}



ReactDOM.render(<App />, document.querySelector(".root"));