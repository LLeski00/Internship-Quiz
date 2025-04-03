import { Timer as TimerInterface } from "@/types/timer";
import { FC, useEffect, useState } from "react";

interface TimerProps {
    timer: TimerInterface;
    setTimer: Function;
}

const Timer: FC<TimerProps> = ({ timer, setTimer }) => {
    const [intervalId, setIntervalId] = useState<number>();

    useEffect(() => {
        startTimer();
        return clearInterval(intervalId);
    }, []);

    function startTimer() {
        const newIntervalId = setInterval(() => {
            if (timer.seconds === 59)
                setTimer((prev: TimerInterface) => ({
                    minutes: prev.minutes + 1,
                    seconds: 0,
                }));
            else
                setTimer((prev: TimerInterface) => ({
                    ...prev,
                    seconds: prev.seconds + 1,
                }));
        }, 1000);
        setIntervalId(newIntervalId);
    }

    return (
        <p>
            {timer.minutes} : {timer.seconds}
        </p>
    );
};

export default Timer;
