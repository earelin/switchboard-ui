import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";
import { MemoryRouter } from "react-router-dom";

const queryClient = new QueryClient();

type Props = {
  children: ReactNode
}

export default function TestApp(props: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        {props.children}
      </MemoryRouter>
    </QueryClientProvider>
  );
}
