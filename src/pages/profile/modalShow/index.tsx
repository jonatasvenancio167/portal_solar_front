import { useEffect, useState } from "react"
import { Modal } from "../../../components/modal"
import api from "../../../services/api"

interface ModalInfoProps {
  setOpenModalInfo: (value: boolean) => void
}

interface getInfoProps {
  name: string
  email: string
  id: number
}

const ModalInfo = ({ setOpenModalInfo }: ModalInfoProps) => {
  const [getInfoUser, setGetInfoUser] = useState<getInfoProps>();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const { data } = await api.get('/client/show')
        setGetInfoUser(data)
      } catch (error) {
        console.log(error)
      }
    }
    getInfo()
  }, [])

  return(
    <Modal setOpenModal={setOpenModalInfo} >
      <label className="text-black">ID</label>
      <input
        type="text"
        value={getInfoUser?.id || ''}
        disabled
        className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md dark:bg-white dark:text-black dark:border-black"
      />
      <label className="text-black">Nome</label>
      <input
        type="text"
        value={getInfoUser?.name || ''}
        disabled
        className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-black"
      />
      <label className="text-black">Email</label>
      <input
        type="text"
        value={getInfoUser?.email || ''}
        disabled
        className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-black"
      />
  </Modal>
  )
}

export { ModalInfo }