export default class TaskRepository {
    constructor (dao){
        this.dao = dao
    }

    getAll = () => {
        return this.dao.getAll()
    }

    save = (task) => {
        return this.dao.save(task)
    }

    findOne = (id) => {
        return this.dao.findOne(id)
    }

    update = (filter, value) => {
        return this.dao.update(filter, value)
    }
}