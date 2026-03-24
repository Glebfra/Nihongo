import { type ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { LibraryBig, WholeWord } from "lucide-react";
import { InlineDropdown, InlineDropdownItem } from "../components/ui/InlineDropdown.tsx";
import WordCard from "../components/WordCard.tsx";

const DictionaryType = {
    SYSTEM: "SYSTEM",
    CUSTOM: "CUSTOM",
}

type DictionaryData = {
    id: number;
    name: string;
    type: string;
}

type WordData = {
    id: number;
    original: string;
    furigana: string;
    english: string;
}

type WordsData = {
    items: WordData[];
    total: number;
    hasNext: boolean;
}

const Dictionary = (): ReactNode => {
    const [ dictionaries, setDictionaries ] = useState<DictionaryData[]>([]);
    const [ selectedDictionary, setSelectedDictionary ] = useState<number | null>(null);
    const [ wordsData, setWordsData ] = useState<WordsData | null>(null);
    const [ page, setPage ] = useState<number>(1);

    const fetchDictionaries = async () => {
        const response = await axios.post("http://localhost:8000/dictionary/graphql", {
            // language=GraphQL
            query: `query AllDictionaries {
                dictionary {
                    id name type
                }
            }`,
            operationName: "AllDictionaries"
        });

        const data = response.data;
        const graphQlDictionaryResult: DictionaryData[] = data.data?.dictionary;
        const systemDictionaries: DictionaryData[] = graphQlDictionaryResult.filter(res => res.type === DictionaryType.SYSTEM)
        setDictionaries(systemDictionaries.sort(
            (res1, res2) => res1.id - res2.id)
        );
    };

    const fetchWords = async (page: number, dictionaryId: number) => {
        const response = await axios.post("http://localhost:8000/dictionary/graphql", {
            // language=GraphQL
            query: `query Dictionary($dictionaryId: Int!, $page: Int!) {
                dictionary(id: $dictionaryId) {
                    id name wordsPaginated(page: $page) {
                        items {
                            id original furigana english
                        } hasNext total
                    }
                }
            }`,
            operationName: "Dictionary",
            variables: {
                dictionaryId: dictionaryId,
                page: page
            }
        });

        const data = response.data;
        const wordsPaginated: WordsData = data.data?.dictionary[0].wordsPaginated;
        return wordsPaginated;
    };

    useEffect(() => {
        fetchDictionaries();
    }, []);

    useEffect(() => {
        if (selectedDictionary === null) {
            setWordsData(null);
        } else {
            if (page === 1)
                setWordsData(null);
            const words = fetchWords(page, selectedDictionary);
            words.then(word => setWordsData(prev => {
                return {
                    hasNext: word.hasNext,
                    items: [
                        ...prev?.items ?? [],
                        ...word.items
                    ],
                    total: word.total,
                };
            }));
        }
    }, [ selectedDictionary, page ]);

    return (
        <div className="flex justify-between px-6 w-full">
            <div className="flex gap-10 max-w-6xl w-full">

                {/* Menu */}
                <div className="inline-flex">
                    <div className="font-bold text-md">
                        <InlineDropdown
                            data-selected={selectedDictionary !== null}
                            label="Dictionaries" icon={<LibraryBig/>}
                            className="text-lg m-2 hover:text-primary-hover
                            data-[selected=true]:text-primary
                            transition-all duration-300"
                        >
                            {dictionaries.map(dictionary => (
                                <InlineDropdownItem
                                    key={dictionary.id}
                                    data-selected={selectedDictionary === dictionary.id}
                                    className="text-md text-foreground-muted hover:text-primary-hover
                                    data-[selected=true]:text-primary
                                    transition-all duration-300"
                                >
                                    <button
                                        className="w-full text-left"
                                        onClick={() => {
                                            setSelectedDictionary(prev =>
                                                prev != dictionary.id ? dictionary.id : null
                                            );
                                            setPage(1);
                                        }}
                                    >
                                        {dictionary.name}</button>
                                </InlineDropdownItem>
                            ))}
                        </InlineDropdown>

                        <button
                            className="m-2 inline-flex justify-center items-center gap-2
                            text-lg text-foreground hover:text-primary-hover
                            transition-all duration-300"
                        >
                            <span className="p-1 m-1"><WholeWord/></span>
                            <h2 className="py-1 my-1">Add word</h2>
                        </button>
                    </div>
                    <div className="m-3 border-border border-r-2"/>
                </div>

                {/* Main content */}
                <div className="block w-full">
                    {wordsData &&
                        <h2 className="p-2 m-5 text-lg font-bold text-foreground">
                            Words count: {wordsData.total}
                            <span className="ml-2 text-foreground-muted">({wordsData.items.length})</span>
                        </h2>
                    }

                    <div className="grid gap-6 auto-rows-fr grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                        {wordsData && wordsData.items.map((word) => (
                            <WordCard
                                className="text-left"
                                key={word.id}
                                isAdded={false}
                                word={`${word.original} [${word.furigana}]`}
                                translation={word.english}
                            />
                        ))}
                    </div>

                    {wordsData && wordsData.hasNext &&
                        <button
                            onClick={() => setPage(prev => prev + 1)}
                            className="w-full font-bold text-xl my-10
                            text-foreground hover:text-primary-hover
                            transition-all duration-300"
                        >
                            Load more
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Dictionary;