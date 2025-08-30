type TennisIconProps = {
    size?: number;       // px
    ball?: string;       // default "#fff"
    className?: string;
    title?: string;
};

const TennisIcon: React.FC<TennisIconProps> = ({
    size = 24,
    ball = "#ffffff",
    className,
    title = "Tennis",
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 188 188"
        width={size}
        height={size}
        className={className}
        role="img"
        aria-label={title}
    >
        <title>{title}</title>
        <path
            fill={ball}
            d="
        M 0.5,101
        C 54,99.3 99,54 101,0.5
          134.6,2.2 166.3,23.9 180.3,54.2
          185.2,64.8 187.8,75.9 188.9,87.5
          188.8,88.2 177.3,89.1 175.7,89.4
          127.3,97.9 90.4,139.2 88.4,188.1
          42.0,186.2 2.6,147.1 0.5,101 Z
        M 188.1,100
          c -2.5,47.5 -41.1,86.1 -88.6,88.6
            1.8,-27.4 15.0,-53.0 37.0,-69.5
            15.1,-11.4 32.9,-17.7 51.7,-19.1 Z
        M 88.6,0
          C 86.3,47.0 47.2,86.9 0,88.8
            3.1,41.7 41.4,2.7 88.6,0 Z"
        />
    </svg>
);

export default TennisIcon;