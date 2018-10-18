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

function initMdDocument(reducedTargetDocumentList: ReducedTargetDocumentImpl[], targetDocumentToReduceCurrent: TargetDocumentImpl, index: number, targetDocumentToReduceList: TargetDocumentImpl[]): ITargetDocument[] {
    const summaryFmMetaData: FmSummary = reducedTargetDocumentList[0].fmMetaData as FmSummary;
    reducedTargetDocumentList[0].yamlAuthorList = summaryFmMetaData.getAuteurs().reduce((md, auteur: FmSummaryAuteur) => {
        return md + `    - name: ${auteur.name}
      fullname: ${auteur.fullname}
      url: ${auteur.url}
      role: ${auteur.role}\n`;
    }, 'auteurs:\n');

    const sectionListObject = targetDocumentToReduceList
        .reduce((sections: any, qa: TargetDocumentImpl) => {
            if (!sections[qa.getSectionName()]) {
                sections[qa.getSectionName()] = new SectionListObject(qa.getSectionName(), qa.sectionTitle, []);
                sections[qa.getSectionName()].qaList.push(`- [${qa.transformedData}](${sections[qa.getSectionName()].sectionName}/${qa.documentPaths.basename}.md)\n`);

                return sections;

            } else {
                sections[qa.getSectionName()].qaList.push(`- [${qa.transformedData}](${sections[qa.getSectionName()].sectionName}/${qa.documentPaths.basename}.md)\n`);

                return sections;
            }
        }, {});

    reducedTargetDocumentList[0].mdSectionList = Object
        .entries(sectionListObject)
        .reduce((md: string, section: any) => {
            const links = section[1].qaList.reduce((qaMd: string, listItem: string) => {
                return qaMd + listItem;
            }, '');

            return md + `\n${section[1].sectionTitle}\n${links}`;
        }, '');

    return reducedTargetDocumentList;
}

function finalizeMdDocument(reducedTargetDocumentList: ReducedTargetDocumentImpl[]): ITargetDocument[] {
    const fmMetaData: FmSummary = reducedTargetDocumentList[0].fmMetaData as FmSummary;

    reducedTargetDocumentList[0].transformedData = `---
${reducedTargetDocumentList[0].yamlAuthorList}
editeur:
    edversion: ${fmMetaData.getEditeur().edversion}
    edtypexml: ${fmMetaData.getEditeur().edtypexml}

entete:
    rubrique: ${fmMetaData.getEntete().rubrique}
    meta:
        description: ${fmMetaData.getEntete().getMeta().description}
        keywords: ${fmMetaData.getEntete().getMeta().keywords}
    titre:
        page: ${fmMetaData.getEntete().getTitre().page}
        article: ${fmMetaData.getEntete().getTitre().article}
    date: ${fmMetaData.getEntete().getDate()}
    miseajour: ${fmMetaData.getEntete().getMiseajour()}
    googleAnalytics: ${fmMetaData.getEntete().googleAnalytics}
    licauteur: ${fmMetaData.getEntete().licauteur}
    lictype: ${fmMetaData.getEntete().lictype}
    licannee: ${fmMetaData.getEntete().licannee}
    serveur: ${fmMetaData.getEntete().serveur}
    chemin: ${fmMetaData.getEntete().chemin}
    urlhttp: ${fmMetaData.getEntete().urlhttp}
    pdf:
        sautDePageAvantSection: ${fmMetaData.getEntete().getPdf().sautDePageAvantSection}
        notesBasPage: ${fmMetaData.getEntete().getPdf().notesBasPage}
    nomfaq: ${fmMetaData.getEntete().nomfaq}

edito: ${fmMetaData.edito}
licence: ${fmMetaData.licence}
---

# ${fmMetaData.getEntete().getTitre().article}
${reducedTargetDocumentList[0].mdSectionList}`;

    return reducedTargetDocumentList;
}

export function reduceTargetDocumentList(reducedTargetDocumentList: ReducedTargetDocumentImpl[], targetDocumentToReduce: TargetDocumentImpl, index: number, targetDocumentToReduceList: TargetDocumentImpl[]): ITargetDocument[] {
    if (index === 0) {
        return initMdDocument(reducedTargetDocumentList, targetDocumentToReduce, index, targetDocumentToReduceList);
    }

    if (index === targetDocumentToReduceList.length - 1) {
        return finalizeMdDocument(reducedTargetDocumentList);
    }

    return reducedTargetDocumentList;
}
