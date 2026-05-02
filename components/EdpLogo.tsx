interface Props {
  size?: number
  showText?: boolean
  className?: string
}

export default function EdpLogo({ size = 40, showText = true, className = '' }: Props) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" stroke="url(#g1)" strokeWidth="2.5" fill="none"/>
        <circle cx="20" cy="20" r="12" stroke="url(#g2)" strokeWidth="2.5" fill="none"/>
        <circle cx="20" cy="20" r="6"  stroke="url(#g3)" strokeWidth="2"   fill="none"/>
        <defs>
          <linearGradient id="g1" x1="2" y1="2" x2="38" y2="38">
            <stop offset="0%"   stopColor="#00A651"/>
            <stop offset="100%" stopColor="#0066CC"/>
          </linearGradient>
          <linearGradient id="g2" x1="8" y1="8" x2="32" y2="32">
            <stop offset="0%"   stopColor="#7DC242"/>
            <stop offset="100%" stopColor="#0066CC"/>
          </linearGradient>
          <linearGradient id="g3" x1="14" y1="14" x2="26" y2="26">
            <stop offset="0%"   stopColor="#00A651"/>
            <stop offset="100%" stopColor="#7DC242"/>
          </linearGradient>
        </defs>
      </svg>
      {showText && (
        <span style={{ fontSize: size * 0.55, fontWeight: 700, color: 'white', letterSpacing: '0.05em', fontFamily: 'system-ui' }}>
          edp
        </span>
      )}
    </div>
  )
}
