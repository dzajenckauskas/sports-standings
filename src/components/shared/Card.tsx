import React from 'react'

type Props = {
    children: React.ReactNode;
    title: string;
    primaryColor?: string;
    icon?: React.ReactNode;
}

const Card = ({ children, title, icon, primaryColor }: Props) => {
    return (
        <div>
            <header style={{ backgroundColor: primaryColor ?? '#000', color: '#fff' }}>
                {icon}
                <h2 style={{ margin: 0, padding: 10 }}>{title}</h2>
            </header>
            <div style={{ padding: '20px 20px 20px 20px' }}>
                {children}
            </div>
        </div>
    )
}

export default Card
