import { useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
};

const starContainerStyle = {
    display: "flex",
};

const StarRating = ({
    maxRating = 5,
    color = "#fcc419",
    size = 48,
    className = "",
    messages = [],
    defaultRating = 0,
    onSetRating,
}) => {
    const [rating, setRating] = useState(defaultRating);
    const [tempRating, setTempRating] = useState(0);

    const handleRating = (newRating) => {
        setRating(newRating);
        if (onSetRating) onSetRating(newRating);
    };

    const textStyle = {
        lineHeight: "0",
        margin: "0",
        color: color,
        fontSize: `${size / 1.5}px`,
    };

    return (
        <div style={containerStyle} className={className}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => {
                    const currentValue = i + 1;
                    const displayValue = tempRating || rating;
                    return (
                        <Star
                            key={i}
                            full={displayValue >= currentValue}
                            half={displayValue >= currentValue - 0.5 && displayValue < currentValue}
                            onRate={(val) => handleRating(val)}
                            onHoverIn={(val) => setTempRating(val)}
                            onHoverOut={() => setTempRating(0)}
                            color={color}
                            size={size}
                            index={i}
                        />
                    );
                })}
            </div>
            <p style={textStyle}>
                {messages.length === maxRating
                    ? messages[Math.ceil(tempRating || rating) - 1]
                    : tempRating || rating || ""}
            </p>
        </div>
    );
};

const Star = ({ full, half, onRate, onHoverIn, onHoverOut, color, size, index }) => {
    const starStyle = {
        width: `${size}px`,
        minWidth: `${size}px`,
        height: `${size}px`,
        display: "block",
        cursor: "pointer",
        position: "relative",
    };

    return (
        <div style={starStyle}>
            <span
                onClick={() => onRate(index + 0.5)}
                onMouseEnter={() => onHoverIn(index + 0.5)}
                onMouseLeave={onHoverOut}
                style={{
                    position: "absolute",
                    width: "50%",
                    height: "100%",
                    left: 0,
                    top: 0,
                    zIndex: 1,
                }}
            />
            <span
                onClick={() => onRate(index + 1)}
                onMouseEnter={() => onHoverIn(index + 1)}
                onMouseLeave={onHoverOut}
                style={{
                    position: "absolute",
                    width: "50%",
                    height: "100%",
                    right: 0,
                    top: 0,
                    zIndex: 1,
                }}
            />
            {full ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={color} stroke={color} width={size} height={size}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.45a1 1 0 00-1.175 0l-3.37 2.45c-.784.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.951-.69l1.286-3.957z" />
                </svg>
            ) : half ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width={size} height={size}>
                    <defs>
                        <linearGradient id={`half-${index}`}>
                            <stop offset="50%" stopColor={color} />
                            <stop offset="50%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                    <path
                        fill={`url(#half-${index})`}
                        stroke={color}
                        strokeWidth="1"
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.45a1 1 0 00-1.175 0l-3.37 2.45c-.784.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.951-.69l1.286-3.957z"
                    />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke={color} width={size} height={size}>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.45a1 1 0 00-1.175 0l-3.37 2.45c-.784.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.951-.69l1.286-3.957z"
                    />
                </svg>
            )}
        </div>
    );
};

StarRating.propTypes = {
    maxRating: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.number,
    className: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.string),
    defaultRating: PropTypes.number,
    onSetRating: PropTypes.func,
};

export default StarRating;
