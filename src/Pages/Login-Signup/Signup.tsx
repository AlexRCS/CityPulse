import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form'
import 'react-phone-number-input/style.css'
import { useUserDataContext } from '../../Services/user/user-obj'

import FormBody from '../Layout/form-body/form-body'
import SubmitBtn from '../../Components/buttons/submit-button/submit-btn'

import './Login-Signup.css'

const schema = z.object({
    name: z.string().min(3, { message: '*Campo obrigatório' }),
    lastname: z.string().min(3, { message: '*Campo obrigatório' }),
    email: z.string().email({ message: '*Campo obrigatório' }),
    phone: z.string().min(3, { message: '*Campo obrigatório' }),
    password: z.string().min(8, { message: '*Campo obrigatório' }),
    confirmPassword: z.string().min(8, { message: '*Campo obrigatório' }),
    gender: z.enum(["men", "woman", "other"], { message: '*Campo obrigatório' }),
    termsConfirm: z
        .boolean({ required_error: '*Campo obrigatório' })
        .refine((val) => val === true, { message: '*Campo obrigatório' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
})

type FormField = z.infer<typeof schema>

function Signup() {
    const { updateUserData } = useUserDataContext()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState<string>('')

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormField>({
        resolver: zodResolver(schema),
        defaultValues: {
            termsConfirm: false,
        },
        mode: 'onChange',
    })

    const onSubmit: SubmitHandler<FormField> = async (data) => {
        const { confirmPassword, termsConfirm, ...rest } = data
        const payload = { ...rest }

        const apiUrl = process.env.REACT_APP_API_URL || 'https://citypulse-server.onrender.com'

        try {
            const response = await fetch(`${apiUrl}/Signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
            const result = await response.json()
            if (response.ok) {
                console.log('Usuário registrado:', result.user)
                updateUserData(result.user)
                navigate('/Login')
            } else {
                console.error('Erro ao registrar:', result.error)
                setErrorMessage(result.error)
            }
        } catch (error) {
            console.error('Erro de conexão:', error)
            setErrorMessage('Erro de conexão. Tente novamente mais tarde.')
        }
    }

    return (
        <FormBody>
            <section className='access-form' data-form-content-child='1'>
                <div className='access-container'>
                    <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                        <h2>Faça seu Cadastro!</h2>
                        {errorMessage && <div className='login-errors-msg'>{errorMessage}</div>}

                        <div className='name-input'>
                            <div className='name-content'>
                                <input className='form-input' {...register('name')} type="text" placeholder='Nome' />
                                {errors.name && (<div className='login-errors-msg'>{errors.name.message}</div>)}
                            </div>
                            <div className='name-content'>
                                <input className='form-input' {...register('lastname')} type="text" placeholder='Último nome' />
                                {errors.lastname && (<div className='login-errors-msg'>{errors.lastname.message}</div>)}
                            </div>
                        </div>

                        <input className='form-input' {...register('email')} type="email" placeholder='example@email.com' />
                        {errors.email && (<div className='login-errors-msg'>{errors.email.message}</div>)}

                        <PhoneInputWithCountry
                            international
                            type="phone"
                            name='phone'
                            className="form-input"
                            control={control}
                            rules={{ required: true }}
                            defaultCountry="PT"
                        />
                        {errors.phone && (<div className='login-errors-msg'>{errors.phone.message}</div>)}

                        <input className='form-input' {...register('password')} type="password" placeholder='Senha' />
                        {errors.password && (<div className='login-errors-msg'>{errors.password.message}</div>)}

                        <input className='form-input' {...register('confirmPassword')} type="password" placeholder='Confirmar senha' />
                        {errors.confirmPassword && (<div className='login-errors-msg'>{errors.confirmPassword.message}</div>)}

                        <div className='gender-checkbox'>
                            <h3>Gênero</h3>
                            <label htmlFor="men"> Homem</label>
                            <input type="radio" {...register('gender')} value="men" id="men" />

                            <label htmlFor="woman"> Mulher</label>
                            <input type="radio" {...register('gender')} value="woman" id="woman" />

                            <label htmlFor="other"> Outro</label>
                            <input type="radio" {...register('gender')} value="other" id="other" />
                            {errors.gender && (<div className='login-errors-msg'>{errors.gender.message}</div>)}
                        </div>

                        <div className='terms-area'>
                            <Controller
                                control={control}
                                name="termsConfirm"
                                render={({ field }) => (
                                    <>
                                        <button type="button" className='terms-btn'>
                                            Concorda com nossos termos
                                        </button>
                                        <input type="checkbox" id="termsConfirm" checked={field.value} onChange={field.onChange} />
                                    </>
                                )}
                            />
                            {errors.termsConfirm && (<div className='login-errors-msg'>{errors.termsConfirm.message}</div>)}
                        </div>
                        <SubmitBtn isSubmitting={isSubmitting} errors={errors} />
                    </form>
                    <div className='extra-login-options'>
                        <button className='forgt-password-btn'>Esqueceu sua senha?</button>
                        <button
                            onClick={() => navigate('/Login')}
                            className='login-link'
                        >
                            Já possui conta? Faça Login
                        </button>
                    </div>
                </div>
            </section>
        </FormBody>
    )
}

export default Signup
