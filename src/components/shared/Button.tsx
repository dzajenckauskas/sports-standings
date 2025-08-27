
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon?: string;
    loading?: boolean;
}

export const Button = ({ loading, onClick, children, ...rest }: ButtonProps) => {
    return (
        <button
            style={{
                opacity: loading ? 0.7 : 1,
            }}
            onClick={onClick} {...rest} className="button-base">
            {children}
        </button>
    );
}
