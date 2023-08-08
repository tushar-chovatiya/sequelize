const { Sequelize,DataTypes } = require("sequelize");

const { sequelize } = require('../config/dbcon');

exports.users = sequelize.define("tbl_user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    role_id: {
        type: DataTypes.INTEGER,
    },
    designation_id: {
        type: DataTypes.INTEGER,
    },
    company_id: {
        type: DataTypes.INTEGER,
    },
    password: {
        type: DataTypes.STRING,
    },
}, {
    paranoid: true
});
//    sequelize.sync().then(() => {
//         console.log('Book table created successfully!');
//      }).catch((error) => {
//         console.error('Unable to create table : ', error);
//      });
exports.getrole = sequelize.define("tbl_role", {
    role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role_name: {
        type: DataTypes.STRING,
    },
}, {    
    paranoid: true
});


exports.getcompany = sequelize.define("tbl_companies", {
    company_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    company_name: {
        type: DataTypes.STRING,
    },
}, {
    paranoid: true
});

exports.getdesignation = sequelize.define("tbl_designation", {
    designation_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    designation_name: {
        type: DataTypes.STRING,
    },
}, {
    paranoid: true
});

// return users



// users.sync().then(() => {
//     console.log('users table created successfully!');
// }).catch((error) => {
//     console.error('Unable to create table : ', error);
// });



