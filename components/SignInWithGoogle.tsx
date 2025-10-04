import { useAuthActions } from "@convex-dev/auth/react";
import { GoogleLogo } from "@/public/GoogleLogo";
import { Button } from "@chakra-ui/react"

export default function SignInWithGoogle() {
  const { signIn } = useAuthActions();
  return (
    <Button variant="outline" onClick={() => void signIn("google")}>
      <GoogleLogo /> Sign in with Google
    </Button>
  );
}
