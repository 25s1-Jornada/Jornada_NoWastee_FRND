package senai.nowastee.api.models;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "categoria")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Categoria extends BaseEntity {
    private String nome;
    
    private Categoria categoriaPai;

    private ETipoProduto tipoProduto;
}
