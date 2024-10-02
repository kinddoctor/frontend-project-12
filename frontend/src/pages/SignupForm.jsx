import * as Yup from 'yup';
//скачай yup в папку frontend

const LoginSchema = Yup.object().shape({
  login: Yup.string()
    .min(3, '')
    .max(70, 'Too Long!')
    .required('Required'),
  password:
});