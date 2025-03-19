import './submit-btn.css'

interface SubmitBtnProps {
    isSubmitting: boolean;
    errors: any;
}

function SubmitBtn({ isSubmitting, errors }: SubmitBtnProps) {
    return (
        <>
            <button className='form-button' disabled={isSubmitting} type='submit'>{isSubmitting ? 'Carregando...' : 'Entrar'}</button>
            {errors.root && (<div className='login-errors-msg'><span>{errors.root.message}</span></div>)}
        </>
    )
}

export default SubmitBtn
