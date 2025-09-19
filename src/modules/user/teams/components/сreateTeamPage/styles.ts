import styled from "@emotion/styled";

export const CreateTeamContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
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
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 1px solid rgba(0, 180, 216, 0.2);
    border-radius: 12px;
    padding: 30px;
`;

export const FormGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    &.full-width {
        grid-column: 1 / -1;
    }
`;

export const Label = styled.label`
    color: #00e6ff;
    font-weight: 600;
    font-size: 1rem;
`;

export const Input = styled.input`
    padding: 12px 15px;
    background: rgba(0, 180, 216, 0.1);
    border: 1px solid rgba(0, 180, 216, 0.3);
    border-radius: 8px;
    color: #e0e0e0;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1rem;
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

export const TextArea = styled.textarea`
    padding: 12px 15px;
    background: rgba(0, 180, 216, 0.1);
    border: 1px solid rgba(0, 180, 216, 0.3);
    border-radius: 8px;
    color: #e0e0e0;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1rem;
    min-height: 100px;
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

export const Select = styled.div`
    position: relative;
    width: 100%;
`;

export const SelectHeader = styled.div`
    padding: 12px 15px;
    background: rgba(0, 180, 216, 0.1);
    border: 1px solid rgba(0, 180, 216, 0.3);
    border-radius: 8px;
    color: #e0e0e0;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s;

    &:hover {
        border-color: #00b4d8;
    }
`;

export const SelectList = styled.ul<{ isOpen: boolean }>`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #0a1929;
    border: 1px solid rgba(0, 180, 216, 0.3);
    border-top: none;
    border-radius: 0 0 8px 8px;
    margin: 0;
    padding: 0;
    list-style: none;
    z-index: 10;
    max-height: ${props => props.isOpen ? '200px' : '0'};
    overflow-y: auto;
    transition: max-height 0.3s ease;
`;

export const SelectItem = styled.li`
    padding: 12px 15px;
    color: #e0e0e0;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: rgba(0, 180, 216, 0.2);
    }

    &:last-child {
        border-radius: 0 0 8px 8px;
    }
`;

export const Arrow = styled.span<{ isOpen: boolean }>`
    border: solid #00e6ff;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: ${props => props.isOpen ? 'rotate(-135deg)' : 'rotate(45deg)'};
    transition: transform 0.3s;
`;

export const RoleTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
`;

export const RoleTag = styled.div<{ selected: boolean }>`
    padding: 8px 15px;
    background: ${props => props.selected
    ? 'linear-gradient(90deg, #0066cc, #00b4d8)'
    : 'rgba(0, 180, 216, 0.1)'};
    color: ${props => props.selected ? '#ffffff' : '#00e6ff'};
    border: 1px solid rgba(0, 180, 216, 0.3);
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 0.9rem;

    &:hover {
        background: ${props => props.selected
    ? 'linear-gradient(90deg, #0066cc, #00b4d8)'
    : 'rgba(0, 180, 216, 0.2)'};
    }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
  grid-column: 1 / -1;
`;

export const SubmitButton = styled.button`
  padding: 15px 30px;
  background: linear-gradient(90deg, #0066cc, #00b4d8);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  
  &:hover:not(:disabled) {
    box-shadow: 0 0 20px rgba(0, 180, 216, 0.5);
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  padding: 15px 30px;
  background: rgba(0, 180, 216, 0.15);
  color: #00e6ff;
  border: 1px solid #00b4d8;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  
  &:hover {
    background: rgba(0, 180, 216, 0.25);
    box-shadow: 0 0 15px rgba(0, 180, 216, 0.4);
  }
`;

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 5px;
`;
