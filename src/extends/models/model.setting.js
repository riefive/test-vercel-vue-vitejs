export const ModelSetting = {
  name: null,
  columns: {
    id: { primaryKey: true, notNull: true, dataType: 'string', autoIncrement: false },
    name: { notNull: true, dataType: 'string' },
    type: { notNull: true, dataType: 'string' },
    value: { notNull: false, dataType: 'string' },
  },
}
