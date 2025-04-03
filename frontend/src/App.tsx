import QuizRouter from "@/router/QuizRouter";
import { QuizProvider } from "./contexts/quiz";

function App() {
    return (
        <QuizProvider>
            <QuizRouter />;
        </QuizProvider>
    );
}

export default App;
