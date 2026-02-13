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
            <>
                <h2 className="text-2xl font-bold">Characters</h2>
                <p className="mb-3">A list of all characters:</p>
                {characters.map((character) => {
                    const id = character.url.split('/').at(-1);
                    return (
                        <div key={`character-${id}`} className="border-black border-2 rounded-md mb-4 p-2 w-150">
                            <p>Name: {character.name}</p>
                            <p>Gender: {character.gender}</p>
                            <p>Culture: {character.aliases.length > 0 ? character.aliases[0] : 'None'}</p>
                            <Link type="button" href={`/characters/${id}`} className="bg-gray-300 border-1 border-black rounded-md p-1 my-1 w-25 inline-block">View details</Link>
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
            </>
        );
    } else {
        return (
            <>Could not load characters.</>
        );
    }
}
