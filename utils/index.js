const mapDBToModel = ({
    id,
    title,
    year,
    performer,
    genre,
    duration,
    insertedAt,
    updatedAt,
}) => ({
    id,
    title,
    year,
    performer,
    genre,
    duration,
    insertedAt: insertedAt,
    updatedAt : updatedAt
});

module.exports = {mapDBToModel};