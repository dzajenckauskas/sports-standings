import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    placeHolder?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ error, placeHolder, ...rest }, ref) => {
    return (
        <div style={{ width: '100%' }}>
            <input
                ref={ref}
                placeholder={placeHolder}
                style={{ width: 'calc(100% - 8px)' }}
                {...rest}
            />
            {error &&
                <span>{error}</span>}
        </div>
    );
});