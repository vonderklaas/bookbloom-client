type TipProps = {
    text: string;
    marginLeft: boolean;
}

export const Tip = ({ text, marginLeft }: TipProps) => {
    return (
        <div style={{ marginBottom: '0.5rem' }}>
            <small style={{
                marginLeft: marginLeft  ? '0.2rem' : '0'
            }}>{text}</small>
        </div>
    )
}