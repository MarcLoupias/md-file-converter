# github publie git-sizer

## contexte

GitHub, s'il est encore besoin de la présenter, est une entreprise américaine fournissant un service d'hébergement de
dépôts git sur Internet. Le service a été ouvert en octobre 2007 et depuis s'est imposé comme le standard pour un 
grand nombre de projets opensource. De nombreuses entreprises utilisent également le service en ligne pour y héberger
leurs dépôts privés, certaines autres utilisent la version "entreprise" qui leur permet de bénéficier du service
tout en conservant le contrôle de leurs données en installant dans leur propre réseau une version payante de GitHub.

Github héberge désormais plus de 80 millions de dépôts, lui permettant de disposer de statistiques inégalées sur l'usage
et le contenu des dépôts.
 
Le 5 mars dernier, GitHub a dévoilé sur son blog un nouvel outil nommé git-sizer. Cet outil écrit en Go analyse le conteun
du dépôt dans lequel il est exécuté et fournit un rapport affichant une vue globale des métriques principales associé à
un indicateur d'alerte relatif à l'usage standard constaté sur leur plateforme. 

## installation

L'installation de git-sizer se fait très simplement en téléchargeant le binaire correspondant à votre système ou bien
en compilant depuis les sources. (https://github.com/github/git-sizer/releases).

A noter que la version locale du CLI git doit être au minimum la 2.6.

Il est conseillé d'ajouter le répertoire d'installation du binaire au PATH pour un usage plus facile.

## usage

Il suffit de se placer dans le répertoire racine d'un dépôt et d'exécuter le binaire. L'option verbose permet d'obtenir 
un compte rendu détaillé (par exemple sur le dépôt du noyau Linux) :

```bash
$ git-sizer --verbose
Processing blobs: 1652370
Processing trees: 3396199
Processing commits: 722647
Matching commits to trees: 722647
Processing annotated tags: 534
Processing references: 539
| Name                         | Value     | Level of concern               |
| ---------------------------- | --------- | ------------------------------ |
| Overall repository size      |           |                                |
| * Commits                    |           |                                |
|   * Count                    |   723 k   | *                              |
|   * Total size               |   525 MiB | **                             |
| * Trees                      |           |                                |
|   * Count                    |  3.40 M   | **                             |
|   * Total size               |  9.00 GiB | ****                           |
|   * Total tree entries       |   264 M   | *****                          |
| * Blobs                      |           |                                |
|   * Count                    |  1.65 M   | *                              |
|   * Total size               |  55.8 GiB | *****                          |
| * Annotated tags             |           |                                |
|   * Count                    |   534     |                                |
| * References                 |           |                                |
|   * Count                    |   539     |                                |
|                              |           |                                |
| Biggest objects              |           |                                |
| * Commits                    |           |                                |
|   * Maximum size         [1] |  72.7 KiB | *                              |
|   * Maximum parents      [2] |    66     | ******                         |
| * Trees                      |           |                                |
|   * Maximum entries      [3] |  1.68 k   |                                |
| * Blobs                      |           |                                |
|   * Maximum size         [4] |  13.5 MiB | *                              |
|                              |           |                                |
| History structure            |           |                                |
| * Maximum history depth      |   136 k   |                                |
| * Maximum tag depth      [5] |     1     | *                              |
|                              |           |                                |
| Biggest checkouts            |           |                                |
| * Number of directories  [6] |  4.38 k   | **                             |
| * Maximum path depth     [7] |    14     | *                              |
| * Maximum path length    [8] |   134 B   | *                              |
| * Number of files        [9] |  62.3 k   | *                              |
| * Total size of files    [9] |   747 MiB |                                |
| * Number of symlinks    [10] |    40     |                                |
| * Number of submodules       |     0     |                                |

[1]  91cc53b0c78596a73fa708cceb7313e7168bb146 (91cc53b0c78596a73fa708cceb7313e7168bb146)
[2]  2cde51fbd0f310c8a2c5f977e665c0ac3945b46d (2cde51fbd0f310c8a2c5f977e665c0ac3945b46d)
[3]  4f86eed5893207aca2c2da86b35b38f2e1ec1fc8 (refs/heads/master:arch/arm/boot/dts)
[4]  a02b6794337286bc12c907c33d5d75537c240bd0 (refs/heads/master:drivers/gpu/drm/amd/include/asic_reg/vega10/NBIO/nbio_6_1_sh_mask.h)
[5]  5dc01c595e6c6ec9ccda4f6f69c131c0dd945f8c (refs/tags/v2.6.11)
[6]  1459754b9d9acc2ffac8525bed6691e15913c6e2 (589b754df3f37ca0a1f96fccde7f91c59266f38a^{tree})
[7]  78a269635e76ed927e17d7883f2d90313570fdbc (dae09011115133666e47c35673c0564b0a702db7^{tree})
[8]  ce5f2e31d3bdc1186041fdfd27a5ac96e728f2c5 (refs/heads/master^{tree})
[9]  532bdadc08402b7a72a4b45a2e02e5c710b7d626 (e9ef1fe312b533592e39cddc1327463c30b0ed8d^{tree})
[10] f29a5ea76884ac37e1197bef1941f62fda3f7b99 (f5308d1b83eba20e69df5e0926ba7257c8dd9074^{tree})
```

La sortie de la commande peut être convertie au format json.

Notez que les Blobs correspondent aux contenus des fichiers versionnés, et les Trees à la gestion des répertoires.

## bonnes pratiques

C'est l'occasion pour l'équipe GitHub de rappeler certaines bonnes pratiques concernant la gestion des dépôts :

- taille sur le disque

La taille d'un dépôt ne devrait pas dépasser 1 Go, des problèmes de performances apparaissent sur les dépôts dépassant les 5 Go.

Il convient donc d'éviter de versionner les binaires, fichiers multi-médias de grande taille et archives.

- nombre de références

Le nombre de références (branches et tags) a également un gros impact sur les performances d'utilisations car elles sont 
transmises en intégralité à chaque git fetch <remote> exécuté par un utilisateur même lorsque son dépôt local est à jour.
Au delà de quelques dizaines de milliers de références des problèmes de performances importants peuvent apparaitres.

- nombre d'objets

Plus un dépôt contient d'objets, plus il faut de temps à git pour traverser l'historique. Un projet contenant un très grand
nombre de petits fichiers peut avoir des problèmes de performances de ce fait.
La bonne pratique consiste à diviser un énorme dépôt en plusieurs dépôts.

- taille des blobs

Un dépôt ne devrait pas contenir de fichiers de taille trop importantes. Des fichiers de plusieurs Mo devraient être
des exceptions.

- gros fichiers textes ayant beaucoup de versions différentes

Git optimise très bien le stockage des fichiers textes, mais certaines opérations peuvent être extrêmement gourmandes
en ressources lorsqu'un très grand nombre de versions d'un gros fichier texte existe. Par exemple avec la commande git diff.

- profondeur de l'arbre des répertoires

Au delà de 2000 entrées dans un répertoire des problèmes de performances peuvent apparaitre.

- longueur des chemins d'accès (fichiers ou répertoires)

Au delà de 200 caractères pour un chemin d'accès sur un grand nombre de fichiers ou de répertoires des problèmes peuvent apparaitre.
