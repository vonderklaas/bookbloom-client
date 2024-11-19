import './Button.css'

type ButtonProps = {
    text?: string;
    type?: string;
    onClick?: () => void;
    isDisabled?: boolean;
    className?: string;
}

export const Button = ({ text, type, onClick, isDisabled, className }: ButtonProps) => {
    return (
        <button type={type === 'submit' ? type : 'button'} disabled={isDisabled} onClick={onClick} className={className}>{text}</button>
    )
}