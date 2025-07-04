import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import sendSignupRequest from '../api/signup.service';
import book from '../assets/img/book.jpeg';

const schema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Слишком короткое имя!')
    .max(20, 'Слишком длинное имя!')
    .required('Введите имя'),
  password: Yup.string().min(6, 'Слишком короткий пароль!').required('Введите пароль'),
  re_password: Yup.string()
    .required('Подтвердите пароль')
    .test(
      'repeat password',
      'Не соответствует паролю!',
      (value, context) => value === context.parent.password,
    ),
});

export default function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState(null);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-content-end h-100">
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
                  onSubmit={async ({ username, password }, { resetForm }) => {
                    try {
                      await sendSignupRequest({ username, password });
                      resetForm();
                      navigate('/');
                    } catch (e) {
                      // eslint-disable-next-line no-unused-expressions
                      e.response.status === 409
                        ? setSignupError(e)
                        : toast(t('toast.error.badNetwork'), { type: 'error' });
                    }
                  }}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form
                      onChange={() => setSignupError(null)}
                      className="d-flex flex-column align-items-center justify-content-center gap-2 w-100"
                    >
                      <Field
                        type="text"
                        name="username"
                        className="form-control d-block"
                        placeholder={t('signUp.form.placeholders.username')}
                      />
                      {errors.username && touched.username ? (
                        <div className="text-danger mt-n3">{errors.username}</div>
                      ) : null}
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder={t('signUp.form.placeholders.password')}
                      />
                      {errors.password && touched.password ? (
                        <div className="text-danger">{errors.password}</div>
                      ) : null}
                      <Field
                        type="password"
                        name="re_password"
                        className="form-control"
                        placeholder={t('signUp.form.placeholders.re_password')}
                      />
                      {errors.re_password && touched.re_password ? (
                        <div className="text-danger">{errors.re_password}</div>
                      ) : null}
                      {signupError ? (
                        <div className="alert alert-danger text-center p-2" role="alert">
                          {t('errors.signupError')}
                        </div>
                      ) : null}
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
                <Link className="text-info" to="/login">
                  {t('signUp.footer.link')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
