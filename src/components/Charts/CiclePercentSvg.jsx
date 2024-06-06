const CiclePercentSvg = ({ percentage }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;

  // Calcular el strokeDashoffset basado en el porcentaje
  const strokeDashoffset =
    circumference - (Math.abs(percentage) / 100) * circumference;

  return (
    <svg width="70" height="70">
      <circle
        className="text-stroke dark:text-strokedark"
        strokeWidth="10"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="35"
        cy="35"
      />
      <circle
        className="text-primary"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="35"
        cy="35"
      />
    </svg>
  );
};

export default CiclePercentSvg;