import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    placeHolder?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ error, placeHolder, ...rest }, ref) => {
    return (
        <div>
            <input
                ref={ref}
                placeholder={placeHolder}
                {...rest}
            />
            {error &&
                <span>{error}</span>}
        </div>
    );
});