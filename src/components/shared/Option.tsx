import React from "react";

interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
    children: React.ReactNode;
}

export const Option: React.FC<OptionProps> = ({ children, ...rest }) => {
    return (
        <option
            {...rest}
            style={{
                padding: "8px 10px",
                fontSize: 14,
                background: "#fff",       // some browsers ignore this
                color: "#111",
            }}
        >
            {children}
        </option>
    );
};