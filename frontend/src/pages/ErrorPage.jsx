import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="text-center">
      <img src="./assets/img/404.svg" alt="Page is not founded - error 404" className="img-fluid w-50 h-50" />
      <h1 className="h3">Страница не найдена</h1>
      <p>
        {'Давайте вернемся на '}
        <Link to="../login">главную страницу</Link>
      </p>
    </div>
  );
}

export default ErrorPage;
