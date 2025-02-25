import { LoaderIcon } from "lucide-react";

const Loading = () => {
    return (
        <main className="flex items-center justify-center h-screen bg-transparent">
            <LoaderIcon size={60} className="animate-spin" />
        </main>
    );
}

export default Loading;