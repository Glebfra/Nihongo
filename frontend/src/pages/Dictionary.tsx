import { type ReactNode, use, useState } from "react";
import axios from "axios";
import { Languages, WholeWord } from "lucide-react";
import { InlineDropdown, InlineDropdownItem } from "../components/ui/InlineDropdown.tsx";
import WordCard from "../components/WordCard.tsx";

type LanguageData = {
    id: number;
    name: string;
}

type KanjiData = {
    kanji: string;
    words: {
        word: string;
        translations: {
            word: string;
        }[];
    }[];
}

const kanjisPromise = new Promise(async (resolve, reject) => {
    try {
        const response = await axios.post("http://localhost:8000/dictionary/graphql", {
            query: "query AllKanjis($page: Int!) { allKanjis(page: $page) { kanji words { word translations { word } } } }",
            operationName: "AllKanjis",
            variables: {
                page: 1
            }
        });
        const data = response.data;
        const graphQlAllKanjisResult = data.data?.allKanjis;
        resolve(graphQlAllKanjisResult);

        return graphQlAllKanjisResult;
    } catch (err) {
        reject(err);
    }
}).catch((err) => {
    console.log(err);
});

const languagesPromise = new Promise(async (resolve, reject) => {
    try {
        const response = await axios.post("http://localhost:8000/dictionary/graphql", {
            query: "query AllLanguages { allLanguages { id name } }",
        });
        const data = response.data;
        const graphQlLanguageResult = data.data?.allLanguages;
        resolve(graphQlLanguageResult);

        return graphQlLanguageResult;
    } catch (err) {
        reject(err);
    }
}).catch(err => {
    console.log(err);
});

const Dictionary = (): ReactNode => {
    const languagesData: LanguageData[] = use(languagesPromise) as LanguageData[];
    const kanjisData: KanjiData[] = use(kanjisPromise) as KanjiData[];

    const [ selectedLanguage, setSelectedLanguage ] = useState<number | null>(null);

    return (
        <div className="flex justify-between px-6">
            <div className="flex gap-10 max-w-6xl">

                {/* Menu */}
                <div className="inline-flex">
                    <div className="font-bold text-md">
                        <InlineDropdown label="Languages" icon={<Languages/>}
                                        className="text-lg m-2 hover:text-primary-hover transition-all duration-300">
                            {languagesData && languagesData.map(language => (
                                <InlineDropdownItem
                                    key={language.id} onClick={() => setSelectedLanguage(language.id)}
                                    data-selected={selectedLanguage === language.id}
                                    className="text-md text-foreground-muted hover:text-primary-hover
                                    data-[selected=true]:text-primary
                                    transition-all duration-300">
                                    {language.name}
                                </InlineDropdownItem>
                            ))}
                        </InlineDropdown>

                        <button
                            className="m-2 inline-flex justify-center items-center gap-2
                            text-lg text-foreground hover:text-primary-hover
                            transition-all duration-300">
                            <span className="p-1 m-1"><WholeWord/></span>
                            <h2 className="py-1 my-1">Add word</h2>
                        </button>
                    </div>
                    <div className="m-3 border-border border-r-2"/>
                </div>

                {/* Main Content */}
                <div className='w-full'>
                    <div className='grid grid-cols-[minmax(250px, 1fr)] gap-10'>
                        {kanjisData.map(kanji => (
                            <WordCard
                                word={kanji.kanji}
                                isAdded={false}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dictionary;