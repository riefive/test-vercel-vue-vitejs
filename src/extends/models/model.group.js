export const ModelGroup = {
  name: null,
  columns: {
    id: { primaryKey: true, notNull: true, dataType: 'string', autoIncrement: false },
    group_id: { notNull: true, dataType: 'string' },
    group_name: { notNull: true, dataType: 'string' },
    total_members: { notNull: true, dataType: 'number' },
    updated_at: { notNull: true, dataType: 'date_time' },
  },
}
