Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.grid.Grid',
    xtype: 'cell-editing',
    
    height: 400,
    width: 700,
    
    title: 'Users',
    store: {
        model: 'SaleModel',
        data: [
            { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
            { id: 2, name: 'Jane Doe', age: 25, email: 'jane@example.com' }
        ]
    },
    columns: [
        { text: 'ID', dataIndex: 'id' },
        { text: 'Name', dataIndex: 'name', flex: 1 },
        { text: 'Age', dataIndex: 'age' },
        { text: 'Email', dataIndex: 'email', flex: 1 }
    ]
    });
    
    Ext.define('SaleModel', function () {
    return {
        extend: 'Ext.data.Model',
        idProperty:'_id',
        fields: ['id', 'name', 'age', 'email']
    };
    });
    
    