export async function setFieldCounter(Model, fieldName, counterKeyName, defaultValue = 1) {
    const document = await Model.findOne({}, {}, { sort: { fieldName : -1 } });
    Model[counterKeyName] = document ? document[fieldName] + 1 : defaultValue;
}

export async function getCounterAndIncrement(Model, counterKeyName) {   
    return Model[counterKeyName]++;
} 

