import { Providers } from "@app/providers";
import { AppRouter } from "@app/routers/appRouter";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Providers>
      <>
        <AppRouter />
        <ToastContainer />
      </>
    </Providers>
  );
}

export default App;
