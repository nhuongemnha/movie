import { createAction } from "."
import { quanLyRap } from "../../services/QuanLyRap"
import { actionType } from "./types/QuanLyRapTypes"

export const layThongTinLichChieuPhim = (id) => {
    return async (dispatch) => {
        try {
            const res = await quanLyRap.layThongTinLichChieuPhim(id)
            dispatch(createAction(actionType.SET_CHI_TIET_PHIM, res.data.content))
        }
        catch (err) {
            console.log(err)
        }
    }
}