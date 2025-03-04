Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.grid.TreeGrouped',
    xtype: 'tree-grouped-grid',
    
    requires: [
       // 'KitchenSink.view.grid.addons.TreeGroupedGridController',
        'Ext.grid.cell.Number',
        'Ext.grid.plugin.GroupingPanel',
        'Ext.grid.plugin.Summaries'
    ],
    
    //controller: 'tree-grouped-grid',
    
    title: 'Tree grouped grid',
    stateful: true,
    stateId: 'tree-grouped-grid',
    
    groupHeaderTpl: '{name} ({group.length})',
    summaryPosition: 'docked',
    
    plugins: {
        groupingpanel: true,
        gridsummaries: true
    },
    
    store: {
        type: 'sales',
    
    groupers: [{
        property: 'date',
        // you can provide a formatter that is used to create groups
        formatter: 'date("Y")'
    }, 'person', 'company'],
    },
    
    columns: [
        {
            text: 'Company',
            dataIndex: 'company',
            groupable: true,
            flex: 1,
            filterType: 'string'
        },
        {
            text: 'Country',
            dataIndex: 'country',
            groupable: true,
            flex: 1,
            filterType: 'list'
        },
        {
            text: 'Person',
            dataIndex: 'person',
            groupable: true,
            summary: 'count'
        },
        {
            text: 'Date',
            dataIndex: 'date',
            xtype: 'datecolumn',
            filterType: 'date'
        },
        {
            text: 'Value',
            dataIndex: 'value',
            xtype: 'numbercolumn',
            align: 'right',
            filterType: 'number',
    
        summary: 'average'
    },
    {
        text: 'Quantity',
        dataIndex: 'quantity',
        xtype: 'numbercolumn',
        align: 'right',
        summary: 'sum'
    }
    ],
    
    titleBar: {
        shadow: false,
        items: [{
            xtype: 'button',
            align: 'right',
            text: 'Group sum',
            menu: {
                defaults: {
                    handler: 'setGroupSummaryPosition'
                },
                indented: false,
                items: [{
                    text: 'Top',
                    sum: 'top'
                }, {
                    text: 'Bottom',
                    sum: 'bottom'
                }, {
                    text: 'Hidden',
                    sum: 'hidden'
                }]
            }
        }, {
            xtype: 'button',
            align: 'right',
            text: 'Sum',
            menu: {
                defaults: {
                    handler: 'setSummaryPosition'
                },
                items: [{
                    text: 'Docked',
                    sum: 'docked'
                }, {
                    text: 'Top',
                    sum: 'top'
                }, {
                    text: 'Bottom',
                    sum: 'bottom'
                }, {
                    text: 'Hidden',
                    sum: 'hidden'
                }]
            }
        }, {
            xtype: 'button',
            align: 'right',
            text: 'Visibility',
            menu: {
                items: [{
                    text: 'Expand all',
                    handler: 'expandAll'
                }, {
                    text: 'Collapse all',
                    handler: 'collapseAll'
                }]
            }
        }]
    }
    
    });
    Ext.define('SaleModel', function() {
    var regions = {
        "Belgium": 'Europe',
        "Netherlands": 'Europe',
        "United Kingdom": 'Europe',
        "Canada": 'North America',
        "United States": 'North America',
        "Australia": 'Australia'
    };
    
    return {
        extend: 'Ext.data.Model',
        requires: ['Ext.data.identifier.Sequential'],
       idProperty:'_id',
        identifier: {
         type: 'sequential',
         id: '_id'
        },
        fields: [
            { name: 'id', type: 'int' },
            { name: 'company', type: 'string' },
            { name: 'country', type: 'string' },
            { name: 'person', type: 'string' },
            { name: 'date', type: 'date', dateFormat: 'c' },
            { name: 'value', type: 'float', allowNull: true },
            { name: 'quantity', type: 'float', allowNull: true },
            {
                name: 'year',
                calculate: function(data) {
                    return data.date ? parseInt(Ext.Date.format(data.date, "Y"), 10) : null;
                }
            }, {
                name: 'month',
                calculate: function(data) {
                    return data.date ? parseInt(Ext.Date.format(data.date, "m"), 10) - 1 : null;
                }
            }, {
                name: 'continent',
                calculate: function(data) {
                    return regions[data.country];
                }
            }
        ]
    };
    });
    
    Ext.define('Sales', {
    extend: 'Ext.data.Store',
    alias: 'store.sales',
    
    model:'SaleModel',
    proxy: {
        // load using HTTP
        type: 'ajax',
        limitParam: null,
        url: 'modern/resources/data.json',
        // the return will be JSON, so lets set up a reader
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});