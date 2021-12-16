import {Pagination} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {usePagination} from "../../customHooks/usePagination";

function CustomPagination(props) {

    const {data,setCurrentPageContent} = props;
    console.log("PAGINATION DATA ",data)
    const [currentPage, setCurrentPage] = useState(1)

    let option = {
        total: data.length,
        pageSize: 10,
        currentPage:currentPage,
        maxNumberOfTiles:16
    }

    let paginationRange = usePagination(option);

    const getCurrenPageData = ()=>{

        let start, end;
        if(currentPage === 1) {

            return data.slice(currentPage - 1, currentPage - 1 + option.pageSize);
        }
        else if(currentPage > 1){

            start = (currentPage - 1) * option.pageSize;
            end = start + option.pageSize;
            return data.slice(start,end);
        }

    }

    useEffect(()=>{
        setCurrentPageContent(getCurrenPageData())
    },[currentPage,data])

    const handleFirstPage = ()=>{
        setCurrentPage(1)
    }
    const handlePreviousPage = ()=>{
        setCurrentPage(currentPage - 1)
    }
    const handleNextPage = ()=>{
        setCurrentPage(currentPage + 1)

    }
    const handleLastPage = ()=>{
        // total number of pages
        const totalPageCount = Math.ceil(option.total / option.pageSize);
        setCurrentPage(totalPageCount)
    }

    const handleCurrent = (item)=>{
        setCurrentPage(item)
    }
    return (
        <Pagination>
            <Pagination.First disabled={paginationRange[currentPage-1] === 1}  onClick={handleFirstPage}/>
            <Pagination.Prev disabled={paginationRange[currentPage-1] === 1}    onClick={handlePreviousPage}/>
            {
                paginationRange.map((item => {
                    let isActive = item === currentPage
                    return (item === "GAP") ? <Pagination.Ellipsis/> : <Pagination.Item active ={isActive} onClick={handleCurrent.bind(this,item)} >{item}</Pagination.Item>
                }))
            }
            <Pagination.Next disabled={paginationRange[currentPage-1] === paginationRange.length} onClick={handleNextPage}/>
            <Pagination.Last disabled={paginationRange[currentPage-1] === paginationRange.length}  onClick={handleLastPage}/>
        </Pagination>
    )
}

export default CustomPagination;