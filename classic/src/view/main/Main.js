Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.view.View', // Classic Toolkit Grid
    xtype: 'cell-editing',
    requires: [
        'Ext.grid.plugin.RowEditing' // Classic toolkit uses RowEditing plugin for cell editing
    ],
    height: 400,
    width: 700,
    
    store: {
        model: 'Product',
        data: [
            { id: 1, name: 'Laptop', price: 1000 },
            { id: 2, name: 'Smartphone', price: 700 }
        ]
    },
    tpl: new Ext.XTemplate(
        '<tpl for=".">',
        '<div class="product">',
        '<h3>{name}</h3>',
        '<p>Price: {price}</p>',
        '</div>',
        '</tpl>'
    ),
    itemSelector: 'div.product'
    });
    
    Ext.define('Product', function () {
    return {
        extend: 'Ext.data.Model',
        idProperty:'_id',
        fields: ['id', 'name', 'price']
    };
    });