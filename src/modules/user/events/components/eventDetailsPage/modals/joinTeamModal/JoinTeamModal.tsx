import {FC, useState} from 'react';
import {
    CharacterCount,
    CloseButton, FormGroup, Label, ModalBody, ModalButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, ModalText, ModalTitle, TextArea
} from "@/modules/user/events/components/eventDetailsPage/modals/joinTeamModal/styles.ts";

interface JoinTeamModalProps {
    isOpen: boolean;
    teamName: string;
    onClose: () => void;
    onJoin: (message: string) => void;
}

export const JoinTeamModal: FC<JoinTeamModalProps> = ({
   isOpen,
   teamName,
   onClose,
   onJoin
   }) => {
    const [message, setMessage] = useState('');
    const maxMessageLength = 500;

    const handleSubmit = () => {
        if (message.trim()) {
            onJoin(message.trim());
            setMessage('');
        }
    };

    const handleClose = () => {
        setMessage('');
        onClose();
    };

    return (
        <ModalOverlay isOpen={isOpen}>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>Вступление в команду</ModalTitle>
                    <CloseButton onClick={handleClose}>&times;</CloseButton>
                </ModalHeader>

                <ModalBody>
                    <ModalText>
                        Вы хотите вступить в команду <strong>"{teamName}"</strong>.
                        Напишите, почему вы хотите присоединиться к этой команде:
                    </ModalText>

                    <FormGroup>
                        <Label>Ваше сообщение команде *</Label>
                        <TextArea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Расскажите о себе, своем опыте и почему вы хотите вступить в команду..."
                            maxLength={maxMessageLength}
                        />
                        <CharacterCount>
                            {message.length}/{maxMessageLength}
                        </CharacterCount>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <ModalButton variant="secondary" onClick={handleClose}>
                        Отмена
                    </ModalButton>
                    <ModalButton
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={!message.trim()}
                    >
                        Отправить заявку
                    </ModalButton>
                </ModalFooter>
            </ModalContent>
        </ModalOverlay>
    );
};
