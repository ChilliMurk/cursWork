import styled from "@emotion/styled";

export const StatsContainer = styled.div`
    padding: 20px;
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
`;

export const WeightsCard = styled.div`
    background: linear-gradient(145deg, #0f2a44, #071526);
    border-radius: 28px;
    border: 1px solid rgba(0, 180, 216, 0.5);
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
`;

export const CardTitle = styled.h3`
    font-family: 'Orbitron', sans-serif;
    color: #00e6ff;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.3rem;
`;

export const SlidersGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.2rem;
    margin-bottom: 1.5rem;
`;

export const SliderItem = styled.div`
    background: rgba(0, 180, 216, 0.08);
    border-radius: 20px;
    padding: 0.8rem 1rem;
    border: 1px solid rgba(0, 180, 216, 0.2);
`;

export const SliderHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-weight: bold;
    color: #cceeff;
`;

export const WeightValue = styled.span`
    font-family: 'Orbitron', monospace;
    background: #071a2b;
    padding: 2px 12px;
    border-radius: 40px;
    font-size: 0.9rem;
    font-weight: bold;
    color: #ffd966;
`;

export const StyledRange = styled.input`
    width: 100%;
    height: 5px;
    -webkit-appearance: none;
    background: #1e3a5f;
    border-radius: 5px;

    &::-webkit-slider-thumb {
        width: 18px;
        height: 18px;
        background: #00e6ff;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 0 6px #00e6ff;
        -webkit-appearance: none;
    }
`;

export const WeightNote = styled.div`
    font-size: 0.7rem;
    text-align: right;
    margin-top: 5px;
    color: #7e9ec5;
`;

export const PresetGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 10px 0;
`;

export const PresetButton = styled.button`
    background: #0a1929;
    border: 1px solid #00b4d8;
    padding: 6px 16px;
    border-radius: 40px;
    font-size: 0.8rem;
    cursor: pointer;
    font-weight: bold;
    transition: 0.2s;

    &:hover {
        background: #0066cc;
        transform: translateY(-2px);
    }
`;

export const ApplyButton = styled.button`
    background: linear-gradient(90deg, #0066cc, #00b4d8);
    border: none;
    padding: 8px 24px;
    border-radius: 40px;
    font-weight: bold;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        transform: translateY(-2px);
    }
`;

export const TableContainer = styled.div`
    background: linear-gradient(145deg, #0f243b, #07121f);
    border-radius: 24px;
    border: 1px solid rgba(0, 180, 216, 0.4);
    overflow-x: auto;
    margin-top: 0.5rem;
`;

export const StatsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
    min-width: 1000px;

    th {
        text-align: left;
        padding: 1rem 0.8rem;
        background: rgba(0, 180, 216, 0.15);
        color: #c4e6ff;
        font-family: 'Orbitron', sans-serif;
        font-weight: 600;
    }

    td {
        padding: 0.8rem;
        border-bottom: 1px solid rgba(0, 180, 216, 0.15);
    }
`;

export const MemberBadge = styled.span`
    background: linear-gradient(90deg, #0066cc, #00b4d8);
    padding: 0.2rem 0.6rem;
    border-radius: 20px;
    font-size: 0.7rem;
    margin-left: 6px;
`;

export const AvgBar = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.8rem 1.2rem;
    border-top: 1px solid rgba(0, 180, 216, 0.2);
    font-weight: bold;
`;

export const FooterInfo = styled.div`
    margin-top: 2rem;
    text-align: center;
    font-size: 0.75rem;
    color: #7b9bc0;
    border-top: 1px solid rgba(0, 180, 216, 0.2);
    padding-top: 1rem;
`;
