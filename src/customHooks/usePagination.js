import {useMemo} from "react";

/**
 *
 * @param total - total number of items in the collection
 * @param pageSize - number of items per page
 * @param currentPage - currently selected page
 * @param maxNumberOfTiles - max number of the tiles shown in pagination (numbers + gap)
 * @returns {Array} Array schema of tiles
 */
export const usePagination = (
        {
            total,
            pageSize,
            currentPage,
            maxNumberOfTiles
        }
    ) =>{

    const range = (start,end) =>{
        const length = end - start + 1;
        return Array.from({length},(_,index)=> index + start);
    }

    return useMemo(() => {
        // represents the gap in the array
        const GAP = "GAP"

        // total number of pages
        const totalPageCount = Math.ceil(total / pageSize);

        // size of the left and right size of the gap
        const sideSize = Math.floor(maxNumberOfTiles/2);
        let rightRange = [];
        let leftRange = [];

        // number of pages does not exceeds the size of the left side
        if (totalPageCount <= sideSize) {
            return range(1, totalPageCount)
        }
        // left side starting index
        let LStart = (currentPage - Math.ceil(sideSize/2) <= 0) ? 1 : currentPage - Math.ceil(sideSize/2);

        // left side end index
        let LEnd = sideSize + LStart - 1

        //set maximums
        // - [totalPageCount] for LEnd
        // - [totalPageCount - sideSize + 1] for maxLStart
        let maxLStart = Math.max(Math.min(LStart, totalPageCount - sideSize + 1), 1 );
        let maxLEnd = Math.min(Math.max(LEnd, 1), totalPageCount );

        // sets left range
        leftRange = range(maxLStart,maxLEnd);

        // if the remaining page numbers relative to the starting index is more than the maximum number of tiles
        // then set right side to the size of the sideSize and add GAP
        if(totalPageCount - maxLStart > maxNumberOfTiles){
            rightRange = range(totalPageCount-sideSize+1  ,totalPageCount);

            return [...leftRange,GAP,...rightRange]

        }else if(totalPageCount - maxLStart <= maxNumberOfTiles){
            // if the remaining page numbers relative to the starting index is less than the maximum number of tiles
            // then set right side to the size of the sideSize
            rightRange = range(maxLEnd+1 ,totalPageCount);

            return [...leftRange,...rightRange]

        }

            // return [...leftRange,GAP,...rightRange]
    }, [total, pageSize, currentPage,maxNumberOfTiles]);
}