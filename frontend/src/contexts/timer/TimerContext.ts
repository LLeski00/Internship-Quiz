import { Timer } from "@/types";
import { createContext } from "react";

export interface TimerContextType {
    timer: Timer;
    setTimer: React.Dispatch<React.SetStateAction<Timer>>;
    startTimer: () => void;
    stopTimer: () => void;
    resetTimer: () => void;
}

export const TimerContext = createContext<TimerContextType | undefined>(
    undefined
);
