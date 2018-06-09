package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ClientVisite;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ClientVisite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientVisiteRepository extends JpaRepository<ClientVisite, Long> {

}
