TFM de Cristian Bañuls Mahiques
Título: Desarrollo de un Chatbot con Inteligencia Artificial para la Atención Inmediata de Emergencias y Accidentes: Una Solución Tecnológica para Mejorar la Respuesta ante Situaciones Críticas


# EVA (Emergency Virtual Assistant)

Repositorio de EVA, un asistente de emergencias impulsado por inteligencia artificial diseñado para situaciones críticas. Esta aplicación utiliza tecnologías modernas para proporcionar información y orientación rápida ante emergencias.

1. **Clonar el Repositorio:**
   ```bash
   git clone https://github.com/cristianbm-hub/cbm-viu-mbid-tfm-react-EVA
    ```

2. **Instalar dependecias**
    ```bash
    npm install
    ```

3. **Iniciar aplicación**
    ```bash
    npm run dev
    ```

4. Acceder a la Aplicación:
Abra su navegador web y vaya a http://localhost:5173.


## Cómo usar

Rellenar los campos del formulario de la interfaz principal:

* Identificador del solicitante: Este campo no es obligatorio, pero en caso de querer utilizarlo para cruzar datos de la situación actual con datos del hostorial médico de los usuarios, se debe intalar el servicio Django de EVA -> https://github.com/cristianbm-hub/cbm-viu-mbid-tfm-django-EVA

* Campos sobre la situación actual: Rellenar información sobre la situación actual,

* Api Key: Incluir una API Key de OpenAI válida para poder enviar la consulta. En ningún caso tu API Key es almacenada por la plataforma ni nada parecido.