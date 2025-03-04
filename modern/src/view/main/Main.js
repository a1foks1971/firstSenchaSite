Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.field.ComboBox', // Classic Toolkit Grid
    xtype: 'cell-editing',
    
    label: 'Select Country',
    store: {
        model: 'Country',
        data: [
            { code: 'US', name: 'United States' },
            { code: 'CA', name: 'Canada' },
            { code: 'UK', name: 'United Kingdom' }
        ]
    },
    queryMode: 'local',
    displayField: 'name',
    valueField: 'code'
    });
    
    Ext.define('Country', function () {
    return {
        extend: 'Ext.data.Model',
        idProperty:'_id',
        fields: ['code', 'name']
    };
    });