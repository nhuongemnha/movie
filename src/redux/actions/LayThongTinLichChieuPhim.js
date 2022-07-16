import { createAction } from "."
import { quanLyRapService } from "../../services/QuanLyRapService"
import { actionType } from "./types/QuanLyRapTypes"

export const layThongTinLichChieuPhim = (id) => {
    return async (dispatch) => {
        try {
            const res = await quanLyRapService.layThongTinLichChieuPhim(id)
            dispatch(createAction(actionType.SET_CHI_TIET_PHIM, res.data.content))
        }
        catch (err) {
            console.log(err)
        }
    }
}