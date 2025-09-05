import { SignUp } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-gray-900 to-black">
      <div className="w-full max-w-md mx-4">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-purple-400">
              Join FortuneAI
            </CardTitle>
            <CardDescription className="text-gray-300">
              Create your account to start your fortune telling journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUp
              appearance={{
                elements: {
                  formButtonPrimary: "w-full bg-purple-600 hover:bg-purple-700",
                  card: "shadow-none bg-transparent",
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
