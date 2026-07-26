import { type SVGProps } from 'react';

export function Logo({ className = '', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3366ff" />
          <stop offset="1" stopColor="#2c377e" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#logo-g)" />
      <path
        d="M15 17h18M15 24h18M15 31h10"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="34" cy="31" r="4.5" fill="#8eb4ff" />
      <path
        d="M34 29.2v1.8M34 31.2v1.8"
        stroke="#2c377e"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
