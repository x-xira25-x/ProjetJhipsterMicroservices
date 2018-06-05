package com.mycompany.myapp.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Vendeur.class)
public abstract class Vendeur_ {

	public static volatile SingularAttribute<Vendeur, String> localite;
	public static volatile SingularAttribute<Vendeur, String> adresse;
	public static volatile SingularAttribute<Vendeur, Long> id;
	public static volatile SingularAttribute<Vendeur, String> nom;
	public static volatile SingularAttribute<Vendeur, String> prenom;
	public static volatile SingularAttribute<Vendeur, Integer> numTel;
	public static volatile SingularAttribute<Vendeur, String> npa;

}

