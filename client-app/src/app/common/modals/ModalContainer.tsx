import React, {useContext} from "react";
import { Modal, Button, Header, Icon } from "semantic-ui-react";
import { RootStoreContext } from '../../stores/rootStore';
import ModalStore from '../../stores/modalStore';
import { observer } from "mobx-react-lite";

const ModalContainer = () => {

    const rootStore = useContext(RootStoreContext);
    const {modal: {open, body}, closeModal} = rootStore.modalStore;

    return (
        <Modal onClose={ closeModal } open={ open } size='mini'>
            <Modal.Content>
                {body}
            </Modal.Content>            
        </Modal>
    );
};

export default observer(ModalContainer);
