Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.grid.Panel', // Classic Toolkit Grid
    xtype: 'cell-editing',
    title: 'Cell Editing Plants',

    requires: [
        'Ext.grid.plugin.RowEditing' // Classic toolkit uses RowEditing plugin for cell editing
    ],
    height: 400,
    width: 700,

    plugins: [{
        ptype: 'rowediting' // Classic Toolkit row editing plugin
    }],

    store: {
        autoLoad: true,
        fields: [
            { name: 'common', type: 'string' },
            { name: 'botanical', type: 'string' },
            { name: 'light' },
            { name: 'price', type: 'float' },
            { name: 'availDate', mapping: 'availability', type: 'date', dateFormat: 'm/d/Y' },
            { name: 'indoor', type: 'bool' }
        ],
        proxy: {
            type: 'ajax',
            url: 'classic/resources/data.json', // Classic Toolkit resource path
            reader: {
                type: 'json',
            }
        }
    },

    columns: [{
        text: 'Common Name',
        flex: 1,
        dataIndex: 'common',
        editor: {
            xtype: 'textfield'
        }
    }, {
        text: 'Light',
        width: 125,
        dataIndex: 'light',
        editor: {
            xtype: 'combobox', // Classic Toolkit uses 'combobox'
            store: [
                'Shade',
                'Mostly Shady',
                'Sun or Shade',
                'Mostly Sunny',
                'Sunny'
            ],
            editable: false
        }
    }, {
        text: 'Price',
        width: 100,
        xtype: 'numbercolumn', // Classic Toolkit for numeric columns
        dataIndex: 'price',
        format: '0.00',
        editor: {
            xtype: 'numberfield',
            minValue: 0
        }
    }, {
        text: 'Available',
        xtype: 'datecolumn', // Classic Toolkit date column
        format: 'M d, Y',
        width: 125,
        dataIndex: 'availDate',
        editor: {
            xtype: 'datefield', // Classic Toolkit uses 'datefield'
            format: 'm/d/Y'
        }
    }, {
        text: 'Indoor?',
        xtype: 'checkcolumn', // Classic Toolkit uses checkcolumn
        dataIndex: 'indoor'
    }]
});
