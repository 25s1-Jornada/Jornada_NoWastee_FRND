package senai.nowastee.api.models;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Essa classe abstrata possui campos e regras de negócio
 * convenientes para todas as demais entidades do sistema
 * e, portanto, todas as entidades devem extendê-la.
 */
@MappedSuperclass
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public abstract class BaseEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    /**
     * Esse método é chamado quando a entidade está sendo criada,
     * e ele é responsável por settar a data de cadastro para a data atual.
     */
    @PrePersist
    private void setCreatedNow() {
        this.setCreatedAt(new Date());
    }

    /**
     * Esse método é chamado quando a entidade está sendo atualizada,
     * e ele é responsável por settar a data de atualização para a data atual.
     */
    @PreUpdate
    private void setUpdatedNow() {
        this.setUpdatedAt(new Date());
    }
}
