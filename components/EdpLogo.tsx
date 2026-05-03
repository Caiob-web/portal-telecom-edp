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
  /*
    Coloque o logo oficial dentro da pasta public:

    public/edp-logo.svg

    Se estiver usando PNG, troque o src para:
    /edp-logo.png
  */

  const finalWidth = width || size || 80

  return (
    <img
      src="/edp-logo.svg"
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
