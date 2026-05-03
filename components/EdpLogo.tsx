interface Props {
  width?: number
  className?: string
}

export default function EdpLogo({ width = 80, className = '' }: Props) {
  return (
    <img
      src="/edp-logo.svg"
      alt="EDP"
      width={width}
      className={className}
      style={{
        height: 'auto',
        display: 'block',
        userSelect: 'none',
      }}
      draggable={false}
    />
  )
}
