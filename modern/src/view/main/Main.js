Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.dataview.DataView', // Classic Toolkit Grid
    xtype: 'cell-editing',
    // requires: [
    //     'Ext.grid.plugin.RowEditing' // Classic toolkit uses RowEditing plugin for cell editing
    // ],
    height: 400,
    width: 700,

store: {
    model: 'Product',
    data: [{
        id: 1,
        name: 'Laptop',
        price: 1000
    }, {
        id: 2,
        name: 'Smartphone',
        price: 700
    }]
},
itemTpl: [
    '<tpl for=".">',
    '<div class="product">',
    '<h3>{name}</h3>',
    '<p>Price: {price}</p>',
    '</div>',
    '</tpl>'
].join(""),
//itemSelector: 'div.product'
});
Ext.define('Product', function () {
return {
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields: ['id', 'name', 'price']
};
});
Ext.create({
xtype: 'cell-editing',
fullscreen: true
})