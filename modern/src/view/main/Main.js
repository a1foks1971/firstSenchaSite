/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
// Ext.define('NewExtApp.view.main.Main', {
//     extend: 'Ext.tab.Panel',
//     xtype: 'app-main',

//     requires: [
//         'Ext.MessageBox',
//         'Ext.layout.Fit'
//     ],

//     controller: 'main',
//     viewModel: 'main',

//     defaults: {
//         tab: {
//             iconAlign: 'top'
//         }
//     },

//     tabBarPosition: 'bottom',

//     items: [
//         // TODO - Replace the content of this view to suit the needs of your application.
//         {
//             title: 'Home',
//             iconCls: 'x-fa fa-home',
//             layout: 'fit',
//             // The following grid shares a store with the classic version's grid as well!
//             items: [{
//                 xtype: 'mainlist'
//             }]
//         },{
//             title: 'Users',
//             iconCls: 'x-fa fa-user',
//             bind: {
//                 html: '{loremIpsum}'
//             }
//         },{
//             title: 'Groups',
//             iconCls: 'x-fa fa-users',
//             bind: {
//                 html: '{loremIpsum}'
//             }
//         },{
//             title: 'Settings',
//             iconCls: 'x-fa fa-cog',
//             bind: {
//                 html: '{loremIpsum}'
//             }
//         }
//     ]
// });

Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.grid.Grid',
    xtype: 'cell-editing',
    title: 'Cell Editing Plants',
    requires: [
        'Ext.grid.rowedit.Plugin'
    ],
    height: 400,
    width: 700,
    selectable: {
        rows: false,
        cells: true
    },
    plugins: [{
        type: 'rowedit' // Modern toolkit uses rowedit plugin for cell editing
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
            url: 'modern/resources/data.json',
            reader: {
                type: 'json',
            }
        }
    },
    columns: [{
        text: 'Common Name',
        flex: 1,
        dataIndex: 'common',
        editable: true
    }, {
        text: 'Light',
        width: 125,
        dataIndex: 'light',
        editable: true,
        editor: {
            xtype: 'selectfield',
            options: [
                { text: 'Shade', value: 'Shade' },
                { text: 'Mostly Shady', value: 'Mostly Shady' },
                { text: 'Sun or Shade', value: 'Sun or Shade' },
                { text: 'Mostly Sunny', value: 'Mostly Sunny' },
                { text: 'Sunny', value: 'Sunny' }
            ]
        }
    }, {
        text: 'Price',
        width: 100,
        formatter: 'usMoney',
        dataIndex: 'price',
        editable: true
    }, {
        text: 'Available',
        xtype: 'datecolumn',
        format: 'M d, Y',
        width: 125,
        dataIndex: 'availDate',
        editor: {
            xtype: 'datepickerfield'
        }
    }, {
        text: 'Indoor?',
        xtype: 'checkcolumn',
        dataIndex: 'indoor'
    }]
    });
