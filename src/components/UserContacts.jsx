import { Searchbar } from "./Partials/Navbar"

let isFullLength = true;

export const Followers = () => {
    return (
        <div className="absolute h-2/5 w-1/2 md:w-2/5  overflow-x-hidden noScrollbar top-32 left-40 rounded-3xl rounded-tr-none bg-background-secondary p-4 flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2 items-center">
                <h2 className="font-semibold text-lg">Followers</h2>
                <Searchbar isFullLength={isFullLength} />
            </div>
            <div className="overflow-y-auto">
                <p>Ramu</p>
                <p>Subesh</p>
                <p>Jack Daniels</p>
                <p>Peter</p>
                <p>Pulp</p>
                <p>Brad</p>
                <p>Fiction</p>
                <p>Electro</p>
                <p>Piro player</p>
            </div>
        </div>
    )
}