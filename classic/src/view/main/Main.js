Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.form.Panel', // Classic Toolkit Grid
    xtype: 'cell-editing',
    requires: [
        'Ext.grid.plugin.RowEditing' // Classic toolkit uses RowEditing plugin for cell editing
    ],
    height: 400,
    width: 700,
    
    title: 'User Details',
    bodyPadding: 10,
    items: [
        { xtype: 'textfield', name: 'name', fieldLabel: 'Name' },
        { xtype: 'numberfield', name: 'age', fieldLabel: 'Age' },
        { xtype: 'textfield', name: 'email', fieldLabel: 'Email' }
    ],
    buttons: [
        {
            text: 'Load Record',
            handler: function (btn) {
                var form = btn.up('form'),
                    person = Ext.create('Person', {
                        id: 1,
                        name: 'John Doe',
                        age: 30,
                        email: 'john@example.com'
                    });
    
            form.loadRecord(person);
        }
    }
    ]
    });
    
    Ext.define('Person', function () {
    return {
        extend: 'Ext.data.Model',
        idProperty:'_id',
        fields: ['id', 'name', 'age', 'email']
    };
    });
    
    