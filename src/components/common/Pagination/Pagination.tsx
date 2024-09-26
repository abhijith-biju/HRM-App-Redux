import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../..';
import PaginationContainer from './Pagination.style';
import { defaultSearchParams } from '../../../pages/ManageEmployees/constants';

interface IPagination {
    totalEntries: number | undefined;
}

const Pagination: React.FC<IPagination> = ({ totalEntries = 0 }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const offset =
        Number(searchParams.get('offset')) || defaultSearchParams.offset;
    const limit =
        Number(searchParams.get('limit')) || defaultSearchParams.limit;

    const [currentPage, setCurrentPage] = useState<number>(
        Math.ceil(offset / limit) + 1
    );

    const isFirstPage = offset === 0;
    const isLastPage = offset + limit >= totalEntries;

    const updateSearchParams = (newOffset: number) => {
        const newPageNumber = Math.floor(newOffset / limit) + 1;
        setCurrentPage(newPageNumber);

        searchParams.set('offset', String(newOffset));
        searchParams.set('limit', String(limit));
        setSearchParams(searchParams);
    };

    const handlePageChange = (newPage: number) => {
        const newOffset = (newPage - 1) * limit;
        updateSearchParams(newOffset);
    };

    const handleInputPageChange = () => {
        let newPageNumber = currentPage;

        // Check if new page number is valid
        newPageNumber = Math.max(
            1,
            Math.min(newPageNumber, Math.ceil(totalEntries / limit))
        );

        handlePageChange(newPageNumber);
    };

    return (
        <PaginationContainer>
            <div className="page-controls">
                <Button
                    className="icon-btn primary"
                    disabled={isFirstPage}
                    onClick={() => handlePageChange(1)}
                >
                    <span className="material-symbols-rounded">first_page</span>
                </Button>
                <Button
                    className="icon-btn primary"
                    disabled={isFirstPage}
                    onClick={() =>
                        handlePageChange(Math.max(currentPage - 1, 1))
                    }
                >
                    <span className="material-symbols-rounded">
                        navigate_before
                    </span>
                </Button>
                <div className="current-page-input-wrap">
                    <input
                        type="text"
                        className="current-page-input"
                        value={String(currentPage)}
                        onChange={(e) => {
                            const inputText = e.target.value;
                            if (
                                /^[0-9]\d*$/.test(inputText) ||
                                inputText === ''
                            ) {
                                setCurrentPage(Number(inputText));
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleInputPageChange();
                            }
                        }}
                    />
                    <Button className="outline" onClick={handleInputPageChange}>
                        GO
                    </Button>
                </div>
                <Button
                    className="icon-btn primary"
                    disabled={isLastPage}
                    onClick={() =>
                        handlePageChange(
                            Math.min(
                                currentPage + 1,
                                Math.ceil(totalEntries / limit)
                            )
                        )
                    }
                >
                    <span className="material-symbols-rounded">
                        navigate_next
                    </span>
                </Button>
                <Button
                    className="icon-btn primary"
                    disabled={isLastPage}
                    onClick={() =>
                        handlePageChange(Math.ceil(totalEntries / limit))
                    }
                >
                    <span className="material-symbols-rounded">last_page</span>
                </Button>
            </div>
            {totalEntries > 0 && (
                <span>
                    {offset + 1}-{Math.min(offset + limit, totalEntries)} of{' '}
                    {totalEntries} items
                </span>
            )}
        </PaginationContainer>
    );
};

export default Pagination;
