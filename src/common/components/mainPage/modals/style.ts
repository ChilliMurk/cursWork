import styled from "@emotion/styled";

export const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(10, 25, 41, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
`;

export const Modal = styled.div<{ isOpen: boolean }>`
  background: linear-gradient(145deg, #132f4c, #0a1929);
  border: 1px solid rgba(0, 180, 216, 0.3);
  border-radius: 8px;
  width: 90%;
  max-width: 450px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-50px)'};
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: all 0.3s ease;
  position: relative;
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #00e6ff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #ffffff;
    transform: rotate(90deg);
  }
`;

export const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 25px;
`;

export const ModalTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.8rem;
  color: #00e6ff;
  margin-bottom: 10px;
  text-shadow: 0 0 10px rgba(0, 230, 255, 0.5);
`;

export const ModalSubtitle = styled.p`
  color: #e0e0e0;
  font-size: 1rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #e0e0e0;
  font-weight: 600;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  background-color: rgba(10, 25, 41, 0.7);
  border: 1px solid rgba(0, 180, 216, 0.3);
  border-radius: 4px;
  color: #ffffff;
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #00b4d8;
    box-shadow: 0 0 10px rgba(0, 180, 216, 0.3);
  }
`;

export const FormOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 0.9rem;
`;

export const RememberMe = styled.div`
  display: flex;
  align-items: center;
`;

export const ForgotPassword = styled.a`
  color: #00e6ff;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    color: #ffffff;
    text-shadow: 0 0 5px rgba(0, 230, 255, 0.7);
  }
`;

export const FormSubmit = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(90deg, #0066cc, #00b4d8);
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(0, 102, 204, 0.3);
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 180, 216, 0.5);
  }
`;

export const FormFooter = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #e0e0e0;
  font-size: 0.9rem;
`;

export const FormFooterLink = styled.a`
  color: #00e6ff;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;

  &:hover {
    color: #ffffff;
    text-shadow: 0 0 5px rgba(0, 230, 255, 0.7);
  }
`;
