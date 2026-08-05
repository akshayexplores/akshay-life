/**
 * The ascent — three risers and a terminus.
 * Field manual §07. Uniform 15px stroke at 256 viewBox, square caps,
 * mitred joins, no fills except the terminus dot.
 */
export default function Mark({
  size = 32,
  tone = "ink",
}: {
  size?: number
  tone?: "ink" | "reverse" | "tile"
}) {
  const stroke = tone === "ink" ? "#1A1714" : tone === "reverse" ? "#F2EDE3" : "#FFF6EE"
  const dot = tone === "ink" ? "#C0562F" : tone === "reverse" ? "#E9906D" : "#1A1714"

  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" aria-hidden="true">
      <path
        d="M22 226 H92 V156 H162 V86 H226"
        stroke={stroke}
        strokeWidth="15"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <circle cx="226" cy="86" r="17" fill={dot} />
    </svg>
  )
}
