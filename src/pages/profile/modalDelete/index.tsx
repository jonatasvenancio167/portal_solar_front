import { Modal } from "../../../components/modal"
import api from "../../../services/api"

interface ModalDeleteProps {
  setOpenModalDelete: (value: boolean) => void
}

const ModalDelete = ({ setOpenModalDelete }: ModalDeleteProps) => {
  const getDelete = async () => {
    try {
      await api.delete('/clients')
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Modal setOpenModal={setOpenModalDelete} >
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-black dark:text-red-500" role="alert">
        <span className="font-bold">Tem certeza que deseja excluir sua conta?</span>
      </div>

      <div className="flex justify-between gap-2 mt-10">
        <button
          className="bg-black hover:bg-gray-950 text-white font-bold py-2 px-4 rounded w-52"
          onClick={getDelete}
        >
          Sim
        </button>
        <button
          className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-52"
          onClick={() => setOpenModalDelete(false)}
        >
          Não
        </button>
      </div>
    </Modal>
  )
}

export default ModalDelete