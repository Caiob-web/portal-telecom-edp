interface Props {
  size?: number
  width?: number
  showText?: boolean
  dark?: boolean
  className?: string
}

export default function EdpLogo({
  size = 40,
  width,
  showText = true,
  dark = false,
  className = '',
}: Props) {
  /*
    Logo EDP oficial em PNG.

    Caminho esperado:
    public/edp-logo.png

    Este componente mantém compatibilidade com:
    <EdpLogo size={44} showText={true} dark={false} />
    <EdpLogo width={120} />
  */

  const finalWidth = width || (showText ? size * 2.4 : size * 1.7)

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        width: finalWidth,
        minWidth: finalWidth,
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      <img
        src="/edp-logo.png"
        alt="EDP"
        draggable={false}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'contain',
        }}
      />
    </div>
  )
}
