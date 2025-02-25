import { Link } from 'react-router-dom';
import NotFoundImg from '../assets/img/404.svg';

function ErrorPage() {
  return (
    <div className="text-center">
      <NotFoundImg
        alt="Page is not founded - error 404"
        className="img-fluid w-50 h-50"
      />
      <h1 className="h3">Страница не найдена</h1>
      <p>
        {'Давайте вернемся на '}
        <Link to="../">главную страницу</Link>
      </p>
    </div>
  );
}

export default ErrorPage;
