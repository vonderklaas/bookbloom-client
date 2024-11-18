import './Button.css'

type ButtonProps = {
    text?: string;
    type?: string; // soon union
    onClick?: () => void;
    isDisabled?: boolean;
    className?: string;
}

export const Button = ({ text, type, onClick, isDisabled, className }: ButtonProps) => {
    console.log('Button type', type);
    return (
        <button type={type === 'submit' ? type : 'button'} disabled={isDisabled} onClick={onClick} className={className}>{text}</button>
    )
}