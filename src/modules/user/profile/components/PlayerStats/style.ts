import styled from "@emotion/styled";

export const StatsWrapper = styled.div`
    margin-top: 16px;
`;

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 16px;
`;

export const StatsCard = styled.div`
    background: rgba(0, 180, 216, 0.1);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
        background: rgba(0, 180, 216, 0.2);
        transform: translateY(-2px);
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #00b4d8, #00e6ff);
    }
`;

export const StatsIcon = styled.i`
    font-size: 1.8rem;
    color: #00e6ff;
    margin-bottom: 12px;
    display: block;
`;

export const StatsValue = styled.div`
    font-size: 1.8rem;
    font-weight: 700;
    color: #00e6ff;
    margin-bottom: 8px;
`;

export const StatsLabel = styled.div`
    font-size: 0.8rem;
    color: #a0a0a0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

export const LoadingContainer = styled.div`
    text-align: center;
    padding: 40px;
    color: #00e6ff;

    i {
        font-size: 2rem;
        margin-bottom: 12px;
    }
`;

export const ErrorContainer = styled.div`
    text-align: center;
    padding: 40px;
    color: #ff7e5f;

    i {
        font-size: 2rem;
        margin-bottom: 12px;
    }

    button {
        margin-top: 16px;
        background: rgba(0, 180, 216, 0.2);
        border: 1px solid rgba(0, 180, 216, 0.3);
        border-radius: 8px;
        padding: 8px 16px;
        color: #00e6ff;
        cursor: pointer;

        &:hover {
            background: rgba(0, 180, 216, 0.3);
        }
    }
`;
