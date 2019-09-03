// 创建一个Storage对象
const Storage = {};

/**
 * 存入一个对象到本地
 * @param key 本地存储字段名
 * @param data 数据对象
 */
Storage.set = function (key, data = {}) {
    // 本地存储的数据
    let oldStr = localStorage.getItem(key) || null;
    // 本地数据对象
    let oldData = oldStr === null ? {} : JSON.parse(oldStr);
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            oldData[key] = data[key];
        }
    }
    localStorage.setItem(key, JSON.stringify(oldData))
};

/**
 * 获取一个本地数据对象
 * @param key 本地存储字段名
 * @returns {null}
 */
Storage.get = function (key) {
    // 本地存储的数据
    let oldStr = localStorage.getItem(key) || '';
    if (oldStr) {
        return JSON.parse(oldStr);
    }
    return null;
};

export default Storage;