import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { cleanProfanity } from '../utils/common';

export default function AppModal({
  showModal,
  optionsChannelId = '',
  handleClose,
  handleModalAction,
  channelsNames = [],
}) {
  const { t } = useTranslation();

  const SignupSchema = Yup.object().shape({
    channelName: Yup.string()
      .min(3, 'Слишком короткое название!')
      .max(20, 'Слишком длинное название!')
      .notOneOf(channelsNames, 'Такой канал уже существует!')
      .required('Введите название канала'),
  });

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t(`modal.${showModal}.title`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showModal === 'addChannelModal' || showModal === 'renameChannelModal' ? (
          <div>
            <Formik
              initialValues={{
                channelName: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                const data =
                  showModal === 'addChannelModal'
                    ? { name: cleanProfanity(values.channelName) }
                    : { name: cleanProfanity(values.channelName), id: optionsChannelId };
                handleModalAction(data);
                handleClose();
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field name="channelName" className="form-control" />
                  {errors.channelName && touched.channelName ? (
                    <div className="text-danger">{errors.channelName}</div>
                  ) : null}
                  <div className="d-flex justify-content-end gap-3 pt-4">
                    <button type="submit" className="btn btn-primary">
                      {t('modal.sendBtn')}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>
                      {t('modal.closeBtn')}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <div className="text-center fs-5">{t(`modal.${showModal}.warning`)}</div>
        )}
      </Modal.Body>

      {showModal === 'deleteChannelModal' ? (
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              handleModalAction(optionsChannelId);
              handleClose();
            }}
          >
            {t('modal.deleteBtn')}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            {t('modal.closeBtn')}
          </Button>
        </Modal.Footer>
      ) : null}
    </Modal>
  );
}
