export const ModelEndpoint = {
  name: null,
  columns: {
    id: { primaryKey: true, notNull: true, dataType: 'string', autoIncrement: false },
    path: { notNull: true, dataType: 'string' },
    name: { notNull: true, dataType: 'string' },
    status: { notNull: false, dataType: 'string' },
    created_at: { notNull: true, dataType: 'date_time' },
    expired_in_minutes: { notNull: true, dataType: 'number' },
  },
}
