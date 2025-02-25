Ext.create('Ext.data.Store', {
    storeId: 'simpsonsStore',
    requires:['Ext.grid.plugin.CellEditing'],
    // fields: ['name', 'email', 'phone', 'dob', 'age'],
    fields: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'email',
        type: 'string'
    }, {
        name: 'phone',
        type: 'string'
    }, {
        name: 'dob',
        type: 'date'
    }, {
        name: 'age',
       // type: 'number'
    }],
    data: [{
        name: 'Lisa',
        email: 'lisa@simpsons.com',
        phone: '555-111-1224',
        dob: new Date('2012-01-01'),
        age: 10
    }, {
        name: 'Bart',
        email: 'bart@simpsons.com',
        phone: '555-222-1234',
        age: 12
    }, {
        name: 'Homer',
        email: 'homer@simpsons.com',
        phone: '555-222-1244',
        dob: new Date('2012-02-02'),
        age: 40
    }, {
        name: 'Marge',
        email: 'marge@simpsons.com',
        phone: '555-222-1254',
        dob: new Date('2012-03-03'),
        age: 38
    }]
    });
    
    Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.grid.Panel',
    title: 'Simpsons',
    store: Ext.data.StoreManager.lookup('simpsonsStore'),
    columns: [{
        header: 'Name',
        dataIndex: 'name',
        editor: 'textfield'
    }, {
        header: 'Email',
        dataIndex: 'email',
        editor: 'textfield'
    }, {
        header: 'Phone',
        dataIndex: 'phone',
        editor: 'textfield'
    }, {
        xtype: 'datecolumn',
        header: 'DOB',
        dataIndex: 'dob',
        format: 'Y-m-d',
        editor: {
            xtype: 'datefield'
        }
    
    }, {
        text: 'Age',
        flex: 1,
        dataIndex: 'age',
        xtype : 'numbercolumn',
        editor: {
            xtype: 'numberfield'
        }
    
    }],
    selModel: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    
    },
    
    height: 200,
    width: 600,
    minHeight: 30,
    renderTo: Ext.getBody()
    
});