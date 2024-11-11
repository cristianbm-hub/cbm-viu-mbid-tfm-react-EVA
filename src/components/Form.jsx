import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const Formulario = ({ onEnviar }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      //identificador: "1234A"
    }
  });

  const onSubmit = (data) => {
    onEnviar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-4 p-4 bg-white rounded shadow dark:bg-neutral-800 dark:text-white">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 dark:text-white">
          Identificador del Accidentado:
        </label>
        <input {...register("identificador")} className="mt-1 p-2 border rounded w-full dark:bg-neutral-700"  />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 dark:text-white">
          Situación:
        </label>
        <textarea {...register("situacion")} required className="mt-1 p-2 border rounded w-full dark:bg-neutral-700" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 dark:text-white">
          API Key OpenAI:
        </label>
        <input {...register("apikey")} className="mt-1 p-2 border rounded w-full dark:bg-neutral-700" />
      </div>

      <button type="submit" className="bg-[#808ccf] text-white px-4 py-2 rounded hover:bg-[#6f7ab7]">
    Enviar
</button>

    </form>
  );
};

Formulario.propTypes = {
  onEnviar: PropTypes.func.isRequired,
};

export default Formulario;
