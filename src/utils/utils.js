import { MessageBox } from 'element-ui'
const Confirm = MessageBox.confirm;

// 封装Alert
export function $Alert(title = "是否确认此操作？") {
    const res = new Promise((resolve) => {
        Confirm(title, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            resolve(true)
        }).catch(() => {
            resolve(false)
        });
    })
    return res
}

// 获取唯一ID
export function getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

// 时间格式转换
export function formatTime(number, format) {

    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];

    var date = new Date(number);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}

//数据转化  
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 根据ID获取父节点ID集合


// 递归Tree结构
export function getTreeArray(arr) {
    let ids = [];
    getArray(arr);
    function getArray(data) {
        for (var i in data) {
            if (data[i].checked) {
                ids.push(data[i].menuid);
            }
            if (data[i].children && data[i].children.length > 0) {
                getArray(data[i].children);
            }
        }
    }
    return ids;
}

// 数组扁平化处理 处理定时分类
export function flatten(data) {
    if (!data) return []
    return data.reduce((arr, { name, superiororgid, id, childs = [] }) =>
        arr.concat([{ name, superiororgid, id }], flatten(childs)), [])
}

// 获取父节点ID
export function getTreePIds(arr, id) {
    var newArr = [id];
    let flatArr = flatten(arr); //扁平素组
    var PID = flatArr.filter(v => { return v.id === id })
    if (PID.length <= 0) return [id]
    function fn(data, superiororgid) {
        data.map(v => {
            if (superiororgid === v.id) {
                newArr.push(v.id);
                fn(data, v.superiororgid)
            }
        })
    }
    fn(flatArr, PID[0].superiororgid);

    return newArr.reverse()
}

export function getMaxHeigth() {
    // 容器高度 - 导航高度 - 头部查询高度 - 容器上下pad+margin高度 - 分页高度
    let warperHeight = document.getElementsByClassName('wrapper-box')[0].offsetHeight
    let breadcrumbHeight = document.getElementsByClassName('breadcrumb-box')[0].offsetHeight
    let handleForm = document.getElementsByClassName('handleForm')[0].offsetHeight
    return (warperHeight - handleForm - breadcrumbHeight - 40 - 47)
}

// 截取指定长度，后面增加...
export function cutString(str, len) {
    //length属性读出来的汉字长度为1 
    if (str.length * 2 <= len) {
        return str;
    }
    var strlen = 0;
    var s = "";
    for (var i = 0; i < str.length; i++) {
        s = s + str.charAt(i);
        if (str.charCodeAt(i) > 128) {
            strlen = strlen + 2;
            if (strlen >= len) {
                return s.substring(0, s.length - 1) + "...";
            }
        } else {
            strlen = strlen + 1;
            if (strlen >= len) {
                return s.substring(0, s.length - 2) + "...";
            }
        }
    }
    return s;

} 