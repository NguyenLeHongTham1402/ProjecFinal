const selectProducts = state => state.products

const selectLoading = state => selectProducts(state).loading
const selectError = state => selectProducts(state).error
const selectProduct = state => selectProducts(state).product

export {
    selectLoading,
    selectError,
    selectProduct
}