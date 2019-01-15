const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    todo_title:{
        type:String,
    },
    name:{
        type: String
    },
    data:{
        type: Date,
        default: Date.now
    }
})

const ItemGroupSchema = mongoose.Schema({
    group_title:{
        type:String,
    },
    todoItems:{
        type: Schema.Types.ObjectId, 
        ref: 'Item'
    },
    data:{
        type: Date,
        default: Date.now
    }
})

module.exports = Todo = mongoose.model('Todo', ItemSchema);

module.exports = Group = mongoose.model('Group', ItemGroupSchema);
