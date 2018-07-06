package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ClientVisite;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the ClientVisite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientVisiteRepository extends JpaRepository<ClientVisite, Long> {

    @Query("select clientVisite from ClientVisite  clientVisite where clientVisite.idClient =:idClient")
    List<ClientVisite> findAllClientVisiteByIdClient(@Param("idClient")Long idClient);

    @Query ("select clientVisite from ClientVisite  clientVisite where clientVisite.visite.id =:idVisite")
    List<ClientVisite> findAllClientVisiteByIdVisite(@Param("idVisite")Long idVisite);

}
