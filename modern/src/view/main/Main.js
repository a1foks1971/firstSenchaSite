Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.form.Panel',
    xtype: 'cell-editing',
    
    height: 400,
    width: 700,
    
    title: 'User Details',
    bodyPadding: 10,
    items: [
        { xtype: 'textfield', name: 'name', label: 'Name' },
        { xtype: 'numberfield', name: 'age', label: 'Age' },
        { xtype: 'textfield', name: 'email', label: 'Email' }
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
    
    