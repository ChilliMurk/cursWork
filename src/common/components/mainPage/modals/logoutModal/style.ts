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
    max-width: 400px;
    width: 90%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

export const ModalTitle = styled.h2`
    color: #00e6ff;
    font-family: 'Orbitron', sans-serif;
    font-size: 1.5rem;
    margin-bottom: 20px;
    text-align: center;
`;

export const ModalText = styled.p`
    color: #e0e0e0;
    text-align: center;
    margin-bottom: 30px;
    line-height: 1.5;
`;

export const ModalButtons = styled.div`
    display: flex;
    gap: 15px;
    justify-content: center;
`;

export const ModalButton = styled.button<{ variant: 'confirm' | 'cancel' }>`
    padding: 12px 25px;
    border: none;
    border-radius: 8px;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;

    ${props => props.variant === 'confirm' ? `
    background: linear-gradient(90deg, #ff4757, #ff6b81);
    color: #ffffff;
    
    &:hover {
      box-shadow: 0 0 15px rgba(255, 107, 129, 0.4);
      transform: translateY(-2px);
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
