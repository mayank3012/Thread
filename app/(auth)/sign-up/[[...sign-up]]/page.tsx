import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <SignUp
                appearance={dark} />;
        </div>
    )
}