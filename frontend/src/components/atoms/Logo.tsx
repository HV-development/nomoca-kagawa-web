"use client"

import Image from "next/image"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  className?: string
  onClick?: () => void
}

export function Logo({ size = "md", className = "", onClick }: LogoProps) {
  const sizeClasses = {
    sm: "h-4",
    md: "h-6",
    lg: "h-10",
    xl: "h-16",
    "2xl": "h-24",
    "3xl": "h-40",
  }

  const WrapperComponent = onClick ? "button" : "div"

  const pixelSizes = {
    sm: 16,
    md: 24,
    lg: 40,
    xl: 64,
    "2xl": 96,
    "3xl": 160,
  }

  return (
    <WrapperComponent
      onClick={onClick}
      className={`flex items-center ${onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""} ${className}`}
    >
      <Image
        src="/logo.svg"
        alt="TAMAYOI"
        width={pixelSizes[size] * 6}
        height={pixelSizes[size]}
        className={`${sizeClasses[size]} object-contain`}
      />
    </WrapperComponent>
  )
}
