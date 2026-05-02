interface Props {
  size?: number
  showText?: boolean
  dark?: boolean
  className?: string
}

export default function EdpLogo({ size = 40, showText = true, dark = false, className = '' }: Props) {
  const textColor = dark ? '#1a1a1a' : '#ffffff'

  return (
    <div className={`flex items-center gap-2 ${className}`} style={{ userSelect: 'none' }}>
      {/*
        Logo oficial EDP — alvo circular com 3 anéis
        Baseado em: brand.edp.com/edp/brand-guidelines/logos
        Gradiente verde (#00A651) → azul (#0033A0)
      */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="edpOuter" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#00A651" />
            <stop offset="100%" stopColor="#0033A0" />
          </linearGradient>
          <linearGradient id="edpMid" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#3CB878" />
            <stop offset="100%" stopColor="#0055B3" />
          </linearGradient>
          <linearGradient id="edpInner" x1="38" y1="38" x2="82" y2="82" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#00A651" />
            <stop offset="100%" stopColor="#7DC242" />
          </linearGradient>
        </defs>

        {/* Anel externo */}
        <circle
          cx="60" cy="60" r="54"
          stroke="url(#edpOuter)"
          strokeWidth="10"
          fill="none"
        />
        {/* Anel médio */}
        <circle
          cx="60" cy="60" r="35"
          stroke="url(#edpMid)"
          strokeWidth="9"
          fill="none"
        />
        {/* Anel interno */}
        <circle
          cx="60" cy="60" r="17"
          stroke="url(#edpInner)"
          strokeWidth="8"
          fill="none"
        />
        {/* Ponto central */}
        <circle
          cx="60" cy="60" r="6"
          fill="url(#edpOuter)"
        />
      </svg>

      {showText && (
        <span
          style={{
            fontSize: size * 0.5,
            fontWeight: 800,
            color: textColor,
            letterSpacing: '0.05em',
            fontFamily: '"Arial", "Helvetica Neue", sans-serif',
            lineHeight: 1,
            textTransform: 'lowercase',
          }}
        >
          edp
        </span>
      )}
    </div>
  )
}
