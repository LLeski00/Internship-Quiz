import { useContext } from "react";
import { TimerContext, TimerContextType } from "@/contexts";

export const useTimer = (): TimerContextType => {
    const context = useContext(TimerContext);

    if (!context) {
        throw new Error("useTimer must be used within a TimerProvider");
    }

    return context;
};
