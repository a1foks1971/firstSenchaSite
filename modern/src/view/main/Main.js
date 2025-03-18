var store = Ext.create('Ext.data.virtual.Store', {
    fields: [
        'firstName', 'lastName', 'address', 'company', 'title', {
            name: 'id',
            type: 'int'
        }
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


Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.grid.Grid',
    xtype: 'infinite-grid',
    title: 'Infinite Grid',

    // requires: [
    //     'NewExtApp.view.main.VirtualForum',
    //     'Ext.grid.filters.Plugin'
    // ],

    /* plugins: {
         gridfilters: true
     },*/
    store: store,
    scrollable: true,
    height: 500,
    width: 600,

    columns: [{
        text: 'First Name',
        width: 150,
        dataIndex: 'firstName'
    }, {
        text: 'Last Name',
        width: 150,
        dataIndex: 'lastName'
    }, {
        text: 'Id',
        width: 50,
        dataIndex: 'id'
    }, {
        text: 'Title',
        flex: 1,
        dataIndex: 'title'
    }, {
        text: 'Address',
        flex: 1,
        dataIndex: 'address'
    }, {
        text: 'Company',
        flex: 1,
        dataIndex: 'company'
    }]
});
