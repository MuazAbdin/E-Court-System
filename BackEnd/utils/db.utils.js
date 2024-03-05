class DBUtils {
    async setFieldCounter(Model, fieldName, counterKeyName, defaultValue = 1) {
        const document = await Model.findOne({}, {}, { sort: { fieldName : -1 } });
        Model[counterKeyName] = document ? document[fieldName] + 1 : defaultValue;
    }
    
    async getCounterAndIncrement(Model, counterKeyName) {   
        return Model[counterKeyName]++;
    } 
}

const dbUtils = new DBUtils();
export default dbUtils;