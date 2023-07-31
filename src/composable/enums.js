export function getAddonCategory(data) {
    Object.assign(data.value, {
        1: '琴酒',
        2: '伏特加',
        3: '威士忌',
        4: '龍舌蘭',
        5: '白蘭地',
        6: '蘭姆酒',
        7: '葡萄酒',
        8: '其他',
    })
}

export function getPayStatus(data) {
    Object.assign(data.value, {
        1: {
            type: 'info',
            text: '未付款',
        },
        2: {
            type: 'success',
            text: '已付款',
        },
        3: {
            type: 'danger',
            text: '付款失敗',
        },
    })
}

export function getInvoiceStatus(data) {
    Object.assign(data.value, {
        1: {
            type: 'info',
            text: '未開立',
        },
        2: {
            type: 'success',
            text: '已開立',
        },
        3: {
            type: 'danger',
            text: '已作廢',
        },
    })
}
