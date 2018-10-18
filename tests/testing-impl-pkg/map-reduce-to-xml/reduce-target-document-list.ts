'use strict';

import { TargetDocumentImpl, ReducedTargetDocumentImpl } from './model-impl';
import { FmSummary, FmSummaryAuteur } from './model-impl/front-matter';
import { ITargetDocument } from './model/documents/interfaces';

class SectionListObject {
    public sectionName: string;
    public sectionTitle: string;
    public qaList: string[];

    public constructor(sectionName: string, sectionTitle: string, qaList: string[]) {
        this.sectionName = sectionName;
        this.sectionTitle = sectionTitle;
        this.qaList = qaList;
    }
}

function initXmlDocument(reducedTargetDocumentList: ReducedTargetDocumentImpl[], targetDocumentToReduceCurrent: TargetDocumentImpl, index: number, targetDocumentToReduceList: TargetDocumentImpl[]): ITargetDocument[] {
    const summaryFmMetaData: FmSummary = reducedTargetDocumentList[0].fmMetaData as FmSummary;
    reducedTargetDocumentList[0].xmlAuthorList = summaryFmMetaData.getAuteurs().reduce((xml, auteur: FmSummaryAuteur) => {
        return xml + `<authorDescription name="${auteur.name}" role="${auteur.role}"><fullname>${auteur.fullname}</fullname><url>${auteur.url}</url></authorDescription>`;
    }, '');

    const sectionListObject = targetDocumentToReduceList
        .reduce((sections: any, qa: TargetDocumentImpl) => {
            if (!sections[qa.getSectionName()]) {
                sections[qa.getSectionName()] = new SectionListObject(qa.getSectionName(), qa.sectionTitle, []);
                sections[qa.getSectionName()].qaList.push(qa.documentPaths.basename);

                return sections;

            } else {
                sections[qa.getSectionName()].qaList.push(qa.documentPaths.basename);

                return sections;
            }
        }, {});

    reducedTargetDocumentList[0].xmlSectionList = Object
        .entries(sectionListObject)
        .reduce((xml: string, section: any) => {
            const links = section[1].qaList.reduce((qaXml: string, basename: string) => {
                return qaXml + `<link href="${basename}"/>`;
            }, '');

            return xml + `<section id="${section[1].sectionName}"><title>${section[1].sectionTitle}</title>${links}</section>`;
        }, '');

    return addXmlQa(reducedTargetDocumentList, targetDocumentToReduceCurrent);
}

function finalizeXmlDocument(reducedTargetDocumentList: ReducedTargetDocumentImpl[], targetDocumentToReduce: TargetDocumentImpl): ITargetDocument[] {
    reducedTargetDocumentList = addXmlQa(reducedTargetDocumentList, targetDocumentToReduce);

    const fmMetaData: FmSummary = reducedTargetDocumentList[0].fmMetaData as FmSummary;

    reducedTargetDocumentList[0].transformedData = `<?xml version="1.0" encoding="UTF-8"?>
<document>
    <!-- en-tete de la FAQ -->
    <editeur>
        <edversion>${fmMetaData.getEditeur().edversion}</edversion>
        <edtypexml>${fmMetaData.getEditeur().edtypexml}</edtypexml>
    </editeur>
    <entete>
        <rubrique>${fmMetaData.getEntete().rubrique}</rubrique>
        <meta>
            <description>${fmMetaData.getEntete().getMeta().description}</description>
            <keywords>${fmMetaData.getEntete().getMeta().keywords}</keywords>
        </meta>
        <titre>
            <page>${fmMetaData.getEntete().getTitre().page}</page>
            <article>${fmMetaData.getEntete().getTitre().article}</article>
        </titre>
        <date>${fmMetaData.getEntete().getDate()}</date>
        <miseajour>${fmMetaData.getEntete().getMiseajour()}</miseajour>
        <google-analytics>${fmMetaData.getEntete().googleAnalytics}</google-analytics>
        <licauteur>${fmMetaData.getEntete().licauteur}</licauteur>
        <lictype>${fmMetaData.getEntete().lictype}</lictype>
        <licannee>${fmMetaData.getEntete().licannee}</licannee>
        <serveur>${fmMetaData.getEntete().serveur}</serveur>
        <chemin>${fmMetaData.getEntete().chemin}</chemin>
        <urlhttp>${fmMetaData.getEntete().urlhttp}</urlhttp>
        <pdf>
            <sautDePageAvantSection>${fmMetaData.getEntete().getPdf().sautDePageAvantSection}</sautDePageAvantSection>
            <notesBasPage>${fmMetaData.getEntete().getPdf().notesBasPage}</notesBasPage>
        </pdf>
        <nomfaq>${fmMetaData.getEntete().nomfaq}</nomfaq>
    </entete>
    <!-- description des auteurs -->
    <authorDescriptions>${reducedTargetDocumentList[0].xmlAuthorList}</authorDescriptions>
    <!-- Edito de la FAQ, il faut la placer dans des balises paragraph -->
    <edito>
        <paragraph>${fmMetaData.edito}</paragraph>
    </edito>
    <!-- Sommaire de la FAQ -->
    <!-- licence de reproduction affiché en bas de l'article -->
    <licence>${fmMetaData.licence}</licence>
    <summary>${reducedTargetDocumentList[0].xmlSectionList}</summary>
    <!-- Liste des questions de la FAQ -->
    <QAs>${reducedTargetDocumentList[0].xmlQaList}</QAs>
</document>
`;

    return reducedTargetDocumentList;
}

function addXmlQa(reducedTargetDocumentList: ReducedTargetDocumentImpl[], targetDocumentToReduce: TargetDocumentImpl) {
    reducedTargetDocumentList[0].xmlQaList += targetDocumentToReduce.transformedData;

    return reducedTargetDocumentList;
}

export function reduceTargetDocumentList(reducedTargetDocumentList: ReducedTargetDocumentImpl[], targetDocumentToReduce: TargetDocumentImpl, index: number, targetDocumentToReduceList: TargetDocumentImpl[]): ITargetDocument[] {
    if (index === 0) {
        return initXmlDocument(reducedTargetDocumentList, targetDocumentToReduce, index, targetDocumentToReduceList);
    }

    if (index === targetDocumentToReduceList.length - 1) {
        return finalizeXmlDocument(reducedTargetDocumentList, targetDocumentToReduce);
    }

    return addXmlQa(reducedTargetDocumentList, targetDocumentToReduce);
}
