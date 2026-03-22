import { memo, type ReactNode } from "react";
import { cn } from "../scripts/cn.ts";

export type WordCardData = {
    word: string;
    isAdded: boolean;
    className?: string;
    translation: string;
}

const WordCard = (props: WordCardData): ReactNode => {
    return (
        <div className={cn("" +
            "group relative rounded-3xl " +
            "border border-border bg-background-secondary/70 backdrop-blur-xl " +
            "p-5 transition-all duration-300 " +
            "hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]" +
            "min-h-30 h-full flex flex-col justify-center",
            props.className)}
        >
            <div className='relative flex justify-between items-center gap-5'>
                {/* LEFT CONTENT */}
                <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-xl text-foreground">
                        {props.word}
                    </h2>
                    <p className='font-semibold text-md text-foreground-muted'>{props.translation}</p>
                </div>

                {/* RIGHT STATUS DOT */}
                <div className="flex items-start">
                    <span
                        className={`
                        relative
                        h-3 w-3
                        rounded-full
                        transition-all duration-300
                        ${props.isAdded ? "bg-success" : "bg-danger"}
                        shadow-[0_0_10px_rgba(0,0,0,0.2)]
                        group-hover:scale-110
                        `}
                    >
                        {/* glow effect */}
                        <span
                            className={`
                            absolute inset-0 rounded-full blur-sm opacity-70
                            ${props.isAdded ? "bg-success" : "bg-danger"}
                            `}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default memo(WordCard);