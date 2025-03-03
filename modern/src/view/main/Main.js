var store = Ext.create('Ext.data.Store', {
    fields: ['id', 'show', 'combo', 'date'],
    data: [{
        'id': '0',
        "show": "Battlestar Galactica",
        "combo": "A",
        "date": "21/Oct/75"
    }, {
        'id': '1',
        "show": "Doctor Who",
        "combo": "B",
        "date": "21/Oct/76"
    }, {
        'id': '2',
        "show": "Farscape",
        "combo": "C",
        "date": "21/Oct/77"
    }, {
        'id': '3',
        "show": "Firefly",
        "combo": "A",
        "date": "21/Oct/78"
    },
    {
        'id': '4',
        "show": "Star Trek",
        "combo": "A",
        "date": "21/Oct/79"
    },
    {
        'id': '5',
        "show": "Star Wars: Christmas Special",
        "combo": "D",
        "date": "21/Oct/80"
       }]
       });
    
    var columns = [
    {
        text: 'ID',
        dataIndex: 'id',
        flex: 1,
       },
    
    {
        text: 'Show',
        dataIndex: 'show',
        flex: 1,
    
    // Turn on Cell Editing
    editable: true,
    filterType: 'string'
    }, {
    dataIndex: 'combo',
    text: 'Combo',
    //flex: 1,
    width: '150px',
    filterType: {
        type: 'list',
        fieldDefaults: {
            listeners: {
                //focus: filterFocus,
                //blur: filterBlur,
            }
        },
        dataIndex: 'combo',
    }
    }, {
        dataIndex: 'date',
        xtype: 'datecolumn',
        text: 'Date',
        flex: 1,
        format: 'd-M-Y',
        filterType: {
            // required configs
            type: 'date',
            // optional configs
            //value: 'star', // setting a value makes the filter active.
            fieldDefaults: {
                // any Ext.form.field.Text configs accepted
                clearable: true,
                dateFormat: 'd-M-Y',
                altFormats: 'j-M-Y',
            }
           }
          },
    
    ];
    Ext.define('NewExtApp.view.main.Main', {
    
    extend: "Ext.grid.Grid",
    title: 'Simpsons',
    columns: columns,
    store: store,
    layout: 'fit',
    fullscreen: true,
    
    // Turn on Cell Editing
    plugins: [{
        type: "cellediting",
        triggerEvent: 'tap'
        }, {
        type: 'gridfilterbar'
        }]
    });