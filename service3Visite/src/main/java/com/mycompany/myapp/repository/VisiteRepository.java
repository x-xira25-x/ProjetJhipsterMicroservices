package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Visite;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Visite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VisiteRepository extends JpaRepository<Visite, Long> {

    @Query("select visite from Visite visite where visite.idBien =:idBien")
    List<Visite> findAllVisiteByBien(@Param("idBien")Long idBien);
}
