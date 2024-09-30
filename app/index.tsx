import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DailyHabits from "@/src/screens/DailyHabits";

const queryClient = new QueryClient();

export default function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <DailyHabits />
    </QueryClientProvider>
  );
}
