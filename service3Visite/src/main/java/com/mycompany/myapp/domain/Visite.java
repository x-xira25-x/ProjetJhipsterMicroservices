package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Visite.
 */
@Entity
@Table(name = "visite")
public class Visite implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "date_debut", nullable = false)
    private ZonedDateTime dateDebut;

    @Column(name = "date_fin")
    private ZonedDateTime dateFin;

    @NotNull
    @Column(name = "id_agent_immobilier", nullable = false)
    private Long idAgentImmobilier;

    @NotNull
    @Column(name = "id_bien", nullable = false)
    private Long idBien;

    @ManyToOne(optional = false)
    @NotNull
    private EtatVisite etatVisite;

    @OneToMany(mappedBy = "visite")
    @JsonIgnore
    private Set<ClientVisite> clientVisites = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDateDebut() {
        return dateDebut;
    }

    public Visite dateDebut(ZonedDateTime dateDebut) {
        this.dateDebut = dateDebut;
        return this;
    }

    public void setDateDebut(ZonedDateTime dateDebut) {
        this.dateDebut = dateDebut;
    }

    public ZonedDateTime getDateFin() {
        return dateFin;
    }

    public Visite dateFin(ZonedDateTime dateFin) {
        this.dateFin = dateFin;
        return this;
    }

    public void setDateFin(ZonedDateTime dateFin) {
        this.dateFin = dateFin;
    }

    public Long getIdAgentImmobilier() {
        return idAgentImmobilier;
    }

    public Visite idAgentImmobilier(Long idAgentImmobilier) {
        this.idAgentImmobilier = idAgentImmobilier;
        return this;
    }

    public void setIdAgentImmobilier(Long idAgentImmobilier) {
        this.idAgentImmobilier = idAgentImmobilier;
    }

    public Long getIdBien() {
        return idBien;
    }

    public Visite idBien(Long idBien) {
        this.idBien = idBien;
        return this;
    }

    public void setIdBien(Long idBien) {
        this.idBien = idBien;
    }

    public EtatVisite getEtatVisite() {
        return etatVisite;
    }

    public Visite etatVisite(EtatVisite etatVisite) {
        this.etatVisite = etatVisite;
        return this;
    }

    public void setEtatVisite(EtatVisite etatVisite) {
        this.etatVisite = etatVisite;
    }

    public Set<ClientVisite> getClientVisites() {
        return clientVisites;
    }

    public Visite clientVisites(Set<ClientVisite> clientVisites) {
        this.clientVisites = clientVisites;
        return this;
    }

    public Visite addClientVisite(ClientVisite clientVisite) {
        this.clientVisites.add(clientVisite);
        clientVisite.setVisite(this);
        return this;
    }

    public Visite removeClientVisite(ClientVisite clientVisite) {
        this.clientVisites.remove(clientVisite);
        clientVisite.setVisite(null);
        return this;
    }

    public void setClientVisites(Set<ClientVisite> clientVisites) {
        this.clientVisites = clientVisites;
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
        Visite visite = (Visite) o;
        if (visite.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), visite.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Visite{" +
            "id=" + getId() +
            ", dateDebut='" + getDateDebut() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            ", idAgentImmobilier=" + getIdAgentImmobilier() +
            ", idBien=" + getIdBien() +
            "}";
    }
}
