import { Sequelize, DataTypes } from 'sequelize'

export default (sequelize : Sequelize) =>{
    const Author =sequelize.define("author",{
        name :{
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Author

}