import { bindActionCreators } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchService from "../Services/SearchService";
import { AC } from "../state";
import { RootState, SearchState } from "../types/stateTypes";

const useSearch = () => {
    const searchState = useSelector((state: RootState) => state.searchState);

    const dispatch = useDispatch();
    const { changeSearchRequest, startSearchRequest, finishSearchRequest } =
        bindActionCreators(AC, dispatch);

    type returnType = [string, any, any, SearchState];
    const returnData: returnType = [
        searchState.searchRequest ?? "",
        changeSearchRequest,
        startSearchRequest,
        searchState,
    ];

    useEffect(() => {
        if (searchState.needToSearch === true) {
            SearchService.findVideos(
                searchState.searchRequest,
                searchState.ordedBy
            ).then((result) => {
                finishSearchRequest(result);
            });
        }
    }, [searchState.needToSearch]);

    return returnData;
};

export default useSearch;
