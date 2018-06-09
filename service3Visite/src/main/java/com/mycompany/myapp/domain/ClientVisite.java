package com.mycompany.myapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ClientVisite.
 */
@Entity
@Table(name = "client_visite",  uniqueConstraints={@UniqueConstraint(columnNames ={"id_client","visite_id"})})
public class ClientVisite implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "id_client", nullable = false)
    private Long idClient;

    @ManyToOne
    private Visite visite;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdClient() {
        return idClient;
    }

    public ClientVisite idClient(Long idClient) {
        this.idClient = idClient;
        return this;
    }

    public void setIdClient(Long idClient) {
        this.idClient = idClient;
    }

    public Visite getVisite() {
        return visite;
    }

    public ClientVisite visite(Visite visite) {
        this.visite = visite;
        return this;
    }

    public void setVisite(Visite visite) {
        this.visite = visite;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ClientVisite clientVisite = (ClientVisite) o;
        if (clientVisite.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), clientVisite.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClientVisite{" +
            "id=" + getId() +
            ", idClient=" + getIdClient() +
            "}";
    }
}
