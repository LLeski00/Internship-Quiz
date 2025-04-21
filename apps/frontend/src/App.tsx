import QuizRouter from "@/router/QuizRouter";
import { QuizProvider } from "./contexts/quiz";
import { TimerProvider } from "./contexts/timer";

function App() {
    return (
        <QuizProvider>
            <TimerProvider>
                <QuizRouter />
            </TimerProvider>
        </QuizProvider>
    );
}

export default App;
