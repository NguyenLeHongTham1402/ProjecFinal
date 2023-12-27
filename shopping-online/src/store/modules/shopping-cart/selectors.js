import { createSelector } from "reselect"


const selectShoppingCartProducts = createSelector(
    state => state.cart.data,
    data => data
)
const selectError = state => state.cart.errors

const selectShoppingCartCount = createSelector(
    state => state.cart.data,
    data => data.reduce((pre, d) => pre + Number(d.quantity), 0)
)

const selectShoppingCartTotal = createSelector(
    [selectShoppingCartProducts],
    data => data.reduce((pre, d) => pre + (d.quantity*d.price), 0)
)

export {
    selectShoppingCartCount,
    selectShoppingCartProducts,
    selectShoppingCartTotal,
    selectError
}