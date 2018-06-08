package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Bien;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Bien entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BienRepository extends JpaRepository<Bien, Long> {

    @Query("select bien from Bien bien where bien.typeBien.id =:idTypeBien")
    List<Bien> findAllBienByTypeBien(@Param("idTypeBien")Long idTypeBien);
}
