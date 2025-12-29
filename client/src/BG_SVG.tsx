const BG_SVG = () => {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-xl opacity-10 scale-150 sm:scale-200"
    >
      {/* Background decorative elements */}
      <circle
        cx="100"
        cy="100"
        r="90"
        className="stroke-yellow-200 dark:stroke-yellow-900"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.4"
      />

      {/* PDF Document with gradient */}
      <rect
        x="60"
        y="50"
        width="60"
        height="80"
        rx="4"
        style={{
          fill: "url(#pdfGradient)",
        }}
        strokeWidth="2"
        stroke="url(#pdfBorderGradient)"
      />

      {/* PDF folded corner */}
      <path
        d="M 120 50 L 120 65 L 105 65 Z"
        style={{
          fill: "url(#cornerGradient)",
        }}
      />

      {/* PDF lines (content representation) with gradient strokes */}
      <line
        x1="70"
        y1="75"
        x2="110"
        y2="75"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="70"
        y1="85"
        x2="105"
        y2="85"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="70"
        y1="95"
        x2="110"
        y2="95"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="70"
        y1="105"
        x2="95"
        y2="105"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Chat bubble 1 (left side) */}
      <g>
        <rect
          x="40"
          y="100"
          width="35"
          height="25"
          rx="6"
          style={{
            fill: "url(#chatGradient1)",
          }}
        />
        <path
          d="M 48 125 L 45 130 L 52 125 Z"
          style={{
            fill: "url(#chatGradient1)",
          }}
        />
        {/* Chat dots */}
        <circle cx="50" cy="112.5" r="2" className="fill-white" opacity="0.8" />
        <circle
          cx="57.5"
          cy="112.5"
          r="2"
          className="fill-white"
          opacity="0.8"
        />
        <circle cx="65" cy="112.5" r="2" className="fill-white" opacity="0.8" />
      </g>

      {/* Chat bubble 2 (right side) */}
      <g>
        <rect
          x="125"
          y="115"
          width="35"
          height="25"
          rx="6"
          style={{
            fill: "url(#chatGradient2)",
          }}
        />
        <path
          d="M 152 140 L 155 145 L 148 140 Z"
          style={{
            fill: "url(#chatGradient2)",
          }}
        />
        {/* Chat dots */}
        <circle
          cx="135"
          cy="127.5"
          r="2"
          className="fill-white"
          opacity="0.8"
        />
        <circle
          cx="142.5"
          cy="127.5"
          r="2"
          className="fill-white"
          opacity="0.8"
        />
        <circle
          cx="150"
          cy="127.5"
          r="2"
          className="fill-white"
          opacity="0.8"
        />
      </g>

      {/* Robot/AI head with gradient */}
      <rect
        x="80"
        y="135"
        width="40"
        height="35"
        rx="8"
        style={{
          fill: "url(#robotGradient)",
        }}
      />

      {/* Robot eyes with glow */}
      <circle cx="90" cy="150" r="5" fill="url(#eyeGradient)" />
      <circle cx="88" cy="148" r="2" className="fill-white" opacity="0.6" />

      <circle cx="110" cy="150" r="5" fill="url(#eyeGradient)" />
      <circle cx="108" cy="148" r="2" className="fill-white" opacity="0.6" />

      {/* Robot antenna with gradient */}
      <line
        x1="100"
        y1="135"
        x2="100"
        y2="125"
        stroke="url(#antennaGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle
        cx="100"
        cy="123"
        r="4"
        className="animate-pulse"
        style={{ animationDuration: "1.5s" }}
        fill="url(#pulseGradient)"
      />

      {/* Robot smile/mouth */}
      <path
        d="M 90 160 Q 100 165 110 160"
        stroke="url(#smileGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Sparkle 1 */}
      <g
        className="animate-pulse"
        style={{ animationDelay: "0s", animationDuration: "2s" }}
      >
        <path
          d="M165 45L167 51L173 53L167 55L165 61L163 55L157 53L163 51L165 45Z"
          fill="url(#sparkleGradient1)"
        />
      </g>

      {/* Sparkle 2 */}
      <g
        className="animate-pulse"
        style={{ animationDelay: "0.7s", animationDuration: "2s" }}
      >
        <path
          d="M30 60L32 66L38 68L32 70L30 76L28 70L22 68L28 66L30 60Z"
          fill="url(#sparkleGradient2)"
        />
      </g>

      {/* Sparkle 3 */}
      <g
        className="animate-pulse"
        style={{ animationDelay: "1.4s", animationDuration: "2s" }}
      >
        <path
          d="M170 140L171 144L175 145L171 146L170 150L169 146L165 145L169 144L170 140Z"
          fill="url(#sparkleGradient3)"
        />
      </g>

      {/* Gradient definitions */}
      <defs>
        {/* PDF gradients */}
        <linearGradient id="pdfGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#fef3c7" }} />
          <stop offset="100%" style={{ stopColor: "#fde68a" }} />
        </linearGradient>

        <linearGradient
          id="pdfBorderGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" style={{ stopColor: "#fbbf24" }} />
          <stop offset="100%" style={{ stopColor: "#f59e0b" }} />
        </linearGradient>

        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#f59e0b" }} />
          <stop offset="100%" style={{ stopColor: "#d97706" }} />
        </linearGradient>

        {/* Chat bubble gradients */}
        <linearGradient id="chatGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#ffd100" }} />
          <stop offset="100%" style={{ stopColor: "#f59e0b" }} />
        </linearGradient>

        <linearGradient id="chatGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#fbbf24" }} />
          <stop offset="100%" style={{ stopColor: "#f97316" }} />
        </linearGradient>

        {/* Robot gradients */}
        <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#ffd100" }} />
          <stop offset="50%" style={{ stopColor: "#fbbf24" }} />
          <stop offset="100%" style={{ stopColor: "#f59e0b" }} />
        </linearGradient>

        <radialGradient id="eyeGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: "#1f2937" }} />
          <stop offset="100%" style={{ stopColor: "#111827" }} />
        </radialGradient>

        <linearGradient id="antennaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#f59e0b" }} />
          <stop offset="100%" style={{ stopColor: "#d97706" }} />
        </linearGradient>

        <radialGradient id="pulseGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: "#fbbf24" }} />
          <stop offset="50%" style={{ stopColor: "#f59e0b" }} />
          <stop offset="100%" style={{ stopColor: "#dc2626" }} />
        </radialGradient>

        <linearGradient id="smileGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#92400e" }} />
          <stop offset="50%" style={{ stopColor: "#78350f" }} />
          <stop offset="100%" style={{ stopColor: "#92400e" }} />
        </linearGradient>

        {/* Sparkle gradients */}
        <linearGradient
          id="sparkleGradient1"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" style={{ stopColor: "#fef08a" }} />
          <stop offset="100%" style={{ stopColor: "#fbbf24" }} />
        </linearGradient>

        <linearGradient
          id="sparkleGradient2"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" style={{ stopColor: "#fcd34d" }} />
          <stop offset="100%" style={{ stopColor: "#f59e0b" }} />
        </linearGradient>

        <linearGradient
          id="sparkleGradient3"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" style={{ stopColor: "#fb923c" }} />
          <stop offset="100%" style={{ stopColor: "#f97316" }} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BG_SVG;
