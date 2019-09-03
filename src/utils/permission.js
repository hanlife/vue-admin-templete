/*
 * @描叙: 权限判断
 * @作者: hanlaifu 
 * @公司: 中尚智能 
 * @创建时间: 2019-02-20 16:06:07 
*/

import store from "@/store";

export default function checkPermission(value) {
    if (!value) return false;

    let user = store.getters.user;
    let editRole = store.getters.editRole;
    if (user.Usertype < 4) {
        return true
    }else {
        if (editRole[value] && editRole[value]==2) {
            return true
        } else{
            return false
        }
    }
}