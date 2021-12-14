import {useMemo} from "react";

export const usePagination = (
        {
            total,
            pageSize,
            siblingsSize,
            gapSize,
            currentPage

        }
    ) =>{

    const GAP = "GAP"
    const range = (start,end) =>{
        const length = end - start + 1;
        return Array.from({length},(_,index)=> index + start);
    }

    return useMemo(() => {

        let leftRange = range(currentPage,siblingsSize);
        const totalPageCount = Math.ceil(total / pageSize);

        if (totalPageCount <= siblingsSize) {
            return range(1, totalPageCount)
        }
        // are there more pages than the number we want to show (1-2-3-4 ... 15-16-17-18) siblingSize(4) - 4 or more
        if(totalPageCount > siblingsSize){
            let rightRange = [];
            // if the number of pages are enough to show siblingSize on both sides then calculate the right range
            // which is the last siblingSize items from total
            if((totalPageCount - siblingsSize) > siblingsSize){

                    rightRange = range((totalPageCount-siblingsSize)+1,totalPageCount);



            }else{
                // if the number of pages are NOT enough to show siblingSize on both sides then calculate the right range
                // which is the last siblingSize items plus a gap (1-2-3-4...6) number 5-is the gap
                if((totalPageCount - siblingsSize) > 1){
                    rightRange = range(totalPageCount-(totalPageCount-siblingsSize)+2,totalPageCount);
                }
            }


            return [...leftRange,GAP,...rightRange]

        }
    }, [total, pageSize, siblingsSize, gapSize, currentPage]);
}