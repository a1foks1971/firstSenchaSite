Ext.define('User', {
    extend: 'Ext.data.Model',
    fields: ['name', 'email', 'phone']
    });
    
    var userStore = Ext.create('Ext.data.Store', {
    model: 'User',
    data: [{
            name: 'Lisa',
            email: 'lisa@simpsons.com',
            phone: '555-111-1224'
        }, {
            name: 'Bart',
            email: 'bart@simpsons.com',
            phone: '<q =\"'
        }, {
            name: 'Homer',
            email: 'homer@simpsons.com',
            phone: '555-222-1244'
        }, {
            name: 'Marge',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Shreya',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Lisa',
            email: 'lisa@simpsons.com',
            phone: '555-111-1224'
        }, {
            name: 'Bart',
            email: 'bart@simpsons.com',
            phone: '<q =\"'
        }, {
            name: 'Homer',
            email: 'homer@simpsons.com',
            phone: '555-222-1244'
        }, {
            name: 'Marge',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Shreya',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Bart',
            email: 'bart@simpsons.com',
            phone: '<q =\"'
        }, {
            name: 'Homer',
            email: 'homer@simpsons.com',
            phone: '555-222-1244'
        }, {
            name: 'Marge',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Shreya',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Bart',
            email: 'bart@simpsons.com',
            phone: '<q =\"'
        }, {
            name: 'Homer',
            email: 'homer@simpsons.com',
            phone: '555-222-1244'
        }, {
            name: 'Marge',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Shreya',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Bart',
            email: 'bart@simpsons.com',
            phone: '<q =\"'
        }, {
            name: 'Homer',
            email: 'homer@simpsons.com',
            phone: '555-222-1244'
        }, {
            name: 'Marge',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Shreya',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Bart',
            email: 'bart@simpsons.com',
            phone: '<q =\"'
        }, {
            name: 'Homer',
            email: 'homer@simpsons.com',
            phone: '555-222-1244'
        }, {
            name: 'Marge',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Shreya',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Bart',
            email: 'bart@simpsons.com',
            phone: '<q =\"'
        }, {
            name: 'Homer',
            email: 'homer@simpsons.com',
            phone: '555-222-1244'
        }, {
            name: 'Marge',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Shreya',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Bart',
            email: 'bart@simpsons.com',
            phone: '<q =\"'
        }, {
            name: 'Homer',
            email: 'homer@simpsons.com',
            phone: '555-222-1244'
        }, {
            name: 'Marge',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Shreya',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Bart',
            email: 'bart@simpsons.com',
            phone: '<q =\"'
        }, {
            name: 'Homer',
            email: 'homer@simpsons.com',
            phone: '555-222-1244'
        }, {
            name: 'Marge',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Shreya',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Bart',
            email: 'bart@simpsons.com',
            phone: '<q =\"'
        }, {
            name: 'Homer',
            email: 'homer@simpsons.com',
            phone: '555-222-1244'
        }, {
            name: 'Marge',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Shreya',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Bart',
            email: 'bart@simpsons.com',
            phone: '<q =\"'
        }, {
            name: 'Homer',
            email: 'homer@simpsons.com',
            phone: '555-222-1244'
        }, {
            name: 'Marge',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Shreya',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Bart',
            email: 'bart@simpsons.com',
            phone: '<q =\"'
        }, {
            name: 'Homer',
            email: 'homer@simpsons.com',
            phone: '555-222-1244'
        }, {
            name: 'Marge',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }, {
            name: 'Shreya',
            email: 'marge@simpsons.com',
            phone: '555-222-1254'
        }
    
    ]
    });
    
    Ext.define('NewExtApp.view.main.Main', {
    extend:'Ext.grid.Panel',
       // renderTo: Ext.getBody(),
        store: userStore,
        storeId: 'mystore',
        width: 400,
        height: 400,
        bufferedRenderer: true,
        enableVariableHeight: true,
        title: 'Application Users',
        columns: [{
            dataIndex: 'id',
            locked: true,
        }, {
            text: 'Name',
            width: 100,
            locked: true,
            sortable: false,
            hideable: false,
            dataIndex: 'name'
        }, {
            dataIndex: 'id',
            text: 'ID'
        }, {
            dataIndex: 'name',
            text: 'Name'
        }, {
            xtype: 'actioncolumn',
            dataIndex: 'name',
            text: 'action',
            width: 45,
            disabled: false,
    //                locked: true,
    //                lockable: false,
            items: [{
                iconCls: 'x-fa fa-home',
                tooltip: 'Test'
            }]
        }, {
            text: 'Email Address',
            width: 150,
            dataIndex: 'email',
            hidden: true
        }, {
            text: 'Phone Number',
            flex: 1,
            dataIndex: 'phone',
            renderer: function (v) {
                return Ext.htmlEncode(v);
            }
        }],
    
    plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 2
    }, {
        ptype: 'gridfilters',
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        padding: '5 0 5 5',
        items: [{
            xtype: 'button',
            text: 'Delete Row',
            disabled: false,
            handler: function (record) {
                // userStore.remove(userStore.getAt(0));
                var rec = this.up('grid').getSelection()
 
                userStore.remove(rec)
 
            }
        }, {
            xtype: 'tbfill' // begin using the right-justified button container /
        }, {
            xtype: 'displayfield',
            itemId: 'lm-recship-grid-panel-errormsg-displayfield',
            hidden: true,
            name: 'errorMessage',
            fieldCls: 'vpError'
        }]
    }]
    });
    
    //return;
    var task = {
        run: function () {
            userStore.load()
        },
        interval: 5000 //5 seconds
    }
    
    var runner = new Ext.util.TaskRunner();
    
    // runner.start(task);