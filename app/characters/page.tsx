import Link from 'next/link';

type SearchParams = {
    page: number;
    pageSize: number;
};

type Character = {
    url: string;
    name: string;
    gender: string;
    titles: string[];
    aliases: string[];
};

export default async function Characters({searchParams}: { searchParams: Promise<SearchParams> }) {
    const {page, pageSize} = await searchParams;

    const response = await fetch(
        `https://www.anapioficeandfire.com/api/characters?page=${page ?? 1}&pageSize=${pageSize ?? 5}`,
    );

    const enablePreviousButton = (page ? page > 1 : false);

    if (response.ok) {
        const characters = await response.json() as Character[];

        return (
            <div className="grid grid-cols-12 min-h-screen grid-rows-[auto_1fr]">
                <div id="header" className="col-span-12 border-b-2 border-black">
                    <h1 className="text-6xl font-bold text-center m-2">My Game of Thrones character app</h1>
                </div>
                <div id="navbar" className="p-2 border-r-2 border-black col-span-2 flex flex-col gap-2">
                    <Link href="/">Characters</Link>
                </div>
                <div id="content" className="col-span-10 p-2">
                    <h2 className="text-2xl font-bold">Characters</h2>
                    <p className="mb-3">A list of all characters:</p>
                    {characters.map((character) => {
                        const id = character.url.split('/').at(-1);
                        return (
                            <div key={`character-${id}`} className="border-black border-2 rounded-md mb-4 p-2 w-150">
                                <p>Name: {character.name}</p>
                                <p>Gender: {character.gender}</p>
                                <p>Culture: {character.aliases.length > 0 ? character.aliases[0] : 'None'}</p>
                            </div>
                        );
                    })}
                    <div className="w-150 text-center">
                        <Link
                            className="bg-gray-300 border-1 border-black rounded-md p-2 m-1 w-20"
                            style={{
                                pointerEvents: enablePreviousButton ? "auto" : "none",
                            }}
                            href={enablePreviousButton ? `/characters?page=${page - 1}` : "/characters"}>Previous
                        </Link>
                        <Link type="button"
                              className="bg-gray-300 border-1 border-black rounded-md p-2 m-1 w-20"
                              href={page ? `/characters?page=${+page + 1}` : "/characters?page=2"}>Next
                        </Link>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>Could not load characters.</div>
        );
    }
}
