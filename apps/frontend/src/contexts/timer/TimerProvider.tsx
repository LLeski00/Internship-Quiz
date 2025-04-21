import { FC, PropsWithChildren, useState, useRef } from "react";
import { TimerContext } from "./TimerContext";
import { Timer } from "@/types";

export const TimerProvider: FC<PropsWithChildren> = ({ children }) => {
    const [timer, setTimer] = useState<Timer>({ minutes: 0, seconds: 0 });
    const intervalRef = useRef<number | null>(null);

    const startTimer = () => {
        if (intervalRef.current) {
            console.log("The timer is already running");
            return;
        }

        const id = window.setInterval(() => {
            setTimer((prev) => {
                if (prev.seconds === 59) {
                    return { minutes: prev.minutes + 1, seconds: 0 };
                } else {
                    return { ...prev, seconds: prev.seconds + 1 };
                }
            });
        }, 1000);

        intervalRef.current = id;
    };

    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const resetTimer = () => {
        stopTimer();
        setTimer({ minutes: 0, seconds: 0 });
    };

    return (
        <TimerContext.Provider
            value={{
                timer,
                setTimer,
                startTimer,
                stopTimer,
                resetTimer,
            }}
        >
            {children}
        </TimerContext.Provider>
    );
};
