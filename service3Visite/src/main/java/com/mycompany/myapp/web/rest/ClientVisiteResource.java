package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.ClientVisite;

import com.mycompany.myapp.repository.ClientVisiteRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ClientVisite.
 */
@RestController
@RequestMapping("/api")
public class ClientVisiteResource {

    private final Logger log = LoggerFactory.getLogger(ClientVisiteResource.class);

    private static final String ENTITY_NAME = "clientVisite";

    private final ClientVisiteRepository clientVisiteRepository;

    public ClientVisiteResource(ClientVisiteRepository clientVisiteRepository) {
        this.clientVisiteRepository = clientVisiteRepository;
    }

    /**
     * POST  /client-visites : Create a new clientVisite.
     *
     * @param clientVisite the clientVisite to create
     * @return the ResponseEntity with status 201 (Created) and with body the new clientVisite, or with status 400 (Bad Request) if the clientVisite has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/client-visites")
    @Timed
    public ResponseEntity<ClientVisite> createClientVisite(@Valid @RequestBody ClientVisite clientVisite) throws URISyntaxException {
        log.debug("REST request to save ClientVisite : {}", clientVisite);
        if (clientVisite.getId() != null) {
            throw new BadRequestAlertException("A new clientVisite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClientVisite result = clientVisiteRepository.save(clientVisite);
        return ResponseEntity.created(new URI("/api/client-visites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /client-visites : Updates an existing clientVisite.
     *
     * @param clientVisite the clientVisite to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated clientVisite,
     * or with status 400 (Bad Request) if the clientVisite is not valid,
     * or with status 500 (Internal Server Error) if the clientVisite couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/client-visites")
    @Timed
    public ResponseEntity<ClientVisite> updateClientVisite(@Valid @RequestBody ClientVisite clientVisite) throws URISyntaxException {
        log.debug("REST request to update ClientVisite : {}", clientVisite);
        if (clientVisite.getId() == null) {
            return createClientVisite(clientVisite);
        }
        ClientVisite result = clientVisiteRepository.save(clientVisite);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, clientVisite.getId().toString()))
            .body(result);
    }

    /**
     * GET  /client-visites : get all the clientVisites.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of clientVisites in body
     */
    @GetMapping("/client-visites")
    @Timed
    public List<ClientVisite> getAllClientVisites() {
        log.debug("REST request to get all ClientVisites");
        return clientVisiteRepository.findAll();
        }

    /**
     * GET  /client-visites/:id : get the "id" clientVisite.
     *
     * @param id the id of the clientVisite to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the clientVisite, or with status 404 (Not Found)
     */
    @GetMapping("/client-visites/{id}")
    @Timed
    public ResponseEntity<ClientVisite> getClientVisite(@PathVariable Long id) {
        log.debug("REST request to get ClientVisite : {}", id);
        ClientVisite clientVisite = clientVisiteRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(clientVisite));
    }



    //ajout

    /**
     * GET
     * @param idClient
     * @return
     */
    @GetMapping("/client-visites/{idClient}/client")
    @Timed
    public List<ClientVisite> findAllClientVisiteByIdClient(@PathVariable("idClient")Long idClient){
        log.debug("REST request to get all Client visites of client");
        return clientVisiteRepository.findAllClientVisiteByIdClient(idClient);
    }

    /**
     * GET /client-visites/:idVisite/visite
     *
     * @param idVisite
     * @return
     */
    @GetMapping("/client-visites/{idVisite}/visite")
    @Timed
    public List<ClientVisite> findAllClientVisiteByIdVisite(@PathVariable("idVisite")Long idVisite){
        log.debug("REST request to get all Client visites of visite");
        return clientVisiteRepository.findAllClientVisiteByIdVisite(idVisite);
    }

    /**
     * DELETE  /client-visites/:id : delete the "id" clientVisite.
     *
     * @param id the id of the clientVisite to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/client-visites/{id}")
    @Timed
    public ResponseEntity<Void> deleteClientVisite(@PathVariable Long id) {
        log.debug("REST request to delete ClientVisite : {}", id);
        clientVisiteRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
