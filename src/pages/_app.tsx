import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import AuthWrapper from "../auth/AuthWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserProvider } from "../auth/UserContext";
import "../theme/theme.css";
import "../styles/globals.css";
import "primeicons/primeicons.css";
import OrganizationWrapper from "../auth/OrganizationWrapper";
import Providers from "../Context/Providers";
import PrimeReact from "primereact/api";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  PrimeReact.appendTo = "self";
  PrimeReact.ripple = true;
  const queryClient = new QueryClient();
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <AuthWrapper>
          <UserProvider>
            <OrganizationWrapper>
              <Providers>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
              </Providers>
            </OrganizationWrapper>
          </UserProvider>
        </AuthWrapper>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
