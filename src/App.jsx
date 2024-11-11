import React, { useEffect, useState } from 'react';
import './App.css';
import Formulario from './components/Form.jsx';
import ReactMarkdown from 'react-markdown';

let apiKey = '';
const apiUrl = 'https://api.openai.com/v1/chat/completions';

function App() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  const [respuesta, setRespuesta] = useState('');

  // Mostrar geolocalización del usuario en consola
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Latitud:', position.coords.latitude);
          console.log('Longitud:', position.coords.longitude);
        },
        (error) => {
          console.error('Error al obtener la geolocalización:', error);
        }
      );
    } else {
      console.log('La geolocalización no es compatible con este navegador.');
    }
  }, []);

  useEffect(() => {
    console.log('Respuesta:', respuesta);    
  }, [respuesta]);

  const fetchData = async (usuarioid) => {
    let apiUrl = 'http://127.0.0.1:8000/usuario/' + usuarioid;
    try {
      const responsePromise = fetch(apiUrl, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });

      const TIMEOUT_LIMIT = 5000;
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Tiempo de espera agotado')), TIMEOUT_LIMIT)
      );

      const response = await Promise.race([responsePromise, timeoutPromise]);

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }

      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(error);
      return { error: 'No se pudo obtener datos del servidor' };
    }
  };

  const handleEnviarPregunta = async (prompt) => {
    try {
      console.log('Pregunta:', prompt);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a military medical AI providing guidance to a wounded soldier.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.2,
        }),
      });

      const data = await response.json();
      setRespuesta(data.choices[0]?.message?.content || 'No hay respuesta');

    } catch (error) {
      console.error('Error al enviar la pregunta:', error);
      setRespuesta('Error al enviar la pregunta');
    }
  };

  const manejarDatosFormulario = (datos) => {
    const data_usuario = fetchData(datos.identificador);
    apiKey = datos.apikey;

    data_usuario.then((data) => {
      console.log('Datos del formulario:', datos);
      console.log('Datos del usuario:', data);

      let prompt = `
      Eres un asistente de emergencias,
      Tu eres un asistente experto en emergencias,
      Ha pasado lo siguiente:
      ${datos.situacion}      

      qué se deberia hacer? Actua como un verdadero asistente de emergencias.
      ten en cuenta que en paralelo ya se está llamando a emergencias locales.
      
      Sé que eres un modelo de inteligencia artifial y seria preferible consultar con un experto, 
      pero en tu respuesta solamente dime que deberia hacer, sé claro y conciso. 
      Insisto, solo dame los puntos con lo que debo hacer sin introducción ni conclusión, Contestame en segunda persona, 
      dirigiendote a mi. Pon en negrita las palabras más importantes. Dame instrucciones precisas. 
      Devuelve tu respuesta en formato MD como una lista de las instruscciones numeradas por orden, indica los saltos de linea con '\n'.
      Gracias
      `;

      console.log('Datos del prompt:', prompt);
      handleEnviarPregunta(prompt);
      setRespuesta('Esperando respuesta...');
      setMostrarFormulario(false);
    });
  };

  return (
    <div className='min-h-screen flex flex-col items-center p-10 dark:bg-neutral-900'>
      <button className='text-xs dark:text-white' onClick={toggleTheme}> Cambiar color de tema</button>
      <h1 className='text-2xl dark:text-white'>EVA</h1>
      <div className="flex flex-col items-center">
        <img src="/soldier.png" className="w-1/3" alt="Usuario" />
      </div>
      {mostrarFormulario ? (
        <Formulario onEnviar={manejarDatosFormulario} />
      ) : (
        <div className='dark:text-white'>
          <br />
          <h1 className=''>EVA:</h1>
          <div className="max-w-md mx-auto mt-4 p-4 bg-white rounded shadow dark:bg-neutral-800">
            <ReactMarkdown>{respuesta}</ReactMarkdown>
          </div>
          <br />
          <a className='dark:text-white' href="#" onClick={() => { setMostrarFormulario(true); setRespuesta() }} style={{ textDecoration: 'underline' }}>
            ⇤ Otra consulta
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
