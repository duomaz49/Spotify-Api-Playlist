import { SearchResultProps } from "../util/types.ts";
import Tracks from "./Tracks.tsx";


export default function TrackList({ searchResults, isRemoval, onAdd, onRemove }: SearchResultProps) {

    return (
        <>
            {searchResults.map((track: any) => {
                return (
                    <Tracks
                        track={track}
                        key={track?.id}
                        isRemoval={isRemoval}
                        onAdd={onAdd}
                        onRemove={onRemove}
                    />
                )
            })}
        </>
    )
}

