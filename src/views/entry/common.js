
const dwbm = { dwbm: localStorage.getItem("dwbm") };

import { queryData } from "@/api/common";
export function getAllBm() {
    const param = { dwbm: localStorage.getItem("dwbm") };
    return queryData("/manager/queryAllBm", param, "POST").then(res => {
        if (res.code == 0) {
            return res.data.data;
        }
    });
}
export function getAllUser(fp_gsbm) {
    const param = {
        dwbm: localStorage.getItem("dwbm"),
        bmbm: fp_gsbm
    };
    return queryData("/manager/queryAllUser", param, "POST").then(res => {
        if (res.code == 0) {
            return res.data;
        }
    });
}

module.export = {
    getAllUser,
    getAllBm
}