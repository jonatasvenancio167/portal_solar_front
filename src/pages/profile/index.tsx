import { useEffect, useState } from "react";
import { Navbar } from "../../components/navbar"
import { ModalInfo } from "./modalShow";
import ModalDelete from "./modalDelete";
import { ModalEdit } from "./modalEdit";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

const Profile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [userName, setUserName] = useState('');

  const { signOut } = useAuth()
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const getInfo = async () => {
      try {
        const { data } = await api.get('/client/show')
        setUserName(data.name)
      } catch (error) {
        console.log(error)
      }
    }

    getInfo()
  }, [])

  return (
    <>
      <Navbar>
        <div className="relative">
          <button 
            id="dropdownNavbarLink" 
            onClick={toggleDropdown} 
            className="flex items-center justify-between w-full py-2 px-3 md:hover:bg-transparent md:border-0  md:p-0 md:w-auto md:dark:hover:text-yellow-700 dark:focus:text-yellow-600 dark:hover:bg-yellow-700 md:dark:hover:bg-transparent"
          >
            {userName} 
            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-black dark:divide-gray-600">
              <ul className="py-2 text-sm dark:text-white" aria-labelledby="dropdownNavbarLink">
                <li>
                  <button 
                    className="block px-4 py-2  dark:hover:text-yellow-600"
                    onClick={() => {
                      setOpenModalInfo(true) 
                    }}
                  >
                    Visualizar Conta
                  </button>
                </li>
                <li>
                  <button 
                    className="block px-4 py-2  dark:hover:text-yellow-600"
                    onClick={() => {
                      setOpenModalEdit(true)
                    }}
                  >
                    Editar Conta
                  </button>
                </li>
                <li>
                  <button 
                    className="block px-4 py-2  dark:hover:text-yellow-600"
                    onClick={() => {
                      setOpenModalDelete(true) 
                    }}
                  >
                    Deletar Conta
                  </button>
                </li>
                <li>
                  <button
                    className="block px-4 py-2  dark:hover:text-yellow-600"
                    onClick={signOut}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </Navbar>
      {openModalInfo && <ModalInfo setOpenModalInfo={setOpenModalInfo} />}
      {openModalDelete && <ModalDelete setOpenModalDelete={setOpenModalDelete} />}
      {openModalEdit && <ModalEdit setOpenModalEdit={setOpenModalEdit} />}
    </>
  )
}

export default Profile