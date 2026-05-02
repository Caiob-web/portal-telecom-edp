interface Props {
  size?: number
  showText?: boolean
  dark?: boolean
  className?: string
}

export default function EdpLogo({ size = 40, showText = true, dark = false, className = '' }: Props) {
  const textColor = dark ? '#0a1628' : '#ffffff'

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* SVG baseado no logo oficial EDP - alvo circular com gradiente */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Círculo externo */}
        <circle cx="50" cy="50" r="46" stroke="url(#edpG1)" strokeWidth="6" fill="none" />
        {/* Círculo médio */}
        <circle cx="50" cy="50" r="30" stroke="url(#edpG2)" strokeWidth="6" fill="none" />
        {/* Círculo interno */}
        <circle cx="50" cy="50" r="14" stroke="url(#edpG3)" strokeWidth="6" fill="none" />
        {/* Ponto central */}
        <circle cx="50" cy="50" r="5" fill="url(#edpG1)" />
        <defs>
          <linearGradient id="edpG1" x1="4" y1="4" x2="96" y2="96" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#00A651" />
            <stop offset="100%" stopColor="#0066CC" />
          </linearGradient>
          <linearGradient id="edpG2" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#7DC242" />
            <stop offset="100%" stopColor="#0055AA" />
          </linearGradient>
          <linearGradient id="edpG3" x1="36" y1="36" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#00A651" />
            <stop offset="100%" stopColor="#7DC242" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <span style={{
          fontSize: size * 0.52,
          fontWeight: 700,
          color: textColor,
          letterSpacing: '0.04em',
          fontFamily: 'system-ui, sans-serif',
          lineHeight: 1,
        }}>
          edp
        </span>
      )}
    </div>
  )
}
