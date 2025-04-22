import QuizRouter from "@/router/QuizRouter";
import { QuizProvider } from "./contexts/quiz";
import { TimerProvider } from "./contexts/timer";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <QuizProvider>
                <TimerProvider>
                    <Toaster />
                    <QuizRouter />
                </TimerProvider>
            </QuizProvider>
        </QueryClientProvider>
    );
}

export default App;
