import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { setData } from '../store/authSlice'
import selectors from '../store/selectors'
import {
  useGetChannelsQuery,
  useRenameChannelMutation,
  useDeleteChannelMutation,
  useAddChannelMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
} from '../store/api'
import ChannelChat from '../components/ChannelChat'
import AppModal from '../components/AppModal'

function ChatPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const authorized = useSelector(selectors.getAuthorizationToken)
  const token = localStorage.getItem('ChattyChat token')
  const currentUsername = localStorage.getItem('ChattyChat username')

  // if no token at all - redirect, if has token in localStorage - put it in authSlice
  if (!token && !currentUsername) {
    if (!authorized) {
      navigate('/login')
    }
  }
  else if (token && currentUsername) {
    dispatch(setData({ token, username: currentUsername }))
  }

  // a test query, to see if everything is fine
  const { data: channels, error: channelsRequestError, refetch: refetchChannels } = useGetChannelsQuery()

  useEffect(() => {
    if (authorized && channelsRequestError) {
      const checkThatTokenIsValid = async () => {
        const response = await refetchChannels()
        if (response.error?.status === 401) {
          navigate('/login')
        }
      }
      checkThatTokenIsValid()
    }
  }, [authorized, channelsRequestError])

  const { data: messages } = useGetMessagesQuery()
  const username = useSelector(selectors.getUsername)
  const [sendMessage] = useSendMessageMutation()
  const [addChannel] = useAddChannelMutation()
  const [renameChannel] = useRenameChannelMutation()
  const [deleteChannel] = useDeleteChannelMutation()

  const [activeChannelId, setActiveChannelId] = useState(null)
  const newAddedChannelName = useRef(null)
  const [showModal, setShowModal] = useState(null)
  const handleCloseModal = () => setShowModal(null)
  const [showChannelOptions, setShowChannelOptions] = useState(null)

  const getActiveChannel = () => channels?.filter(chan => chan.id === activeChannelId)[0]
  const getActiveChannelMessages = () => messages?.filter(
    ({ channelId }) => channelId === activeChannelId,
  )

  // set default channel for first render and when active channel was deleted
  // make newly added channel the active one
  useEffect(() => {
    if ((!activeChannelId || !getActiveChannel()) && channels) {
      const defaultActiveChannelId = channels.filter(chan => chan.name === 'general')[0].id
      setActiveChannelId(defaultActiveChannelId)
    }
    if (newAddedChannelName.current) {
      const newActiveChannelId = channels.filter(chan => chan.name === newAddedChannelName.current)[0].id
      setActiveChannelId(newActiveChannelId)
      newAddedChannelName.current = null
    }
  }, [channels])

  const chooseModalAction = modal => (data) => {
    switch (modal) {
      case 'addChannelModal':
        newAddedChannelName.current = data.name
        return addChannel(data)
          .unwrap()
          .then(() => toast(t('toast.success.addChannel'), { type: 'success' }))
          .catch(() => toast(t('toast.error.badNetwork'), { type: 'error' }))
      case 'renameChannelModal':
        return renameChannel(data)
          .unwrap()
          .then(() => toast(t('toast.success.renameChannel'), { type: 'success' }))
          .catch(() => toast(t('toast.error.badNetwork'), { type: 'error' }))
      case 'deleteChannelModal':
        return deleteChannel(data)
          .unwrap()
          .then(() => toast(t('toast.success.deleteChannel'), { type: 'success' }))
          .catch(() => toast(t('toast.error.badNetwork'), { type: 'error' }))
      default:
        throw new Error('There is no modal action for these case!')
    }
  }

  return (
    <div className="container h-100 my-5 border shadow overflow-hidden">
      <div className="row h-100 flex-row">
        <div className="col-3 col-xl-2 d-flex flex-column h-100 px-1 py-4 bg-primary-subtle border-end">
          <div className="d-flex justify-content-around w-100 text-center mb-4 fs-4 fw-medium">
            <span className="d-none d-sm-block">{t('chat.navbar.title')}</span>
            <button
              onClick={() => setShowModal('addChannelModal')}
              type="button"
              className="btn btn-dark"
            >
              +
            </button>
          </div>
          <ul className="nav d-block flex-column overflow-auto h-100">
            {channels?.map(channel => (
              <li className="nav-item" key={channel.id}>
                <div className="d-flex dropdown btn-group">
                  <button
                    onClick={() => {
                      setActiveChannelId(channel.id)
                      setShowChannelOptions(null)
                    }}
                    type="button"
                    className={`w-100 fs-6 fw-normal text-start text-break btn border-0 ${channel.id === activeChannelId ? 'btn-dark' : ''}`}
                  >
                    {`# ${channel.name}`}
                  </button>
                  {channel.removable
                    ? (
                        <>
                          <button
                            onClick={() => {
                              const areThisChannelOptionsShowing = showChannelOptions === channel.id
                              return areThisChannelOptionsShowing
                                ? setShowChannelOptions(null)
                                : setShowChannelOptions(channel.id)
                            }}
                            type="button"
                            className={`btn dropdown-toggle dropdown-toggle-split ${showChannelOptions === channel.id ? 'btn-outline-dark' : ''}`}
                          >
                            <span className="visually-hidden">Управление каналом</span>
                          </button>
                          <ul
                            className={`dropdown-menu ${showChannelOptions === channel.id ? 'show' : ''} `}
                            style={{
                              position: 'absolute',
                              inset: '40px 0px auto auto',
                            }}
                          >
                            <li>
                              <a
                                href="#"
                                onClick={() => setShowModal('deleteChannelModal')}
                                role="button"
                                className="dropdown-item"
                              >
                                {t('chat.navbar.dropdown.delete')}
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                onClick={() => setShowModal('renameChannelModal')}
                                role="button"
                                className="dropdown-item"
                              >
                                {t('chat.navbar.dropdown.rename')}
                              </a>
                            </li>
                          </ul>
                        </>
                      )
                    : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col p-0 h-100 col-9 col-xl-10">
          <ChannelChat
            currentUser={username}
            channelName={getActiveChannel()?.name}
            channelId={getActiveChannel()?.id}
            messages={getActiveChannelMessages()}
            sendMessage={sendMessage}
          />
        </div>
      </div>
      {showModal
        ? (
            <AppModal
              showModal={showModal}
              optionsChannelId={showChannelOptions}
              handleClose={() => {
                setShowChannelOptions(null)
                handleCloseModal()
              }}
              handleModalAction={chooseModalAction(showModal)}
              channelsNames={channels?.map(({ name }) => name)}
            />
          )
        : null}
    </div>
  )
}

export default ChatPage
