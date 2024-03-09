class DBUtils {
    async setFieldCounter(Model, fieldName, counterKeyName, defaultValue = 1) {
        const document = await Model.findOne({}, {}, { sort: { fieldName : -1 } });
        Model[counterKeyName] = document ? document[fieldName] + 1 : defaultValue;
    }
    
    async getCounterAndIncrement(Model, counterKeyName) {   
        return Model[counterKeyName]++;
    }

    createGetNonDeletedRecordsFunction() {
        return async function() {
            const notDeleted = await this.find({ deleted: false });
            notDeleted.forEach(record => record.deleted = undefined);
            return notDeleted;
        }
    }

    createSoftDeleteFunction(DoesNotExistError) {
        return async function(id) {
            const deletedRecord = await this.findByIdAndUpdate(id, {$set: {deleted: true}}).exec();
            if(deletedRecord === null) {
                throw new DoesNotExistError();
            }
        }
    }

    async undeleteIfExists(model, query) {
        const deletedRecord = await model.findOne(query);
        if(deletedRecord && deletedRecord.deleted === true) {
            deletedRecord.deleted = false;
            deletedRecord.save();
            return deletedRecord;
        }
        return null;
    }
}

const dbUtils = new DBUtils();
export default dbUtils;