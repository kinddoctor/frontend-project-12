import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const modalData = {
  addChannelModal: { title: 'Добавить канал' },
  renameChannelModal: { title: 'Переименовать канал' },
  deleteChannelModal: { title: 'Удалить канал' },
};

export default function AppModal({
  showModal,
  optionsChannelId = '',
  handleClose,
  handleModalAction,
  channelsNames = [],
}) {
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
        <Modal.Title>{modalData[showModal]?.title}</Modal.Title>
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
                    ? { name: values.channelName }
                    : { name: values.channelName, id: optionsChannelId };
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
                      Отправить
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>
                      Закрыть
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <div className="text-center fs-5">Вы уверены?</div>
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
            Удалить
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
        </Modal.Footer>
      ) : null}
    </Modal>
  );
}
