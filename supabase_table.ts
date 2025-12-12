export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      acces_dossier_medical: {
        Row: {
          date_autorisation: string | null
          id: number
          id_patient: number
          id_professionnel: number
          refus_partage: boolean | null
        }
        Insert: {
          date_autorisation?: string | null
          id?: number
          id_patient: number
          id_professionnel: number
          refus_partage?: boolean | null
        }
        Update: {
          date_autorisation?: string | null
          id?: number
          id_patient?: number
          id_professionnel?: number
          refus_partage?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "acces_dossier_medical_id_patient_fkey"
            columns: ["id_patient"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "acces_dossier_medical_id_professionnel_fkey"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "professionnels"
            referencedColumns: ["id"]
          },
        ]
      }
      administrateurs: {
        Row: {
          id: number
          nom: string
          utilisateur_id: number
        }
        Insert: {
          id?: number
          nom: string
          utilisateur_id: number
        }
        Update: {
          id?: number
          nom?: string
          utilisateur_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "administrateurs_utilisateur_id_fkey"
            columns: ["utilisateur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      affectation_medical: {
        Row: {
          confidentialite: boolean | null
          date: string
          id: number
          id_carnet: number | null
          id_patient: number | null
          maladie: string | null
          remarques: string | null
        }
        Insert: {
          confidentialite?: boolean | null
          date?: string
          id?: number
          id_carnet?: number | null
          id_patient?: number | null
          maladie?: string | null
          remarques?: string | null
        }
        Update: {
          confidentialite?: boolean | null
          date?: string
          id?: number
          id_carnet?: number | null
          id_patient?: number | null
          maladie?: string | null
          remarques?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affectation_medical_id_carnet_fkey"
            columns: ["id_carnet"]
            isOneToOne: false
            referencedRelation: "carnet_sante"
            referencedColumns: ["id"]
          },
        ]
      }
      allergie: {
        Row: {
          confidentialite: boolean | null
          id: number
          id_carnet: number | null
          nom: string | null
          reaction: string | null
          remarques: string | null
        }
        Insert: {
          confidentialite?: boolean | null
          id?: number
          id_carnet?: number | null
          nom?: string | null
          reaction?: string | null
          remarques?: string | null
        }
        Update: {
          confidentialite?: boolean | null
          id?: number
          id_carnet?: number | null
          nom?: string | null
          reaction?: string | null
          remarques?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "allergie_id_carnet_fkey"
            columns: ["id_carnet"]
            isOneToOne: false
            referencedRelation: "carnet_sante"
            referencedColumns: ["id"]
          },
        ]
      }
      annuler_rendez_vous: {
        Row: {
          id: number
          id_rendez_vous: number | null
          motif: string
        }
        Insert: {
          id?: number
          id_rendez_vous?: number | null
          motif: string
        }
        Update: {
          id?: number
          id_rendez_vous?: number | null
          motif?: string
        }
        Relationships: [
          {
            foreignKeyName: "annuler_rendez_vous_id_rendez_vous_fkey"
            columns: ["id_rendez_vous"]
            isOneToOne: false
            referencedRelation: "rendez_vous"
            referencedColumns: ["id"]
          },
        ]
      }
      antecedant_chirurgicaux: {
        Row: {
          confidentialite: boolean | null
          date: string | null
          description: string | null
          id: number
          id_carnet: number | null
          nom: string | null
          remarques: string | null
        }
        Insert: {
          confidentialite?: boolean | null
          date?: string | null
          description?: string | null
          id?: number
          id_carnet?: number | null
          nom?: string | null
          remarques?: string | null
        }
        Update: {
          confidentialite?: boolean | null
          date?: string | null
          description?: string | null
          id?: number
          id_carnet?: number | null
          nom?: string | null
          remarques?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "antecedant_chirurgicaux_id_carnet_fkey"
            columns: ["id_carnet"]
            isOneToOne: false
            referencedRelation: "carnet_sante"
            referencedColumns: ["id"]
          },
        ]
      }
      antecedant_familliaux: {
        Row: {
          affections_medicales: string | null
          confidentialite: boolean | null
          decede: boolean | null
          id: number
          id_carnet: number | null
          nom_lien: string | null
          remarques: string | null
        }
        Insert: {
          affections_medicales?: string | null
          confidentialite?: boolean | null
          decede?: boolean | null
          id?: number
          id_carnet?: number | null
          nom_lien?: string | null
          remarques?: string | null
        }
        Update: {
          affections_medicales?: string | null
          confidentialite?: boolean | null
          decede?: boolean | null
          id?: number
          id_carnet?: number | null
          nom_lien?: string | null
          remarques?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "antecedant_familliaux_id_carnet_fkey"
            columns: ["id_carnet"]
            isOneToOne: false
            referencedRelation: "carnet_sante"
            referencedColumns: ["id"]
          },
        ]
      }
      antecedant_sociaux_alcoolique: {
        Row: {
          confidentialite: boolean | null
          consommez_activement: boolean | null
          frequence: string | null
          id: number
          id_carnet: number | null
          nb_boisson_consomer: number | null
          remarques: string | null
        }
        Insert: {
          confidentialite?: boolean | null
          consommez_activement?: boolean | null
          frequence?: string | null
          id?: number
          id_carnet?: number | null
          nb_boisson_consomer?: number | null
          remarques?: string | null
        }
        Update: {
          confidentialite?: boolean | null
          consommez_activement?: boolean | null
          frequence?: string | null
          id?: number
          id_carnet?: number | null
          nb_boisson_consomer?: number | null
          remarques?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "antecedant_sociaux_alcoolique_id_carnet_fkey"
            columns: ["id_carnet"]
            isOneToOne: false
            referencedRelation: "carnet_sante"
            referencedColumns: ["id"]
          },
        ]
      }
      antecedant_sociaux_fumeur: {
        Row: {
          annee_a_fumer: string | null
          confidentialite: boolean | null
          decede: boolean | null
          fumeur_actif: boolean | null
          id: number
          id_carnet: number | null
          quantite_par_jour: string | null
          remarques: string | null
        }
        Insert: {
          annee_a_fumer?: string | null
          confidentialite?: boolean | null
          decede?: boolean | null
          fumeur_actif?: boolean | null
          id?: number
          id_carnet?: number | null
          quantite_par_jour?: string | null
          remarques?: string | null
        }
        Update: {
          annee_a_fumer?: string | null
          confidentialite?: boolean | null
          decede?: boolean | null
          fumeur_actif?: boolean | null
          id?: number
          id_carnet?: number | null
          quantite_par_jour?: string | null
          remarques?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "antecedant_sociaux_fumeur_id_carnet_fkey"
            columns: ["id_carnet"]
            isOneToOne: false
            referencedRelation: "carnet_sante"
            referencedColumns: ["id"]
          },
        ]
      }
      antecedents_grossesse: {
        Row: {
          confidentialite: boolean | null
          date: string | null
          est_enceinte: boolean | null
          id: number
          id_carnet: number | null
          nombre_enfants: number | null
          parite: string | null
          remarques: string | null
        }
        Insert: {
          confidentialite?: boolean | null
          date?: string | null
          est_enceinte?: boolean | null
          id?: number
          id_carnet?: number | null
          nombre_enfants?: number | null
          parite?: string | null
          remarques?: string | null
        }
        Update: {
          confidentialite?: boolean | null
          date?: string | null
          est_enceinte?: boolean | null
          id?: number
          id_carnet?: number | null
          nombre_enfants?: number | null
          parite?: string | null
          remarques?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "antecedents_grossesse_id_carnet_fkey"
            columns: ["id_carnet"]
            isOneToOne: false
            referencedRelation: "carnet_sante"
            referencedColumns: ["id"]
          },
        ]
      }
      assurances_professionnel: {
        Row: {
          id: number
          id_assurance: number
          id_professionnel: number
        }
        Insert: {
          id?: number
          id_assurance: number
          id_professionnel: number
        }
        Update: {
          id?: number
          id_assurance?: number
          id_professionnel?: number
        }
        Relationships: [
          {
            foreignKeyName: "assurances_professionnel_id_assurance_fkey"
            columns: ["id_assurance"]
            isOneToOne: false
            referencedRelation: "liste_assurances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assurances_professionnel_id_professionnel_fkey"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "professionnels"
            referencedColumns: ["id"]
          },
        ]
      }
      carnet_sante: {
        Row: {
          confidentialite: boolean | null
          date_creation: string | null
          id: number
          id_proprietaire: number
        }
        Insert: {
          confidentialite?: boolean | null
          date_creation?: string | null
          id?: number
          id_proprietaire: number
        }
        Update: {
          confidentialite?: boolean | null
          date_creation?: string | null
          id?: number
          id_proprietaire?: number
        }
        Relationships: [
          {
            foreignKeyName: "carnet_sante_id_proprietaire_fkey"
            columns: ["id_proprietaire"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          id: number
          nom: string
          type: Database["public"]["Enums"]["categorie_type_enum"]
        }
        Insert: {
          id?: number
          nom: string
          type: Database["public"]["Enums"]["categorie_type_enum"]
        }
        Update: {
          id?: number
          nom?: string
          type?: Database["public"]["Enums"]["categorie_type_enum"]
        }
        Relationships: []
      }
      commune: {
        Row: {
          id: number
          id_district: number
          nom: string
        }
        Insert: {
          id: number
          id_district: number
          nom: string
        }
        Update: {
          id?: number
          id_district?: number
          nom?: string
        }
        Relationships: [
          {
            foreignKeyName: "commune_id_district_fkey"
            columns: ["id_district"]
            isOneToOne: false
            referencedRelation: "district"
            referencedColumns: ["id"]
          },
        ]
      }
      condition_gynecologique: {
        Row: {
          confidentialite: boolean | null
          date: string | null
          id: number
          id_carnet: number | null
          maladie: string | null
          remarques: string | null
        }
        Insert: {
          confidentialite?: boolean | null
          date?: string | null
          id?: number
          id_carnet?: number | null
          maladie?: string | null
          remarques?: string | null
        }
        Update: {
          confidentialite?: boolean | null
          date?: string | null
          id?: number
          id_carnet?: number | null
          maladie?: string | null
          remarques?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "condition_gynecologique_id_carnet_fkey"
            columns: ["id_carnet"]
            isOneToOne: false
            referencedRelation: "carnet_sante"
            referencedColumns: ["id"]
          },
        ]
      }
      consultation_medical: {
        Row: {
          confidentialite: boolean | null
          date_visite: string | null
          diagnostique: string | null
          examen_systemes: string | null
          id: number
          id_carnet: number | null
          id_professionnel: number
          plainte_principale: string
          plan_de_soin: string | null
          raison_de_visite: string
          remarque: string
        }
        Insert: {
          confidentialite?: boolean | null
          date_visite?: string | null
          diagnostique?: string | null
          examen_systemes?: string | null
          id?: number
          id_carnet?: number | null
          id_professionnel: number
          plainte_principale: string
          plan_de_soin?: string | null
          raison_de_visite: string
          remarque: string
        }
        Update: {
          confidentialite?: boolean | null
          date_visite?: string | null
          diagnostique?: string | null
          examen_systemes?: string | null
          id?: number
          id_carnet?: number | null
          id_professionnel?: number
          plainte_principale?: string
          plan_de_soin?: string | null
          raison_de_visite?: string
          remarque?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultation_medical_id_carnet_fkey"
            columns: ["id_carnet"]
            isOneToOne: false
            referencedRelation: "carnet_sante"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultation_medical_id_professionnel_fkey"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "professionnels"
            referencedColumns: ["id"]
          },
        ]
      }
      contact: {
        Row: {
          id: number
          numero: string | null
          utilisateur_id: number | null
        }
        Insert: {
          id?: number
          numero?: string | null
          utilisateur_id?: number | null
        }
        Update: {
          id?: number
          numero?: string | null
          utilisateur_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_utilisateur_id_fkey"
            columns: ["utilisateur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          cree_a: string
          dernier_message: string | null
          en_sourdine: boolean | null
          est_archive: boolean | null
          heure_dernier_message: string | null
          id: number
          id_expediteur: number
          id_recepteur: number
          mis_a_jour_a: string
          nombre_non_lu: number
        }
        Insert: {
          cree_a: string
          dernier_message?: string | null
          en_sourdine?: boolean | null
          est_archive?: boolean | null
          heure_dernier_message?: string | null
          id?: number
          id_expediteur: number
          id_recepteur: number
          mis_a_jour_a: string
          nombre_non_lu: number
        }
        Update: {
          cree_a?: string
          dernier_message?: string | null
          en_sourdine?: boolean | null
          est_archive?: boolean | null
          heure_dernier_message?: string | null
          id?: number
          id_expediteur?: number
          id_recepteur?: number
          mis_a_jour_a?: string
          nombre_non_lu?: number
        }
        Relationships: [
          {
            foreignKeyName: "conversations_id_expediteur_fkey"
            columns: ["id_expediteur"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_id_recepteur_fkey"
            columns: ["id_recepteur"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      creneau_horaire: {
        Row: {
          heure_debut: string
          heure_fin: string
          id: number
          id_horaire_hebdomadaire: number | null
          id_horaire_specifique: number | null
        }
        Insert: {
          heure_debut: string
          heure_fin: string
          id?: number
          id_horaire_hebdomadaire?: number | null
          id_horaire_specifique?: number | null
        }
        Update: {
          heure_debut?: string
          heure_fin?: string
          id?: number
          id_horaire_hebdomadaire?: number | null
          id_horaire_specifique?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_horaire_hebdo"
            columns: ["id_horaire_hebdomadaire"]
            isOneToOne: false
            referencedRelation: "horaire_hebdomadaire"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_horaire_specifique"
            columns: ["id_horaire_specifique"]
            isOneToOne: false
            referencedRelation: "horaire_date_specifique"
            referencedColumns: ["id"]
          },
        ]
      }
      dash: {
        Row: {
          id: number
          nom: string
          utilisateur_id: number
        }
        Insert: {
          id?: number
          nom: string
          utilisateur_id: number
        }
        Update: {
          id?: number
          nom?: string
          utilisateur_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "dash_utilisateur_id_fkey"
            columns: ["utilisateur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      demande_adhesion: {
        Row: {
          commune: string | null
          cree_a: string
          date_creation: string
          district: string | null
          email: string | null
          id: number
          nom: string
          prenom: string | null
          status: Database["public"]["Enums"]["demande_adhesion_status"]
          telephone: string
          type_etablissement: string | null
          ville_cabinet: string | null
        }
        Insert: {
          commune?: string | null
          cree_a?: string
          date_creation?: string
          district?: string | null
          email?: string | null
          id?: number
          nom: string
          prenom?: string | null
          status?: Database["public"]["Enums"]["demande_adhesion_status"]
          telephone: string
          type_etablissement?: string | null
          ville_cabinet?: string | null
        }
        Update: {
          commune?: string | null
          cree_a?: string
          date_creation?: string
          district?: string | null
          email?: string | null
          id?: number
          nom?: string
          prenom?: string | null
          status?: Database["public"]["Enums"]["demande_adhesion_status"]
          telephone?: string
          type_etablissement?: string | null
          ville_cabinet?: string | null
        }
        Relationships: []
      }
      diplome_professionnel: {
        Row: {
          annee: number
          description: string | null
          etablissement: string
          id: number
          id_professionnel: number
          titre: string
        }
        Insert: {
          annee: number
          description?: string | null
          etablissement: string
          id?: number
          id_professionnel: number
          titre: string
        }
        Update: {
          annee?: number
          description?: string | null
          etablissement?: string
          id?: number
          id_professionnel?: number
          titre?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_id_professionnel"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "professionnels"
            referencedColumns: ["id"]
          },
        ]
      }
      dispositif_medicaux: {
        Row: {
          confidentialite: boolean | null
          date_acquisition: string | null
          id: number
          id_carnet: number | null
          marque: string | null
          modele: string | null
          nom: string | null
          prochaine_mise_a_jour: string | null
          reference_appareil: string | null
          remarques: string | null
        }
        Insert: {
          confidentialite?: boolean | null
          date_acquisition?: string | null
          id?: number
          id_carnet?: number | null
          marque?: string | null
          modele?: string | null
          nom?: string | null
          prochaine_mise_a_jour?: string | null
          reference_appareil?: string | null
          remarques?: string | null
        }
        Update: {
          confidentialite?: boolean | null
          date_acquisition?: string | null
          id?: number
          id_carnet?: number | null
          marque?: string | null
          modele?: string | null
          nom?: string | null
          prochaine_mise_a_jour?: string | null
          reference_appareil?: string | null
          remarques?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dispositif_medicaux_id_carnet_fkey"
            columns: ["id_carnet"]
            isOneToOne: false
            referencedRelation: "carnet_sante"
            referencedColumns: ["id"]
          },
        ]
      }
      district: {
        Row: {
          id: number
          id_region: number
          libelle: string
        }
        Insert: {
          id: number
          id_region: number
          libelle: string
        }
        Update: {
          id?: number
          id_region?: number
          libelle?: string
        }
        Relationships: [
          {
            foreignKeyName: "district_id_region_fkey"
            columns: ["id_region"]
            isOneToOne: false
            referencedRelation: "region"
            referencedColumns: ["id"]
          },
        ]
      }
      document_medical: {
        Row: {
          confidentialite: boolean | null
          date_creation: string | null
          id: number
          id_patient: number
          id_rendez_vous: number | null
          nom: string | null
          path: string | null
          type: string | null
        }
        Insert: {
          confidentialite?: boolean | null
          date_creation?: string | null
          id?: number
          id_patient: number
          id_rendez_vous?: number | null
          nom?: string | null
          path?: string | null
          type?: string | null
        }
        Update: {
          confidentialite?: boolean | null
          date_creation?: string | null
          id?: number
          id_patient?: number
          id_rendez_vous?: number | null
          nom?: string | null
          path?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_medical_id_patient_fkey"
            columns: ["id_patient"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_medical_id_rendez_vous_fkey"
            columns: ["id_rendez_vous"]
            isOneToOne: false
            referencedRelation: "rendez_vous"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          cree_a: string
          date_de_naissance: string
          date_entree_en_fonction: string
          decede: boolean | null
          direction: string
          est_supprimee: boolean | null
          fonction: string
          id: number
          id_dash: number
          id_utilisateur: number
          matricule: string
          mis_a_jour_a: string
          nom: string
          photo: string | null
          prenom: string | null
          sexe: Database["public"]["Enums"]["sexe_enum"]
          status_administratif: Database["public"]["Enums"]["status_administratif_enum"]
        }
        Insert: {
          cree_a?: string
          date_de_naissance: string
          date_entree_en_fonction?: string
          decede?: boolean | null
          direction: string
          est_supprimee?: boolean | null
          fonction: string
          id?: number
          id_dash: number
          id_utilisateur: number
          matricule: string
          mis_a_jour_a?: string
          nom: string
          photo?: string | null
          prenom?: string | null
          sexe: Database["public"]["Enums"]["sexe_enum"]
          status_administratif: Database["public"]["Enums"]["status_administratif_enum"]
        }
        Update: {
          cree_a?: string
          date_de_naissance?: string
          date_entree_en_fonction?: string
          decede?: boolean | null
          direction?: string
          est_supprimee?: boolean | null
          fonction?: string
          id?: number
          id_dash?: number
          id_utilisateur?: number
          matricule?: string
          mis_a_jour_a?: string
          nom?: string
          photo?: string | null
          prenom?: string | null
          sexe?: Database["public"]["Enums"]["sexe_enum"]
          status_administratif?: Database["public"]["Enums"]["status_administratif_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "employees_id_dash_fkey"
            columns: ["id_dash"]
            isOneToOne: false
            referencedRelation: "dash"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_id_utilisateur_fkey"
            columns: ["id_utilisateur"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      etablissements_professionnel: {
        Row: {
          equipe: string
          est_supprimmee: boolean
          id: number
          id_professionnel: number
          nom_etablissement: string
          nom_responsable: string
          prenom_responsable: string
        }
        Insert: {
          equipe: string
          est_supprimmee?: boolean
          id?: number
          id_professionnel: number
          nom_etablissement: string
          nom_responsable: string
          prenom_responsable: string
        }
        Update: {
          equipe?: string
          est_supprimmee?: boolean
          id?: number
          id_professionnel?: number
          nom_etablissement?: string
          nom_responsable?: string
          prenom_responsable?: string
        }
        Relationships: [
          {
            foreignKeyName: "etablissements_professionnel_id_professionnel_fkey"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "professionnels"
            referencedColumns: ["id"]
          },
        ]
      }
      evenement: {
        Row: {
          cree_a: string | null
          date_debut: string
          date_fin: string
          description: string | null
          est_reportee: boolean
          est_toute_la_journee: boolean
          id: number
          id_professionnel: number | null
          mis_a_jour_a: string | null
          repetition: string | null
          titre: string | null
        }
        Insert: {
          cree_a?: string | null
          date_debut: string
          date_fin: string
          description?: string | null
          est_reportee?: boolean
          est_toute_la_journee: boolean
          id?: number
          id_professionnel?: number | null
          mis_a_jour_a?: string | null
          repetition?: string | null
          titre?: string | null
        }
        Update: {
          cree_a?: string | null
          date_debut?: string
          date_fin?: string
          description?: string | null
          est_reportee?: boolean
          est_toute_la_journee?: boolean
          id?: number
          id_professionnel?: number | null
          mis_a_jour_a?: string | null
          repetition?: string | null
          titre?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evenement_id_professionnel_fkey"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_professionnel: {
        Row: {
          date_debut: string
          date_fin: string | null
          description: string | null
          est_actuel: boolean | null
          etablissement: string
          id: number
          id_professionnel: number
          poste: string
        }
        Insert: {
          date_debut: string
          date_fin?: string | null
          description?: string | null
          est_actuel?: boolean | null
          etablissement: string
          id?: number
          id_professionnel: number
          poste: string
        }
        Update: {
          date_debut?: string
          date_fin?: string | null
          description?: string | null
          est_actuel?: boolean | null
          etablissement?: string
          id?: number
          id_professionnel?: number
          poste?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_id_professionnel"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "professionnels"
            referencedColumns: ["id"]
          },
        ]
      }
      expertises_professionnels: {
        Row: {
          date_creation: string
          id: number
          id_expertise: number
          id_professionnel: number
        }
        Insert: {
          date_creation?: string
          id: number
          id_expertise: number
          id_professionnel: number
        }
        Update: {
          date_creation?: string
          id?: number
          id_expertise?: number
          id_professionnel?: number
        }
        Relationships: [
          {
            foreignKeyName: "expertises_professionnels_id_expertise_fkey"
            columns: ["id_expertise"]
            isOneToOne: false
            referencedRelation: "liste_expertises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expertises_professionnels_id_professionnel_fkey"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "professionnels"
            referencedColumns: ["id"]
          },
        ]
      }
      facturation: {
        Row: {
          confidentialite: boolean
          date_creation: string
          date_paiement: string
          id: number
          id_patient: number
          id_professionnel: number
          informations: string
          montant: number
          recu: string
          total_paye: number
        }
        Insert: {
          confidentialite?: boolean
          date_creation: string
          date_paiement: string
          id?: number
          id_patient: number
          id_professionnel: number
          informations: string
          montant: number
          recu: string
          total_paye: number
        }
        Update: {
          confidentialite?: boolean
          date_creation?: string
          date_paiement?: string
          id?: number
          id_patient?: number
          id_professionnel?: number
          informations?: string
          montant?: number
          recu?: string
          total_paye?: number
        }
        Relationships: [
          {
            foreignKeyName: "facturation_id_patient_fkey"
            columns: ["id_patient"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "facturation_id_professionnel_fkey"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      familles: {
        Row: {
          cree_a: string
          date_naissance: string
          id: number
          id_employee: number
          lien: string
          mis_a_jour_a: string
          nom: string
          photo: string | null
          prenom: string | null
          sexe: Database["public"]["Enums"]["sexe_enum"]
        }
        Insert: {
          cree_a?: string
          date_naissance: string
          id?: number
          id_employee: number
          lien: string
          mis_a_jour_a?: string
          nom: string
          photo?: string | null
          prenom?: string | null
          sexe: Database["public"]["Enums"]["sexe_enum"]
        }
        Update: {
          cree_a?: string
          date_naissance?: string
          id?: number
          id_employee?: number
          lien?: string
          mis_a_jour_a?: string
          nom?: string
          photo?: string | null
          prenom?: string | null
          sexe?: Database["public"]["Enums"]["sexe_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "fk_id_employee"
            columns: ["id_employee"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      historique_carnet_sante: {
        Row: {
          date_action: string | null
          details: string | null
          id: number
          id_carnet: number | null
          id_element_concerne: number
          id_professionnel: number
          table_concernee: string
          type_action: Database["public"]["Enums"]["action_type"]
        }
        Insert: {
          date_action?: string | null
          details?: string | null
          id?: number
          id_carnet?: number | null
          id_element_concerne: number
          id_professionnel: number
          table_concernee: string
          type_action: Database["public"]["Enums"]["action_type"]
        }
        Update: {
          date_action?: string | null
          details?: string | null
          id?: number
          id_carnet?: number | null
          id_element_concerne?: number
          id_professionnel?: number
          table_concernee?: string
          type_action?: Database["public"]["Enums"]["action_type"]
        }
        Relationships: [
          {
            foreignKeyName: "historique_carnet_sante_id_carnet_fkey"
            columns: ["id_carnet"]
            isOneToOne: false
            referencedRelation: "carnet_sante"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "historique_carnet_sante_id_professionnel_fkey"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      historique_mental_et_psychiatre: {
        Row: {
          confidentialite: boolean | null
          date: string | null
          id: number
          id_carnet: number | null
          maladie: string | null
          remarques: string | null
        }
        Insert: {
          confidentialite?: boolean | null
          date?: string | null
          id?: number
          id_carnet?: number | null
          maladie?: string | null
          remarques?: string | null
        }
        Update: {
          confidentialite?: boolean | null
          date?: string | null
          id?: number
          id_carnet?: number | null
          maladie?: string | null
          remarques?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "historique_mental_et_psychiatre_id_carnet_fkey"
            columns: ["id_carnet"]
            isOneToOne: false
            referencedRelation: "carnet_sante"
            referencedColumns: ["id"]
          },
        ]
      }
      horaire_date_specifique: {
        Row: {
          date: string | null
          est_specifique: boolean
          id: number
          id_parametre_disponibilite: number
        }
        Insert: {
          date?: string | null
          est_specifique?: boolean
          id?: number
          id_parametre_disponibilite: number
        }
        Update: {
          date?: string | null
          est_specifique?: boolean
          id?: number
          id_parametre_disponibilite?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_parametre_dispo_date"
            columns: ["id_parametre_disponibilite"]
            isOneToOne: false
            referencedRelation: "parametre_disponibilite"
            referencedColumns: ["id"]
          },
        ]
      }
      horaire_hebdomadaire: {
        Row: {
          id: number
          id_parametre_disponibilite: number
          jour: string | null
        }
        Insert: {
          id?: number
          id_parametre_disponibilite: number
          jour?: string | null
        }
        Update: {
          id?: number
          id_parametre_disponibilite?: number
          jour?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_parametre_dispo_horaire"
            columns: ["id_parametre_disponibilite"]
            isOneToOne: false
            referencedRelation: "parametre_disponibilite"
            referencedColumns: ["id"]
          },
        ]
      }
      invitation: {
        Row: {
          cree_le: string
          cree_par: number
          est_utilisee: boolean
          expire_le: string
          id: number
          id_demande_adhesion: number
          token: string
        }
        Insert: {
          cree_le?: string
          cree_par: number
          est_utilisee?: boolean
          expire_le: string
          id?: number
          id_demande_adhesion: number
          token: string
        }
        Update: {
          cree_le?: string
          cree_par?: number
          est_utilisee?: boolean
          expire_le?: string
          id?: number
          id_demande_adhesion?: number
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitation_cree_par_fkey"
            columns: ["cree_par"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invitation_id_demande_adhesion_fkey"
            columns: ["id_demande_adhesion"]
            isOneToOne: false
            referencedRelation: "demande_adhesion"
            referencedColumns: ["id"]
          },
        ]
      }
      invitation_dash: {
        Row: {
          cree_le: string
          cree_par: number
          email: string
          est_utilisee: boolean
          id: number
          token: string
        }
        Insert: {
          cree_le?: string
          cree_par: number
          email: string
          est_utilisee?: boolean
          id?: number
          token: string
        }
        Update: {
          cree_le?: string
          cree_par?: number
          email?: string
          est_utilisee?: boolean
          id?: number
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitation_dash_cree_par_fkey"
            columns: ["cree_par"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      journaux_activites: {
        Row: {
          action: string
          administrateur_id: number
          horodatage: string | null
          id: number
        }
        Insert: {
          action: string
          administrateur_id: number
          horodatage?: string | null
          id?: number
        }
        Update: {
          action?: string
          administrateur_id?: number
          horodatage?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "journaux_activites_administrateur_id_fkey"
            columns: ["administrateur_id"]
            isOneToOne: false
            referencedRelation: "administrateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      laboratoire_diagnostics: {
        Row: {
          confidentialite: boolean | null
          date: string | null
          id: number
          id_carnet: number | null
          path: string | null
          remarque: string | null
          resultat: string | null
          titre: string | null
          type_fichier: string | null
        }
        Insert: {
          confidentialite?: boolean | null
          date?: string | null
          id?: number
          id_carnet?: number | null
          path?: string | null
          remarque?: string | null
          resultat?: string | null
          titre?: string | null
          type_fichier?: string | null
        }
        Update: {
          confidentialite?: boolean | null
          date?: string | null
          id?: number
          id_carnet?: number | null
          path?: string | null
          remarque?: string | null
          resultat?: string | null
          titre?: string | null
          type_fichier?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "laboratoire_diagnostics_id_carnet_fkey"
            columns: ["id_carnet"]
            isOneToOne: false
            referencedRelation: "carnet_sante"
            referencedColumns: ["id"]
          },
        ]
      }
      langues_parlees_professionnel: {
        Row: {
          id: number
          id_professionnel: number
          nom_langue: string
        }
        Insert: {
          id?: number
          id_professionnel: number
          nom_langue: string
        }
        Update: {
          id?: number
          id_professionnel?: number
          nom_langue?: string
        }
        Relationships: [
          {
            foreignKeyName: "langues_parlees_professionnel_id_professionnel_fkey"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "professionnels"
            referencedColumns: ["id"]
          },
        ]
      }
      liste_allergie: {
        Row: {
          id: number
          nom: string
        }
        Insert: {
          id?: number
          nom: string
        }
        Update: {
          id?: number
          nom?: string
        }
        Relationships: []
      }
      liste_assurances: {
        Row: {
          date_creation: string | null
          id: number
          nom: string
        }
        Insert: {
          date_creation?: string | null
          id?: number
          nom: string
        }
        Update: {
          date_creation?: string | null
          id?: number
          nom?: string
        }
        Relationships: []
      }
      liste_expertises: {
        Row: {
          id: number
          nom: string
        }
        Insert: {
          id?: number
          nom: string
        }
        Update: {
          id?: number
          nom?: string
        }
        Relationships: []
      }
      liste_mot_cles: {
        Row: {
          id: number
          symptome: string
        }
        Insert: {
          id?: number
          symptome: string
        }
        Update: {
          id?: number
          symptome?: string
        }
        Relationships: []
      }
      liste_specialites: {
        Row: {
          id: number
          id_type_etablissement: number
          nom_specialite: string
        }
        Insert: {
          id?: number
          id_type_etablissement: number
          nom_specialite: string
        }
        Update: {
          id?: number
          id_type_etablissement?: number
          nom_specialite?: string
        }
        Relationships: [
          {
            foreignKeyName: "liste_specialites_id_type_etablissement_fkey"
            columns: ["id_type_etablissement"]
            isOneToOne: false
            referencedRelation: "liste_type_etablissement"
            referencedColumns: ["id"]
          },
        ]
      }
      liste_type_etablissement: {
        Row: {
          id: number
          nom_etablissement: string
        }
        Insert: {
          id?: number
          nom_etablissement: string
        }
        Update: {
          id?: number
          nom_etablissement?: string
        }
        Relationships: []
      }
      medicament: {
        Row: {
          calendrier_de_dose: string | null
          confidentialite: boolean | null
          duree_jour: number | null
          force: string | null
          frequence_dose: string | null
          id: number
          id_carnet: number | null
          nom: string | null
          posologie: string | null
          quantite_par_dosage: string | null
          remarques: string | null
          type_consommation: string | null
        }
        Insert: {
          calendrier_de_dose?: string | null
          confidentialite?: boolean | null
          duree_jour?: number | null
          force?: string | null
          frequence_dose?: string | null
          id?: number
          id_carnet?: number | null
          nom?: string | null
          posologie?: string | null
          quantite_par_dosage?: string | null
          remarques?: string | null
          type_consommation?: string | null
        }
        Update: {
          calendrier_de_dose?: string | null
          confidentialite?: boolean | null
          duree_jour?: number | null
          force?: string | null
          frequence_dose?: string | null
          id?: number
          id_carnet?: number | null
          nom?: string | null
          posologie?: string | null
          quantite_par_dosage?: string | null
          remarques?: string | null
          type_consommation?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medicament_id_carnet_fkey"
            columns: ["id_carnet"]
            isOneToOne: false
            referencedRelation: "carnet_sante"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          contenu: string
          envoye_a: string | null
          est_proprietaire: boolean | null
          id: number
          id_conversation: number
          id_expediteur: number
          status: Database["public"]["Enums"]["status_message_enum"]
        }
        Insert: {
          contenu: string
          envoye_a?: string | null
          est_proprietaire?: boolean | null
          id?: number
          id_conversation: number
          id_expediteur: number
          status?: Database["public"]["Enums"]["status_message_enum"]
        }
        Update: {
          contenu?: string
          envoye_a?: string | null
          est_proprietaire?: boolean | null
          id?: number
          id_conversation?: number
          id_expediteur?: number
          status?: Database["public"]["Enums"]["status_message_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "messages_id_conversation_fkey"
            columns: ["id_conversation"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_id_expediteur_fkey"
            columns: ["id_expediteur"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      mot_cles_professionnel: {
        Row: {
          id: number
          id_professionnel: number
          symptome: string
        }
        Insert: {
          id?: number
          id_professionnel: number
          symptome: string
        }
        Update: {
          id?: number
          id_professionnel?: number
          symptome?: string
        }
        Relationships: [
          {
            foreignKeyName: "mot_cles_professionnel_id_professionnel_fkey"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "professionnels"
            referencedColumns: ["id"]
          },
        ]
      }
      ordre_appartenance: {
        Row: {
          id: number
          nom: string
        }
        Insert: {
          id?: number
          nom: string
        }
        Update: {
          id?: number
          nom?: string
        }
        Relationships: []
      }
      ordre_appartenance_professionnel: {
        Row: {
          id: number
          id_ordre_appartenance: number
          id_professionnel: number
        }
        Insert: {
          id?: number
          id_ordre_appartenance: number
          id_professionnel: number
        }
        Update: {
          id?: number
          id_ordre_appartenance?: number
          id_professionnel?: number
        }
        Relationships: [
          {
            foreignKeyName: "ordre_appartenance_professionnel_id_ordre_appartenance_fkey"
            columns: ["id_ordre_appartenance"]
            isOneToOne: false
            referencedRelation: "ordre_appartenance"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ordre_appartenance_professionnel_id_professionnel_fkey"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "professionnels"
            referencedColumns: ["id"]
          },
        ]
      }
      parametre_disponibilite: {
        Row: {
          date_debut: string
          date_fin: string | null
          duree_pause: number
          id: number
          id_professionnel: number
          max_rdv_par_jours: number
          peut_inviter_autre: boolean
          temps_moyen_consulation: number
          type: string
        }
        Insert: {
          date_debut?: string
          date_fin?: string | null
          duree_pause: number
          id?: number
          id_professionnel: number
          max_rdv_par_jours?: number
          peut_inviter_autre?: boolean
          temps_moyen_consulation?: number
          type: string
        }
        Update: {
          date_debut?: string
          date_fin?: string | null
          duree_pause?: number
          id?: number
          id_professionnel?: number
          max_rdv_par_jours?: number
          peut_inviter_autre?: boolean
          temps_moyen_consulation?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_professionnel"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "professionnels"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          adresse: string | null
          commune: string
          date_naissance: string
          decede: boolean | null
          district: string
          donneur_sang: boolean | null
          email: string | null
          groupe_sanguin: string | null
          id: number
          nationalite: string | null
          nb_enfant: number | null
          nom: string
          pays: string | null
          prenom: string | null
          profession: string | null
          province: string | null
          region: string
          sexe: Database["public"]["Enums"]["sexe_enum"]
          situation_matrimonial: string | null
          telephone: string | null
          unique_id: string
          utilisateur_id: number | null
        }
        Insert: {
          adresse?: string | null
          commune: string
          date_naissance: string
          decede?: boolean | null
          district: string
          donneur_sang?: boolean | null
          email?: string | null
          groupe_sanguin?: string | null
          id?: number
          nationalite?: string | null
          nb_enfant?: number | null
          nom: string
          pays?: string | null
          prenom?: string | null
          profession?: string | null
          province?: string | null
          region: string
          sexe: Database["public"]["Enums"]["sexe_enum"]
          situation_matrimonial?: string | null
          telephone?: string | null
          unique_id: string
          utilisateur_id?: number | null
        }
        Update: {
          adresse?: string | null
          commune?: string
          date_naissance?: string
          decede?: boolean | null
          district?: string
          donneur_sang?: boolean | null
          email?: string | null
          groupe_sanguin?: string | null
          id?: number
          nationalite?: string | null
          nb_enfant?: number | null
          nom?: string
          pays?: string | null
          prenom?: string | null
          profession?: string | null
          province?: string | null
          region?: string
          sexe?: Database["public"]["Enums"]["sexe_enum"]
          situation_matrimonial?: string | null
          telephone?: string | null
          unique_id?: string
          utilisateur_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "patients_utilisateur_id_fkey"
            columns: ["utilisateur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      pause: {
        Row: {
          heure_debut: string | null
          heure_fin: string | null
          id: number
          id_parametre_disponibilite: number
        }
        Insert: {
          heure_debut?: string | null
          heure_fin?: string | null
          id?: number
          id_parametre_disponibilite: number
        }
        Update: {
          heure_debut?: string | null
          heure_fin?: string | null
          id?: number
          id_parametre_disponibilite?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_parametre_dispo_pause"
            columns: ["id_parametre_disponibilite"]
            isOneToOne: false
            referencedRelation: "parametre_disponibilite"
            referencedColumns: ["id"]
          },
        ]
      }
      photos: {
        Row: {
          id: number
          path: string
          type: Database["public"]["Enums"]["photo_type_enum"]
          utilisateur_id: number
        }
        Insert: {
          id?: number
          path: string
          type: Database["public"]["Enums"]["photo_type_enum"]
          utilisateur_id: number
        }
        Update: {
          id?: number
          path?: string
          type?: Database["public"]["Enums"]["photo_type_enum"]
          utilisateur_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "photos_utilisateur_id_fkey"
            columns: ["utilisateur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      proches: {
        Row: {
          date_naissance: string
          id: number
          id_patient: number
          lien_parente: string | null
          nom: string
          prenom: string
          sexe: Database["public"]["Enums"]["sexe_enum"]
        }
        Insert: {
          date_naissance: string
          id?: number
          id_patient: number
          lien_parente?: string | null
          nom: string
          prenom: string
          sexe: Database["public"]["Enums"]["sexe_enum"]
        }
        Update: {
          date_naissance?: string
          id?: number
          id_patient?: number
          lien_parente?: string | null
          nom?: string
          prenom?: string
          sexe?: Database["public"]["Enums"]["sexe_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "proches_id_patient_fkey"
            columns: ["id_patient"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      professionnel_patient: {
        Row: {
          created_date: string | null
          id: number
          id_patient: number
          id_professionnel: number
          is_delete: boolean | null
          updated_date: string | null
        }
        Insert: {
          created_date?: string | null
          id?: number
          id_patient: number
          id_professionnel: number
          is_delete?: boolean | null
          updated_date?: string | null
        }
        Update: {
          created_date?: string | null
          id?: number
          id_patient?: number
          id_professionnel?: number
          is_delete?: boolean | null
          updated_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_profesionnel_patient_patient"
            columns: ["id_patient"]
            isOneToOne: true
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_profesionnel_patient_professionnel"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "professionnels"
            referencedColumns: ["id"]
          },
        ]
      }
      professionnels: {
        Row: {
          adresse: string
          commune: string | null
          district: string | null
          fokontany: string | null
          geolocalisation: unknown
          id: number
          informations_acces: string | null
          modes_paiement_acceptes: string | null
          nif: string | null
          nom: string
          nouveau_patient_acceptes: boolean | null
          numero_ordre: string
          prenom: string | null
          presentation_generale: string | null
          raison_sociale: string | null
          region: string | null
          sexe: Database["public"]["Enums"]["sexe_enum"] | null
          stat: string | null
          titre: Database["public"]["Enums"]["professionnels_titre_enum"]
          types_consultation: Database["public"]["Enums"]["professionnels_types_consultation_enum"]
          utilisateur_id: number
        }
        Insert: {
          adresse: string
          commune?: string | null
          district?: string | null
          fokontany?: string | null
          geolocalisation: unknown
          id?: number
          informations_acces?: string | null
          modes_paiement_acceptes?: string | null
          nif?: string | null
          nom: string
          nouveau_patient_acceptes?: boolean | null
          numero_ordre: string
          prenom?: string | null
          presentation_generale?: string | null
          raison_sociale?: string | null
          region?: string | null
          sexe?: Database["public"]["Enums"]["sexe_enum"] | null
          stat?: string | null
          titre: Database["public"]["Enums"]["professionnels_titre_enum"]
          types_consultation: Database["public"]["Enums"]["professionnels_types_consultation_enum"]
          utilisateur_id: number
        }
        Update: {
          adresse?: string
          commune?: string | null
          district?: string | null
          fokontany?: string | null
          geolocalisation?: unknown
          id?: number
          informations_acces?: string | null
          modes_paiement_acceptes?: string | null
          nif?: string | null
          nom?: string
          nouveau_patient_acceptes?: boolean | null
          numero_ordre?: string
          prenom?: string | null
          presentation_generale?: string | null
          raison_sociale?: string | null
          region?: string | null
          sexe?: Database["public"]["Enums"]["sexe_enum"] | null
          stat?: string | null
          titre?: Database["public"]["Enums"]["professionnels_titre_enum"]
          types_consultation?: Database["public"]["Enums"]["professionnels_types_consultation_enum"]
          utilisateur_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "professionnels_utilisateur_id_fkey"
            columns: ["utilisateur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      province: {
        Row: {
          id: number
          nom: string
        }
        Insert: {
          id: number
          nom: string
        }
        Update: {
          id?: number
          nom?: string
        }
        Relationships: []
      }
      publication_professionnel: {
        Row: {
          annee: string
          description: string | null
          id: number
          id_professionnel: number
          lien: string | null
          titre: string
        }
        Insert: {
          annee: string
          description?: string | null
          id?: number
          id_professionnel: number
          lien?: string | null
          titre: string
        }
        Update: {
          annee?: string
          description?: string | null
          id?: number
          id_professionnel?: number
          lien?: string | null
          titre?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_id_professionnel"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "professionnels"
            referencedColumns: ["id"]
          },
        ]
      }
      region: {
        Row: {
          id: number
          id_province: number
          nom: string
        }
        Insert: {
          id: number
          id_province: number
          nom: string
        }
        Update: {
          id?: number
          id_province?: number
          nom?: string
        }
        Relationships: [
          {
            foreignKeyName: "region_id_province_fkey"
            columns: ["id_province"]
            isOneToOne: false
            referencedRelation: "province"
            referencedColumns: ["id"]
          },
        ]
      }
      rendez_vous: {
        Row: {
          categorie: string | null
          cree_a: string | null
          date_rendez_vous: string
          est_absent: boolean | null
          id: number
          id_professionnel: number
          mis_a_jour_a: string | null
          motif: string | null
          patient_id: number
          raison: string | null
          rappel_envoye: boolean | null
          specialite_choisie: string | null
          statut: Database["public"]["Enums"]["rendez_vous_statut_enum"] | null
        }
        Insert: {
          categorie?: string | null
          cree_a?: string | null
          date_rendez_vous: string
          est_absent?: boolean | null
          id?: number
          id_professionnel: number
          mis_a_jour_a?: string | null
          motif?: string | null
          patient_id: number
          raison?: string | null
          rappel_envoye?: boolean | null
          specialite_choisie?: string | null
          statut?: Database["public"]["Enums"]["rendez_vous_statut_enum"] | null
        }
        Update: {
          categorie?: string | null
          cree_a?: string | null
          date_rendez_vous?: string
          est_absent?: boolean | null
          id?: number
          id_professionnel?: number
          mis_a_jour_a?: string | null
          motif?: string | null
          patient_id?: number
          raison?: string | null
          rappel_envoye?: boolean | null
          specialite_choisie?: string | null
          statut?: Database["public"]["Enums"]["rendez_vous_statut_enum"] | null
        }
        Relationships: [
          {
            foreignKeyName: "rendez_vous_id_professionnel_fkey"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "professionnels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rendez_vous_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      reseaux_sociaux_professionnel: {
        Row: {
          id: number
          id_professionnel: number
          nom: string
        }
        Insert: {
          id?: number
          id_professionnel: number
          nom: string
        }
        Update: {
          id?: number
          id_professionnel?: number
          nom?: string
        }
        Relationships: [
          {
            foreignKeyName: "reseaux_sociaux_professionnel_id_professionnel_fkey"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "professionnels"
            referencedColumns: ["id"]
          },
        ]
      }
      signe_vitaux: {
        Row: {
          circonference_tete: number | null
          confidentialite: boolean | null
          date_visite: string | null
          frequence_cardiaque: number | null
          frequence_respiratoire: number | null
          id: number
          id_carnet: number | null
          indice_masse_corporel: number | null
          niveau_glucose: number | null
          poid: number | null
          sa02: number | null
          taille: number | null
          temperature: number | null
          tension_arterielle: string | null
        }
        Insert: {
          circonference_tete?: number | null
          confidentialite?: boolean | null
          date_visite?: string | null
          frequence_cardiaque?: number | null
          frequence_respiratoire?: number | null
          id?: number
          id_carnet?: number | null
          indice_masse_corporel?: number | null
          niveau_glucose?: number | null
          poid?: number | null
          sa02?: number | null
          taille?: number | null
          temperature?: number | null
          tension_arterielle?: string | null
        }
        Update: {
          circonference_tete?: number | null
          confidentialite?: boolean | null
          date_visite?: string | null
          frequence_cardiaque?: number | null
          frequence_respiratoire?: number | null
          id?: number
          id_carnet?: number | null
          indice_masse_corporel?: number | null
          niveau_glucose?: number | null
          poid?: number | null
          sa02?: number | null
          taille?: number | null
          temperature?: number | null
          tension_arterielle?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "signe_vitaux_id_carnet_fkey"
            columns: ["id_carnet"]
            isOneToOne: false
            referencedRelation: "carnet_sante"
            referencedColumns: ["id"]
          },
        ]
      }
      sous_categories: {
        Row: {
          id: number
          id_categorie: number
          nom: string
        }
        Insert: {
          id?: number
          id_categorie: number
          nom: string
        }
        Update: {
          id?: number
          id_categorie?: number
          nom?: string
        }
        Relationships: [
          {
            foreignKeyName: "sous_categories_id_categorie_fkey"
            columns: ["id_categorie"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      specialites_professionnel: {
        Row: {
          id: number
          id_professionnel: number
          nom_specialite: string
          type_etablissement:
            | Database["public"]["Enums"]["professionnels_categories_enum"]
            | null
        }
        Insert: {
          id?: number
          id_professionnel: number
          nom_specialite: string
          type_etablissement?:
            | Database["public"]["Enums"]["professionnels_categories_enum"]
            | null
        }
        Update: {
          id?: number
          id_professionnel?: number
          nom_specialite?: string
          type_etablissement?:
            | Database["public"]["Enums"]["professionnels_categories_enum"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "specialites_professionnel_id_professionnel_fkey"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "professionnels"
            referencedColumns: ["id"]
          },
        ]
      }
      stocks: {
        Row: {
          date_ajout: string
          date_expiration: string | null
          est_supprimee: boolean
          id: number
          id_professionnel: number
          id_sous_categorie: number
          lot: string | null
          montant_actuel: number | null
          nom_produit_sante: string | null
          numero_serie: string | null
          prix: number | null
          quantite_totale: number
          remarques: string | null
        }
        Insert: {
          date_ajout: string
          date_expiration?: string | null
          est_supprimee?: boolean
          id?: number
          id_professionnel: number
          id_sous_categorie: number
          lot?: string | null
          montant_actuel?: number | null
          nom_produit_sante?: string | null
          numero_serie?: string | null
          prix?: number | null
          quantite_totale: number
          remarques?: string | null
        }
        Update: {
          date_ajout?: string
          date_expiration?: string | null
          est_supprimee?: boolean
          id?: number
          id_professionnel?: number
          id_sous_categorie?: number
          lot?: string | null
          montant_actuel?: number | null
          nom_produit_sante?: string | null
          numero_serie?: string | null
          prix?: number | null
          quantite_totale?: number
          remarques?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stocks_id_professionnel_fkey"
            columns: ["id_professionnel"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stocks_id_sous_categorie_fkey"
            columns: ["id_sous_categorie"]
            isOneToOne: false
            referencedRelation: "sous_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      urgence: {
        Row: {
          adresse: string | null
          contact_urgence_nom: string | null
          contact_urgence_prenom: string | null
          contact_urgence_telephone: string | null
          id: number
          id_patient: number | null
          relation: string | null
        }
        Insert: {
          adresse?: string | null
          contact_urgence_nom?: string | null
          contact_urgence_prenom?: string | null
          contact_urgence_telephone?: string | null
          id?: number
          id_patient?: number | null
          relation?: string | null
        }
        Update: {
          adresse?: string | null
          contact_urgence_nom?: string | null
          contact_urgence_prenom?: string | null
          contact_urgence_telephone?: string | null
          id?: number
          id_patient?: number | null
          relation?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "urgence_id_patient_fkey"
            columns: ["id_patient"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      utilisateurs: {
        Row: {
          bani: boolean
          cree_a: string | null
          email: string | null
          id: number
          mis_a_jour_a: string | null
          mot_de_passe_hash: string | null
          role: Database["public"]["Enums"]["utilisateurs_role_enum"]
        }
        Insert: {
          bani?: boolean
          cree_a?: string | null
          email?: string | null
          id?: number
          mis_a_jour_a?: string | null
          mot_de_passe_hash?: string | null
          role: Database["public"]["Enums"]["utilisateurs_role_enum"]
        }
        Update: {
          bani?: boolean
          cree_a?: string | null
          email?: string | null
          id?: number
          mis_a_jour_a?: string | null
          mot_de_passe_hash?: string | null
          role?: Database["public"]["Enums"]["utilisateurs_role_enum"]
        }
        Relationships: []
      }
      vaccination: {
        Row: {
          confidentialite: boolean | null
          date_administration: string | null
          id: number
          id_carnet: number | null
          nom_vaccin: string | null
          prochaine_date_echeance: string | null
          remarques: string | null
        }
        Insert: {
          confidentialite?: boolean | null
          date_administration?: string | null
          id?: number
          id_carnet?: number | null
          nom_vaccin?: string | null
          prochaine_date_echeance?: string | null
          remarques?: string | null
        }
        Update: {
          confidentialite?: boolean | null
          date_administration?: string | null
          id?: number
          id_carnet?: number | null
          nom_vaccin?: string | null
          prochaine_date_echeance?: string | null
          remarques?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vaccination_id_carnet_fkey"
            columns: ["id_carnet"]
            isOneToOne: false
            referencedRelation: "carnet_sante"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bytea_to_text: {
        Args: { data: string }
        Returns: string
      }
      check_appointments_and_send_reminders: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      hello_world_log: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete: {
        Args:
          | { content: string; content_type: string; uri: string }
          | { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_get: {
        Args: { data: Json; uri: string } | { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { content: string; content_type: string; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post: {
        Args:
          | { content: string; content_type: string; uri: string }
          | { data: Json; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_put: {
        Args: { content: string; content_type: string; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      text_to_bytea: {
        Args: { data: string }
        Returns: string
      }
      urlencode: {
        Args: { data: Json } | { string: string } | { string: string }
        Returns: string
      }
    }
    Enums: {
      action_type: "ajout" | "modification" | "suppression"
      categorie_type_enum: "medicament" | "consomable"
      demande_adhesion_status: "lu" | "en attente" | "approuvée" | "rejetée"
      emplois_temps_jour_semaine_enum:
        | "lundi"
        | "mardi"
        | "mercredi"
        | "jeudi"
        | "vendredi"
        | "samedi"
        | "dimanche"
      patients_groupe_sanguin_enum:
        | "A+"
        | "A-"
        | "B+"
        | "B-"
        | "O+"
        | "O-"
        | "AB+"
        | "AB-"
      photo_type_enum: "presentation" | "profile"
      professionnels_categories_enum:
        | "Un Cabinet Médical (CM)"
        | "Un établissement de santé privé (EHPR)"
        | "Un laboratoire d'analyses médicales (LAM)"
        | "Un centre d’imagerie médicale (CIM)"
        | "BMH"
      professionnels_titre_enum: "Dr" | "Pr"
      professionnels_types_consultation_enum:
        | "en cabinet"
        | "à domicile"
        | "urgentiste"
      rendez_vous_statut_enum:
        | "A venir"
        | "Terminer"
        | "Manquer"
        | "Annuler"
        | "Reporter"
      sexe_enum: "homme" | "femme"
      status_administratif_enum: "permanent" | "contractuel" | "temporaire"
      status_message_enum: "envoye" | "lu"
      type_message_enum: "texte" | "image" | "fichier" | "systeme"
      utilisateurs_role_enum:
        | "patient"
        | "professionnel"
        | "admin"
        | "dash"
        | "employer"
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      action_type: ["ajout", "modification", "suppression"],
      categorie_type_enum: ["medicament", "consomable"],
      demande_adhesion_status: ["lu", "en attente", "approuvée", "rejetée"],
      emplois_temps_jour_semaine_enum: [
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi",
        "dimanche",
      ],
      patients_groupe_sanguin_enum: [
        "A+",
        "A-",
        "B+",
        "B-",
        "O+",
        "O-",
        "AB+",
        "AB-",
      ],
      photo_type_enum: ["presentation", "profile"],
      professionnels_categories_enum: [
        "Un Cabinet Médical (CM)",
        "Un établissement de santé privé (EHPR)",
        "Un laboratoire d'analyses médicales (LAM)",
        "Un centre d’imagerie médicale (CIM)",
        "BMH",
      ],
      professionnels_titre_enum: ["Dr", "Pr"],
      professionnels_types_consultation_enum: [
        "en cabinet",
        "à domicile",
        "urgentiste",
      ],
      rendez_vous_statut_enum: [
        "A venir",
        "Terminer",
        "Manquer",
        "Annuler",
        "Reporter",
      ],
      sexe_enum: ["homme", "femme"],
      status_administratif_enum: ["permanent", "contractuel", "temporaire"],
      status_message_enum: ["envoye", "lu"],
      type_message_enum: ["texte", "image", "fichier", "systeme"],
      utilisateurs_role_enum: [
        "patient",
        "professionnel",
        "admin",
        "dash",
        "employer",
      ],
    },
  },
} as const
