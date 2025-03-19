import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'

import SubmitBtn from '../../Components/buttons/submit-button/submit-btn'
import FormBody from '../Layout/form-body/form-body'

import './Login-Signup.css'

const schema = z.object({
    email: z.string().email({ message: '*e-mail deve ser preenchido' }),
    password: z.string().min(8, { message: '*senha incorreta' }),
});

type FormField = z.infer<typeof schema>


function Login() {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormField>({
        resolver: zodResolver(schema)
    })


    const handleNavigate = () => {
        navigate('/Signup')
    }

    const onSubmit: SubmitHandler<FormField> = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
        } catch (error) {
            setError('root', {
                message: 'este e-mail já está sendo usado'
            })
        }
    }

    return (
        <>
            <FormBody>
                <section className='access-form' data-form-content-child='1'>
                    <div className='access-container'>
                        <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                            <h2>Faça Login para acessar sua conta</h2>
                            <input className='form-input' {...register('email')} type="email" placeholder='email' />
                            {errors.email && (<div className='login-errors-msg'>{errors.email.message}</div>)}

                            <input className='form-input' {...register('password')} type="password" placeholder='senha' />
                            {errors.password && (<div className='login-errors-msg'>{errors.password.message}</div>)}

                            <SubmitBtn isSubmitting={isSubmitting} errors={errors} />
                        </form>
                        <div className='extra-login-options'>
                            <button className='forgt-password-btn'>esqueceu sua senha?</button>
                            <button onClick={handleNavigate} className='signup-link'>Faça seu Cadastro</button>
                        </div>
                    </div>
                </section>
            </FormBody>
        </>
    )
}

export default Login
