Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.form.field.ComboBox',
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
             }, data: [
                {
                    value: "AAA",
                    text: "AAA"
                   },
                   {
                    value: "BBB",
                    text: "BBB"
                   },
                   {
                    value: "CCC",
                    text: "CCC"
                   },
                   {
                    value: "DDD",
                    text: "DDD"
                   },
                   {
                    value: "EEE",
                    text: "EEE"
                   }
                ]
         })    
 }); 