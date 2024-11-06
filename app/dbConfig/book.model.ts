import { Sequelize, DataTypes } from 'sequelize'

export default (sequelize : Sequelize) =>{
    const Book = sequelize.define("book",{
        title :{
            type :DataTypes.STRING,
            allowNull: false
        },
        volume :{
            type :DataTypes.INTEGER,
            allowNull: false
        },
        serie :{
            type :DataTypes.STRING,
            allowNull: false
        },
        
        author :{
            type :DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type :DataTypes.STRING,
            allowNull: false
        },
        resume:{
            type :DataTypes.STRING,
            allowNull: false
        },
        rating:{
            type :DataTypes.INTEGER,
            allowNull: false
        },
        returned:{
            type :DataTypes.BOOLEAN,
            allowNull: false
        },
        format:{
            type :DataTypes.STRING,
            allowNull: false
        },
        borrower:{
            type :DataTypes.STRING,
            allowNull: true
        },
        date:{
            type :DataTypes.DATEONLY,
            allowNull: true
        },
        present :{
            type :DataTypes.BOOLEAN,
            allowNull: false
        }

        


    })
    return Book
}