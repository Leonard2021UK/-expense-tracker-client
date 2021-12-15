import {useMemo} from "react";

export const usePagination = (
        {
            total,
            pageSize,
            sideSize,
            gapSize,
            currentPage,
            thresholdIndex,
            currentRange

        }
    ) =>{

    const range = (start,end) =>{
        const length = end - start + 1;
        return Array.from({length},(_,index)=> index + start);
    }

    return useMemo(() => {
        const GAP = "GAP"
        const totalPageCount = Math.ceil(total / pageSize);
        console.log("totalPageCount ",totalPageCount)
        console.log("sideSize ",sideSize)
        console.log("Math.ceil(sideSize/2) ",Math.ceil(sideSize/2))
        console.log("currentPage - Math.ceil(sideSize/2) ",currentPage - Math.ceil(sideSize/2))
        console.log(((currentPage - Math.ceil(sideSize/2)) > 0) ? currentPage - Math.ceil(sideSize/2) : 0)
        const numberPagesToRight = totalPageCount - currentPage;
        let rightRange = [];
        let leftRange = [];

        // number of pages does not exceeds the size of the left side
        if (totalPageCount <= sideSize) {
            return range(1, totalPageCount)
        }


        if(totalPageCount < sideSize*2 ){
            let LStart = (currentPage - Math.ceil(sideSize/2) <= 0) ? 1 : currentPage - Math.ceil(sideSize/2);
            let LEnd = sideSize + LStart - 1
            let maxLStart = Math.max(Math.min(LStart, totalPageCount - sideSize+1), 1 );
            console.log("maxLStart ", maxLStart)
            let maxLEnd = Math.min(Math.max(LEnd, 1), totalPageCount );
            console.log("maxLEnd ", maxLEnd)

            leftRange = range(maxLStart,maxLEnd);
            rightRange = range(maxLEnd + 2 ,totalPageCount);

            if (maxLEnd === totalPageCount){
                return [...leftRange,...rightRange]
            }

        }

        if(totalPageCount === sideSize*2 ){
            let LStart = (currentPage - Math.ceil(sideSize/2) <= 0) ? 1 : currentPage - Math.ceil(sideSize/2);
            let LEnd = sideSize + LStart - 1
            let maxLStart = Math.max(Math.min(LStart, totalPageCount - sideSize+1), 1 );

            let maxLEnd = Math.min(Math.max(LEnd, 1), totalPageCount );
            leftRange = range(maxLStart,maxLEnd);
            rightRange = range(maxLEnd + 2 ,totalPageCount);

            if (maxLEnd === totalPageCount){
                return [...leftRange,...rightRange]
            }
        }

        if(totalPageCount > sideSize*2 ){
            // leftRange = range(1,sideSize);
            // rightRange = range(totalPageCount -  sideSize+1,totalPageCount);
            let LStart = (currentPage - Math.ceil(sideSize/2) <= 0) ? 1 : currentPage - Math.ceil(sideSize/2);
            let LEnd = sideSize + LStart - 1
            let maxLStart = Math.max(Math.min(LStart, totalPageCount - sideSize+1), 1 );
            console.log("maxLStart ", maxLStart)
            let maxLEnd = Math.min(Math.max(LEnd, 1), totalPageCount );
            console.log("maxLEnd ", maxLEnd)
            leftRange = range(maxLStart,maxLEnd);

            if(totalPageCount - LStart > sideSize*2){
                rightRange = range(totalPageCount-sideSize  ,totalPageCount);
            }else if(totalPageCount - LStart === sideSize*2){
                rightRange = range(totalPageCount-sideSize+1  ,totalPageCount);
            }else{
                rightRange = range(totalPageCount-sideSize+1  ,totalPageCount);
            }

            if (maxLEnd === totalPageCount){
                return [...leftRange,...rightRange]
            }
        }


        // // are there more pages than the number we want to show (1-2-3-4 ... 15-16-17-18) siblingSize(4) - 4 or more
        // if(numberPagesToRight > sideSize){
        //     let rightRange = [];
        //     let leftRange = [];
        //
        //
        //
        //
        //
        //
        //
        //     // if the number of pages are enough to show sideSize on both sides then calculate the right range
        //     // which is the last siblingSize items from total
        //     if((totalPageCount - sideSize) > sideSize){
        //         if(currentPage < thresholdIndex){
        //             leftRange = range(1,sideSize);
        //         }else{
        //             leftRange = range(currentPage-(Math.floor(sideSize/2)),currentPage+(Math.floor(sideSize/2)));
        //         }
        //         leftRange = range(currentPage - (sideSize - 3) ,sideSize);
        //             rightRange = range((totalPageCount-sideSize)+1,totalPageCount);
        //
        //
        //
        //     }else{
        //         // if the number of pages are NOT enough to show siblingSize on both sides then calculate the right range
        //         // which is the last siblingSize items plus a gap (1-2-3-4...6) number 5-is the gap
        //         // right side is less than the siblingSize bigger than zero
        //         // right max is always the totalPageCount
        //         if((totalPageCount - sideSize) > 1){
        //             if(currentPage < thresholdIndex){
        //                 leftRange = range(1,sideSize);
        //             }else{
        //                 leftRange = range(currentPage-(Math.floor(sideSize/2)),currentPage+(Math.floor(sideSize/2)));
        //             }
        //
        //             if(leftRange[sideSize-1] < totalPageCount-(totalPageCount-sideSize)){
        //                 rightRange = range(totalPageCount-(totalPageCount-sideSize),totalPageCount);
        //
        //             }else{
        //                 rightRange = range(leftRange[sideSize-1]+2 ,totalPageCount);
        //
        //             }
        //         }
        //     }
        //
        //
            return [...leftRange,GAP,...rightRange]
        //
        // }
    }, [total, pageSize, sideSize, gapSize, currentPage,thresholdIndex,currentRange]);
}