interface LogoProps {
  color?: 'black' | 'white';
}

export function Logo({ color = 'black' }: LogoProps) {
  const colorClass =
    color === 'white'
      ? 'text-(--color-neutrals-bg-canvas)'
      : 'text-(--color-neutrals-content)';

  return (
    <div className={`w-[113px] h-[60px] flex items-center ${colorClass}`}>
      <svg
        width={24}
        height={24}
        viewBox="0 0 20.6768 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Logo"
        role="img"
      >
        <path
          fill="currentColor"
          fillRule="nonzero"
          d="M 0 0.653407 L 0 13.47986 C 0 19.00453 4.51166 23.83662 10.03391 23.99515
             C 15.98437 24.16624 20.84305 19.30756 20.67244 13.3571
             C 20.51392 7.83437 15.68231 3.3227 10.15716 3.3227
             L 9.41431 3.3227
             C 8.98465 3.3227 8.67196 3.73062 8.7836 4.14577
             L 9.97302 8.56754
             C 9.97398 8.57189 9.97785 8.57479 9.9822 8.57479
             L 10.22675 8.57479
             C 12.88107 8.57479 15.15985 10.59549 15.33288 13.24449
             C 15.53055 16.27433 13.03089 18.77399 10.00105 18.57535
             C 7.35301 18.40185 5.33231 16.12306 5.33231 13.46874
             L 5.33231 1.87085
             C 5.33231 1.5828 5.14382 1.32907 4.86834 1.24546
             L 0.8424 0.02849
             C 0.42289 -0.09862 0 0.21553 0 0.653407 Z"
        />
      </svg>
    </div>
  );
}
