package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.Service3VisiteApp;

import com.mycompany.myapp.domain.ClientVisite;
import com.mycompany.myapp.repository.ClientVisiteRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ClientVisiteResource REST controller.
 *
 * @see ClientVisiteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Service3VisiteApp.class)
public class ClientVisiteResourceIntTest {

    private static final Long DEFAULT_ID_CLIENT = 1L;
    private static final Long UPDATED_ID_CLIENT = 2L;

    @Autowired
    private ClientVisiteRepository clientVisiteRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restClientVisiteMockMvc;

    private ClientVisite clientVisite;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClientVisiteResource clientVisiteResource = new ClientVisiteResource(clientVisiteRepository);
        this.restClientVisiteMockMvc = MockMvcBuilders.standaloneSetup(clientVisiteResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClientVisite createEntity(EntityManager em) {
        ClientVisite clientVisite = new ClientVisite()
            .idClient(DEFAULT_ID_CLIENT);
        return clientVisite;
    }

    @Before
    public void initTest() {
        clientVisite = createEntity(em);
    }

    @Test
    @Transactional
    public void createClientVisite() throws Exception {
        int databaseSizeBeforeCreate = clientVisiteRepository.findAll().size();

        // Create the ClientVisite
        restClientVisiteMockMvc.perform(post("/api/client-visites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientVisite)))
            .andExpect(status().isCreated());

        // Validate the ClientVisite in the database
        List<ClientVisite> clientVisiteList = clientVisiteRepository.findAll();
        assertThat(clientVisiteList).hasSize(databaseSizeBeforeCreate + 1);
        ClientVisite testClientVisite = clientVisiteList.get(clientVisiteList.size() - 1);
        assertThat(testClientVisite.getIdClient()).isEqualTo(DEFAULT_ID_CLIENT);
    }

    @Test
    @Transactional
    public void createClientVisiteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = clientVisiteRepository.findAll().size();

        // Create the ClientVisite with an existing ID
        clientVisite.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClientVisiteMockMvc.perform(post("/api/client-visites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientVisite)))
            .andExpect(status().isBadRequest());

        // Validate the ClientVisite in the database
        List<ClientVisite> clientVisiteList = clientVisiteRepository.findAll();
        assertThat(clientVisiteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIdClientIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientVisiteRepository.findAll().size();
        // set the field null
        clientVisite.setIdClient(null);

        // Create the ClientVisite, which fails.

        restClientVisiteMockMvc.perform(post("/api/client-visites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientVisite)))
            .andExpect(status().isBadRequest());

        List<ClientVisite> clientVisiteList = clientVisiteRepository.findAll();
        assertThat(clientVisiteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllClientVisites() throws Exception {
        // Initialize the database
        clientVisiteRepository.saveAndFlush(clientVisite);

        // Get all the clientVisiteList
        restClientVisiteMockMvc.perform(get("/api/client-visites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clientVisite.getId().intValue())))
            .andExpect(jsonPath("$.[*].idClient").value(hasItem(DEFAULT_ID_CLIENT.intValue())));
    }

    @Test
    @Transactional
    public void getClientVisite() throws Exception {
        // Initialize the database
        clientVisiteRepository.saveAndFlush(clientVisite);

        // Get the clientVisite
        restClientVisiteMockMvc.perform(get("/api/client-visites/{id}", clientVisite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(clientVisite.getId().intValue()))
            .andExpect(jsonPath("$.idClient").value(DEFAULT_ID_CLIENT.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingClientVisite() throws Exception {
        // Get the clientVisite
        restClientVisiteMockMvc.perform(get("/api/client-visites/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClientVisite() throws Exception {
        // Initialize the database
        clientVisiteRepository.saveAndFlush(clientVisite);
        int databaseSizeBeforeUpdate = clientVisiteRepository.findAll().size();

        // Update the clientVisite
        ClientVisite updatedClientVisite = clientVisiteRepository.findOne(clientVisite.getId());
        // Disconnect from session so that the updates on updatedClientVisite are not directly saved in db
        em.detach(updatedClientVisite);
        updatedClientVisite
            .idClient(UPDATED_ID_CLIENT);

        restClientVisiteMockMvc.perform(put("/api/client-visites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedClientVisite)))
            .andExpect(status().isOk());

        // Validate the ClientVisite in the database
        List<ClientVisite> clientVisiteList = clientVisiteRepository.findAll();
        assertThat(clientVisiteList).hasSize(databaseSizeBeforeUpdate);
        ClientVisite testClientVisite = clientVisiteList.get(clientVisiteList.size() - 1);
        assertThat(testClientVisite.getIdClient()).isEqualTo(UPDATED_ID_CLIENT);
    }

    @Test
    @Transactional
    public void updateNonExistingClientVisite() throws Exception {
        int databaseSizeBeforeUpdate = clientVisiteRepository.findAll().size();

        // Create the ClientVisite

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restClientVisiteMockMvc.perform(put("/api/client-visites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientVisite)))
            .andExpect(status().isCreated());

        // Validate the ClientVisite in the database
        List<ClientVisite> clientVisiteList = clientVisiteRepository.findAll();
        assertThat(clientVisiteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteClientVisite() throws Exception {
        // Initialize the database
        clientVisiteRepository.saveAndFlush(clientVisite);
        int databaseSizeBeforeDelete = clientVisiteRepository.findAll().size();

        // Get the clientVisite
        restClientVisiteMockMvc.perform(delete("/api/client-visites/{id}", clientVisite.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ClientVisite> clientVisiteList = clientVisiteRepository.findAll();
        assertThat(clientVisiteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClientVisite.class);
        ClientVisite clientVisite1 = new ClientVisite();
        clientVisite1.setId(1L);
        ClientVisite clientVisite2 = new ClientVisite();
        clientVisite2.setId(clientVisite1.getId());
        assertThat(clientVisite1).isEqualTo(clientVisite2);
        clientVisite2.setId(2L);
        assertThat(clientVisite1).isNotEqualTo(clientVisite2);
        clientVisite1.setId(null);
        assertThat(clientVisite1).isNotEqualTo(clientVisite2);
    }
}
