Ext.define('NewExtApp.view.main.Main', {
    extend: "Ext.container.Container",
    height: 500,
    width: 500,
    items:[{
        xtype: "combobox",
        layout: "vbox",
         editable: true,
         store: Ext.create('Ext.data.Store', {
             model: Ext.define(null, {
                 extend: 'Ext.data.Model',
                 idProperty: "value",
                 fields: ["value", "text"]
             }),
             proxy: {
                 type: 'memory',
                 reader: {
                     type: "json"
                 }
             }, data: [{
                 value: "AAA",
                 text: "AAA"
             }]
         })
    } ]
    
    });