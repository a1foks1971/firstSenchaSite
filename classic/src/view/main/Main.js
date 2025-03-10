Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.container.Container',
    controller: 'main',
    
    viewModel: {
        stores: {
            gridStore: {
                fields: ['text', 'value'],
                // You may need this
                         autoLoad: true,
                          autoLoadOnFilterEnd: true,
                remoteFilter: true,
                proxy: {
                    type: 'ajax',
                    url: 'classic/resources/data1.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'records'
                    }
                }
            }
        }
    },
    layout: 'fit',
            items: [{
                xtype: 'grid',
                bind: '{gridStore}',
                reference: 'devicegrid',
    
            columns: [{
                dataIndex: 'value',
                text: 'Value'
            }, {
                dataIndex: 'text',
                text: 'Text'
            }]
        }],getModelID: function () {
            return '1'
        }
    });