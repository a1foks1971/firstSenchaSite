Ext.create("Ext.data.Store", {
    storeId: "simpsonsStore",
    fields: ["name", "email", "phone"],
    data: [{
        name: "Lisa",
        email: "lisa@simpsons.com",
        phone: "555-111-1224",
        age: 12,
        dept: "A",
        deptno: 1,
    }, {
        name: "Bart",
        email: "bart@simpsons.com",
        phone: "555-222-1234",
        age: 12,
        dept: "A",
        deptno: 1,
    }, {
        name: "Homer",
        email: "homer@simpsons.com",
        phone: "555-222-1244",
        age: 12,
        dept: "A",
        deptno: 1,
    }, {
        name: "Marge",
        email: "marge@simpsons.com",
        phone: "555-222-1254",
        age: 12,
        dept: "A",
        deptno: 1,
    }, ],
});

Ext.define('NewExtApp.view.main.Main', {
   extend: 'Ext.grid.Panel',
   title: "Simpsons",

    store: Ext.data.StoreManager.lookup("simpsonsStore"),
    columns: [{

        text: "Name",
        dataIndex: "name",

    }, {

        text: " HR Department Information",
        columns: [{
            text: "DeptNO",
            dataIndex: "deptno"
        }, {
            text: "Department",
            dataIndex: "dept"
        }, ],
    }, {

        text: " HR Personal Information",
        columns: [{
            text: "EmailId",
            dataIndex: "email"
        }, {
            "hidden": true,
            text: "Phone",
            dataIndex: "phone"
        }, {
            text: "AGE",
            dataIndex: "age"
        }, {
            text: "Department",
            dataIndex: "dept"
        }, ],
    }, {

        text: " HR OverAll Information",
        columns: [{
            "hidden": true,
            text: "DeptNO1",
            dataIndex: "deptno"
        }, {
            text: "Department",
            dataIndex: "dept"
        }, {
            text: "EmailId",
            dataIndex: "email"
        }, {
            text: "Phone",
            dataIndex: "phone"
        }, {
            "hidden": true,
            text: "AGE1",
            dataIndex: "age"
        }, {
            text: "Name",
            dataIndex: "name"
        }, {
            text: "Phone1",
            dataIndex: "phone"
        }, {
            text: "AGE",
            dataIndex: "age"
        }, ],
    }, {

        text: "Analyist Personal Information",
        columns: [{
            text: "EmailId",
            dataIndex: "email"
        }, {
            text: "Phone",
            dataIndex: "phone"
        }, {
            "hidden": true,
            text: "AGE1",
            dataIndex: "age"
        }, {
            text: "AGE",
            dataIndex: "age"
        }, {
            text: "Department",
            dataIndex: "dept"
        }, ],
    }, {

        text: "Developer Personal Information",
        columns: [{
            "hidden": true,
            text: "EmailId1",
            dataIndex: "email"
        }, {
            text: "Phone",
            dataIndex: "phone"
        }, {
            text: "AGE1",
            dataIndex: "age"
        }, {
            text: "AGE",
            dataIndex: "age"
        }, {
            text: "EmailId",
            dataIndex: "email"
        }, {
            text: "Department",
            dataIndex: "dept"
        }, ],
    }, {

        text: "QC Personal Information",
        columns: [{
            text: "EmailId",
            dataIndex: "email"
        }, {
            "hidden": true,
            text: "Phone",
            dataIndex: "phone"
        }, {
            text: "AGE",
            dataIndex: "age"
        }, {
            text: "Department",
            dataIndex: "dept"
        }, ],
    }, {

        text: "Developer Department Information",
        columns: [{
            text: "DeptNO",
            dataIndex: "deptno"
        }, {
            text: "Department",
            dataIndex: "dept"
        } ],
    }],
    renderTo: Ext.getBody(),
   
});
