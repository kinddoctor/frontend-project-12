import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { cleanProfanity } from '../utils/common'

export default function ChannelChat({
  currentUser,
  channelName = 'Загружаем...',
  channelId,
  messages = [],
  sendMessage,
}) {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus()
    }
  }, [channelName])

  return (
    <div className="d-flex flex-column h-100">
      <div className="p-3 shadow-sm bg-primary-subtle">
        <p className="fw-medium mb-0">{channelName}</p>
        <span>{`${messages.length} сообщений`}</span>
      </div>
      <div className="p-4 overflow-auto">
        {messages.map(({ body, username, id }) => (
          <div key={id} className="text-break">
            <span className="fw-medium">{`${username}: `}</span>
            {body}
          </div>
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setIsSubmitting(true)
            const newMessage = {
              body: cleanProfanity(inputRef.current.value),
              channelId,
              username: currentUser,
            }
            sendMessage(newMessage)
              .unwrap()
              .catch(() => toast(t('toast.error.badNetwork'), { type: 'error' }))
            inputRef.current.value = ''
            setIsSubmitting(false)
          }}
          className="input-group"
        >
          <input
            ref={inputRef}
            className="form-control"
            placeholder={t('channelChat.placeholders.input')}
            aria-label="Новое сообщение"
          />
          <button type="submit" disabled={isSubmitting} className="btn btn-outline-secondary">
            {t('channelChat.submitBtn')}
          </button>
        </form>
      </div>
    </div>
  )
}
