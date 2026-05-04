interface Props {
  size?: number
  width?: number
  showText?: boolean
  dark?: boolean
  className?: string
}

export default function EdpLogo({
  size,
  width,
  showText = true,
  dark = false,
  className = '',
}: Props) {
  const finalWidth = width || size || 80

  return (
    <img
      src="/edp-logo.png"
      alt="EDP"
      width={finalWidth}
      className={className}
      draggable={false}
      style={{
        height: 'auto',
        display: 'block',
        userSelect: 'none',
      }}
    />
  )
}
