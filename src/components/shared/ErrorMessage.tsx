import { useTheme } from "styled-components";
import { Typography } from "./Typography";

type Props = {
    error: string;
}

const ErrorMessage = ({ error }: Props) => {
    const theme = useTheme()
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            paddingTop: '1px',
            alignItems: 'baseline',
            color: theme.palette.error.main
        }}>
            <svg
                focusable="false"
                style={{
                    height: '14px',
                    position: 'relative',
                    top: 2,
                }}
                aria-hidden="true"
                viewBox="0 0 24 24"
            >
                <path
                    fill={theme.palette.error.main}
                    d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8">
                </path>
            </svg>
            <Typography
                variant="caption"
                style={{
                    paddingLeft: 2,
                    lineHeight: 1,
                    color: theme.palette.error.main
                }}>
                {error}
            </Typography>
        </div>
    )
}

export default ErrorMessage
