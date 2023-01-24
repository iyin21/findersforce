import { useEffect, useState } from "react"

const timerStyles = {
    time: "mb-2 font-bold text-2xl lg:text-3xl",
    timeSectionTitle: "text-yellow-100 text-2md",
    divider: "text-yellow-100 text-3xl",
}

const TimeEstimate = ({ initialDate }: { initialDate: Date }) => {
    const [timeEstimate, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    const calculateTimeLeft = () => {
        // const countDownTime = new Date(initialDate).getTime()
        const currentDate = new Date().getTime()
        const timeLeft = new Date(initialDate).getTime() - currentDate
        const timeLeftInHours = Math.floor(
            (timeLeft % (1000 * 60 * 60)) / (1000 * 60 * 60)
        )
        const timeLeftInMinutes = Math.floor(
            (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
        )
        const timeLeftInSeconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

        if (timeLeft < 0) {
            setTimeLeft({
                hours: 0,
                minutes: 0,
                seconds: 0,
            })
        } else {
            setTimeLeft({
                hours: timeLeftInHours || 0,
                minutes: timeLeftInMinutes || 0,
                seconds: timeLeftInSeconds || 0,
            })
        }
    }

    useEffect(() => {
        const timer = setInterval(calculateTimeLeft, 1000)

        return () => clearInterval(timer)
    }, [initialDate])
    return (
        <div className="bg-black-100 text-yellow-100 rounded-xl px-3 py-1">
            <div className=" flex items-center gap-4 justify-center  ">
                <div className="flex flex-col items-center text">
                    <p aria-label="hours-left" className={timerStyles.time}>
                        {timeEstimate.hours || 0}
                    </p>
                </div>
                <p className={timerStyles.divider}>:</p>

                <div className="flex flex-col items-center">
                    <p aria-label="minutes-left" className={timerStyles.time}>
                        {timeEstimate.minutes || 0}
                    </p>
                </div>
                <p className={timerStyles.divider}>:</p>

                <div className="flex flex-col items-center">
                    <p aria-label="minutes-left" className={timerStyles.time}>
                        {timeEstimate.seconds || 0}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TimeEstimate
