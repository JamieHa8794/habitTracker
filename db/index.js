const Sequelize = require('sequelize');
const {UUID, UUIDV4, STRING, BOOLEAN} = Sequelize;
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/todolist');


const User = db.define('user', {
    id: {
        type: UUID,
        primaryKey: true, 
        defaultValue: UUIDV4,
    }, 
    name:{
        type: STRING,
        allowNull: false
    }, 
    username:{
        type: STRING,
        allowNull: false
    }
}) 

const Goals = db.define('goal', {
    id: {
        type: UUID,
        primaryKey: true, 
        defaultValue: UUIDV4,
    }, 
    goal:{
        type: STRING,
        allowNull: false
    }, 
}) 

const Dates = db.define('date', {
    id: {
        type: UUID,
        primaryKey: true, 
        defaultValue: UUIDV4,
    }, 
    date: {
        type: STRING,
        allowNull: false
    },
    completed: {
        type: BOOLEAN,
        allowNull: false
    },
}) 

Dates.belongsTo(Goals)
Goals.belongsTo(User)
User.hasMany(Goals)


const baseUsers = [
    {
    name: 'Chandler Bing',
    username: 'chandy'
    },
    {
        name: 'Monica Geller',
        username: 'monicaa'
        },
]

const syncAndSeed = async () =>{
    try{
        await db.sync({force: true})
        await Promise.all(baseUsers.map(userInfo=>{
            User.create({
                name: userInfo.name,
                user: userInfo.username
            })
        }))
        console.log('connected to db')
    }
    catch(err){
        console.log(err)
    }

}

module.exports = {
    db,
    syncAndSeed,
    models:{
        User,
        Goals,
        Dates
    }
}