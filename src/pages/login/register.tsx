import { useForm } from "react-hook-form"
import { Card } from "../../components/card"
import { useState } from "react";
import api from "../../services/api";
import { useToast } from '../../hooks/useToast';
import { zodResolver } from '@hookform/resolvers/zod'
import { BeatLoader } from "react-spinners";
import { RegisterSchema } from "../../validations/register";
import { z } from "zod";

export interface HandleRegisterProps {
  email: string
  password: string
  confirmPassword: string
}

type RegisterData = z.infer<typeof RegisterSchema>

const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { notify } = useToast()

  const methods = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema)
  })

  const handleRegister = async ({ email, password, confirmPassword }: HandleRegisterProps) => {
    try {
      setIsLoading(true)

      await api.post('clients', {
        client: {
          email,
          password,
          password_confirmation: confirmPassword
        }
      });

      setIsLoading(false)

      notify({
        message: 'Registro criado com sucesso!',
        types: 'success'
      })
    } catch (error) {

      notify({
        message: 'Falha ao se registrar!',
        types: 'error'
      })
      
      setIsLoading(false)
    }
  };


  const { handleSubmit, register, formState: { errors } } = methods

  const onSubmit = (data: any) => {
    handleRegister(data)
  }
  
  return (
    <Card>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-xl font-medium text-white">Faça login em nossa plataforma</h3>
          <div>
            <label className="text-sm font-medium text-white block mb-2 ">Seu email</label>
            <input 
              type="email" 
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:white"
               placeholder="name@company.com" 
              {...register('email', { required: errors.email?.message })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-white block mb-2">Sua senha</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-white" 
              {...register('password', { required: errors.password?.message })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-white block mb-2">Confirmar senha</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-white" 
              {...register('confirmPassword', { required: errors.confirmPassword?.message })}
            />
          </div>
          <button 
            type="submit"
            className="w-full text-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-blue-800">
            {isLoading ? 'Registrando...'  : 'Criar registro'}
          </button>
        </form>
    </Card>
  )
}

export { Register }