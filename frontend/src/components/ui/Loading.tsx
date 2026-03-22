import type { ReactNode } from "react";

const Loading = (): ReactNode => {
    return (
        <div className="flex min-h-[40vh] items-center justify-center">
            <div className="
        inline-flex items-center gap-3
        rounded-full
        border border-border
        bg-background-secondary
        backdrop-blur-xl
        px-6 py-3
        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
      ">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"/>
                <span className="text-sm text-foreground/80">
          Loading...
        </span>
            </div>
        </div>
    );
};

export default Loading;