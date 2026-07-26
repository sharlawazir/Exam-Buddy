import { RouterProvider, useRouter } from '@/router/Router';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LandingPage } from '@/pages/LandingPage';
import { AssistantPage } from '@/pages/AssistantPage';
import { QuizPage } from '@/pages/QuizPage';
import { NotesPage } from '@/pages/NotesPage';
import { PlannerPage } from '@/pages/PlannerPage';
import { MotivationPage } from '@/pages/MotivationPage';
import { AboutPage } from '@/pages/AboutPage';

function CurrentPage() {
  const { route } = useRouter();

  switch (route) {
    case 'home':
      return <LandingPage />;
    case 'assistant':
      return <AssistantPage />;
    case 'quiz':
      return <QuizPage />;
    case 'notes':
      return <NotesPage />;
    case 'planner':
      return <PlannerPage />;
    case 'motivation':
      return <MotivationPage />;
    case 'about':
      return <AboutPage />;
    default:
      return <LandingPage />;
  }
}

function App() {
  return (
    <RouterProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <CurrentPage />
        </main>
        <Footer />
      </div>
    </RouterProvider>
  );
}

export default App;
