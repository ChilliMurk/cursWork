import styled from "@emotion/styled";

export const ModalOverlay = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: ${props => props.isOpen ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 2px solid rgba(0, 180, 216, 0.3);
    border-radius: 12px;
    padding: 30px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

export const ModalTitle = styled.h2`
    color: #00e6ff;
    font-family: 'Orbitron', sans-serif;
    font-size: 1.5rem;
    margin: 0;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    color: #00e6ff;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 5px;

    &:hover {
        color: #00b4d8;
    }
`;

export const ModalBody = styled.div`
    margin-bottom: 25px;
`;

export const ModalText = styled.p`
    color: #e0e0e0;
    margin-bottom: 20px;
    line-height: 1.5;
`;

export const FormGroup = styled.div`
    margin-bottom: 20px;
`;

export const Label = styled.label`
    display: block;
    color: #00e6ff;
    font-weight: 600;
    margin-bottom: 8px;
    font-size: 1rem;
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 12px 15px;
    background: rgba(0, 180, 216, 0.1);
    border: 1px solid rgba(0, 180, 216, 0.3);
    border-radius: 8px;
    color: #e0e0e0;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1rem;
    min-height: 120px;
    resize: vertical;
    transition: all 0.3s;

    &:focus {
        outline: none;
        border-color: #00b4d8;
        box-shadow: 0 0 10px rgba(0, 180, 216, 0.3);
    }

    &::placeholder {
        color: #a0a0a0;
    }
`;

export const CharacterCount = styled.div`
    color: #a0a0a0;
    font-size: 0.9rem;
    text-align: right;
    margin-top: 5px;
`;

export const ModalFooter = styled.div`
    display: flex;
    gap: 15px;
    justify-content: flex-end;
`;

export const ModalButton = styled.button<{ variant: 'primary' | 'secondary' }>`
    padding: 12px 25px;
    border: none;
    border-radius: 8px;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;

    ${props => props.variant === 'primary' ? `
    background: linear-gradient(90deg, #0066cc, #00b4d8);
    color: #ffffff;
    
    &:hover:not(:disabled) {
      box-shadow: 0 0 15px rgba(0, 180, 216, 0.4);
      transform: translateY(-2px);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  ` : `
    background: rgba(0, 180, 216, 0.15);
    color: #00e6ff;
    border: 1px solid #00b4d8;
    
    &:hover {
      background: rgba(0, 180, 216, 0.25);
      box-shadow: 0 0 15px rgba(0, 180, 216, 0.4);
    }
  `}
`;
