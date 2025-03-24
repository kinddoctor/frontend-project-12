import { Link } from 'react-router-dom';
import UniversalForm from '../components/UniversalForm';
import book from '../assets/img/book.jpeg';

// import * as Yup from 'yup';
// скачай yup в папку frontend

// const LoginSchema = Yup.object().shape({
//   login: Yup.string()
//     .min(3, '')
//     .max(70, 'Too Long!')
//     .required('Required'),
//   password: '',
// });

export default function SignUp() {
  const signupFooter = (
    <p className="mb-1 fs-5">
      {'Уже есть аккаунт? '}
      <Link className="text-info" to="/">
        Авторизоваться
      </Link>
    </p>
  );

  return (
    <UniversalForm
      handleSubmit={() => console.log(1)}
      setAuthorizationErrorToNull={() => console.log(1)}
      authorizationError={null}
      needToConfirmPassword
      imgSrc={book}
      footer={signupFooter}
    />
  );
}
