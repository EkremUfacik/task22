"use client";
import { useAuthContext } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (Component: React.FC) => {
  const Auth: React.FC = (props) => {
    const router = useRouter();
    const { user } = useAuthContext();

    const userIsAuthenticated = user !== null;

    useEffect(() => {
      if (!userIsAuthenticated) {
        router.push("/login");
      }
    }, [userIsAuthenticated, router]);

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
