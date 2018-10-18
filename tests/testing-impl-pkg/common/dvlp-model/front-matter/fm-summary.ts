'use strict';

import { FmSummaryAuteur } from './fm-summary-auteur';
import { FmSummaryEditeur } from './fm-summary-editeur';
import { FmSummaryEntete } from './fm-summary-entete';

export class FmSummary {
    protected auteurs: FmSummaryAuteur[];
    protected editeur: FmSummaryEditeur;
    protected entete: FmSummaryEntete;
    public edito: string;
    public licence: string;

    public constructor({ auteurs, editeur, entete, edito, licence }: any) {
        this.setAuteurs(auteurs);
        this.setEditeur(editeur);
        this.setEntete(entete);
        this.edito = edito;
        this.licence = licence;
    }

    public setAuteurs(auteurs: any) {
        this.auteurs = [...auteurs.map((auteur: any) => new FmSummaryAuteur(auteur))] as FmSummaryAuteur[];
    }

    public getAuteurs(): FmSummaryAuteur[] {
        return this.auteurs;
    }

    public setEditeur(editeur: any) {
        this.editeur = new FmSummaryEditeur(editeur);
    }

    public getEditeur(): FmSummaryEditeur {
        return this.editeur;
    }

    public setEntete(entete: any) {
        this.entete = new FmSummaryEntete(entete);
    }

    public getEntete(): FmSummaryEntete {
        return this.entete;
    }
}
