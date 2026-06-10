import styled from "@emotion/styled";

export const ContentBlock = styled.div`
    background: rgba(0, 180, 216, 0.05);
    border: 1px solid rgba(0, 180, 216, 0.2);
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 20px;
    position: relative;
`;

export const HeadingBlock = styled.h3`
    color: #00e6ff;
    font-family: 'Orbitron', sans-serif;
    font-size: 1.5rem;
    margin: 0 0 15px 0;
    font-weight: 600;
`;

export const TextBlock = styled.p`
    color: #e0e0e0;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 0;
    white-space: pre-wrap;
`;

export const ImageBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const BlockActions = styled.div`
    position: absolute;
    top: 15px;
    right: 15px;
    display: flex;
    gap: 10px;
`;

export const EditButton = styled.button`
    background: rgba(255, 152, 0, 0.1);
    color: #ff9800;
    border: 1px solid rgba(255, 152, 0, 0.3);
    border-radius: 6px;
    padding: 6px 12px;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    font-size: 0.9rem;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255, 152, 0, 0.2);
    }
`;

export const DeleteButton = styled.button`
    background: rgba(244, 67, 54, 0.1);
    color: #f44336;
    border: 1px solid rgba(244, 67, 54, 0.3);
    border-radius: 6px;
    padding: 6px 12px;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    font-size: 0.9rem;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(244, 67, 54, 0.2);
    }
`;

export const EditModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(19, 47, 76, 0.95);
    border: 2px solid rgba(0, 180, 216, 0.4);
    border-radius: 16px;
    padding: 30px;
    z-index: 1000;
    min-width: 500px;
    backdrop-filter: blur(10px);
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 999;
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(0, 180, 216, 0.3);
`;

export const ModalTitle = styled.h3`
    color: #00e6ff;
    font-family: 'Orbitron', sans-serif;
    margin: 0;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    color: #00e6ff;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
`;

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const ModalTextArea = styled.textarea`
    padding: 14px 16px;
    background: rgba(0, 180, 216, 0.1);
    border: 1px solid rgba(0, 180, 216, 0.4);
    border-radius: 10px;
    color: #e0e0e0;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1rem;
    min-height: 120px;
    resize: vertical;

    &:focus {
        outline: none;
        border-color: #00b4d8;
    }
`;

export const ModalActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 20px;
`;

export const SaveModalButton = styled.button`
    padding: 12px 24px;
    background: linear-gradient(135deg, #0066cc, #00b4d8);
    color: #ffffff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
`;

export const CancelModalButton = styled.button`
    padding: 12px 24px;
    background: rgba(0, 180, 216, 0.15);
    color: #00e6ff;
    border: 1px solid #00b4d8;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
`;

export const EditMethodologyContainer = styled.div`
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
    background: linear-gradient(135deg, #0a1929 0%, #132f4c 100%);
    min-height: 100vh;
`;

export const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: rgba(0, 180, 216, 0.15);
    color: #00e6ff;
    border: 1px solid #00b4d8;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    margin-bottom: 25px;

    &:hover {
        background: rgba(0, 180, 216, 0.25);
        box-shadow: 0 0 15px rgba(0, 180, 216, 0.4);
    }
`;

export const FormTitle = styled.h1`
    font-family: 'Orbitron', sans-serif;
    font-size: 2.2rem;
    color: #00e6ff;
    margin-bottom: 30px;
    text-align: center;
    text-shadow: 0 0 10px rgba(0, 230, 255, 0.3);
`;

export const FormContainer = styled.div`
    background: rgba(19, 47, 76, 0.6);
    border: 1px solid rgba(0, 180, 216, 0.3);
    border-radius: 16px;
    padding: 0px 30px 0px 30px;
    backdrop-filter: blur(10px);
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-top: 40px;

    &.full-width {
        grid-column: 1 / -1;
    }
`;

export const Label = styled.label`
    color: #00e6ff;
    font-weight: 600;
    font-size: 1rem;
    font-family: 'Rajdhani', sans-serif;
`;

export const Input = styled.input`
    padding: 14px 16px;
    background: rgba(0, 180, 216, 0.08);
    border: 1px solid rgba(0, 180, 216, 0.4);
    border-radius: 10px;
    color: #e0e0e0;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: #00b4d8;
        box-shadow: 0 0 15px rgba(0, 180, 216, 0.3);
        background: rgba(0, 180, 216, 0.12);
    }

    &::placeholder {
        color: #8fa3bf;
    }
`;

export const TextArea = styled.textarea`
    padding: 14px 16px;
    background: rgba(0, 180, 216, 0.08);
    border: 1px solid rgba(0, 180, 216, 0.4);
    border-radius: 10px;
    color: #e0e0e0;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1rem;
    min-height: 120px;
    resize: vertical;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: #00b4d8;
        box-shadow: 0 0 15px rgba(0, 180, 216, 0.3);
        background: rgba(0, 180, 216, 0.12);
    }

    &::placeholder {
        color: #8fa3bf;
    }
