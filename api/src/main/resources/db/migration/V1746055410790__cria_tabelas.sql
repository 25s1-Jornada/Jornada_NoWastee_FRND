CREATE TYPE tipo_produto_enum AS ENUM ('CAMISETA');

CREATE TABLE categoria (
    id serial primary key NOT NULL,
    name varchar(50) NOT NULL,
    fk_categoria_pai_id bigint,
    tipo_produto tipo_produto_enum NOT NULL,
    created_at date NOT NULL,
    updated_at date,
    FOREIGN KEY (fk_categoria_pai_id) REFERENCES categoria(id)
);
