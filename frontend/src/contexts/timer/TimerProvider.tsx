import { FC, PropsWithChildren, useEffect, useState } from "react";
import { TimerContext } from "./TimerContext";
import { Timer } from "@/types";

export const TimerProvider: FC<PropsWithChildren> = ({ children }) => {
    const [timer, setTimer] = useState<Timer>({ minutes: 0, seconds: 0 });
    const [intervalId, setIntervalId] = useState<number | null>(null);

    const startTimer = () => {
        const intervalId = setInterval(() => {
            if (timer.seconds === 59)
                setTimer((prev) => ({ minutes: prev.minutes + 1, seconds: 0 }));
            else setTimer((prev) => ({ ...prev, seconds: prev.seconds + 1 }));
        }, 1000);
        setIntervalId(intervalId);
    };

    const stopTimer = () => {
        if (!intervalId) {
            console.error("The timer is off");
            return;
        }
        clearInterval(intervalId);
    };

    return (
        <TimerContext.Provider
            value={{
                timer,
                setTimer,
                startTimer,
                stopTimer,
            }}
        >
            {children}
        </TimerContext.Provider>
    );
};
