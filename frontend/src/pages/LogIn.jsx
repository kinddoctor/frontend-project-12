import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Formik, Form, Field } from 'formik'
import { loginRequest, setError } from '../store/authSlice'
import selectors from '../store/selectors'
import discussionImg from '../assets/img/discussionImg.png'

function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const authorizationError = useSelector(selectors.getAuthorizationError)
  const clearAuthorizationError = () => dispatch(setError(''))

  const handleSubmit = async (values) => {
    await dispatch(loginRequest(values))
      .unwrap()
      .then(() => {
        clearAuthorizationError()
        navigate('/')
      })
  }

  const giveFeedBackIfError = () => {
    if (!authorizationError) {
      return null
    }
    switch (authorizationError.message) {
      case 'Request failed with status code 401':
        return (
          <div className="alert alert-danger text-center p-2" role="alert">
            {t('errors.authorizationError')}
          </div>
        )
      default:
        return toast(t('toast.error.badNetwork'), { type: 'error' })
    }
  }

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-10 col-xl-6">
          <div className="shadow">
            <div className="row p-4">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={discussionImg} alt="" className="img-fluid rounded w-auto" />
              </div>
              <div className="col-12 col-md-6 mt-3 mt-md-0 d-flex flex-column align-items-center justify-content-center">
                <h1 className="mb-4">{t('logIn.title')}</h1>
                <Formik initialValues={{ username: '', password: '' }} onSubmit={handleSubmit}>
                  {({ isSubmitting }) => (
                    <Form
                      onChange={clearAuthorizationError}
                      className="d-flex flex-column align-items-center justify-content-center w-100"
                    >
                      <Field
                        required
                        type="text"
                        name="username"
                        id="username"
                        className="form-control d-block mb-3"
                        placeholder={t('logIn.form.placeholders.username')}
                      />
                      <label className="visually-hidden" htmlFor="username">
                        {t('logIn.form.placeholders.username')}
                      </label>
                      <Field
                        required
                        type="password"
                        name="password"
                        id="password"
                        className="form-control mb-3"
                        placeholder={t('logIn.form.placeholders.password')}
                      />
                      <label className="visually-hidden" htmlFor="password">
                        {t('logIn.form.placeholders.password')}
                      </label>
                      {giveFeedBackIfError()}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-100 mt-1 fs-4 btn btn-dark"
                      >
                        {t('logIn.form.submitBtn')}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="p-3 text-center bg-primary-subtle border">
              <p className="mb-1 fs-5">
                {t('logIn.footer.text')}
                <a
                  onClick={() => {
                    clearAuthorizationError()
                    navigate('/signup')
                  }}
                  className="text-info"
                  href="/signup"
                >
                  {t('logIn.footer.link')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
