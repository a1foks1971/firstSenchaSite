var store = Ext.create('Ext.data.Store', {
    fields: ['name', 'email', 'phone'],
    data: [
        { 'name': 'Lisa',  "email":"lisa@simpsons.com",  "phone":"555-111-1224"  },
        { 'name': 'Bart',  "email":"bart@simpsons.com",  "phone":"555-222-1234" },
        { 'name': 'Homer', "email":"home@simpsons.com",  "phone":"555-222-1244"  },
        { 'name': 'Marge', "email":"marge@simpsons.com", "phone":"555-222-1254"  }
    ]
  });
   Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.Container',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    viewModel: {
        data: {
            foo: 'Bound title'
        }
    },
    defaults: {
        xtype: 'panel',
        flex: 1,
        padding: 2,
        layout: {
            type: 'hbox',
            align: 'stretch'
        }
    },
    items: [
            {
            title: 'Grid behaviour without configured titleBar',
            defaults: {
                xtype: 'grid',
                flex: 1,
                padding: 2,
                store: store,
                padding: "10, 10, 10, 10",
    columns: [
        { text: 'Name',  dataIndex: 'name', width: 200 },
        { text: 'Email', dataIndex: 'email', width: 250 },
        { text: 'Phone', dataIndex: 'phone', width: 120 }
    ],
                style: {
                    border: 'solid 1px lightgrey'
                }
            },
            items: [
                {
                 html: 'PASS: NO TITLE - Grid should NOT display titlebar'
            }

    ],
    },
    {
        title: 'Grid behaviour without configured titleBar',
        defaults: {
            xtype: 'grid',
            flex: 1,
            padding: 2,
            store: store,
            padding: "10, 10, 10, 10",
columns: [
    { text: 'Name',  dataIndex: 'name', width: 200 },
    { text: 'Email', dataIndex: 'email', width: 250 },
    { text: 'Phone', dataIndex: 'phone', width: 120 }
],
            style: {
                border: 'solid 1px lightgrey'
            }
        },
        items: [
            {
             html: 'PASS: NO TITLE - Grid should NOT display titlebar'
        }
    ],
    }
]
});