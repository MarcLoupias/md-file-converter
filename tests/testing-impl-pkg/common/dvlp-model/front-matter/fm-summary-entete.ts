'use strict';

import { FmSummaryEnteteMeta } from './fm-summary-entete-meta';
import { FmSummaryEnteteTitre } from './fm-summary-entete-titre';
import { FmSummaryEntetePdf } from './fm-summary-entete-pdf';

export class FmSummaryEntete {
    public rubrique: number;
    protected meta: FmSummaryEnteteMeta;
    protected titre: FmSummaryEnteteTitre;
    protected date: string;
    protected miseajour: string;
    public googleAnalytics: string;
    public licauteur: string;
    public lictype: number;
    public licannee: string;
    public serveur: string;
    public chemin: string;
    public urlhttp: string;
    protected pdf: FmSummaryEntetePdf;
    public nomfaq: string;

    public constructor({ rubrique, meta, titre, date, miseajour, googleAnalytics, licauteur, lictype, licannee, serveur, chemin, urlhttp, pdf, nomfaq }: any) {
        this.rubrique = rubrique;
        this.setMeta(meta);
        this.setTitre(titre);
        this.setDate(date);
        this.setMiseajour(miseajour);
        this.googleAnalytics = googleAnalytics;
        this.licauteur = licauteur;
        this.lictype = lictype;
        this.licannee = licannee;
        this.serveur = serveur;
        this.chemin = chemin;
        this.urlhttp = urlhttp;
        this.setPdf(pdf);
        this.nomfaq = nomfaq;
    }

    public setMeta(meta: any) {
        this.meta = new FmSummaryEnteteMeta(meta);
    }

    public getMeta() {
        return this.meta;
    }

    public setTitre(titre: any) {
        this.titre = new FmSummaryEnteteTitre(titre);
    }

    public getTitre() {
        return this.titre;
    }

    public setDate(date: Date) {
        this.date = date.toISOString().slice(0,10);
    }

    public getDate() {
        return this.date;
    }

    public setMiseajour(miseajour: Date) {
        this.miseajour = miseajour.toISOString().slice(0,10);
    }

    public getMiseajour() {
        return this.miseajour;
    }

    public setPdf(pdf: any) {
        this.pdf = new FmSummaryEntetePdf(pdf);
    }

    public getPdf() {
        return this.pdf;
    }
}
