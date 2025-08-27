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
                {title}
            </header>
            {children}
        </div>
    )
}

export default Card