`;

export const Select = styled.select`
    padding: 14px 16px;
    background: rgba(0, 180, 216, 0.08);
    border: 1px solid rgba(0, 180, 216, 0.4);
    border-radius: 10px;
    color: #e0e0e0;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: #00b4d8;
        box-shadow: 0 0 15px rgba(0, 180, 216, 0.3);
        background: rgba(0, 180, 216, 0.12);
    }

    option {
        background: #0a1929;
        color: #e0e0e0;
    }
`;

export const EmojiGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 12px;
    margin-top: 12px;
    padding: 15px;
    background: rgba(0, 180, 216, 0.06);
    border-radius: 12px;
    border: 1px solid rgba(0, 180, 216, 0.2);
`;

export const EmojiButton = styled.button<{ selected: boolean }>`
    padding: 12px;
    font-size: 1.8rem;
    background: ${props => props.selected
            ? 'linear-gradient(135deg, rgba(0, 180, 216, 0.3), rgba(0, 150, 200, 0.2))'
            : 'rgba(0, 180, 216, 0.08)'};
    border: 2px solid ${props => props.selected ? '#00b4d8' : 'rgba(0, 180, 216, 0.3)'};
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(0, 180, 216, 0.15);
        transform: scale(1.1);
        box-shadow: 0 0 20px rgba(0, 180, 216, 0.2);
    }
`;

export const ContentSection = styled.div`
    margin-top: 35px;
    padding-top: 25px;
    border-top: 2px solid rgba(0, 180, 216, 0.2);
`;

export const SectionTitle = styled.h3`
    color: #00e6ff;
    font-family: 'Orbitron', sans-serif;
    margin: 0;
    font-size: 1.4rem;
`;

export const ContentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
`;

export const BlockSelectContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    position: relative;
`;

export const BlockSelectButton = styled.button`
    padding: 12px 24px;
    background: linear-gradient(135deg, rgba(0, 180, 216, 0.2), rgba(0, 150, 200, 0.15));
    color: #00e6ff;
    border: 1px solid #00b4d8;
    border-radius: 10px;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;

    &:hover {
        background: linear-gradient(135deg, rgba(0, 180, 216, 0.3), rgba(0, 150, 200, 0.25));
        box-shadow: 0 0 20px rgba(0, 180, 216, 0.3);
    }
`;

export const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 5px;
    background: rgba(19, 47, 76, 0.95);
    border: 1px solid rgba(0, 180, 216, 0.4);
    border-radius: 8px;
    padding: 8px 0;
    min-width: 180px;
    z-index: 1000;
    backdrop-filter: blur(10px);
`;

export const DropdownItem = styled.button`
    width: 100%;
    padding: 12px 16px;
    background: none;
    border: none;
    color: #e0e0e0;
    text-align: left;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.2s ease;

    &:hover {
        background: rgba(0, 180, 216, 0.15);
        color: #00e6ff;
    }
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 30px;
`;

export const SubmitButton = styled.button`
    padding: 16px 35px;
    background: linear-gradient(135deg, #0066cc, #00b4d8);
    color: #ffffff;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &:hover:not(:disabled) {
        box-shadow: 0 0 25px rgba(0, 180, 216, 0.5);
        transform: translateY(-3px);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
`;

export const CancelButton = styled.button`
    padding: 16px 35px;
    background: rgba(0, 180, 216, 0.15);
    color: #00e6ff;
    border: 1px solid #00b4d8;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    font-size: 1.1rem;

    &:hover {
        background: rgba(0, 180, 216, 0.25);
        box-shadow: 0 0 20px rgba(0, 180, 216, 0.3);
        transform: translateY(-2px);
    }
`;

export const ErrorMessage = styled.div`
    color: #ff6b6b;
    font-size: 0.9rem;
    margin-top: 6px;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 500;
`;

export const ImageUploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const UploadArea = styled.div`
    border: 2px dashed rgba(0, 180, 216, 0.4);
    border-radius: 12px;
    padding: 40px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: rgba(0, 180, 216, 0.05);

    &:hover {
        border-color: #00b4d8;
        background: rgba(0, 180, 216, 0.1);
    }
`;

export const UploadIcon = styled.div`
    font-size: 3rem;
    color: #00b4d8;
    margin-bottom: 15px;
`;

export const UploadText = styled.p`
    color: #8fa3bf;
    font-family: 'Rajdhani', sans-serif;
    margin: 0;
    font-size: 1.1rem;
`;

export const UploadInput = styled.input`
    display: none;
`;

export const ImagePreviewContainer = styled.div`
    position: relative;
    display: inline-block;
`;

export const PreviewImage = styled.img`
    max-width: 100%;
    max-height: 400px;
    border-radius: 8px;
    border: 1px solid rgba(0, 180, 216, 0.3);
`;

export const ChangeImageButton = styled.button`
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(0, 180, 216, 0.8);
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px 16px;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    font-size: 0.9rem;

    &:hover {
        background: rgba(0, 180, 216, 1);
    }
`;

export const InfoMessage = styled.div`
    background: rgba(255, 152, 0, 0.1);
    border-left: 4px solid #ff9800;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #ff9800;
    font-family: 'Rajdhani', sans-serif;

    i {
        font-size: 1.2rem;
    }
`;
