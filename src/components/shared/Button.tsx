interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    icon?: string;
}

export const Button = ({ onClick, text, icon, ...rest }: ButtonProps) => {
    return (
        <button onClick={onClick} {...rest} className="button-base">
            {icon}
            {text}
        </button>
    );
}
