import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { Card } from "../../components/card"
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from '../../hooks/useToast';

interface RequestLoginProps {
  email: string
  password: string
  passwordConfirmation: string
}

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { signIn } = useAuth();
  const { notify } = useToast()

  const handleLogin = async ({ email, password }: RequestLoginProps) => {      
    try {
      setIsLoading(true)
      await signIn({
        email,
        password
      });

      notify({
        message: 'Seja-bem vindo',
        types: 'success'
      })
      setIsLoading(false)
    } catch (error) {
      notify({
        message: 'Falha na autenticação',
        types: 'error'
      })

      setIsLoading(false)
    }
  };

  const { handleSubmit, register } = useForm()

  const onSubmit = (data: any) => {
    handleLogin(data)
  }

  return (
    <Card>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-xl font-medium dark:text-white">Faça login em nossa plataforma</h3>
        <div>
          <label className="text-sm font-medium block mb-2 dark:text-white">Seu email</label>
          <input 
            type="email" 
            className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg  block w-full p-2.5  dark:border-gray-500 " placeholder="name@company.com" 
            {...register('email')}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-900 block mb-2 dark:text-white">Sua senha</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-white dark:border-gray-500 " 
            {...register('password')}
          />
        </div>
    
        <button 
          type="submit"
          className="w-full text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
          {isLoading ? 'Logando...'  : 'Login com sua conta'}
        </button>
        <div className="text-sm font-medium dark:text-white justify-center items-center flex">
          Sem registro? <Link to='/register' className="text-blue-700 hover:underline dark:text-yellow-800">Criar conta</Link>
        </div>
      </form>
    </Card>
  );
}

export { Login };