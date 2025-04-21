import QuizRouter from "@/router/QuizRouter";
import { QuizProvider } from "./contexts/quiz";
import { TimerProvider } from "./contexts/timer";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <QuizProvider>
            <TimerProvider>
                <Toaster />
                <QuizRouter />
            </TimerProvider>
        </QuizProvider>
    );
}

export default App;
