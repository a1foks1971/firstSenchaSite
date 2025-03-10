Ext.define('ComboTest.State', {
    extend: 'Ext.data.Model',
    alias: 'model.state',
    
    idProperty: 'postId',
    fields: [{
        name: 'postId',
        mapping: 'post_id'
    }, {
        name: 'title',
        mapping: 'topic_title'
    }, {
        name: 'topicId',
        mapping: 'topic_id'
    }, {
        name: 'author',
        mapping: 'author'
    }, {
        name: 'lastPost',
        mapping: 'post_time',
        type: 'date',
        dateFormat: 'timestamp'
    }, {
        name: 'excerpt',
        mapping: 'post_text'
    }]
    });
    
    Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.form.Panel',
    
    items: [{
        xtype: 'combobox',
    
    label: 'Buggy Combobox',
    multiSelect: true,
    forceSelection: false,
    // queryMode: 'local', // Set to 'local' if you want local filtering
    queryMode: 'remote', // Set to 'local' if you want local filtering
    displayField: 'title',
    valueField: 'postId',
    minChars: 3,
    store: {
        model: 'ComboTest.State',
        pageSize: 100,
        proxy: {
            type: 'memory', // Use 'memory' proxy for local data
            reader: {
                type: 'json',
                rootProperty: 'topics', // Root property in the local data
                totalProperty: 'totalCount'
            }
        },
        data: [
            {
                "post_id": 1,
                "topic_title": "Introduction to ExtJS",
                "topic_id": 101,
                "author": "John Doe",
                "post_time": "2024-01-01T12:00:00",
                "post_text": "This is a basic introduction to ExtJS."
            },
            {
                "post_id": 2,
                "topic_title": "Working with ExtJS Grid",
                "topic_id": 102,
                "author": "Jane Smith",
                "post_time": "2024-01-02T14:00:00",
                "post_text": "Learn how to work with ExtJS Grid."
            },
            {
                "post_id": 3,
                "topic_title": "Advanced ExtJS Components",
                "topic_id": 103,
                "author": "Tom Green",
                "post_time": "2024-01-03T16:30:00",
                "post_text": "Explore advanced components in ExtJS."
            },
            {
                "post_id": 4,
                "topic_title": "ExtJS Layouts and Views",
                "topic_id": 104,
                "author": "Anna White",
                "post_time": "2024-01-04T09:15:00",
                "post_text": "Understand how to use layouts and views in ExtJS."
            }
            // Add more items as needed for testing
        ],
        autoLoad: false
    }
    }]
    });