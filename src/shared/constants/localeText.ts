export const localeText = {
  noRowsLabel: "Pas de données",
  footerRowSelected: (count) => `${count} rendez-vous sélectionnés`,
  columnMenuLabel: "Menu",
  columnMenuShowColumns: "Afficher les colonnes",
  columnMenuFilter: "Filtrer",
  columnMenuHideColumn: "Cacher",
  columnMenuManageColumns: "Gestion des colonnes",
  columnMenuUnsort: "Non trié",
  columnMenuSortAsc: "Trier par ordre croissant",
  columnMenuSortDesc: "Trier par ordre décroissant",
  // Opérateurs de filtrage
  filterOperatorContains: "Contient",
  filterOperatorEquals: "Égal à",
  filterOperatorStartsWith: "Commence par",
  filterOperatorEndsWith: "Se termine par",
  filterOperatorIsEmpty: "Est vide",
  filterOperatorIsNotEmpty: "N'est pas vide",
  filterOperatorIsAnyOf: "Est l'un de",
  filterOperatorDoesNotEqual: "N'est pas égal à",
  filterOperatorDoesNotContain: "Ne contient pas",
  // Messages pour les filtres
  filterPanelInputLabel: "Valeur",
  filterPanelInputPlaceholder: "Valeur du filtre",
  filterPanelOperator: "Opérateur",
  filterPanelColumns: "Colonnes",
  filterPanelDeleteIconLabel: "Supprimer",
  filterPanelAddFilter: "Ajouter un filtre",
  // Pagination
  MuiTablePagination: {
    labelRowsPerPage: "Lignes par page:",
    labelDisplayedRows: ({ from, to, count }) => `${from}-${to} sur ${count}`,
  },
};
