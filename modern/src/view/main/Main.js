var shows = Ext.create('Ext.data.Store', {
    fields: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'age',
        type: 'int',
        convert: null
    }, {
        name: 'phone',
        type: 'string'
    }, {
        name: 'alive',
        type: 'boolean',
        defaultValue: true,
        convert: null
    }],
    data: [
        { 'name': 'Lisa', "email": "lisa@simpsons.com", "phone": "555-111-1224" },
        { 'name': 'Bart', "email": "bart@simpsons.com", "phone": "555-222-1234" },
        { 'name': 'Homer', "email": "home@simpsons.com", "phone": "555-222-1244" },
        { 'name': 'Marge', "email": "marge@simpsons.com", "phone": "555-222-1254" }
    ]
})

Ext.define('NewExtApp.view.main.Main', {
    extend: "Ext.Container",
    layout: "vbox",
    fullscreen: true,
    store: shows,
    items: [{
        xtype: 'button',
        text: 'Select all',
        handler: function (btn) {
            var grid = btn.up('container').down('grid');
            grid.getSelectable().selectAll()

            console.log(grid.getHeaderContainer().getVisibleColumns());
        }
    }, {
        xtype: 'button',
        text: 'Deselect all',
        handler: function (btn) {
            var grid = btn.up('container').down('grid');

            grid.getSelectable().deselectAll()
            console.log(grid.getHeaderContainer().getVisibleColumns());
        }
    },
    {
        xtype: 'grid',
        // fullscreen: true,
        store: shows,
        flex: 1,

        columns: [{
            text: 'Name',
            dataIndex: 'name'
        }, {
            text: 'Email',
            dataIndex: 'email'
        }]
    }]
});