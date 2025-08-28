
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon?: string;
    loading?: boolean;
    active?: boolean;
}

export const Button = ({ loading, onClick, children, active, ...rest }: ButtonProps) => {
    return (
        <button
            style={{
                opacity: active ? 0.7 : 1,
            }}
            disabled={loading}
            onClick={onClick} {...rest} className="button-base">
            {children}
        </button>
    );
}
