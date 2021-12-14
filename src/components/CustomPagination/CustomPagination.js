import {Pagination} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {usePagination} from "../../customHooks/usePagination";

function CustomPagination(props) {

    const {rExpenseTrackers} = props;
    const itemPerPage = 10;
    const totalPageNumber = Math.ceil(rExpenseTrackers.length / itemPerPage)
    // const rExpenseTrackers = useSelector((state) => state.expenseTrackerForm.formState);
    const {currentPageContent, setCurrentPageContent} = useState([])
    const {currentPage, setCurrentPage} = useState(1)

    useEffect(() => {
        // let lastItemPos = currentPage * itemPerPage;
        // setCurrentPageContent(rExpenseTrackers.slice(lastItemPos - itemPerPage, itemPerPage - 1))
    })
    let option = {
        total: 50,
        pageSize: 10,
        siblingsSize: 4,
        gapSize: 1,
        currentPage: 1
    }
    let paginationRange = usePagination(option);
console.log(paginationRange)
    return (
        <Pagination>
            <Pagination.First/>
            <Pagination.Prev/>
            {
                paginationRange.map((item => {
                    return (item === "GAP") ? <Pagination.Ellipsis/> : <Pagination.Item>{item}</Pagination.Item>
                }))
            }


            {/*<Pagination.Item>{10}</Pagination.Item>*/}
            {/*<Pagination.Item>{11}</Pagination.Item>*/}
            {/*<Pagination.Item active>{12}</Pagination.Item>*/}
            {/*<Pagination.Item>{13}</Pagination.Item>*/}
            {/*<Pagination.Item disabled>{14}</Pagination.Item>*/}

            {/*<Pagination.Ellipsis/>*/}
            {/*<Pagination.Item>{20}</Pagination.Item>*/}
            <Pagination.Next/>
            <Pagination.Last/>
        </Pagination>
    )
}

export default CustomPagination;