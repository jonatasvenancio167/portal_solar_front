import { useForm } from "react-hook-form"
import { useToast } from '../../hooks/useToast';
import api from "../../services/api";
import { useState } from "react";
import { formattedMoney } from "../../utils/formattedMoney";
import Profile from "../profile";

interface requestSimulation {
  account_value: number
}

interface dataProps {
  simulation: {
    id: number,
    account_value: string,
    client_id: number
    pdf: any
  },
  generators: Array<{
    name: string
    price: any
    image: string
    panels: number
    power: number
  }>
}


const Home = () => {
  const { notify } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<dataProps>()

  const handleSimulation = async ({ account_value }: requestSimulation) => {      
    try {
      setIsLoading(true)

      const { data } = await api.post('/simulations', {
        simulation: {
          account_value: Number(account_value)
        }
      })

      setData(data)
      
      notify({
        message: 'Simualação gerado com sucesso!',
        types: 'success'
      })
      setIsLoading(false)
    } catch (error) {
      notify({
        message: 'Falha na simulação!',
        types: 'error'
      })

      setIsLoading(false)
    }
  };
const handleExportPdf = async () => {
  try {
    setIsLoading(true);

    const pdfData = data?.simulation.pdf;
    const url = window.URL.createObjectURL(new Blob([pdfData]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'simulations.pdf');
    document.body.appendChild(link);
    link.click();

    notify({
      message: 'Exportado com sucesso',
      types: 'success'
    });

    setIsLoading(false);
  } catch (error) {
    notify({
      message: 'Falha na exportação',
      types: 'error'
    });
    setIsLoading(false);
  }
}

  const onSubmit = (data: any) => {
    handleSimulation(data)
  }

  const { handleSubmit, register } = useForm()

  return (
    <>
      <Profile />
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-black">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-xl font-medium text-yellow-600 ">Faça a sua simulação</h3>
            <div className="flex items-center space-x-4">
              <div className="flex-none w-full">
                <label className="text-sm font-medium text-yellow-600 block mb-2 ">Valor conta de luz (R$)</label>
                <input 
                  type="text" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 " 
                  placeholder="100.00" 
                  {...register('account_value')}
                />
              </div>
              </div>
          
              <button 
                type="submit"
                className="w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-gray-800">
                {isLoading ? 'Simulando...'  : 'Simular'}
              </button>
          </form>
          <button 
            type="submit"
            className="w-full mt-3 text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleExportPdf}
          >
            Exportar
          </button>
        </div>
      </aside>

      { data && data.generators.length > 0  && (
          <div className="px-6 mx-80 max-w-[1000px]">
            <table className="mt-10 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs uppercase bg-gray-50 dark:bg-yellow-900 dark:text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">Nome</th>
                  <th scope="col" className="px-6 py-3">Painel</th>
                  <th scope="col" className="px-6 py-3">Potência</th>
                  <th scope="col" className="px-6 py-3">Preço</th>
                </tr>
              </thead>
              <tbody>
                {data.generators.map((item: any) => (
                  <tr key={item.id} className="bg-white border-b dark:bg-black dark:border-yellow-800">
                    <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap dark:text-white">{item.name}</th>
                    <td className="px-6 py-4 dark:text-white">{item.panels}</td>
                    <td className="px-6 py-4 dark:text-white">{item.power}</td>
                    <td className="px-6 py-4 dark:text-white">{formattedMoney(item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
        
      }
    </>
  )
}

export { Home }