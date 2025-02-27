var store1 = Ext.create('Ext.data.Store', {
    storeId: 'store1',
    xfields: [
        'firstName', 'lastName', 'address', 'company', 'title'
    ],
    
    proxy: {
        type: 'ajax',
        url: 'https://llbzr8dkzl.execute-api.us-east-1.amazonaws.com/production/user',
        reader: {
            rootProperty: 'users',
            totalProperty: 'totalCount'
        }
    },
    pageSize: 25,
    autoLoad: true
    });
    
    var columns = [{
    text: 'First Name',
    width: 150,
    dataIndex: 'firstName',
    }, {
    text: 'Last Name',
    width: 150,
    dataIndex: 'lastName',
    },{
    text: 'Address',
    dataIndex: 'address',
    }, {
    text: 'Title',
    dataIndex: 'title',
    }, {
    text: 'Company',
    dataIndex: 'company',
    }];
    
    Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.Panel',
    requires: ['Ext.panel.Resizer'],
    fullscreen: true,
    layout: 'vbox',
    items: [{
        xtype: 'toolbar',
        docked: 'top',
        items: [{
            xtype: 'button',
            text: 'Press Me',
            handler: function () {
                var win = this.win;
                if (!win) {
                    win = this.win = Ext.create({
                        xtype: 'window',
                        closable: true,
                        closeAction: 'hide',
                        height: 500,
                        width: 500,
                        resizable: {
                            edges: 'all',
                            dynamic: true
                        },
                        layout: 'fit',
                        items: [{
                            xtype: 'grid',
                            store: store1,
                            columns: columns,
                            rowNumbers: true
                        }]
                    });
                }
                win.show();
            }
        }]
    }, {
        xtype: 'grid',
        title: 'Grid 1',
        store: store1,
        columns: columns,
        flex: 1,
        minHeight: 150,
        rowNumbers: true
    }, {
        xtype: 'panel',
        layout: 'fit',
        flex: 1,
        resizable: {
            edges: 'north',
            split: true,
            dynamic: true
        },
        minHeight: 150,
        items: [{
            xtype: 'grid',
            title: 'Grid 2',
            store: store1,
            columns: columns,
            rowNumbers: true
        }]
    }]
    
});