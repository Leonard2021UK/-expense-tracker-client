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

        const totalPageCount = Math.ceil(total / pageSize);

        if (totalPageCount <= siblingsSize) {
            return range(1, totalPageCount)
        }

        if(totalPageCount > siblingsSize){
            console.log(totalPageCount-(totalPageCount-siblingsSize)+1)
            let rightRange = 0;
            if(totalPageCount - siblingsSize > siblingsSize){
                rightRange = range((totalPageCount-siblingsSize)+1,totalPageCount);
            }else{
                rightRange = range(totalPageCount-(totalPageCount-siblingsSize)+1,totalPageCount);
            }

            let leftRange = range(currentPage,siblingsSize);
            return [...leftRange,GAP,...rightRange]


        }
    }, [total, pageSize, siblingsSize, gapSize, currentPage]);
}