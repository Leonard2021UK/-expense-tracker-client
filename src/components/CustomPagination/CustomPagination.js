import {Pagination} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {usePagination} from "../../customHooks/usePagination";

function CustomPagination(props) {

    const {data,setCurrentPageContent} = props;
    const [currentPage, setCurrentPage] = useState(1)

    let option = {
        total: data.length,
        pageSize: 10,
        currentPage:currentPage,
        maxNumberOfTiles:16
    }

    let paginationRange = usePagination(option);

    const getCurrenPageData = ()=>{
        if(currentPage === 1 && data.length < option.pageSize) {
            return data.slice(currentPage - 1, currentPage - 1 + option.pageSize);
        }
        else if(currentPage > 1 && data.length < option.pageSize ){
            return data.slice(currentPage * option.pageSize,currentPage - 1 + option.pageSize)
        }

    }

    useEffect(()=>{
        setCurrentPageContent(getCurrenPageData())
    },[currentPage])

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
        setCurrentPage(50)
    }

    const handleCurrent = (item)=>{
        setCurrentPage(item)
    }
    return (
        <Pagination>
            <Pagination.First disabled={!(paginationRange[0]>1)}  onClick={handleFirstPage}/>
            <Pagination.Prev disabled={!(paginationRange[0]>1)}  onClick={handlePreviousPage}/>
            {
                paginationRange.map((item => {
                    let isActive = item === currentPage
                    return (item === "GAP") ? <Pagination.Ellipsis/> : <Pagination.Item active ={isActive} onClick={handleCurrent.bind(this,item)} >{item}</Pagination.Item>
                }))
            }
            <Pagination.Next disabled={currentPage === 50} onClick={handleNextPage}/>
            <Pagination.Last disabled={currentPage === 50}  onClick={handleLastPage}/>
        </Pagination>
    )
}

export default CustomPagination;