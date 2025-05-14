"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface SaleCountdownProps {
  title?: string
  description?: string
  endDate: string
  className?: string
  showTitle?: boolean
}

export function SaleCountdown({
  title = "Limited Time Offer",
  description,
  endDate,
  className = "",
  showTitle = true,
}: SaleCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  return (
    <div className={`${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {showTitle && (
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            {description && <p className="text-sm opacity-90">{description}</p>}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <div className="flex items-center gap-1 text-sm">
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">{timeLeft.days.toString().padStart(2, "0")}</span>
              <span className="text-xs">Days</span>
            </div>
            <span className="text-lg font-bold">:</span>
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">{timeLeft.hours.toString().padStart(2, "0")}</span>
              <span className="text-xs">Hours</span>
            </div>
            <span className="text-lg font-bold">:</span>
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</span>
              <span className="text-xs">Mins</span>
            </div>
            <span className="text-lg font-bold">:</span>
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</span>
              <span className="text-xs">Secs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
