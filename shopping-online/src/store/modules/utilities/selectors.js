const selectUtil = state => state.utils

const selectBanners = state => selectUtil(state).banners

const selectAds = state => selectUtil(state).ads

export {
    selectAds,
    selectBanners
}