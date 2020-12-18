
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { RootStoreContext } from '../../data/mobx/rootStore'

const ModalContainer = () => {
  const { modalStore: { modal: { open, body }, openModal,  closeModal } } = useContext(RootStoreContext)

  return (
    <Modal
      onClose={() => closeModal()}
      onOpen={() => openModal(false)}
      open={open}
      size='mini'
    >
      <Modal.Content>{body}</Modal.Content>
    </Modal>
  )
}

export default observer(ModalContainer)