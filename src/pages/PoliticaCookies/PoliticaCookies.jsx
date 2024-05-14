import React from 'react';

const PoliticaCookies = () => {
    return (
        <div id="politicaCookies" >
            <div className="container">
                <h1 className="mb-5">POLÍTICA DE COOKIES</h1>
                <p>De conformidad con la normativa española que regula el uso de cookies en relación a la prestación de servicios de comunicaciones electrónicas, le informamos sobre las cookies utilizadas en este Sitio Web de SOM 2011, S.L. y el motivo de su uso.</p>
                
                <h2 className="mb-4 mt-5">1. ¿QUE SON LAS COOKIES?</h2>
                <p>Una cookie es un fichero que se descarga en su ordenador, tablet, smartphone o cualquier otro dispositivo al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario. En ningún caso las cookies podrían dañar su equipo. Por contra, el que estén activas nos ayuda a identificar y resolver los posibles errores.</p>
                
                <h2 className="mb-4 mt-5">2. ¿COMO UTILIZAMOS LAS COOKIES?</h2>
                <p>Nuestro sitio web utiliza cookies para mejorar tu experiencia de navegación, recordar tus preferencias, y ayudarnos a entender cómo los visitantes usan nuestro sitio para poder mejorarlo.</p>
                
                <h2 className="mb-4 mt-5">3. TIPOS DE COOKIES</h2>
                <p>Según la <strong>ENTIDAD QUE LAS GESTIONE</strong></p>
                <ul className="px-5">
                    <li><strong>Propias: </strong> Aquellas que se envían desde un equipo o dominio gestionado por el Responsable del Tratamiento y desde el que se presta el servicio solicitado por el usuario.</li>
                    <li><strong>De terceros: </strong> Aquellas que se envían desde un equipo o dominio que no es gestionado por el Responsable del Tratamiento, sino por otra entidad que trata los datos obtenidos a través de las cookies.</li>
                </ul>
                <p>Según la <strong>FINALIDAD</strong></p>
                <ul className="px-5">
                    <li><strong>Técnicas: </strong> Aquellas que permiten al usuario la navegación a través de una página web, plataforma o aplicación, la utilización de las diferentes opciones o servicios que en ella existan y facilitan al usuario compartir contenidos en redes sociales de su interés.</li>
                    <li><strong>De personalización: </strong> Aquellas que permiten recordar información para que el usuario acceda al servicio con determinadas características que pueden diferenciar su experiencia de la de otros usuarios.</li>
                    <li><strong>Analíticas: </strong> Aquellas que permiten al responsable de las cookies el seguimiento y análisis del comportamiento de los usuarios de los sitios web a los que están vinculadas.</li>
                    <li><strong>De publicidad comportamental: </strong> Aquellas que almacenan información del comportamiento de los usuarios, obtenida de la observación continuada de sus hábitos de navegación, permitiendo desarrollar un perfil específico para mostrar publicidad en función del mismo.</li>
                </ul>
                <p>Según la <strong>DURACIÓN</strong></p>
                <ul className="px-5">
                    <li><strong>Persistentes: </strong> Aquellas en las que los datos siguen almacenados en el terminal y pueden ser accedidos durante un periodo definido por el responsable de la cookie.</li>
                    <li><strong>Sesión: </strong> Aquellas diseñadas para recabar y almacenar datos mientras el usuario accede a la web y durante la prestación del servicio solicitado, desapareciendo al terminar la sesión.</li>
                </ul>

                <h2 className="mb-4 mt-5">4. COMÓ CONTROLAR LAS COOKIES</h2>
                <p>Puedes controlar y/o eliminar las cookies como lo desees. Puedes borrar todas las cookies que ya están en tu computadora y puedes configurar la mayoría de los navegadores para evitar que se coloquen. Sin embargo, si haces esto, es posible que tengas que ajustar manualmente algunas preferencias cada vez que visitas un sitio y algunos servicios y funcionalidades pueden no funcionar.</p>
                <p>Asimismo, el usuario tiene la posibilidad de configurar su navegador para deshabilitar o eliminar, en cualquier momento, las cookies. A través de los siguientes enlaces se ofrece información sobre la configuración de los diferentes navegadores de Internet en lo relativo a la configuración de las cookies.</p>
                <ul className="px-5">
                    <li><a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank">Configuración de cookies para Google Chrome</a></li>
                    <li><a href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-?redirectlocale=en-US&redirectslug=Cookies" target="_blank">Configuración de cookies para Mozilla Firefox</a></li>
                    <li><a href="https://support.microsoft.com/es-es/topic/c%C3%B3mo-eliminar-archivos-de-cookies-en-internet-explorer-bca9446f-d873-78de-77ba-d42645fa52fc" target="_blank">Configuración de cookies para Internet Explorer</a></li>
                    <li><a href="https://support.apple.com/es-es/105082" target="_blank">Configuración de cookies para Safari</a></li>
                </ul>

                <h2 className="mb-4 mt-5">5. CAMBIOS EN LA POLÍTICA DE COOKIES</h2>
                <p>Esta Política de Cookies podrá ser actualizada en función de exigencias legislativas, reglamentarias, o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Autoridad de Protección de Datos. Se aconseja a los usuarios que la visiten periódicamente.</p>

                <h2 className="mb-4 mt-5">5. MAS INFORMACIÓN</h2>
                <p className="sin-margen">Si desea obtener más información, por favor acceda a nuestra <a href="javascript:void(0);" onclick="politicaPrivacidad()">Política de Privacidad</a> o póngase en contacto con nosotros a través de los datos que figuran al inicio de la misma.</p>
            </div>
        </div>
    );
};

export default PoliticaCookies;

