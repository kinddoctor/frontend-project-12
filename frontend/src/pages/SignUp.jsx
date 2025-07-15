import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { signupRequest, setError } from '../store/authSlice'
import selectors from '../store/selectors'
import book from '../assets/img/book.jpeg'

const schema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Введите имя'),
  password: Yup.string().min(6, 'Не менее 6 символов').required('Введите пароль'),
  re_password: Yup.string()
    .required('Подтвердите пароль')
    .test(
      'repeat password',
      'Пароли должны совпадать',
      (value, context) => value === context.parent.password,
    ),
})

export default function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const authorizationError = useSelector(selectors.getAuthorizationError)
  const clearAuthorizationError = () => dispatch(setError(''))

  const handleSubmit = async (values) => {
    await dispatch(signupRequest(values))
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
      case 'Request failed with status code 409':
        return (
          <div className="alert alert-danger text-center p-2" role="alert">
            {t('errors.signupError')}
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
                <img src={book} alt="" className="img-fluid rounded w-auto" />
              </div>
              <div className="col-12 col-md-6 mt-3 mt-md-0 d-flex flex-column align-items-center justify-content-center">
                <h1 className="mb-4">{t('signUp.title')}</h1>
                <Formik
                  initialValues={{ username: '', password: '', re_password: '' }}
                  validationSchema={schema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form
                      onChange={() => clearAuthorizationError()}
                      className="d-flex flex-column align-items-center justify-content-center gap-2 w-100"
                    >
                      <Field
                        type="text"
                        name="username"
                        id="username"
                        className="form-control d-block"
                        placeholder={t('signUp.form.placeholders.username')}
                      />
                      <label className="visually-hidden" htmlFor="username">
                        {t('signUp.form.placeholders.username')}
                      </label>
                      {errors.username && touched.username
                        ? (
                            <div className="text-danger mt-n3">{errors.username}</div>
                          )
                        : null}
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder={t('signUp.form.placeholders.password')}
                      />
                      <label className="visually-hidden" htmlFor="password">
                        {t('signUp.form.placeholders.password')}
                      </label>
                      {errors.password && touched.password
                        ? (
                            <div className="text-danger">{errors.password}</div>
                          )
                        : null}
                      <Field
                        type="password"
                        name="re_password"
                        id="re_password"
                        className="form-control"
                        placeholder={t('signUp.form.placeholders.re_password')}
                      />
                      <label className="visually-hidden" htmlFor="re_password">
                        {t('signUp.form.placeholders.re_password')}
                      </label>
                      {errors.re_password && touched.re_password
                        ? (
                            <div className="text-danger">{errors.re_password}</div>
                          )
                        : null}
                      {giveFeedBackIfError()}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-100 mt-3 fs-4 btn btn-dark"
                      >
                        {t('signUp.form.submitBtn')}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="p-3 text-center bg-primary-subtle border">
              <p className="mb-1 fs-5">
                {t('signUp.footer.text')}
                <a
                  href="/login"
                  onClick={() => {
                    clearAuthorizationError()
                    navigate('/login')
                  }}
                  className="text-info"
                >
                  {t('signUp.footer.link')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
