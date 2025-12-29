const Logo = () => {
  return (
    <svg
      className="size-10"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Robot head */}
      <rect
        x="6"
        y="8"
        width="20"
        height="18"
        rx="4"
        fill="url(#logoRobotGradient)"
      />

      {/* Top highlight */}
      <rect
        x="7"
        y="9"
        width="18"
        height="1.5"
        rx="0.75"
        fill="white"
        opacity="0.3"
      />

      {/* Eyes */}
      <circle cx="12" cy="16" r="2.5" fill="url(#logoEyeGradient)" />
      <circle cx="11" cy="15" r="1" fill="white" opacity="0.6" />

      <circle cx="20" cy="16" r="2.5" fill="url(#logoEyeGradient)" />
      <circle cx="19" cy="15" r="1" fill="white" opacity="0.6" />

      {/* Antenna */}
      <line
        x1="16"
        y1="8"
        x2="16"
        y2="4"
        stroke="url(#logoAntennaGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="16" cy="3" r="2" fill="url(#logoPulseGradient)" />

      {/* Smile */}
      <path
        d="M 11 21 Q 16 24 21 21"
        stroke="url(#logoSmileGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Gradient definitions */}
      <defs>
        <linearGradient
          id="logoRobotGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" style={{ stopColor: "#fde047" }} />
          <stop offset="50%" style={{ stopColor: "#fbbf24" }} />
          <stop offset="100%" style={{ stopColor: "#f59e0b" }} />
        </linearGradient>

        <radialGradient id="logoEyeGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: "#374151" }} />
          <stop offset="100%" style={{ stopColor: "#111827" }} />
        </radialGradient>

        <linearGradient
          id="logoAntennaGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" style={{ stopColor: "#fbbf24" }} />
          <stop offset="100%" style={{ stopColor: "#f59e0b" }} />
        </linearGradient>

        <radialGradient id="logoPulseGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: "#fef08a" }} />
          <stop offset="50%" style={{ stopColor: "#fbbf24" }} />
          <stop offset="100%" style={{ stopColor: "#f59e0b" }} />
        </radialGradient>

        <linearGradient
          id="logoSmileGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" style={{ stopColor: "#78350f" }} />
          <stop offset="50%" style={{ stopColor: "#92400e" }} />
          <stop offset="100%" style={{ stopColor: "#78350f" }} />
        </linearGradient>

        <linearGradient
          id="logoDocGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" style={{ stopColor: "#fffbeb" }} />
          <stop offset="100%" style={{ stopColor: "#fef3c7" }} />
        </linearGradient>

        <linearGradient id="logoDocBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#fbbf24" }} />
          <stop offset="100%" style={{ stopColor: "#f59e0b" }} />
        </linearGradient>

        <linearGradient
          id="logoCornerGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" style={{ stopColor: "#fde68a" }} />
          <stop offset="100%" style={{ stopColor: "#fcd34d" }} />
        </linearGradient>

        <linearGradient id="logoLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#f59e0b" }} />
          <stop offset="100%" style={{ stopColor: "#d97706" }} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
