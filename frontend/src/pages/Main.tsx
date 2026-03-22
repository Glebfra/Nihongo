import { PillCard, PillCardAction, PillCardContent } from "../components/ui/PillCard.tsx";

const Main = () => {
    return (
        <div className="flex justify-center">
            <PillCard>
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"/>
                <PillCardContent>
                    Beautiful floating pill card component
                </PillCardContent>
                <PillCardAction>
                    Open
                </PillCardAction>
            </PillCard>
        </div>
    );
};

export default Main;