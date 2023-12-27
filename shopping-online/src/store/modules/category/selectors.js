import { createSelector } from "reselect"

const selectCategories = state => state.cates

// const selectCates = state => selectCategories(state).data
// const selectLoading = state => selectCategories(state).loading
// const selectError = state => selectCategories(state).error
// const selectParent = state => selectCategories(state).parent
// const selectChild = state => selectCategories(state).child

const selectCates = createSelector(
    state => selectCategories(state).data,
    categories => categories.filter((x)=>x.isActive===true)
)

const selectParentCates = createSelector(
    [selectCates],
    categories => categories.filter((x)=>x.isParent===true)
)

const selectChild = createSelector(
    [selectCates],
    categories => categories.filter((x)=>x.isParent===false)
)



export {
    selectCates,
    // selectLoading,
    // selectError,
    // selectParent,
    selectChild,
    selectParentCates
}