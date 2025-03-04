Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.grid.Panel',
    xtype: 'advanced-grouping-grid',
    requires: [
    
    'Ext.grid.plugin.GroupingPanel',
    'Ext.grid.plugin.Summaries'
    ],
    
    title: 'Sales',
    width: 750,
    height: 350,
    
    collapsible: true,
    collapseFirst: false,
    frame: true,
    minHeight: 200,
    
    bind: '{sales}',
    
    columns: [ {
        dataIndex: 'company',
        text: 'Company',
        groupable: true,
        flex: 1
    }, {
        text: 'Date',
        dataIndex: 'date',
        xtype: 'datecolumn'
    }, {
        xtype: 'numbercolumn',
        dataIndex: 'price',
        text: 'Value',
        summaryFormatter: 'number("0,000.00")'
    }],
    
    features: [{
        ftype: 'advancedgroupingsummary',
        startCollapsed: true
    }],
    
    enableLocking: true,
    
    plugins: [{
        ptype: 'groupingpanel'},
        {ptype : 'gridsummaries'
    }],
    
    viewModel: {
        data: {
            groupBy: null
        },
        stores: {
            sales: {
                type: 'sales',
                groupers: [
                   'company'
                ]
            }
        }
    },
    
    header: {
        itemPosition: 1, // after title before collapse tool
        items: [{
            ui: 'default-toolbar',
            xtype: 'button',
            cls: 'dock-tab-btn',
            text: 'Group summary position',
            menu: [{
                text: 'top',
                handler: 'changeGroupSummaryPosition'
            }, {
                text: 'bottom',
                handler: 'changeGroupSummaryPosition'
            }, {
                text: 'hidden',
                handler: 'changeGroupSummaryPosition'
            }]
        }, {
            ui: 'default-toolbar',
            xtype: 'button',
            cls: 'dock-tab-btn',
            text: 'Summary position',
            menu: [{
                text: 'docked',
                handler: 'changeSummaryPosition'
            }, {
                text: 'top',
                handler: 'changeSummaryPosition'
            }, {
                text: 'bottom',
                handler: 'changeSummaryPosition'
            }, {
                text: 'hidden',
                handler: 'changeSummaryPosition'
            }]
        }, {
            ui: 'default-toolbar',
            xtype: 'button',
            cls: 'dock-tab-btn',
            text: 'Visibility',
            menu: [{
                text: 'Expand all',
                handler: 'expandAll'
            }, {
                text: 'Collapse all',
                handler: 'collapseAll'
            }]
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
        url: 'classic/resources/data.json',
        // the return will be JSON, so lets set up a reader
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});