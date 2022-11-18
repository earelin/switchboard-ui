import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";

const queryClient = new QueryClient();

type Props = {
  children: ReactNode
}

export default function TestApp(props: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
