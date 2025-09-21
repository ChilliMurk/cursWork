import { FC } from 'react';
import styled from '@emotion/styled';

const TestsContainer = styled.div`
  text-align: center;
`;

const DevelopmentMessage = styled.div`
  background: linear-gradient(145deg, #132f4c, #0a1929);
  border: 2px solid rgba(0, 180, 216, 0.3);
  border-radius: 12px;
  padding: 40px;
  margin: 50px auto;
  max-width: 600px;
`;

const DevIcon = styled.div`
  font-size: 4rem;
  color: #00e6ff;
  margin-bottom: 20px;
`;

const DevTitle = styled.h2`
  color: #00e6ff;
  font-family: 'Orbitron', sans-serif;
  margin-bottom: 15px;
  font-size: 1.8rem;
`;

const DevText = styled.p`
  color: #e0e0e0;
  line-height: 1.6;
  font-size: 1.1rem;
`;

export const TestsPage: FC = () => {
    return (
        <TestsContainer>
            <DevelopmentMessage>
                <DevIcon>
                    <i className="fas fa-tasks"></i>
                </DevIcon>
                <DevTitle>Раздел в разработке</DevTitle>
                <DevText>
                    Мы работаем над созданием системы тестирования и проверки знаний. Скюда здесь появятся
                    интерактивные тесты, экзамены и система отслеживания прогресса обучения.
                </DevText>
                <DevText>
                    Следите за обновлениями!
                </DevText>
            </DevelopmentMessage>
        </TestsContainer>
    );
};
