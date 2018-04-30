package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Vendeur;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Vendeur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VendeurRepository extends JpaRepository<Vendeur, Long> {

}
