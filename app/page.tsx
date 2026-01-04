import Link from "next/dist/client/link";

export default function Home() {
    return (
        <div className="grid grid-cols-12 min-h-screen grid-rows-[auto_1fr]">
            <div id="header" className="col-span-12 border-b-2 border-black">
                <h1 className="text-6xl font-bold text-center m-2">My Pokémon Game</h1>
            </div>
            <div id="navbar" className="p-2 border-r-2 border-black col-span-2 flex flex-col gap-2">
                <Link href="/">Wilderness</Link>
                <Link href="/pokedex">Pokédex</Link>
                <Link href="/team">Your Pokémon</Link>
            </div>
            <div id="content" className="col-span-10 p-2">
                <h2 className="text-2xl font-bold">Wilderness</h2>
                <p>A wild &lt;insert pokemon here&gt; appeared.</p>
            </div>
        </div>
    );
}
