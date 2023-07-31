export function getPermissionData(data) {
    data.value = [
        {
            'id': 'Branch',
            'label': '分店',
            'children': [
                {
                    'id': 'Branch.List',
                    'label': '分店',
                    'children': [
                        {
                            'id': 'Branch.List.View',
                            'label': '查看',
                        },
                        {
                            'id': 'Branch.List.Create',
                            'label': '新增',
                        },
                        {
                            'id': 'Branch.List.Edit',
                            'label': '編輯',
                        },
                        {
                            'id': 'Branch.List.Delete',
                            'label': '刪除',
                        },
                        {
                            'id': 'Branch.List.Password',
                            'label': '修改密碼',
                        },
                    ],
                },
                {
                    'id': 'Branch.Station',
                    'label': '崗位',
                    'children': [
                        {
                            'id': 'Branch.Station.View',
                            'label': '查看',
                        },
                        {
                            'id': 'Branch.Station.Create',
                            'label': '新增',
                        },
                        {
                            'id': 'Branch.Station.Edit',
                            'label': '編輯',
                        },
                        {
                            'id': 'Branch.Station.Delete',
                            'label': '刪除',
                        },
                    ],
                },
                {
                    'id': 'Branch.Table',
                    'label': '桌位',
                    'children': [
                        {
                            'id': 'Branch.Table.View',
                            'label': '查看',
                        },
                        {
                            'id': 'Branch.Table.Create',
                            'label': '新增',
                        },
                        {
                            'id': 'Branch.Table.Edit',
                            'label': '編輯',
                        },
                        {
                            'id': 'Branch.Table.Delete',
                            'label': '刪除',
                        },
                    ],
                },
            ]
        },
        {
            'id': 'Liquor',
            'label': '酒品',
            'children': [
                {
                    'id': 'Liquor.Stock',
                    'label': '庫存',
                    'children': [
                        {
                            'id': 'Liquor.Stock.View',
                            'label': '查看',
                        },
                        {
                            'id': 'Liquor.Stock.Create',
                            'label': '新增',
                        },
                        {
                            'id': 'Liquor.Stock.Edit',
                            'label': '編輯',
                        },
                        {
                            'id': 'Liquor.Stock.Delete',
                            'label': '刪除',
                        },
                        {
                            'id': 'Liquor.Stock.Replenish',
                            'label': '補貨',
                        },
                    ],
                },
                {
                    'id': 'Liquor.Recipe',
                    'label': '酒譜',
                    'children': [
                        {
                            'id': 'Liquor.Recipe.View',
                            'label': '查看',
                        },
                        {
                            'id': 'Liquor.Recipe.Create',
                            'label': '新增',
                        },
                        {
                            'id': 'Liquor.Recipe.Edit',
                            'label': '編輯',
                        },
                        {
                            'id': 'Liquor.Recipe.Delete',
                            'label': '刪除',
                        },
                        {
                            'id': 'Liquor.Recipe.Category',
                            'label': '管理分類',
                        },
                    ],
                },
                {
                    'id': 'Liquor.Addon',
                    'label': '加價購',
                    'children': [
                        {
                            'id': 'Liquor.Addon.View',
                            'label': '查看',
                        },
                        {
                            'id': 'Liquor.Addon.Create',
                            'label': '新增',
                        },
                        {
                            'id': 'Liquor.Addon.Edit',
                            'label': '編輯',
                        },
                        {
                            'id': 'Liquor.Addon.Delete',
                            'label': '刪除',
                        },
                    ],
                },
            ]
        },
        {
            'id': 'Product',
            'label': '商品',
            'children': [
                {
                    'id': 'Product.View',
                    'label': '查看',
                },
                {
                    'id': 'Product.Create',
                    'label': '新增',
                },
                {
                    'id': 'Product.Edit',
                    'label': '編輯',
                },
                {
                    'id': 'Product.Delete',
                    'label': '刪除',
                },
                {
                    'id': 'Product.Category',
                    'label': '商品分類',
                },
            ],
        },
        {
            'id': 'Order',
            'label': '訂單',
        },
        {
            'id': 'Report',
            'label': '報表',
            'children': [
                {
                    'id': 'Report.Profit',
                    'label': '營收',
                },
                {
                    'id': 'Report.Product',
                    'label': '商品',
                },
            ]
        },
        {
            'id': 'Staff',
            'label': '員工',
            'children': [
                {
                    'id': 'Staff.List',
                    'label': '員工',
                    'children': [
                        {
                            'id': 'Staff.List.View',
                            'label': '查看',
                        },
                        {
                            'id': 'Staff.List.Create',
                            'label': '新增',
                        },
                        {
                            'id': 'Staff.List.Edit',
                            'label': '編輯',
                        },
                        {
                            'id': 'Staff.List.Delete',
                            'label': '刪除',
                        },
                    ],
                },
                {
                    'id': 'Staff.AttendanceRecord',
                    'label': '打卡記錄',
                },
            ]
        },
        {
            'id': 'System',
            'label': '系統',
            'children': [
                {
                    'id': 'System.Role',
                    'label': '角色',
                    'children': [
                        {
                            'id': 'System.Role.View',
                            'label': '查看',
                        },
                        {
                            'id': 'System.Role.Create',
                            'label': '新增',
                        },
                        {
                            'id': 'System.Role.Edit',
                            'label': '編輯',
                        },
                        {
                            'id': 'System.Role.Delete',
                            'label': '刪除',
                        },
                    ],
                },
                {
                    'id': 'System.Admin',
                    'label': '管理員',
                    'children': [
                        {
                            'id': 'System.Admin.View',
                            'label': '查看',
                        },
                        {
                            'id': 'System.Admin.Create',
                            'label': '新增',
                        },
                        {
                            'id': 'System.Admin.Edit',
                            'label': '編輯',
                        },
                        {
                            'id': 'System.Admin.Delete',
                            'label': '刪除',
                        },
                        {
                            'id': 'System.Admin.Password',
                            'label': '修改密碼',
                        },
                    ],
                },
                {
                    'id': 'System.Oplog',
                    'label': '操作日誌',
                },
                {
                    'id': 'System.Setting',
                    'label': '設定',
                },
            ]
        },
    ]
}
