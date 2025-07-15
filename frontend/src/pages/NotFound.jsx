import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import NotFoundImg from '../assets/img/404.svg'

function ErrorPage() {
  const { t } = useTranslation()

  return (
    <div className="text-center">
      <NotFoundImg alt="Page is not founded - error 404" className="img-fluid w-50 h-50" />
      <h1 className="h3">{t('notFound.title')}</h1>
      <p>
        {t('notFound.text')}
        <Link to="../">{t('notFound.link')}</Link>
      </p>
    </div>
  )
}

export default ErrorPage
