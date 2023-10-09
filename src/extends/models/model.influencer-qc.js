export const ModelInfluencerQc = {
  name: null,
  columns: {
    id: { primaryKey: true, dataType: 'string', autoIncrement: false },
    account_id: { notNull: true, dataType: 'string' },
    influencer_id: { notNull: true, dataType: 'string' },
    name: { notNull: false, dataType: 'string' },
    username: { notNull: false, dataType: 'string' },
    profile_picture: { notNull: false, dataType: 'string' },
    social_media: { notNull: false, dataType: 'string' },
    follower: { notNull: false, dataType: 'number' },
    following: { notNull: false, dataType: 'number' },
    check_address: { notNull: false, dataType: 'number' },
    check_bank: { notNull: false, dataType: 'number' },
    check_identity: { notNull: false, dataType: 'number' },
    check_pic: { notNull: false, dataType: 'number' },
    updated_at: { notNull: false, dataType: 'date_time' },
  },
}
