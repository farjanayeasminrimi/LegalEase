export default function Loading() {
    return (
        <div className="min-h-screen w-full bg-zinc-950 text-white flex items-center justify-center">
            <div className="space-y-3 text-center">
                <div className="h-10 w-10 mx-auto border-4 border-white/20 border-t-white rounded-full animate-spin" />
                <p className="text-sm text-white/60">Loading...</p>
            </div>
        </div>
    );
}