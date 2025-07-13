import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, useField, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { cleanProfanity } from '../utils/common';

function CustomInput(props) {
  const { setFieldTouched } = useFormikContext();
  const [field] = useField(props);
  const inputRef = useRef(null);

  useEffect(() => {
    const setUntouched = async () => setFieldTouched(props.name, false, false);
    inputRef.current?.focus();

    try {
      setUntouched();
    } catch (e) {
      console.log(e);
    }
  }, []);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <input ref={inputRef} {...props} {...field} />;
}

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
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelsNames, 'Должно быть уникальным')
      .required('Обязательное поле'),
  });

  return (
    <Modal show={showModal} onHide={handleClose} centered>
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
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <CustomInput id="channelName" name="channelName" className="form-control" />
                  {showModal === 'addChannelModal' ? (
                    <label className="visually-hidden" htmlFor="channelName">
                      Имя канала
                    </label>
                  ) : (
                    ''
                  )}
                  {errors.channelName && touched.channelName ? (
                    <div className="text-danger">{errors.channelName}</div>
                  ) : null}
                  <div className="d-flex justify-content-end gap-3 pt-4">
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
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
            onClick={(e) => {
              e.target.setAttribute('disabled', '');
              handleModalAction(optionsChannelId);
              e.target.removeAttribute('disabled', '');
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
