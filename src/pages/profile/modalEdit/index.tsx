import { useEffect, useState } from "react";
import { Modal } from "../../../components/modal";
import api from "../../../services/api";
import { useToast } from "../../../hooks/useToast";

interface ModalEditProps {
  setOpenModalEdit: (value: boolean) => void;
}

interface getInfoProps {
  name: string;
  email: string;
  id: number;
}

const ModalEdit = ({ setOpenModalEdit }: ModalEditProps) => {
  const [getInfoUser, setGetInfoUser] = useState<getInfoProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { notify } = useToast();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const { data } = await api.get('/client/show');
        setGetInfoUser(data);
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.log(error);
      }
    };
    getInfo();
  }, []);

  const handleUpdate = async () => {
    if (!getInfoUser) return;

    try {
      setIsLoading(true);

      await api.put(`/client/update`, {
        client: {
          name,
          email,
          password
        }
      });

      setIsLoading(false);

      notify({
        message: 'Informações atualizadas com sucesso!',
        types: 'success'
      });
      setOpenModalEdit(false);
    } catch (error) {
      notify({
        message: 'Falha ao atualizar informações!',
        types: 'error'
      });
      setIsLoading(false);
    }
  };

  return (
    <Modal setOpenModal={setOpenModalEdit}>
      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
        <div>
          <label 
            className="text-sm font-medium  block mb-2 dark:text-black" 
            htmlFor="name"
          >
            Nome
          </label>
          <input 
            type="text" 
            id="name" 
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-white dark:border-black dark:text-black"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            defaultValue={name} 
          />
        </div>
        <div>
          <label
            className="text-sm font-medium text-gray-900 block mb-2 dark:text-black"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email" 
            id="email" 
            className="bg-gray-50 border  sm:text-sm rounded-lg  block w-full p-2.5  dark:bg-white dark:border-black dark:text-black"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            defaultValue={email} 
          />
        </div>
        <div>
          <label
            className="text-sm font-medium text-gray-900 block mb-2 dark:text-black"
            htmlFor="email"
          >
            Senha
          </label>
          <input
            type="password" 
            id="senha" 
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-white dark:border-black dark:text-black"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            defaultValue={password} 
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-gray-950 dark:focus:ring-blue-800"
        >
          {isLoading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </Modal>
  );
};

export { ModalEdit };
