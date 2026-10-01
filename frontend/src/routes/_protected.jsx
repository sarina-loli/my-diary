import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { isLoggedIn } from "@/api/diary-storage";
export const Route = createFileRoute("/_protected")({
  ssr: false,
  beforeLoad: ({ location }) => {
    if (!isLoggedIn()) throw redirect({ to: "/login", search: { redirect: location.pathname } });
  },
  component: () => <Outlet />,
});
