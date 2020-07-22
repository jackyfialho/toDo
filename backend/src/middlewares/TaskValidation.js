const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns');

const TaskValidation = async (req, res, next) => {
    const {
        macaddress,
        type,
        title,
        description,
        when
    } = req.body;

    if( !macaddress )
        return res.status(400).json({ error : 'Macaddress é obrigatório' });
    else if( !type )
        return res.status(400).json({ error : 'Tipo é obrigatório' });
    else if( !title )
        return res.status(400).json({ error : 'Título é obrigatório' });
    else if( !description )
        return res.status(400).json({ error : 'Descrição é obrigatória' });
    else if( !when )
        return res.status(400).json({ error : 'Data e Hora são obrigatórios' });
    else if( isPast(new Date(when)) )
        return res.status(400).json({ error : 'Escolha uma data e hora futura' }); 
    else {
        let exists;

        if( req.params.id ) {
            console.log('entrou');
            exists = await TaskModel.
                        findOne({ 
                            '_id': { '$ne': req.params.id }, //id diferente do do parametro (ignora o id da propria tarefa)
                            'when': { '$eq': new Date(when) }, // qualquer um com data igual
                            'macaddress': { '$in': macaddress } // qualquer um com mesmo macaddress
                        });
        } else {
            exists = await TaskModel.
                        findOne({ 
                            'when': { '$eq': new Date(when) },
                            'macaddress': { '$in': macaddress }
                        });
        }

        if( exists ) {
            return res.status(400).json({ error : 'Já existe uma tarefa nesse dia e horário' }); 
        }

        next();
    }

}   

module.exports = TaskValidation;