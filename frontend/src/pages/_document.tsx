// Importa componentes específicos de next/document para personalização do documento HTML
import {Html, Head, Main, NextScript} from 'next/document'

// Componente Document que permite a personalização da estrutura do documento HTML
export default function Document(){
    return(
        <Html>
            <Head>
                
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    )
}