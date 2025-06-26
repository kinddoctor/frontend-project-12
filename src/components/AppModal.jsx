import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export default function AppModal({ show, handleClose, handleModalAction, channelsNames = [] }) {
  const SignupSchema = Yup.object().shape({
    channelName: Yup.string()
      .min(3, 'Слишком короткое название!')
      .max(20, 'Слишком длинное название!')
      .notOneOf(channelsNames, 'Такой канал уже существует!')
      .required('Введите название канала'),
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {show === 'addChannelModal' ? (
          <div>
            <Formik
              initialValues={{
                channelName: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                handleModalAction({ name: values.channelName });
                handleClose();
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field name="channelName" className="form-control" />
                  {errors.channelName && touched.channelName ? (
                    <div>{errors.channelName}</div>
                  ) : null}
                  <div className="d-flex justify-content-end gap-3 pt-4">
                    <button type="submit" className="btn btn-primary">
                      Добавить канал
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>
                      Закрыть
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        ) : null}
      </Modal.Body>

      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}
