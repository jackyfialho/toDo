const TaskModel = require('../model/TaskModel');

const TaskValidation = async (request, response, next) => {
    const {
        macaddress,
        type,
        title,
        description,
        when
    } = request.body;

    if( !macaddress )
        return response.status(400).json({ error : 'Macaddress é obrigatório' });
    else if( !type )
        return response.status(400).json({ error : 'Tipo é obrigatório' });
    else if( !description )
        return response.status(400).json({ error : 'Descrição é obrigatória' });
    else if( !when )
        return response.status(400).json({ error : 'Data e Hora são obrigatórios' });
}   

module.exports = TaskValidation;