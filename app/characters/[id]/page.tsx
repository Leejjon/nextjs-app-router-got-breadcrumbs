import Link from "next/link";

type CharacterPageProps = {
    params: {
        id: string;
    };
};

type CharacterDetails = {
    url: string;
    name: string;
    gender: string;
    culture: string;
    born: string;
    died: "";
    titles: string[];
    aliases: string[];
    father: string;
    mother: string;
    spouse: string;
    allegiances: string[];
    books: string[];
    povBooks: string[];
    tvSeries: string[];
    playedBy: string[];
};

export default async function CharacterPage(props: CharacterPageProps) {
    const {id} = await props.params;
    const response = await fetch(
        `https://www.anapioficeandfire.com/api/characters/${id}`,
    );

    if (response.ok) {
        const character = await response.json() as CharacterDetails;
        const id = character.url.split('/').at(-1);
        return (
            <>
                <h2 className="text-2xl font-bold">{character.name}</h2>
                <p><b>Gender:</b> {character.gender}</p>
                <p><b>Culture:</b> {character.culture}</p>
                <p><b>Born:</b> {character.born}</p>
                <p><b>Died:</b> {character.died}</p>
                <p><b>Titles:</b></p>
                <ul>
                    {character.titles.map((title) => <li key={`title${title}`}>- {title}</li>)}
                </ul>
                <p><b>Aliases:</b></p>
                <ul>
                    {character.aliases.map((alias) => <li key={`alias${alias}`}>- {alias}</li>)}
                </ul>
                <p><b>Father:</b> {character.father.split('/').at(-1)}</p>
                <p><b>Mother:</b> {character.mother.split('/').at(-1)}</p>
                <p><b>Spouse:</b> {character.spouse.split('/').at(-1)}</p>
                <p><b>Allegiances:</b></p>
                <ul>
                    {character.allegiances.map((allegiance) => <li key={`allegiance${allegiance.split('/').at(-1)}`}>- {allegiance.split('/').at(-1)}</li>)}
                </ul>
                <p><b>Books:</b></p>
                <ul>
                    {character.books.map((book) => <li key={`book${book.split('/').at(-1)}`}>- {book.split('/').at(-1)}</li>)}
                </ul>
                <p><b>Pov books:</b></p>
                <ul>
                    {character.povBooks.map((povBook) => <li key={`povBook${povBook.split('/').at(-1)}`}>- {povBook.split('/').at(-1)}</li>)}
                </ul>
                <p><b>Tv series:</b></p>
                <ul>
                    {character.tvSeries.map((tvSeries) => <li key={`tvSeries${tvSeries}`}>- {tvSeries}</li>)}
                </ul>
                <p><b>Played by:</b></p>
                <ul>
                    {character.playedBy.map((playedBy) => <li key={`playedBy${playedBy}`}>- {playedBy}</li>)}
                </ul>
                <br/>
                <Link type="button"
                      className="bg-gray-300 border-1 border-black rounded-md p-2 m-1 w-40"
                      href="../characters">Back to characters
                </Link>
            </>
        );
    } else {
        return (
            <>Could not load character. Go back to <Link href="/characters">character</Link>s.</>
        );
    }
}
