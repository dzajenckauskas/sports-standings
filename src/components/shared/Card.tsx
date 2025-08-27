import React from 'react'

type Props = {
    children: React.ReactNode;
    title: string;
    icon?: React.ReactNode;
}

const Card = ({ children, title, icon }: Props) => {
    return (
        <div>
            <header>
                {icon}
                <h2>{title}</h2>
            </header>
            {children}
        </div>
    )
}

export default Card
